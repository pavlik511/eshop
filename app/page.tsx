import Hero from '@/components/Hero';
import Bestsellers from '@/components/Bestsellers';
import WhyUs from '@/components/WhyUs';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Bestsellers />
      <WhyUs />
      {/* Tady časem přibude třeba <Newsletter /> nebo <Reviews /> */}
      <Newsletter />
    </main>
  );
}