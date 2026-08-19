import { supabase } from '@/lib/supabase';
import PizzaCard from '@/components/PizzaCard';
import { Pizza } from '@/constants';
import { SortSelect } from '../admin/sort-select';
import Link from 'next/link';

interface MenuPageProps {
  searchParams?: Promise<{ sort?: string }>;
}

export default async function MenuPage(props: MenuPageProps) {
  try {
    const resolvedParams = props.searchParams ? await props.searchParams : {};
    const currentSort = resolvedParams.sort || 'newest';

    // Dynamické řazení podle vybraného filtru
    let query = supabase.from('pizzas').select('*');

    if (currentSort === 'price_asc') {
      query = query.order('price', { ascending: true });
    } else if (currentSort === 'price_desc') {
      query = query.order('price', { ascending: false });
    } else if (currentSort === 'name_asc') {
      query = query.order('name', { ascending: true });
    } else {
      query = query.order('id', { ascending: false });
    }

    const { data: pizzas, error } = await query;

    if (error) {
      throw error;
    }

    return (
      <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]">
        <div className="max-w-[85rem] mx-auto">
          
          {/* Hlavička */}
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-dark mb-4 transition-colors"
            >
              ← Zpět na hlavní stranu
            </Link>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-brand-dark uppercase italic tracking-tighter mb-3">
              Kompletní <span className="text-brand-primary">Nabídka</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Vyberte si z naší nabídky poctivých pizz pečených v kamenné peci.
            </p>
          </div>

          {/* Řadící lišta */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <span className="text-sm font-bold text-gray-500">
              Celkem pizz: {pizzas?.length || 0}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase hidden sm:inline">Řadit:</span>
              <SortSelect currentSort={currentSort} />
            </div>
          </div>

          {/* Mřížka se všemi pizzami */}
          {!pizzas || pizzas.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 max-w-lg mx-auto shadow-sm">
              <p className="text-gray-500 font-bold">V nabídce zatím nejsou žádné pizzy.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pizzas.map((pizza: Pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))}
            </div>
          )}

        </div>
      </main>
    );
  } catch (error) {
    console.error("Chyba při načítání menu:", error);
    return (
      <main className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-red-500 font-bold text-lg">Nepodařilo se načíst nabídku pizz.</p>
      </main>
    );
  }
}