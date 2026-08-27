export default function BookingMatrix() {
  const plans = [
    {
      id: "single",
      name: "SINGLE VOCAL TRACK",
      desc: "Standard tracking session. 2 hours raw capture.",
      price: "800",
      features: ["Engineer Included", "Raw Stems Delivery"],
      btnText: "INITIATE DOC_A",
      highlight: false
    },
    {
      id: "ep",
      name: "FULL EP LOCKDOWN",
      desc: "Complete studio block. 12 hours tactical production.",
      price: "4500",
      features: ["Sr. Engineer + Producer", "Full Hardware Access", "Rough Mixes Included"],
      btnText: "INITIATE DOC_B",
      highlight: true
    },
    {
      id: "mix",
      name: "MIXING & MASTERING VAULT",
      desc: "Post-production polish. Industry standard finish.",
      price: "1500",
      features: ["Analog Summing", "3 Revisions", "Streaming & Club Masters"],
      btnText: "INITIATE DOC_C",
      highlight: false
    }
  ];

  return (
    <section id="rates" className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-bebas text-4xl mb-8 tracking-wider uppercase text-white flex justify-between items-end">
          <span>BOOKING // CONTRACTS</span>
          <span className="font-space text-xs text-muted tracking-widest uppercase hidden md:inline">EGP / HR</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`border p-6 flex flex-col relative transition-all ${
                plan.highlight 
                  ? 'border-primary bg-primary/5' 
                  : 'border-secondary hover:border-primary/50 bg-[#050505]'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-6 bg-primary text-white font-space text-[10px] tracking-widest px-2 py-1">
                  TACTICAL_CHOICE
                </div>
              )}
              
              <h3 className="font-bebas text-3xl tracking-wider text-white mb-2">{plan.name}</h3>
              <p className="font-space text-xs text-muted tracking-widest min-h-[40px]">{plan.desc}</p>
              
              <div className="my-6">
                <span className={`font-bebas text-5xl tracking-tight ${plan.highlight ? 'text-primary' : 'text-primary'}`}>
                  {plan.price}
                </span>
                <span className="font-space text-xs text-muted tracking-widest ml-2">EGP</span>
              </div>
              
              <ul className="flex-grow flex flex-col gap-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="font-space text-xs text-muted tracking-widest flex items-start gap-2">
                    <span className="text-secondary">-</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 font-space text-xs tracking-widest uppercase transition-colors border ${
                  plan.highlight 
                    ? 'bg-primary border-primary text-white hover:bg-white hover:text-black hover:border-white' 
                    : 'bg-transparent border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
