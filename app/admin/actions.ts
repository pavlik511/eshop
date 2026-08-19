'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error('Chybí ADMIN_PASSWORD v .env.local');
  }

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    redirect('/admin');
  } else {
    redirect('/admin/login?error=invalid_password');
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

export async function addPizzaAction(formData: FormData) {
  const name = formData.get('name') as string;
  const ingredientsRaw = formData.get('ingredients') as string;
  const allergensRaw = formData.get('allergens') as string;
  const price = formData.get('price') as string;
  const imageFile = formData.get('image') as File;

  if (!name || !ingredientsRaw || !price || !imageFile || imageFile.size === 0) {
    throw new Error("Všechna pole včetně obrázku musí být vyplněna!");
  }

  const ingredientsArray = ingredientsRaw
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== "");

  const allergenCodes = allergensRaw
    ? allergensRaw.split(',').map(item => parseInt(item.trim(), 10)).filter(n => !isNaN(n))
    : [];

  const filename = `${Date.now()}-${imageFile.name.replaceAll(' ', '_')}`;

  // 1. Upload obrázku do Storage
  try {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error: uploadError } = await supabase.storage
      .from('pizza-images')
      .upload(filename, buffer, {
        contentType: imageFile.type,
        upsert: true
      });

    if (uploadError) throw uploadError;
  } catch (error) {
    console.error("Chyba při nahrávání do Supabase Storage:", error);
    throw new Error("Nepodařilo se uložit obrázek do cloudu.");
  }

  const { data: { publicUrl } } = supabase.storage
    .from('pizza-images')
    .getPublicUrl(filename);

  // 2. Vložení pizzy do tabulky pizzas
  let newPizzaId: number;
  try {
    const { data: insertedPizza, error: dbError } = await supabase
      .from('pizzas')
      .insert([
        { 
          name, 
          ingredients: ingredientsArray, 
          price: Number(price), 
          image: publicUrl 
        }
      ])
      .select('id')
      .single();

    if (dbError || !insertedPizza) throw dbError;
    newPizzaId = insertedPizza.id;
  } catch (error) {
    console.error("Chyba databáze Supabase:", error);
    throw new Error("Nepodařilo se uložit pizzu do databáze.");
  }

  // 3. Propojení alergenů přes pizza_allergens
  if (allergenCodes.length > 0) {
    try {
      const { data: matchedAllergens } = await supabase
        .from('allergens')
        .select('id, code')
        .in('code', allergenCodes);

      if (matchedAllergens && matchedAllergens.length > 0) {
        const relations = matchedAllergens.map(a => ({
          pizza_id: newPizzaId,
          allergen_id: a.id
        }));

        await supabase.from('pizza_allergens').insert(relations);
      }
    } catch (error) {
      console.error("Chyba při vazbě alergenů:", error);
    }
  }

  revalidatePath('/'); 
  revalidatePath('/menu');
  revalidatePath('/admin');
  redirect('/admin?success=true');
}

export async function deletePizzaAction(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) throw new Error("Chybí ID pizzy pro smazání!");

  try {
    const { data: pizza, error: fetchError } = await supabase
      .from('pizzas')
      .select('image')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    
    if (pizza && pizza.image) {
      const imageUrl = pizza.image as string;
      const filename = imageUrl.split('/').pop();
      if (filename) {
        await supabase.storage.from('pizza-images').remove([filename]);
      }
    }

    // Vazby v pizza_allergens se smažou automaticky (při CASCADE ON DELETE) nebo je pro jistotu promažeme:
    await supabase.from('pizza_allergens').delete().eq('pizza_id', id);

    const { error: deleteError } = await supabase
      .from('pizzas')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;
  } catch (error) {
    console.error("Chyba při mazání pizzy:", error);
    throw new Error("Nepodařilo se smazat pizzu.");
  }

  revalidatePath('/');
  revalidatePath('/menu');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updatePizzaAction(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const ingredientsRaw = formData.get('ingredients') as string;
  const allergensRaw = formData.get('allergens') as string;
  const price = formData.get('price') as string;
  const imageFile = formData.get('image') as File;

  if (!id || !name || !ingredientsRaw || !price) {
    throw new Error("Název, ingredience a cena jsou povinné!");
  }

  const ingredientsArray = ingredientsRaw
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== "");

  const allergenCodes = allergensRaw
    ? allergensRaw.split(',').map(item => parseInt(item.trim(), 10)).filter(n => !isNaN(n))
    : [];

  let publicUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const filename = `${Date.now()}-${imageFile.name.replaceAll(' ', '_')}`;
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error: uploadError } = await supabase.storage
      .from('pizza-images')
      .upload(filename, buffer, {
        contentType: imageFile.type,
        upsert: true
      });

    if (!uploadError) {
      const { data } = supabase.storage
        .from('pizza-images')
        .getPublicUrl(filename);
      publicUrl = data.publicUrl;
    }
  }

  const updateData: any = {
    name,
    ingredients: ingredientsArray,
    price: Number(price),
  };

  if (publicUrl) {
    updateData.image = publicUrl;
  }

  // 1. Update v pizzas
  const { error } = await supabase
    .from('pizzas')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error("Chyba při úpravě pizzy:", error);
    throw new Error("Nepodařilo se upravit pizzu.");
  }

  // 2. Synchronizace alergenů (staré smažeme, nové přidáme)
  await supabase.from('pizza_allergens').delete().eq('pizza_id', id);

  if (allergenCodes.length > 0) {
    const { data: matchedAllergens } = await supabase
      .from('allergens')
      .select('id, code')
      .in('code', allergenCodes);

    if (matchedAllergens && matchedAllergens.length > 0) {
      const relations = matchedAllergens.map(a => ({
        pizza_id: Number(id),
        allergen_id: a.id
      }));
      await supabase.from('pizza_allergens').insert(relations);
    }
  }

  revalidatePath('/');
  revalidatePath('/menu');
  revalidatePath('/admin');
  redirect('/admin');
}