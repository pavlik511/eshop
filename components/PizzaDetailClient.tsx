"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pizza, ExtraIngredient } from "@/constants";
import { useCart } from "./CartContext";

interface Props {
  pizza: Pizza;
  extraIngredients: ExtraIngredient[];
}

export default function PizzaDetailClient({ pizza, extraIngredients }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedExtras, setSelectedExtras] = useState<ExtraIngredient[]>([]);

  const toggleExtra = (extra: ExtraIngredient) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const extraPriceSum = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const singlePizzaPrice = pizza.price + extraPriceSum;
  const totalPrice = singlePizzaPrice * quantity;

  const handleAddToCart = () => {
    addToCart(pizza, selectedExtras, quantity);
    router.push("/kosik");
  };

  const ingredientsList = Array.isArray(pizza.ingredients)
    ? pizza.ingredients
    : typeof pizza.ingredients === "string"
    ? (pizza.ingredients as string).split(",").map((s) => s.trim())
    : [];

  const allergensList = pizza.allergens || [];

  return (
    <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-dark mb-6 transition-colors"
        >
          ← Zpět do kompletního menu
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-72 sm:h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
            {pizza.image ? (
              <Image
                src={pizza.image}
                alt={pizza.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">🍕</div>
            )}
          </div>

          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                <h1 className="text-3xl sm:text-4xl font-black text-brand-dark uppercase italic tracking-tight">
                  {pizza.name}
                </h1>
                <span className="bg-brand-primary text-brand-dark text-2xl font-black px-4 py-1.5 rounded-full whitespace-nowrap italic">
                  {singlePizzaPrice} Kč
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Základní Složení
                </h2>
                <div className="flex flex-wrap gap-2">
                  {ingredientsList.map((ing, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-lg"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {extraIngredients.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-3">
                    Přidat extra suroviny
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {extraIngredients.map((extra) => {
                      const isSelected = selectedExtras.some((e) => e.id === extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-brand-primary bg-yellow-50 text-brand-dark font-bold shadow-xs"
                              : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          <span className="text-sm">{extra.name}</span>
                          <span className="text-xs font-bold text-gray-500">+{extra.price} Kč</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mb-8 bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                  Obsažené Alergeny
                </h2>
                {allergensList.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">Tato pizza neobsahuje žádné evidované alergeny.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {allergensList.map((allergen, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-amber-300 text-amber-900 text-xs px-2.5 py-1 rounded-lg font-semibold shadow-xs"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="size-9 bg-white rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-gray-800 min-w-[2.5rem] text-center">
                    {quantity} ks
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="size-9 bg-white rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-brand-primary transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-brand-primary text-brand-dark font-black rounded-xl uppercase italic tracking-wider hover:bg-yellow-500 active:scale-[0.99] transition-all cursor-pointer shadow-md"
                >
                  Přidat do košíku ({totalPrice} Kč)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}