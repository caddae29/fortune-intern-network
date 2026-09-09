import { useState } from "react";
import { Search, SlidersHorizontal, Bookmark, MapPin, Clock, CheckCircle, X, ArrowRight, Star, Building2, Briefcase, DollarSign, Wifi, Laptop } from "lucide-react";
import { internships } from "../../data";

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialInternshipId?: string;
}

const industries = ["All Industries", "Technology", "Banking & Finance", "Telecommunications", "Fintech & Technology"];
const arrangements = ["All", "Remote", "Hybrid", "On-site"];
const types = ["All", "Paid", "Unpaid"];

export default function Marketplace({ onNavigate, initialInternshipId }: Props) {
  const [query, setQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedArrangement, setSelectedArrangement] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(internships.filter(i => i.saved).map(i => i.id));
  const [selectedId, setSelectedId] = useState<string | null>(initialInternshipId || null);

  const filtered = internships.filter(int => {
    const q = query.toLowerCase();
    const matchQuery = !q || int.title.toLowerCase().includes(q) || int.company.toLowerCase().includes(q) || int.skills.some(s => s.toLowerCase().includes(q));
    const matchIndustry = selectedIndustry === "All Industries" || int.industry === selectedIndustry;
    const matchArrangement = selectedArrangement === "All" || int.arrangement === selectedArrangement;
    const matchType = selectedType === "All" || int.type === selectedType;
    return matchQuery && matchIndustry && matchArrangement && matchType;
  });

  const selected = internships.find(i => i.id === selectedId);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const arrangementIcon = (a: string) => {
    if (a === "Remote") return <Wifi size={11} />;
    if (a === "Hybrid") return <Laptop size={11} />;
    return <Building2 size={11} />;
  };

  const arrangementColor = (a: string) => {
    if (a === "Remote") return "bg-fin-gold-light text-fin-gold-dark";
    if (a === "Hybrid") return "bg-purple-50 text-purple-600";
    return "bg-fin-blue-light text-fin-blue";
  };

  return (
    <div className="flex h-full overflow-hidden animate-fade-in">
      {/* Left: list */}
      <div className={`flex flex-col ${selected ? "hidden md:flex md:w-80 lg:w-96 flex-shrink-0" : "flex-1"} border-r border-fin-border bg-fin-ground overflow-hidden`}>
        {/* Search & filter */}
        <div className="p-4 bg-white border-b border-fin-border space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
            <input
              type="text"
              placeholder="Search internships, companies, skills..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-fin-ground border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex-shrink-0 ${showFilters ? "bg-fin-blue text-white border-fin-blue" : "border-fin-border text-fin-muted bg-white"}`}>
              <SlidersHorizontal size={12} /> Filters
            </button>
            {arrangements.filter(a => a !== "All").map(a => (
              <button key={a} onClick={() => setSelectedArrangement(selectedArrangement === a ? "All" : a)} className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex-shrink-0 ${selectedArrangement === a ? "bg-fin-navy text-white border-fin-navy" : "border-fin-border text-fin-muted bg-white"}`}>
                {a}
              </button>
            ))}
          </div>
          {showFilters && (
            <div className="grid grid-cols-2 gap-2 pt-1 animate-fade-in">
              <div>
                <label className="text-xs font-semibold text-fin-muted mb-1 block">Industry</label>
                <select value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)} className="w-full text-xs border border-fin-border rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:border-fin-blue">
                  {industries.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-fin-muted mb-1 block">Type</label>
                <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="w-full text-xs border border-fin-border rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:border-fin-blue">
                  {types.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <p className="text-xs text-fin-muted font-medium">{filtered.length} internships found</p>
          {filtered.map(int => (
            <div
              key={int.id}
              onClick={() => setSelectedId(int.id)}
              className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:shadow-md ${selectedId === int.id ? "border-fin-blue shadow-md" : "border-fin-border"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-fin-ground overflow-hidden border border-fin-border flex-shrink-0">
                  <img src={int.companyLogo} alt={int.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-fin-navy text-sm leading-tight">{int.title}</h3>
                      <p className="text-fin-muted text-xs mt-0.5">{int.company}</p>
                    </div>
                    <button onClick={e => toggleSave(int.id, e)} className="w-7 h-7 rounded-full hover:bg-fin-ground flex items-center justify-center flex-shrink-0">
                      <Bookmark size={14} className={savedIds.includes(int.id) ? "text-fin-blue fill-fin-blue" : "text-fin-muted"} />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className={`flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${arrangementColor(int.arrangement)}`}>
                      {arrangementIcon(int.arrangement)} {int.arrangement}
                    </span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-fin-green-light text-fin-green">{int.type}</span>
                    <span className="flex items-center gap-0.5 text-[10px] text-fin-muted">
                      <MapPin size={9} /> {int.location.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-1 text-[10px] text-fin-muted">
                      <Clock size={9} /> {int.deadline}
                    </div>
                    <div className="text-[10px] font-bold text-fin-green bg-fin-green-light px-1.5 py-0.5 rounded-full">
                      {int.matchScore}% Match
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search size={32} className="text-fin-border mx-auto mb-3" />
              <p className="text-fin-muted font-medium">No internships found</p>
              <p className="text-fin-subtle text-sm mt-1">Try different search terms or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: detail panel */}
      {selected ? (
        <div className="flex-1 overflow-y-auto bg-white animate-fade-in">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-fin-border px-6 py-4 flex items-center justify-between z-10">
            <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-fin-muted hover:text-fin-text text-sm font-medium transition-colors md:hidden">
              <X size={16} /> Back
            </button>
            <div className="hidden md:block" />
            <div className="flex items-center gap-2">
              <button onClick={e => toggleSave(selected.id, e)} className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-semibold transition-colors ${savedIds.includes(selected.id) ? "border-fin-blue text-fin-blue bg-fin-blue-light" : "border-fin-border text-fin-muted"}`}>
                <Bookmark size={14} className={savedIds.includes(selected.id) ? "fill-fin-blue" : ""} />
                {savedIds.includes(selected.id) ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => onNavigate("student-apply", { id: selected.id })}
                className="flex items-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Apply Now <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="p-6 max-w-3xl">
            {/* Company + title */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-fin-ground overflow-hidden border border-fin-border flex-shrink-0">
                <img src={selected.companyLogo} alt={selected.company} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-fin-navy mb-1">{selected.title}</h1>
                <p className="text-fin-muted font-medium">{selected.company}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${arrangementColor(selected.arrangement)}`}>
                    {arrangementIcon(selected.arrangement)} {selected.arrangement}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-fin-green-light text-fin-green">{selected.type}</span>
                  <span className="flex items-center gap-1 text-xs text-fin-muted bg-fin-ground px-2 py-1 rounded-full">
                    <MapPin size={11} /> {selected.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-fin-muted bg-fin-ground px-2 py-1 rounded-full">
                    <DollarSign size={11} /> {selected.stipend}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-fin-muted bg-fin-ground px-2 py-1 rounded-full">
                    <Clock size={11} /> Deadline: {selected.deadline}
                  </span>
                </div>
              </div>
            </div>

            {/* Match score */}
            <div className="bg-fin-green-light border border-fin-green/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-fin-green" />
                  <h3 className="font-bold text-fin-navy text-sm">Why this opportunity matches you</h3>
                </div>
                <span className="text-xl font-bold text-fin-green">{selected.matchScore}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selected.skills.slice(0, 4).map(skill => (
                  <div key={skill} className="flex items-center gap-1.5 text-xs text-fin-navy">
                    <CheckCircle size={12} className="text-fin-green flex-shrink-0" /> {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <section className="mb-6">
              <h2 className="font-bold text-fin-navy text-base mb-3">About the Internship</h2>
              <p className="text-fin-text text-sm leading-relaxed">{selected.description}</p>
            </section>

            {/* Responsibilities */}
            <section className="mb-6">
              <h2 className="font-bold text-fin-navy text-base mb-3">Responsibilities</h2>
              <ul className="space-y-2">
                {selected.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-fin-text">
                    <span className="w-5 h-5 rounded-full bg-fin-blue-light text-fin-blue text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="mb-6">
              <h2 className="font-bold text-fin-navy text-base mb-3">Requirements</h2>
              <ul className="space-y-2">
                {selected.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-fin-text">
                    <CheckCircle size={14} className="text-fin-blue flex-shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="font-bold text-fin-navy text-base mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {selected.skills.map(s => (
                  <span key={s} className="text-xs font-medium bg-fin-blue-mid text-fin-blue px-3 py-1.5 rounded-full">{s}</span>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="mb-8">
              <h2 className="font-bold text-fin-navy text-base mb-3">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selected.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-fin-text bg-fin-ground rounded-lg px-3 py-2">
                    <CheckCircle size={13} className="text-fin-gold flex-shrink-0" /> {b}
                  </div>
                ))}
              </div>
            </section>

            {/* Apply CTA */}
            <div className="border-t border-fin-border pt-6">
              <button
                onClick={() => onNavigate("student-apply", { id: selected.id })}
                className="w-full flex items-center justify-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-4 rounded-xl text-base transition-all hover:scale-[1.01]"
              >
                Apply Now <ArrowRight size={18} />
              </button>
              <p className="text-center text-xs text-fin-muted mt-3">Posted {selected.postedAt} · Application fee: GHS 50</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-fin-ground">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-2xl border border-fin-border flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Briefcase size={32} className="text-fin-border" />
            </div>
            <p className="text-fin-muted font-medium">Select an internship to view details</p>
            <p className="text-fin-subtle text-sm mt-1">Browse opportunities on the left</p>
          </div>
        </div>
      )}
    </div>
  );
}

