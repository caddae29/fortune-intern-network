import { useState } from "react";
import { Bell, ArrowLeft, Calendar, Megaphone, BookOpen, AlertTriangle, Star } from "lucide-react";
import { announcements } from "../../data";

interface Props {
  onNavigate: (page: string) => void;
}

const categoryConfig: Record<string, { color: string; icon: React.ElementType }> = {
  "Internship Opportunity": { color: "bg-fin-blue-light text-fin-blue", icon: Star },
  "Application Deadline": { color: "bg-fin-red-light text-fin-red", icon: AlertTriangle },
  "FIN Academy": { color: "bg-fin-gold-light text-fin-gold-dark", icon: BookOpen },
  "Platform Update": { color: "bg-purple-50 text-purple-600", icon: Bell },
  "Event": { color: "bg-fin-green-light text-fin-green", icon: Megaphone }
};

export default function Announcements({ onNavigate }: Props) {
  const [selected, setSelected] = useState<typeof announcements[0] | null>(null);
  const [readIds, setReadIds] = useState<string[]>(announcements.filter(a => a.read).map(a => a.id));

  const unreadCount = announcements.filter(a => !readIds.includes(a.id)).length;

  const handleOpen = (ann: typeof announcements[0]) => {
    setSelected(ann);
    if (!readIds.includes(ann.id)) {
      setReadIds(prev => [...prev, ann.id]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-fin-ground pb-24 md:pb-6">
      {!selected ? (
        <div className="p-4 md:p-6 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-fin-navy">Announcements</h2>
              <p className="text-fin-muted text-sm mt-1">
                {unreadCount > 0 ? `${unreadCount} unread announcement${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button onClick={() => setReadIds(announcements.map(a => a.id))} className="text-xs font-semibold text-fin-blue hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="space-y-3">
            {announcements.map(ann => {
              const config = categoryConfig[ann.category] || { color: "bg-fin-ground text-fin-muted", icon: Bell };
              const isRead = readIds.includes(ann.id);
              return (
                <button
                  key={ann.id}
                  onClick={() => handleOpen(ann)}
                  className={`w-full text-left bg-white rounded-2xl border p-5 transition-all hover:shadow-md ${!isRead ? "border-fin-blue/30" : "border-fin-border"}`}
                >
                  <div className="flex items-start gap-3">
                    {!isRead && <div className="w-2 h-2 rounded-full bg-fin-blue flex-shrink-0 mt-1.5" />}
                    {isRead && <div className="w-2 h-2 flex-shrink-0 mt-1.5" />}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.color}`}>
                          {ann.category}
                        </span>
                        {ann.urgent && !isRead && (
                          <span className="text-[10px] font-bold bg-fin-red-light text-fin-red px-2 py-0.5 rounded-full">Urgent</span>
                        )}
                      </div>
                      <h3 className={`text-sm font-bold leading-tight mb-1.5 ${!isRead ? "text-fin-navy" : "text-fin-text"}`}>
                        {ann.title}
                      </h3>
                      <p className="text-fin-muted text-xs leading-relaxed line-clamp-2">{ann.description}</p>
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-fin-subtle">
                        <Calendar size={11} /> {ann.date}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-6 space-y-5 animate-fade-in">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-fin-muted hover:text-fin-text text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Back to Announcements
          </button>
          <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
            <div className="bg-fin-navy p-6">
              <div className="flex items-center gap-2 mb-3">
                {(() => {
                  const config = categoryConfig[selected.category] || { color: "bg-white/20 text-white", icon: Bell };
                  return (
                    <span className="text-[10px] font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">{selected.category}</span>
                  );
                })()}
              </div>
              <h2 className="text-white font-bold text-xl leading-tight">{selected.title}</h2>
              <p className="text-white/50 text-xs mt-3 flex items-center gap-1"><Calendar size={11} /> {selected.date}</p>
            </div>
            <div className="p-6">
              <p className="text-fin-text text-sm leading-relaxed">{selected.description}</p>
              <p className="text-fin-text text-sm leading-relaxed mt-4">
                For more information or to take action, please check your FIN dashboard or contact the FIN team through the support channel.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
