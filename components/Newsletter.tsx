export default function Newsletter() {
  return (
    <section className="max-w-[85rem] mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Box s newsletterem */}
      <div className="bg-brand-dark rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Dekorativní prvek na pozadí (volitelné) */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 size-64 bg-brand-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white uppercase italic leading-tight">
              Chceš slevu <span className="text-brand-primary">10 %</span> na první nákup?
            </h2>
            <p className="mt-3 text-gray-400">
              Nech nám tu svůj e-mail a my ti pošleme kód. Slibujeme, že nebudeme spamovat, jen posílat ty nejlepší akce.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Tvůj e-mail" 
              className="grow bg-white/10 border border-white/20 text-white placeholder:text-gray-500 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
              required
            />
            <button 
              type="submit"
              className="bg-brand-primary text-brand-dark font-bold py-3 px-8 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              Chci slevu!
            </button>
          </form>
        </div>

        {/* Malý text dole */}
        <p className="mt-6 text-[10px] text-gray-500 text-center md:text-left">
          Kliknutím na tlačítko souhlasíš se zpracováním osobních údajů. Můžeš se odhlásit kdykoliv.
        </p>
      </div>
    </section>
  );
}