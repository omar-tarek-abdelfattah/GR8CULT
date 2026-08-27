import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault | GR8NIK STUDIOS",
  description: "Explore the sonic archive of GR8NIK STUDIOS.",
};

export default function VaultPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    "name": "GR8NIK STUDIOS Vault",
    "description": "Featured releases engineered at GR8NIK STUDIOS.",
    "track": [
      {
        "@type": "MusicRecording",
        "name": "NIGHT CITY",
        "byArtist": {
          "@type": "MusicGroup",
          "name": "CYBER_GOON"
        }
      }
    ]
  };

  const releases = [
    { id: 1, artist: "CYBER_GOON", title: "NIGHT CITY", genre: "RAP_TRAP", role: "MIX / MASTER" },
    { id: 2, artist: "IRON_LUNG", title: "RUST", genre: "METAL_ROCK", role: "RECORDED" },
    { id: 3, artist: "VELVET_SKIES", title: "NEON", genre: "R&B", role: "FULL PROD" },
    { id: 4, artist: "GHOST_DATA", title: "PHANTOM", genre: "RAP_TRAP", role: "MASTER ONLY" },
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header & Filters */}
      <section className="border-b border-secondary pt-16 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="font-bebas text-6xl tracking-wider uppercase text-white mb-6">
            THE VAULT // ARCHIVE
          </h1>
          <div className="flex flex-wrap gap-4 font-space text-xs tracking-widest">
            {["ALL_RELEASES", "RAP_TRAP", "METAL_ROCK", "R&B"].map((filter, i) => (
              <button 
                key={filter}
                className={`px-4 py-2 border transition-colors ${i === 0 ? 'bg-primary border-primary text-white' : 'border-secondary text-muted hover:border-primary hover:text-white'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Release */}
      <section className="border-b border-secondary p-4 md:p-8">
        <div className="container mx-auto">
          <div className="w-full border border-primary bg-[#0a0a0a] flex flex-col md:flex-row relative group">
            <span className="absolute top-4 left-4 bg-primary text-white font-space text-[10px] tracking-widest px-2 py-1 z-10">
              CURRENT_ROTATION
            </span>
            <div className="w-full md:w-1/3 aspect-square bg-[#111] relative overflow-hidden border-r border-secondary/50">
               {/* Pattern for featured image */}
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#d60000_1px,transparent_1px)] bg-[size:10px_10px]"></div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="font-space text-xs text-muted tracking-widest mb-2">CYBER_GOON</span>
              <h2 className="font-bebas text-5xl text-white mb-4">NIGHT CITY</h2>
              <div className="flex gap-4">
                <button className="bg-primary text-white font-space text-xs px-6 py-2 tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
                  PLAY PREVIEW
                </button>
                <button className="border border-secondary text-muted font-space text-xs px-6 py-2 tracking-widest hover:border-primary hover:text-white transition-colors uppercase">
                  VIEW SPECS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {releases.map(release => (
            <div key={release.id} className="border border-secondary bg-[#050505] group hover:border-primary transition-colors cursor-pointer flex flex-col">
              <div className="w-full aspect-square bg-[#0a0a0a] relative border-b border-secondary/50 group-hover:border-primary/50 transition-colors"></div>
              <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <h3 className="font-bebas text-2xl text-white group-hover:text-primary transition-colors">{release.title}</h3>
                  <p className="font-space text-[10px] text-muted tracking-widest uppercase">{release.artist}</p>
                </div>
                <div className="flex justify-between items-center border-t border-secondary/50 pt-2 font-space text-[10px] tracking-widest">
                  <span className="text-secondary">{release.genre}</span>
                  <span className="text-muted">{release.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
