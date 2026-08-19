export default function AboutUsPage() {
  return (
    // Změněno z čistě tmavé na neutrální světlý základ, tmavé jsou jen vybrané sekce
    <div className="min-h-screen bg-neutral-50 text-brand-dark font-sans selection:bg-brand-primary selection:text-brand-dark">
      
      {/* 1. HERO SEKCE - SJEDNOCENÁ S KONTAKTNÍ STRÁNKOU (Tmavá, py-20, stejné texty) */}
      <section className="py-20 px-6 text-center bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tight mb-3">
            Pavlík's <span className="text-brand-primary">Pizza</span>
          </h1>
          <p className="text-sm md:text-lg font-bold uppercase tracking-wider max-w-xl mx-auto border-t border-white/20 pt-3 text-gray-300">
            Náš Příběh: Od první pece k vaší radosti
          </p>
        </div>
      </section>

      {/* 2. PŘÍBĚH - OD GARÁŽE K OHNI (Světlé pozadí) */}
      <section className="max-w-5xl mx-auto py-20 px-6 bg-neutral-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black text-gray-800 mb-6 uppercase italic border-l-4 border-brand-primary pl-4">
              Od garáže k ohni
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              V roce 2015 jsme začali s jednou starou pecí a snem upéct tu nejkřupavější pizzu v okolí. Dnes je náš oheň symbolem kvality, na kterou se můžete spolehnout.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Věříme, že nejlepší věci vyžadují čas. Naše pec dosahuje teploty přes 450 °C, což znamená, že pizza je hotová za necelých 90 sekund. Tento prudký žár uvězní vlhkost uvnitř těsta, zatímco zvenku vytvoří ty ikonické "leopardí skvrny". To je ten rozdíl mezi jídlem a zážitkem.
            </p>
          </div>
          <div className="bg-white h-96 rounded-2xl overflow-hidden border border-neutral-200 shadow-md relative flex items-center justify-center text-neutral-400">
            {/* Tady bude obrázek pece */}
            <span className="text-sm uppercase tracking-widest font-bold">Obrázek: Naše pec s ohněm</span>
          </div>
        </div>
      </section>

      {/* 3. TŘI HLAVNÍ PILÍŘE (Ponecháno tmavé jako kontrastní předěl) */}
      <section className="bg-brand-dark border-y border-brand-primary py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-brand-primary mb-12 uppercase italic tracking-wide">
            Proč pečeme jinak?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-brand-dark p-8 rounded-2xl border-b-4 border-text-brand-primary shadow-md border border-neutral-800">
              <div className="text-yellow-500 text-4xl mb-4">🌾</div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase">Pravá Kvalita</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Používáme výhradně mouku typu "00" z rodinného mlýna a rajčata San Marzano, která rostou pod italským sluncem.
              </p>
            </div>

            <div className="bg-brand-dark p-8 rounded-2xl border-b-4 border-text-brand-primary shadow-md border border-neutral-800">
              <div className="text-yellow-500 text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase">Dřevo & Oheň</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Žádný plyn, žádná elektřina. Naše pece hoří bukovým dřevem, které dává těstu nezaměnitelné kouřové aroma.
              </p>
            </div>

            <div className="bg-brand-dark p-8 rounded-2xl border-b-4 border-text-brand-primary shadow-md border border-neutral-800">
              <div className="text-yellow-500 text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase">Láska k těstu</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Naše těsto kyne minimálně 48 hodin. Jen tak dosáhneme extrémní lehkosti a vzdušnosti, po které vám nebude těžko.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MEDAILONEK - KDO ZA TÍM STOJÍ (Světlé pozadí) */}
      <section className="max-w-5xl mx-auto py-20 px-6 bg-neutral-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-white h-96 rounded-full w-96 mx-auto overflow-hidden border-4 border-brand-primary shadow-xl flex items-center justify-center text-neutral-400">
            {/* Tady bude tvoje fotka nebo ilustrace kuchaře */}
            <span className="text-sm uppercase tracking-widest font-bold">Foto: Pavlík</span>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-black text-brand-primary mb-6 uppercase italic">
              Kdo za tím stojí?
            </h2>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Pavlík, zakladatel & pizzaiolo</h3>
            <p className="text-neutral-700 italic leading-relaxed mb-4 text-lg border-l-2 border-neutral-400 pl-4">
              "Pizza pro mě není jen práce, je to posedlost. Strávil jsem měsíce v Neapoli, abych pochopil, že tajemství není v tajném receptu, ale v trpělivosti a surovinách."
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Pavlík osobně každé ráno dohlíží na míchání nové várky těsta z 120 kilogramů mouky a vybírá dodavatele, se kterými se zná osobně jménem. Nepoužíváme mrazáky ani polotovary.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SUROVINY S RODOKMENEM (Žlutý akcent pro oživení webu) */}
      <section className="bg-brand-primary py-16 px-6 text-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-neutral-950 mb-8 uppercase italic">
            Suroviny s rodokmenem
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            <div className="flex gap-3 items-start">
              <span className="text-neutral-950 font-bold">✓</span>
              <p className="text-neutral-900"><strong className="text-neutral-950">Mozzarella di Bufala:</strong> Vozíme ji čerstvou přímo z Kampánie dvakrát týdně.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-neutral-950 font-bold">✓</span>
              <p className="text-neutral-900"><strong className="text-neutral-950">Lokální bylinky:</strong> Čerstvou bazalku a oregano odebíráme od paní Marie z vedlejší vesnice.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-neutral-950 font-bold">✓</span>
              <p className="text-neutral-900"><strong className="text-neutral-950">Panenský olej:</strong> Lisovaný za studena v malém olivovém háji v Toskánsku.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-neutral-950 font-bold">✓</span>
              <p className="text-neutral-900"><strong className="text-neutral-950">Žádné kompromisy:</strong> Pokud není surovina v daný den perfektní, na naši pizzu prostě nesmí.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INFO + OTEVÍRACÍ DOBA (Světlé čisté pozadí) */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center md:text-left bg-neutral-50">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-6 uppercase italic">
              Kde a kdy nás najdete
            </h2>
            <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-950 text-brand-primary font-bold uppercase">
                    <th className="p-3 text-left">Den</th>
                    <th className="p-3 text-left">Otevírací doba</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  <tr><td className="p-3 font-bold text-neutral-900">Pondělí - Čtvrtek</td><td className="p-3">11:00 - 22:00</td></tr>
                  <tr><td className="p-3 font-bold text-neutral-900">Pátek - Sobota</td><td className="p-3">11:00 - 00:00</td></tr>
                  <tr><td className="p-3 font-bold text-neutral-900">Neděle</td><td className="p-3">12:00 - 21:00</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-black text-gray-800 mb-4 uppercase italic">
              Máte dotaz?
            </h2>
            <p className="text-neutral-600 mb-6">
              Jsme tu pro vás. Ať už plánujete oslavu, firemní catering, nebo se chcete zeptat na alergeny.
            </p>
            <div className="space-y-2 text-neutral-900 font-bold">
              <p>📞 +420 123 456 789</p>
              <p>✉️ ahoj@pavlikovapizza.cz</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}