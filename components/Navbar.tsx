"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full py-3 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
            <Link className="flex-none text-2xl font-heading font-black text-brand-dark uppercase italic tracking-tighter leading-none" href="/">
              Pavlík's <span className="text-brand-primary">Pizza</span>
            </Link>
          </div>

          <div className="sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-brand-dark hover:bg-brand-light rounded-xl transition-colors">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} basis-full grow sm:block transition-all`}>
          <div className="flex flex-col gap-y-4 gap-x-8 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <Link className="text-sm font-bold text-brand-dark hover:text-brand-primary transition-colors" href="/menu">Menu</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-brand-dark transition-colors" href="/o-nas">O nás</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-brand-dark transition-colors" href="/kontakt">Kontakt</Link>

            <Link href="/kosik" className="inline-flex items-center gap-x-2 bg-brand-dark text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-brand-primary hover:text-brand-dark transition-all transform active:scale-95 shadow-lg shadow-brand-dark/10">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Košík
              <span className="bg-brand-primary text-brand-dark text-[10px] px-1.5 py-0.5 rounded-full ml-1 font-black">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}