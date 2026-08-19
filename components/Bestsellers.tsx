import { supabase } from '@/lib/supabase';
import PizzaCard from './PizzaCard';
import { Pizza } from '@/constants';
import Link from 'next/link';

export default async function Bestsellers() {
  try {
    // Vytáhneme pouze 3 první pizzy pro upoutávku na HP
    const { data: pizzas, error } = await supabase
      .from('pizzas')
      .select('*')
      .order('id', { ascending: true })
      .limit(3);

    if (error) {
      throw error;
    }

    if (!pizzas || pizzas.length === 0) {
      return null; // Pokud nic není v DB, sekce se na HP schová
    }

    return (
      <section className="max-w-[85rem] mx-auto px-4 py-16 bg-white">
        {/* Nadpis a krátký lákavý text */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-brand-dark uppercase italic tracking-tighter mb-2">
            Naše <span className="text-brand-primary">Bestsellery</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Ochutnejte ty nejoblíbenější kousky přímo z naší pece.
          </p>
        </div>

        {/* Karty s 3 pizzami */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza: Pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>

        {/* Tlačítko na kompletní nabídku */}
        <div className="mt-12 text-center">
          <Link 
            href="/menu" 
            className="inline-flex items-center gap-2 bg-brand-dark text-white font-black px-8 py-4 rounded-full hover:bg-neutral-800 transition-all uppercase italic tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            Prohlédnout kompletní menu 
            <span className="text-brand-primary">→</span>
          </Link>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Chyba při načítání bestsellerů ze Supabase:", error);
    return null; // Při chybě se sekce na HP nezobrazí rozbitá
  }
}