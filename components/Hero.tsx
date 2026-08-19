import Image from 'next/image';
import Link from 'next/link'; // 1. Nezapomeň importovat Link

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-61px)] min-h-[600px] flex items-center overflow-hidden">
      
      {/* 1. OBRÁZEK NA POZADÍ */}
      <Image 
        src="/hero-pizza.png" 
        alt="Křupavá pizza na pozadí"
        fill
        className="object-cover z-0"
        priority
      />

      {/* 2. OVERLAY (Tmavý filtr, aby byl text čitelný) */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* 3. OBSAH (Musí mít z-20, aby byl nad obrázkem i filtrem) */}
      <div className="relative z-20 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-white italic leading-tight">
            Poctivá pizza <br />
            <span className="text-brand-primary">přímo u vás doma</span>
          </h1>
          
          <p className="mt-5 text-xl text-gray-200 max-w-lg">
            Pomalé kynutí, čerstvá rajčata a respekt k tradici. <br />
            Nic víc v tom není.
          </p>
          
          {/* 4. UPRAVENÁ TLAČÍTKA - Nyní pouze jedno dominantní přes <Link> */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/menu" // 2. Sem doplň správnou routu (např. /menu, nebo #menu pokud listuješ dolů)
              className="py-4 px-10 inline-flex justify-center items-center font-bold rounded-full bg-brand-primary text-brand-dark hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-brand-primary/30 text-center"
            >
              OBJEDNAT PIZZU
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}