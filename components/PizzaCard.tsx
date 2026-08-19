"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Pizza } from "@/constants";

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-left">
      <div>
        {/* Klikací fotka */}
        <Link href={`/menu/${pizza.id}`} className="block relative w-full h-48 rounded-xl mb-4 overflow-hidden bg-gray-100 group">
          {pizza.image ? (
            <Image 
              src={pizza.image} 
              alt={pizza.name} 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Bez obrázku
            </div>
          )}
        </Link>
        
        {/* Klikací název a cena */}
        <div className="flex justify-between items-start mb-2">
          <Link href={`/menu/${pizza.id}`}>
            <h3 className="text-xl font-bold text-gray-800 hover:text-yellow-600 transition-colors cursor-pointer">
              {pizza.name}
            </h3>
          </Link>
          <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
            {pizza.price} Kč
          </span>
        </div>

        {/* Ingredience */}
        <p className="text-gray-600 text-sm mb-6">
          {Array.isArray(pizza.ingredients) ? pizza.ingredients.join(", ") : pizza.ingredients}
        </p>
      </div>

      {/* Tlačítko přesměruje na detail */}
      <Link 
        href={`/menu/${pizza.id}`}
        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-black hover:bg-yellow-600 transition-colors uppercase active:scale-95 transform cursor-pointer text-center"
      >
        Zobrazit detail
      </Link>
    </div>
  );
}