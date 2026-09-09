import { LayoutDashboard, Megaphone, BookOpen, Briefcase, User, Sparkles, Bell, Bookmark } from "lucide-react";
import { LogoFull } from "../components/Logo";
import { notifications } from "../data";

interface Props {
  activePage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  children: React.ReactNode;
  showSuper: boolean;
  onToggleSuper: () => void;
}

const navItems = [
  { id: "student-overview", label: "Overview", icon: LayoutDashboard },
  { id: "student-announcements", label: "Announcements", icon: Megaphone },
  { id: "student-academy", label: "Academy", icon: BookOpen },
  { id: "student-marketplace", label: "Apply", icon: Briefcase },
  { id: "student-profile", label: "Profile", icon: User }
];

const sidebarExtra = [
  { id: "student-tracking", label: "My Applications", icon: Briefcase },
  { id: "student-saved", label: "Saved", icon: Bookmark },
  { id: "student-analytics", label: "My Progress", icon: LayoutDashboard }
];

const unreadCount = notifications.filter(n => !n.read).length;

export default function StudentShell({ activePage, onNavigate, children, showSuper, onToggleSuper }: Props) {
  return (
    <div className="flex h-full overflow-hidden bg-fin-ground">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-fin-navy flex-shrink-0 overflow-y-auto">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-white/10">
          <LogoFull size="sm" onDark />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">Main Menu</p>
          {navItems.map(item => {
            const isActive = activePage === item.id || (item.id === "student-marketplace" && activePage === "student-internship-detail") || (item.id === "student-marketplace" && activePage === "student-apply");
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-fin-blue text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}
              >
                <item.icon size={17} />
                {item.label}
                {item.id === "student-announcements" && unreadCount > 0 && (
                  <span className="ml-auto w-5 h-5 bg-fin-gold rounded-full text-[10px] font-bold text-white flex items-center justify-center">{unreadCount}</span>
                )}
              </button>
            );
          })}

          <div className="pt-4 pb-2">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">More</p>
          </div>
          {sidebarExtra.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-white/20 text-white" : "text-white/50 hover:text-white hover:bg-white/10"}`}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Super button */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={onToggleSuper}
            className="w-full flex items-center gap-3 px-3 py-3 bg-fin-gold hover:bg-fin-gold-dark rounded-xl text-sm font-bold text-white transition-colors"
          >
            <Sparkles size={16} />
            Super AI Assistant
          </button>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-fin-navy-light flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&auto=format" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Amara Johnson</p>
            <p className="text-white/40 text-[10px] truncate">Level 300 · UG</p>
          </div>
          <button onClick={() => onNavigate("student-notifications")} className="relative">
            <Bell size={16} className="text-white/50 hover:text-white transition-colors" />
            {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-fin-red rounded-full" />}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden bg-white border-b border-fin-border px-4 py-2.5 flex items-center justify-between flex-shrink-0">
          <LogoFull size="sm" onDark={false} />
          <div className="flex items-center gap-2">
            <button onClick={onToggleSuper} className="w-8 h-8 bg-fin-gold rounded-full flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </button>
            <button onClick={() => onNavigate("student-notifications")} className="relative w-8 h-8 flex items-center justify-center">
              <Bell size={18} className="text-fin-muted" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-fin-red rounded-full" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-fin-border z-40 safe-area-bottom">
        <div className="flex items-center">
          {navItems.map(item => {
            const isActive = activePage === item.id || (item.id === "student-marketplace" && ["student-internship-detail", "student-apply"].includes(activePage));
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${isActive ? "text-fin-blue" : "text-fin-muted"}`}
              >
                <div className="relative">
                  <item.icon size={20} />
                  {item.id === "student-announcements" && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-fin-red rounded-full text-[8px] font-bold text-white flex items-center justify-center">{unreadCount}</span>
                  )}
                </div>
                <span className="text-[9px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
