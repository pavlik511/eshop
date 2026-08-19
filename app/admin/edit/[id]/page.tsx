import { supabase } from '@/lib/supabase';
import { updatePizzaAction } from '../../actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface EditPizzaProps {
  params: Promise<{ id: string }>;
}

export default async function EditPizzaPage({ params }: EditPizzaProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!sessionCookie || !sessionCookie.value) {
    redirect('/admin/login');
  }

  const { id } = await params;

  // Načteme pizzu i s jejími vazbami na alergeny
  const { data: pizza, error } = await supabase
    .from('pizzas')
    .select(`
      *,
      pizza_allergens (
        allergens (
          code
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error || !pizza) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-bold mb-4">Pizza nebyla nalezena!</p>
        <Link href="/admin" className="underline">Zpět do administrace</Link>
      </div>
    );
  }

  const formattedIngredients = Array.isArray(pizza.ingredients)
    ? pizza.ingredients.join(', ')
    : pizza.ingredients || '';

  // Vytáhneme kódy (např. "1, 7")
  const currentAllergens = (pizza.pizza_allergens as any[])
    ?.map(pa => pa.allergens?.code)
    .filter(Boolean)
    .sort((a, b) => a - b)
    .join(', ') || '';

  return (
    <div className="min-h-screen bg-brand-light p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black text-brand-dark uppercase italic">
            Upravit <span className="text-brand-primary">{pizza.name}</span>
          </h1>
          <Link href="/admin" className="text-xs font-bold text-gray-500 hover:underline">
            Zrušit
          </Link>
        </div>

        <form action={updatePizzaAction} className="space-y-4">
          <input type="hidden" name="id" value={pizza.id} />

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">Název</label>
            <input 
              name="name" 
              type="text" 
              defaultValue={pizza.name} 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-primary outline-none text-sm text-neutral-900" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">Ingredience (oddělené čárkou)</label>
            <input 
              name="ingredients" 
              type="text" 
              defaultValue={formattedIngredients} 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-primary outline-none text-sm text-neutral-900" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">Alergeny (čísla oddělená čárkou, např. 1, 7)</label>
            <input 
              name="allergens" 
              type="text" 
              defaultValue={currentAllergens} 
              placeholder="1, 7"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-primary outline-none text-sm text-neutral-900" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">Cena (Kč)</label>
            <input 
              name="price" 
              type="number" 
              defaultValue={pizza.price} 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-primary outline-none text-sm text-neutral-900" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">Obrázek (vyberte nový nebo ponechte stávající)</label>
            <div className="flex items-center gap-4 mb-2">
              {pizza.image && (
                <img src={pizza.image} alt={pizza.name} className="w-12 h-12 rounded object-cover bg-gray-100" />
              )}
              <span className="text-xs text-gray-400">Aktuální fotka</span>
            </div>
            <input name="image" type="file" accept="image/*" className="w-full border border-gray-300 p-2 rounded text-sm" />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="w-full bg-brand-primary text-brand-dark font-bold py-3 rounded hover:bg-yellow-500 text-sm uppercase cursor-pointer">
              Uložit změny
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}