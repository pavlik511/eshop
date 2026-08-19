import { addPizzaAction, deletePizzaAction, logoutAction } from './actions';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SortSelect } from './sort-select';

export default async function AdminPage(props: {
  searchParams?: Promise<{ success?: string; sort?: string; q?: string }>;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!Boolean(sessionCookie?.value)) {
    redirect('/admin/login');
  }

  const resolvedParams = props.searchParams ? await props.searchParams : {};
  const currentSort = resolvedParams.sort || 'newest';

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

  const { data: pizzas } = await query;

  return (
    <div className="min-h-screen bg-brand-light p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-brand-dark uppercase italic">
            Správa <span className="text-brand-primary">Menu</span>
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-bold hover:underline text-brand-dark">
              Zpět na web
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs font-bold bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-200 cursor-pointer"
              >
                Odhlásit
              </button>
            </form>
          </div>
        </div>

        {resolvedParams.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 font-bold text-sm">
            Pizza byla úspěšně přidána do pece! 🍕
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEVÝ SLOUPEC: FORMULÁŘ */}
          <div className="md:col-span-1">
            <form
              action={addPizzaAction}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-8"
            >
              <h2 className="text-lg font-bold mb-4 text-brand-dark">Přidat novou</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1">Název</label>
                  <input
                    name="name"
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-primary outline-none text-sm text-neutral-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1">Ingredience (oddělené čárkou)</label>
                  <input
                    name="ingredients"
                    type="text"
                    placeholder="Tomáty, Mozzarella"
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-primary outline-none text-sm text-neutral-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1">Alergeny (čísla oddělená čárkou)</label>
                  <input
                    name="allergens"
                    type="text"
                    placeholder="1, 7"
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-primary outline-none text-sm text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1">Cena (Kč)</label>
                  <input
                    name="price"
                    type="number"
                    className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-brand-primary outline-none text-sm text-neutral-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1">Obrázek</label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    className="w-full border border-gray-300 p-2 rounded text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-primary text-brand-dark font-bold py-3 rounded hover:bg-yellow-500 text-sm uppercase transition-colors cursor-pointer"
                >
                  Uložit pizzu
                </button>
              </div>
            </form>
          </div>

          {/* PRAVÝ SLOUPEC: SEZNAM A SELECT FILTR */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-brand-dark">Aktuální nabídka ({pizzas?.length || 0})</h2>
                <SortSelect currentSort={currentSort} />
              </div>

              {(!pizzas || pizzas.length === 0) ? (
                <p className="text-gray-500 text-sm">V nabídce zatím nejsou žádné pizzy.</p>
              ) : (
                <div className="space-y-4">
                  {pizzas.map((pizza) => (
                    <div key={pizza.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-4">
                        <img src={pizza.image} alt={pizza.name} className="w-12 h-12 rounded object-cover bg-gray-200" />
                        <div>
                          <h3 className="font-bold text-gray-800">{pizza.name}</h3>
                          <p className="text-xs text-gray-500">{pizza.price} Kč</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/edit/${pizza.id}`}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-3 py-1.5 rounded text-xs transition-colors border border-gray-300"
                        >
                          Upravit
                        </Link>

                        <form action={deletePizzaAction}>
                          <input type="hidden" name="id" value={pizza.id} />
                          <button type="submit" className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-3 py-1.5 rounded text-xs transition-colors border border-red-200 cursor-pointer">
                            Smazat
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}