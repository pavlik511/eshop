import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 py-16 px-4 pt-20 pb-16">
      <div className="max-w-[85rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Sloupec */}
          <div className="col-span-1 md:col-span-1">
            <Link className="text-2xl font-heading font-black text-white uppercase italic tracking-tighter" href="/">
              Pavlík's <span className="text-brand-primary">Pizza</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Tradiční italská pizza pečená s láskou v peci na dřevo. Používáme jen ty nejčerstvější suroviny přímo od farmářů.
            </p>
          </div>

          {/* Odkazy */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Navigace</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-brand-primary transition-colors">Kompletní menu</Link></li>
              <li><Link href="/o-nas" className="hover:text-brand-primary transition-colors">Náš příběh</Link></li>
              <li><Link href="/kontakt" className="hover:text-brand-primary transition-colors">Kontakt & Kde nás najdete</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Informace</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/o-nas" className="hover:text-brand-primary transition-colors">O pečení na dřevě</Link></li>
              <li><Link href="/menu" className="hover:text-brand-primary transition-colors">Alergeny u produktů</Link></li>
              <li><Link href="/kontakt" className="hover:text-brand-primary transition-colors">Firemní catering</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Kde nás najdete?</h4>
            <p className="text-sm">Italská ulice 123/4, Praha 2</p>
            <p className="text-sm mt-2 text-brand-primary font-bold">+420 123 456 789</p>
            <p className="text-xs text-gray-500 mt-1">ahoj@pavlikovapizza.cz</p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-xs">
          <p>© 2026 Pavlík's Pizza. Všechna práva vyhrazena. Upečeno s Next.js.</p>
        </div>
      </div>
    </footer>
  );
}