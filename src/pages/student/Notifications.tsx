import { Bell, Briefcase, Award, Star, Clock, CheckCircle, Mail, FileText } from "lucide-react";
import { notifications } from "../../data";

interface Props {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  award: Award,
  star: Star,
  clock: Clock,
  "check-circle": CheckCircle,
  mail: Mail,
  "file-text": FileText,
  bell: Bell
};

const typeColors: Record<string, string> = {
  application: "bg-fin-blue-light text-fin-blue",
  certificate: "bg-fin-gold-light text-fin-gold-dark",
  internship: "bg-fin-green-light text-fin-green",
  deadline: "bg-fin-red-light text-fin-red",
  payment: "bg-fin-green-light text-fin-green",
  automation: "bg-purple-50 text-purple-600",
  letter: "bg-fin-gold-light text-fin-gold-dark",
  event: "bg-fin-blue-light text-fin-blue"
};

export default function Notifications({ onNavigate }: Props) {
  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  const renderNotification = (n: typeof notifications[0]) => {
    const Icon = iconMap[n.icon] || Bell;
    const colorClass = typeColors[n.type] || "bg-fin-ground text-fin-muted";
    return (
      <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${!n.read ? "bg-white border-fin-blue/20" : "bg-white border-fin-border"}`}>
        {!n.read && <div className="w-2 h-2 rounded-full bg-fin-blue flex-shrink-0 mt-2" />}
        {n.read && <div className="w-2 flex-shrink-0" />}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
          <Icon size={15} />
        </div>
        <div className="flex-1">
          <p className={`text-sm leading-relaxed ${!n.read ? "font-medium text-fin-navy" : "text-fin-text"}`}>{n.text}</p>
          <p className="text-xs text-fin-subtle mt-1">{n.time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-fin-ground p-4 md:p-6 pb-24 md:pb-6 animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-fin-navy">Notifications</h2>
        <p className="text-fin-muted text-sm mt-1">{unread.length} unread</p>
      </div>

      {unread.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-fin-muted uppercase tracking-wide">New</h3>
          {unread.map(renderNotification)}
        </div>
      )}

      {read.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-fin-muted uppercase tracking-wide">Earlier</h3>
          {read.map(renderNotification)}
        </div>
      )}
    </div>
  );
}
