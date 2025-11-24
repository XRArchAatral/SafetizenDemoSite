import React, { useState, useMemo } from "react";

// Safetizen Landing — Single-file React component
// TailwindCSS-first. Drop this into a React app (Vite / Create React App) with Tailwind configured.
// Default export: SafetizenLanding

const MODULES = [
  { id: 1, name: "Fire Safety Awareness", category: "General Safety", runtime: "10 mins", languages: ["English", "Hindi", "Kannada"], modes: { guided: true, quiz: false, assessment: true }, industries: ["General", "Corporate"], devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"], video: "Fire Safety Awareness.mp4" },
  { id: 2, name: "Corporate Office Safety", category: "General Safety", runtime: "13 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["General", "Corporate"], devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"], video: "Office Safety.mp4" },
  { id: 3, name: "CPR Training", category: "General Safety", runtime: "5 mins", languages: ["English"], modes: { guided: true, quiz: false, assessment: false }, industries: ["General", "Corporate"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Aatral_CPR_Safetizen.mp4" },
  { id: 4, name: "Importance of PPE", category: "General Safety", runtime: "5 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing", "Infrastructure"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "PPE Importances.mp4" },
  { id: 5, name: "Waste Segregation & Environmental Control", category: "General Safety", runtime: "5 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Infrastructure"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Environment control - english.mp4" },
  { id: 6, name: "Emergency Evacuation – Corporate", category: "General Safety", runtime: "15 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: false, assessment: false }, industries: ["General", "Corporate"], devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"], video: "Fire emergency evacuation.mp4" },

  { id: 7, name: "Work at Height – Roof Sheet Maintenance", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: false, assessment: true }, industries: ["Manufacturing", "Infrastructure"], devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"], video: "Work at Height - Roofsheet.mp4" },
  { id: 8, name: "Work at Height – Scaffold Safety", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: false, assessment: true }, industries: ["Manufacturing", "Infrastructure"], devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"], video: "Scaffolding Safety Training.mp4" },
  { id: 9, name: "Confined Space Safety (Manufacturing)", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi", "Kannada"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Confined space.mp4" },
  { id: 10, name: "Confined Space Safety (Infrastructure)", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi", "Kannada"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Infrastructure"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Confined Space English and Hindi.mp4" },
  { id: 11, name: "Hot Works – Welding", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing", "Infrastructure"], devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"], video: "Hot Works welding.mp4" },
  { id: 12, name: "Electrical Safety – LOTO", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi", "Kannada"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "LOTO SAFETY TRAINING.mp4" },
  { id: 13, name: "Electrical Safety at Construction Site", category: "Killer Risks", runtime: "7 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Infrastructure"], devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"], video: "Electrical - construction.mp4" },
  { id: 14, name: "Gas Leakage Response", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "gas leakage 2.mp4" },
  { id: 15, name: "Hazardous Substances", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing", "Infrastructure"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Hazardsubstance.mp4" },
  { id: 16, name: "Excavation Safety", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Infrastructure"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Excavation Safety.mp4" },
  { id: 17, name: "Excavation Safety – Power Version", category: "Killer Risks", runtime: "10 mins", languages: ["English"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Infrastructure"], devices: ["Meta Quest 3S"], video: "Excavation Safety - power.mp4" },
  { id: 18, name: "Vertigo Test", category: "Killer Risks", runtime: "5 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: false, assessment: false }, industries: ["Infrastructure", "Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Vertigo Test -1.mp4" },
  { id: 19, name: "Construction Site Orientation", category: "Killer Risks", runtime: "15 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: false, assessment: true }, industries: ["Infrastructure"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Construction Safety Orientation.mp4" },
  { id: 20, name: "Work at Height – Manlifter", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: true }, industries: ["Infrastructure", "Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "Man lifter (1).mp4" },
  { id: 21, name: "Chemical Safety (Dec 2025)", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "" },
  { id: 22, name: "Material Handling (Dec 2025)", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "" },
  { id: 23, name: "Shop Floor Safety (Dec 2025)", category: "Killer Risks", runtime: "10 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: false }, industries: ["Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "" },

  // EOT Crane Simulator
  { id: 24, name: "Pendant EOT Crane VR Simulator", category: "EOT Crane Simulator", runtime: "20 mins", languages: ["English", "Hindi"], modes: { guided: true, quiz: true, assessment: true }, industries: ["Manufacturing"], devices: ["Meta Quest 3", "Meta Quest 3S"], video: "https://www.youtube.com/watch?v=U1xeDRqj2oA" }
];

const CATEGORIES = ["All", "General Safety", "Killer Risks", "EOT Crane Simulator"];

function ModeBadge({ modes }) {
  return (
    <div className="flex gap-2">
      {modes.guided && <span className="px-2 py-1 text-xs bg-sky-100 text-sky-800 rounded">Guided</span>}
      {modes.quiz && <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">Quiz</span>}
      {modes.assessment && <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded">Assessment</span>}
    </div>
  );
}

function ModuleCard({ m, onDetails }) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{m.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{m.industries.join(" • ")}</p>
        </div>
        <div className="text-sm text-slate-400">{m.runtime}</div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <ModeBadge modes={m.modes} />
        <div className="text-xs text-slate-500">{m.languages.join(", ")}</div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {m.video ? (
          <a
            href={m.video}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded text-sm"
          >
            ▶ Watch
          </a>
        ) : (
          <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 rounded text-sm" disabled>
            No Preview
          </button>
        )}

        <button onClick={() => onDetails(m)} className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 border rounded text-sm">Details</button>
      </div>
    </div>
  );
}

export default function SafetizenLanding() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [runtimeFilter, setRuntimeFilter] = useState("All");

  const languages = useMemo(() => {
    const s = new Set();
    MODULES.forEach((m) => m.languages.forEach((l) => s.add(l)));
    return ["All", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    return MODULES.filter((m) => {
      if (activeCategory !== "All" && m.category !== activeCategory) return false;
      if (languageFilter !== "All" && !m.languages.includes(languageFilter)) return false;
      if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (runtimeFilter !== "All") {
        // normalize runtime to number
        const num = parseInt(m.runtime, 10);
        if (runtimeFilter === "<=10" && (isNaN(num) || num > 10)) return false;
        if (runtimeFilter === ">10" && (isNaN(num) || num <= 10)) return false;
      }
      return true;
    });
  }, [activeCategory, search, languageFilter, runtimeFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      {/* NAV */}
      <header className="max-w-7xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">A</div>
          <div>
            <div className="font-semibold">Aatral Safetizen</div>
            <div className="text-xs text-slate-500">VR Safety Training Library</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#modules" className="hover:underline">Modules</a>
          <a href="#summary" className="hover:underline">Summary</a>
          <a href="#contact" className="px-3 py-1.5 bg-indigo-600 text-white rounded">Request Demo</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">Immersive VR Safety Training Library for Enterprises</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Ready-to-deploy, multilingual VR safety modules designed for Manufacturing, Infrastructure & Corporate environments — built for measurable competency.</p>

          <div className="mt-6 flex gap-3">
            <a href="#modules" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">View Modules</a>
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg">Request Demo</a>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-slate-600">
            <div className="bg-white/60 dark:bg-slate-800/60 rounded p-3 text-center shadow-sm">
              <div className="text-2xl font-bold">21+</div>
              <div className="text-xs">Ready Modules</div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 rounded p-3 text-center shadow-sm">
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs">Learning Modes</div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 rounded p-3 text-center shadow-sm">
              <div className="text-2xl font-bold">Multi</div>
              <div className="text-xs">Languages</div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 rounded p-3 text-center shadow-sm">
              <div className="text-2xl font-bold">Quest 3 / 3S</div>
              <div className="text-xs">Supported</div>
            </div>
          </div>
        </div>

        <div className="order-first md:order-last flex items-center justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-2xl">
            <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center text-slate-400">Module visual / hero video</div>
            <div className="mt-4 text-sm text-slate-500">Easily deployable modules, mapped to industry risks and Life Saving Rules.</div>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section id="summary" className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow">
          <h2 className="text-2xl font-semibold">Executive Summary</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Aatral Safetizen is a mature VR Safety Training Library providing 21+ modules across General Safety, Killer Risk Safety and a flagship EOT Crane Simulator. Modules are short (5–20 mins), available in multiple languages, and built with Guided, Quiz and Assessment learning modes for measurable competence.</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-2xl font-bold">21+</div>
              <div className="text-sm text-slate-500">Ready Modules</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-2xl font-bold">5–20 mins</div>
              <div className="text-sm text-slate-500">Typical Runtime</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-slate-500">Learning Modes</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-2xl font-bold">Quest 3 / 3S</div>
              <div className="text-sm text-slate-500">Primary Devices</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">VR Safety Module Library</h2>

          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search modules..."
              className="px-3 py-2 border rounded-md bg-white/50"
            />

            <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-white/50">
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <select value={runtimeFilter} onChange={(e) => setRuntimeFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-white/50">
              <option value="All">All runtimes</option>
              <option value="<=10">≤ 10 mins</option>
              <option value=">10">{"> 10 mins"}</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex gap-3 items-center">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1 rounded ${activeCategory === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m) => (
              <ModuleCard key={m.id} m={m} onDetails={setSelected} />
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center p-12 bg-white/60 dark:bg-slate-800/60 rounded">
                No modules match your filters. Try clearing search or filters.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold">Why Enterprises Choose Safetizen</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded border"> <h3 className="font-semibold">Real-world Risk Replication</h3><p className="text-sm text-slate-500 mt-2">High fidelity scenarios mapped to Life Saving Rules and industry risk.</p></div>
          <div className="p-4 bg-white rounded border"> <h3 className="font-semibold">Assessment & Benchmarking</h3><p className="text-sm text-slate-500 mt-2">Guided, quiz and assessment modes provide measurable competency scores.</p></div>
          <div className="p-4 bg-white rounded border"> <h3 className="font-semibold">Hardware Integration</h3><p className="text-sm text-slate-500 mt-2">Seamless hardware integrations for advanced simulators and peripherals.</p></div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold">Roadmap (Upcoming)</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded border"> <h3 className="font-semibold">Chemical Safety</h3><p className="text-sm text-slate-500 mt-2">December 2025</p></div>
          <div className="p-4 bg-white rounded border"> <h3 className="font-semibold">Material Handling</h3><p className="text-sm text-slate-500 mt-2">December 2025</p></div>
          <div className="p-4 bg-white rounded border"> <h3 className="font-semibold">Shop Floor Safety</h3><p className="text-sm text-slate-500 mt-2">December 2025</p></div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-8 text-center">
        <div className="bg-indigo-600 text-white rounded-lg p-10 shadow-lg">
          <h3 className="text-2xl font-semibold">Digitize Your Workplace Safety Training Today</h3>
          <p className="mt-2">Deploy VR training across your team and begin measurable assessments in days.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="#contact" className="px-6 py-3 bg-white text-indigo-600 rounded font-semibold">Book a Live VR Demo</a>
            <a href="#modules" className="px-6 py-3 border rounded text-white/90">Explore Modules</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold">Aatral Safetizen</div>
            <div className="text-sm text-slate-500 mt-2">Immersive VR safety training modules for enterprise.</div>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <div className="text-sm text-slate-500 mt-2">sales@aatral.io</div>
            <div className="text-sm text-slate-500">+91 98765 43210</div>
          </div>

          <div>
            <div className="font-semibold">Quick Links</div>
            <ul className="mt-2 text-sm text-slate-500 space-y-1">
              <li>Modules</li>
              <li>Demo</li>
              <li>Roadmap</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-500 text-center">© {new Date().getFullYear()} Aatral. All rights reserved.</div>
      </footer>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-2">{selected.name}</h3>
            <p className="text-sm mb-2">Category: {selected.category}</p>
            <p className="text-sm mb-2">Runtime: {selected.runtime}</p>
            <p className="text-sm mb-2">Languages: {selected.languages.join(', ')}</p>
            <p className="text-sm mb-2">Industries: {selected.industries.join(', ')}</p>
            <p className="text-sm mb-4">Devices: {selected.devices.join(', ')}</p>
            <div className="flex gap-2 mt-4">
              {selected.video ? (
                <a href={selected.video} target="_blank" rel="noreferrer" className="px-3 py-2 bg-indigo-600 text-white rounded">Watch Video</a>
              ) : null}
              <button onClick={() => setSelected(null)} className="px-4 py-2 bg-slate-200 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
