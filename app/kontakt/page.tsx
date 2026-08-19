export default function KontaktPage() {
  return (
    // Změněno pozadí na neutral-50 a barva textu na tmavou
    <div className="w-full bg-neutral-50 text-brand-dark font-sans selection:bg-brand-primary selection:text-brand-dark">
      
      {/* HERO SEKCE */}
      <section className="py-20 px-6 text-center bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tight mb-3">
            Kontaktujte <span className="text-brand-primary">Nás</span>
          </h1>
          <p className="text-sm md:text-lg font-bold uppercase tracking-wider max-w-xl mx-auto border-t border-white/20 pt-3 text-gray-300">
            Máte hlad? Chcete catering? Ozvěte se.
          </p>
        </div>
      </section>

      {/* HLAVNÍ OBSAH */}
      <section className="max-w-5xl mx-auto py-16 px-6 bg-neutral-50">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* LEVÝ SLOUPEC: ÚDAJE */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-brand-dark uppercase italic mb-4 border-l-4 border-brand-primary pl-3">
                Kde nás najdete & Kudy k nám
              </h2>
              <div className="space-y-2 text-gray-600 text-lg">
                <p className="font-bold text-brand-dark">🍕 Pavlík's Pizza</p>
                <p>Italská ulice 123/4</p>
                <p>120 00 Praha 2 - Vinohrady</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-brand-dark uppercase italic mb-4 border-l-4 border-brand-primary pl-3">
                Rychlé spojení
              </h2>
              <div className="space-y-3 font-bold text-lg text-gray-700">
                <p className="flex items-center gap-3">📞 <span className="text-brand-dark">+420 123 456 789</span></p>
                <p className="flex items-center gap-3">✉️ <span className="text-brand-dark">ahoj@pavlikovapizza.cz</span></p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-dark uppercase mb-3">
                Fakturační údaje
              </h2>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Provozovatel: Pavlík's Food s.r.o.</p>
                <p>IČO: 12345678 | DIČ: CZ12345678</p>
                <p>Společnost je zapsaná v obchodním rejstříku.</p>
              </div>
            </div>
          </div>

          {/* PRAVÝ SLOUPEC: MAPA & DOTAZ */}
          <div className="space-y-8">
            {/* Mapa bez tmavého filtru */}
            <div className="w-full h-64 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <iframe 
                src="https://maps.google.com/maps?q=Italsk%C3%A1%20123,%20Praha&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-none opacity-90"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            {/* Formulář přizpůsobený světlému režimu */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold uppercase text-brand-dark mb-4">Napište nám přímo odtud</h3>
              <div className="space-y-3">
                <input type="email" placeholder="Tvůj E-mail" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-brand-dark focus:border-brand-primary outline-none" />
                <textarea rows={3} placeholder="Tvoje zpráva..." className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-brand-dark focus:border-brand-primary outline-none resize-none"></textarea>
                <button className="w-full bg-brand-primary text-brand-dark font-bold py-2.5 rounded text-sm hover:bg-yellow-500 transition-colors uppercase">
                  Odeslat zprávu
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}