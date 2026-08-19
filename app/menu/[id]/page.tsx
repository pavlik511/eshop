import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PizzaDetailClient from "@/components/PizzaDetailClient";
import { Pizza, ExtraIngredient } from "@/constants";

interface PizzaDetailPageProps {
  params: Promise<{ id: string }>;
}

// Přesný TypeScript typ pro data, která vrátí Supabase JOIN
interface SupabasePizzaWithAllergens {
  id: number;
  name: string;
  price: number;
  image: string;
  ingredients: string[];
  pizza_allergens: Array<{
    allergens: {
      code: number;
      name: string;
    } | null;
  }> | null;
}

export default async function PizzaDetailPage({ params }: PizzaDetailPageProps) {
  const { id } = await params;

  const { data: pizzaData, error: pizzaError } = await supabase
    .from("pizzas")
    .select(`
      id,
      name,
      price,
      image,
      ingredients,
      pizza_allergens (
        allergens (
          code,
          name
        )
      )
    `)
    .eq("id", id)
    .single();

  if (pizzaError || !pizzaData) {
    notFound();
  }

  const rawPizza = pizzaData as unknown as SupabasePizzaWithAllergens;

  const { data: extraIngredients } = await supabase
    .from("extra_ingredients")
    .select("*")
    .order("price", { ascending: true });

  // Čisté přetypované mapování bez 'any'
  const allergens: string[] = rawPizza.pizza_allergens
    ? rawPizza.pizza_allergens
        .map((pa) => (pa.allergens ? `${pa.allergens.code} - ${pa.allergens.name}` : null))
        .filter((item): item is string => item !== null)
    : [];

  const formattedPizza: Pizza = {
    id: Number(rawPizza.id),
    name: rawPizza.name,
    price: Number(rawPizza.price),
    image: rawPizza.image,
    ingredients: rawPizza.ingredients,
    allergens: allergens,
  };

  return (
    <PizzaDetailClient 
      pizza={formattedPizza} 
      extraIngredients={(extraIngredients as ExtraIngredient[]) || []} 
    />
  );
}