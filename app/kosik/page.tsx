"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";

export default function KosikPage() {
  const { cart, updateQuantity, removeFromCart, cartCount, totalPrice } = useCart();

  return (
    <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-[85rem] mx-auto">
        <div className="mb-8 max-w-5xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-dark mb-4 transition-colors"
          >
            ← Zpět do obchodu
          </Link>
          <h1 className="text-3xl font-heading font-black text-brand-dark uppercase italic tracking-tighter">
            Váš <span className="text-brand-primary">Košík</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {cartCount === 0 ? "Košík zeje prázdnotou." : `Máte v košíku ${cartCount} ${cartCount === 1 ? 'položku' : cartCount < 5 ? 'položky' : 'položek'}.`}
          </p>
        </div>

        {cartCount === 0 ? (
          <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">🍕</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Ještě jste si nevybrali?</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Naše pece jedou naplno! Vraťte se na menu a vyberte si něco dobrého.
            </p>
            <Link 
              href="/menu"
              className="inline-flex items-center gap-x-2 bg-brand-dark text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-primary hover:text-brand-dark transition-all uppercase tracking-wider"
            >
              Zpět na nabídku
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative size-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {item.pizza.image ? (
                        <Image src={item.pizza.image} alt={item.pizza.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">🍕</div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{item.pizza.name}</h3>
                      
                      {/* Čisté zobrazení extra surovin pod názvem */}
                      {item.selectedExtras.length > 0 ? (
                        <p className="text-xs text-amber-700 font-medium">
                          + {item.selectedExtras.map((e) => e.name).join(", ")}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400">Základní varianta</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                    <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200 gap-1">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="size-7 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm hover:bg-red-500 hover:text-white transition-colors active:scale-90"
                        title="Odebrat 1 ks"
                      >
                        -
                      </button>

                      <span className="px-3 text-sm font-bold text-gray-700 min-w-[2.5rem] text-center">
                        {item.quantity} ks
                      </span>

                      <button 
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="size-7 bg-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm hover:bg-brand-primary transition-colors active:scale-90"
                        title="Přidat 1 ks"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="font-bold text-gray-800">{item.unitPrice * item.quantity} Kč</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 bg-brand-dark text-white rounded-3xl p-6 shadow-xl sticky top-24">
              <h2 className="text-xl font-heading font-black uppercase italic tracking-wider mb-6 border-b border-white/10 pb-4">
                Shrnutí
              </h2>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Mezisoučet:</span>
                  <span className="text-white font-bold">{totalPrice} Kč</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Doprava:</span>
                  <span className="text-brand-primary font-bold">Zdarma</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="font-medium text-base">Celkem:</span>
                  <span className="text-2xl font-black text-brand-primary italic">{totalPrice} Kč</span>
                </div>
              </div>

              <button 
                onClick={() => alert("Objednávka odeslána!")}
                className="w-full py-4 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-black rounded-xl border border-transparent bg-brand-primary text-brand-dark hover:bg-white transition-all uppercase italic tracking-wider active:scale-[0.99] shadow-lg cursor-pointer"
              >
                Pokračovat v objednávce
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}