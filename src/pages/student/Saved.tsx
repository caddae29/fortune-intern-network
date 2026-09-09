import { useState } from "react";
import { Bookmark, BookmarkX, Briefcase, Clock, MapPin, ArrowRight, Search } from "lucide-react";
import { internships } from "../../data";

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const SAVED_IDS = ["int-002", "int-003", "int-004"];

export default function Saved({ onNavigate }: Props) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(SAVED_IDS));
  const [search, setSearch] = useState("");

  const saved = internships.filter(i => savedIds.has(i.id));
  const filtered = saved.filter(i =>
    !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase())
  );

  const unsave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-fin-navy">Saved Internships</h1>
        <p className="text-fin-muted text-sm mt-1">{saved.length} internship{saved.length !== 1 ? "s" : ""} saved</p>
      </div>

      {/* Search */}
      {saved.length > 0 && (
        <div className="relative mb-5">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
          <input
            type="text"
            placeholder="Search saved internships..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-fin-border rounded-xl focus:outline-none focus:ring-2 focus:ring-fin-blue/20 focus:border-fin-blue/40 text-fin-text placeholder:text-fin-muted"
          />
        </div>
      )}

      {/* Empty state */}
      {saved.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-fin-blue-light rounded-2xl flex items-center justify-center mb-5">
            <Bookmark size={36} className="text-fin-blue" />
          </div>
          <h2 className="text-xl font-bold text-fin-navy mb-2">No saved internships yet</h2>
          <p className="text-fin-muted text-sm max-w-xs mb-6">Browse internships and save the ones you are interested in to review them later.</p>
          <button
            onClick={() => onNavigate("student-marketplace")}
            className="flex items-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Browse Internships <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Filtered empty state */}
      {saved.length > 0 && filtered.length === 0 && (
        <div className="text-center py-16 text-fin-muted text-sm">
          No saved internships match &ldquo;{search}&rdquo;.
        </div>
      )}

      {/* Cards grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(int => (
            <div
              key={int.id}
              className="bg-white rounded-2xl border border-fin-border shadow-sm hover:shadow-md hover:border-fin-blue/30 transition-all group"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-fin-ground overflow-hidden border border-fin-border flex-shrink-0">
                    <img src={int.companyLogo} alt={int.company} className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => unsave(int.id)}
                    title="Remove from saved"
                    className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors group/btn"
                  >
                    <BookmarkX size={16} className="text-fin-blue group-hover/btn:text-fin-red transition-colors" />
                  </button>
                </div>

                <h3 className="font-bold text-fin-navy text-sm leading-snug mb-0.5">{int.title}</h3>
                <p className="text-fin-muted text-xs mb-3">{int.company}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="flex items-center gap-1 text-[10px] text-fin-muted">
                    <MapPin size={10} /> {int.location}
                  </span>
                  <span className="text-fin-muted text-[10px]">·</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${int.arrangement === "Remote" ? "bg-fin-gold-light text-fin-gold-dark" : int.arrangement === "Hybrid" ? "bg-purple-50 text-purple-600" : "bg-fin-blue-light text-fin-blue"}`}>
                    {int.arrangement}
                  </span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-fin-green-light text-fin-green">{int.stipend}</span>
                </div>

                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex-1 h-1.5 bg-fin-ground rounded-full overflow-hidden">
                    <div className="h-1.5 bg-fin-green rounded-full" style={{ width: `${int.matchScore}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-fin-green">{int.matchScore}% match</span>
                </div>
              </div>

              <div className="border-t border-fin-border px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-fin-muted">
                  <Clock size={10} /> Deadline: {int.deadline}
                </div>
                <button
                  onClick={() => onNavigate("student-marketplace", { id: int.id })}
                  className="flex items-center gap-1 text-fin-blue text-xs font-semibold hover:underline"
                >
                  Apply <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA banner */}
      {saved.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-fin-navy to-fin-navy-muted rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm mb-0.5">Ready to apply?</p>
            <p className="text-white/60 text-xs">{"FIN's automated application flow makes it easy — apply in minutes."}</p>
          </div>
          <button
            onClick={() => onNavigate("student-marketplace")}
            className="flex items-center gap-2 bg-fin-gold hover:bg-fin-gold-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex-shrink-0"
          >
            Browse More <Briefcase size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
