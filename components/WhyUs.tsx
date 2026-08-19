export default function Features() {
  const features = [
    { title: "Tradiční pec", desc: "Pečeme na bukovém dřevě pro tu pravou chuť.", icon: "🔥" },
    { title: "DOPrava zdarma", desc: "Při objednávce nad 500 Kč neplatíš ani korunu.", icon: "🚗" },
    { title: "IT suroviny", desc: "Mouka, rajčata i mozzarella přímo z Neapole.", icon: "🇮🇹" },
  ];

  return (
    <section className="py-12 bg-brand-light">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {features.map((f, i) => (
            <div key={i} className="p-6 transition-all hover:translate-y-[-5px]">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-brand-dark uppercase italic tracking-tight">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}