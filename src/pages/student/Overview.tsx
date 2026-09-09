import { ArrowRight, BookOpen, Bookmark, Briefcase, CheckCircle, ChevronRight, Clock, MapPin, TrendingUp, Sparkles } from "lucide-react";
import { currentStudent, internships, applications, courses } from "../../data";

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const statusStages = ["Applied", "In Review", "Interview", "Offer"];

function ProfileCompletion() {
  const pct = currentStudent.profileCompletion;
  return (
    <div className="bg-white rounded-2xl p-5 border border-fin-border shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-fin-navy text-sm">Profile Completion</h3>
        <span className="text-fin-blue font-bold text-sm">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-fin-ground rounded-full overflow-hidden mb-3">
        <div className="h-2 bg-fin-blue rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-fin-muted text-xs mb-4">Add your experience, projects, and CV to strengthen your profile.</p>
      <button className="w-full text-center text-xs font-semibold text-fin-blue hover:text-fin-blue-dark transition-colors">
        Complete Profile →
      </button>
    </div>
  );
}

function AppStatusCard() {
  const app = applications[0];
  const stageIndex = statusStages.findIndex(s => s.toLowerCase().replace(" ", "-") === app?.status) ?? 2;
  const mappedIndex = app?.status === "interview" ? 2 : app?.status === "review" ? 1 : app?.status === "offer" ? 3 : 0;

  return (
    <div className="bg-white rounded-2xl p-5 border border-fin-border shadow-sm">
      <h3 className="font-semibold text-fin-navy text-sm mb-4">Active Application</h3>
      {applications.length > 0 ? (
        <>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fin-ground overflow-hidden">
              <img src={applications[0].companyLogo} alt={applications[0].company} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-fin-navy">{applications[0].internship}</p>
              <p className="text-xs text-fin-muted">{applications[0].company}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {statusStages.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full mb-1.5 ${i <= mappedIndex ? "bg-fin-blue" : "bg-fin-ground"}`} />
                <p className={`text-[9px] font-semibold ${i <= mappedIndex ? "text-fin-blue" : "text-fin-subtle"}`}>{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-fin-gold animate-pulse-dot" />
            <span className="text-xs font-medium text-fin-gold">Interview Stage</span>
          </div>
        </>
      ) : (
        <p className="text-fin-muted text-sm">No active applications. Start applying!</p>
      )}
    </div>
  );
}

function AcademyProgress() {
  const completed = courses.filter(c => c.status === "completed").length;
  const total = courses.length;
  return (
    <div className="bg-white rounded-2xl p-5 border border-fin-border shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-fin-navy text-sm">FIN Academy</h3>
        <BookOpen size={16} className="text-fin-blue" />
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-3xl font-bold text-fin-navy">{completed}</span>
        <span className="text-fin-muted text-sm">/ {total} courses done</span>
      </div>
      <div className="w-full h-1.5 bg-fin-ground rounded-full overflow-hidden mb-3">
        <div className="h-1.5 bg-fin-gold rounded-full" style={{ width: `${(completed / total) * 100}%` }} />
      </div>
      <p className="text-xs text-fin-muted">Continue: <span className="font-medium text-fin-navy">CV Writing & Personal Branding</span></p>
    </div>
  );
}

function StatsRow() {
  const stats = [
    { label: "Applications", value: applications.length.toString(), icon: Briefcase, color: "bg-fin-blue-light text-fin-blue" },
    { label: "Courses Done", value: "2", icon: BookOpen, color: "bg-fin-gold-light text-fin-gold-dark" },
    { label: "Certificates", value: currentStudent.certificates.length.toString(), icon: CheckCircle, color: "bg-fin-green-light text-fin-green" },
    { label: "Skills", value: currentStudent.skills.length.toString(), icon: TrendingUp, color: "bg-purple-50 text-purple-600" }
  ];
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-xl p-3.5 border border-fin-border shadow-sm text-center">
          <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mx-auto mb-2`}>
            <s.icon size={14} />
          </div>
          <div className="text-xl font-bold text-fin-navy">{s.value}</div>
          <div className="text-[10px] text-fin-muted font-medium">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Overview({ onNavigate }: Props) {
  const recommended = internships.slice(0, 3);

  return (
    <div className="p-4 md:p-6 space-y-6 pb-24 md:pb-6 animate-fade-in overflow-y-auto flex-1">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-fin-navy">Good morning, {currentStudent.firstName} 👋</h1>
        <p className="text-fin-muted text-sm mt-1">{"Here's your career progress at a glance."}</p>
      </div>

      {/* Stats row */}
      <StatsRow />

      {/* Cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProfileCompletion />
        <AppStatusCard />
        <AcademyProgress />
      </div>

      {/* Recommended internships */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-fin-navy text-base">Recommended Internships</h2>
          <button
            onClick={() => onNavigate("student-marketplace")}
            className="flex items-center gap-1 text-fin-blue text-sm font-semibold hover:underline"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map(int => (
            <div key={int.id} className="bg-white rounded-2xl p-5 border border-fin-border shadow-sm hover:shadow-md hover:border-fin-blue/30 transition-all cursor-pointer group" onClick={() => onNavigate("student-internship-detail", { id: int.id })}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-fin-ground overflow-hidden border border-fin-border">
                  <img src={int.companyLogo} alt={int.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-fin-green-light text-fin-green text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {int.matchScore}% Match
                  </div>
                  <button onClick={e => { e.stopPropagation(); }} className="w-7 h-7 rounded-full hover:bg-fin-ground flex items-center justify-center transition-colors">
                    <Bookmark size={14} className={int.saved ? "text-fin-blue fill-fin-blue" : "text-fin-muted"} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-fin-navy text-sm mb-0.5">{int.title}</h3>
              <p className="text-fin-muted text-xs mb-3">{int.company}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="flex items-center gap-1 text-[10px] text-fin-muted">
                  <MapPin size={10} /> {int.location}
                </span>
                <span className="text-fin-muted text-[10px]">·</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${int.arrangement === "Remote" ? "bg-fin-gold-light text-fin-gold-dark" : int.arrangement === "Hybrid" ? "bg-purple-50 text-purple-600" : "bg-fin-blue-light text-fin-blue"}`}>
                  {int.arrangement}
                </span>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-fin-green-light text-fin-green">{int.type}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-fin-border">
                <div className="flex items-center gap-1 text-[10px] text-fin-muted">
                  <Clock size={10} /> Deadline: {int.deadline}
                </div>
                <span className="text-fin-blue text-xs font-semibold group-hover:underline">View →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "My Applications", sub: "Track all applications", icon: Briefcase, color: "bg-fin-blue-light text-fin-blue", page: "student-tracking" },
          { label: "Saved Internships", sub: "3 internships saved", icon: Bookmark, color: "bg-fin-gold-light text-fin-gold-dark", page: "student-saved" },
          { label: "My Progress", sub: "Analytics & insights", icon: TrendingUp, color: "bg-purple-50 text-purple-600", page: "student-analytics" },
          { label: "Super AI", sub: "Career assistant", icon: Sparkles, color: "bg-fin-green-light text-fin-green", page: "" }
        ].map(a => (
          <button
            key={a.label}
            onClick={() => a.page && onNavigate(a.page)}
            className="bg-white rounded-xl p-4 border border-fin-border shadow-sm hover:shadow-md hover:border-fin-blue/25 transition-all text-left group"
          >
            <div className={`w-9 h-9 rounded-lg ${a.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <a.icon size={16} />
            </div>
            <p className="font-bold text-fin-navy text-xs leading-snug">{a.label}</p>
            <p className="text-fin-muted text-[10px] mt-0.5">{a.sub}</p>
          </button>
        ))}
      </div>

      {/* Continue academy */}
      <div className="bg-gradient-to-r from-fin-navy to-fin-navy-muted rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white/70 text-xs font-medium uppercase tracking-wide mb-1">FIN Academy</p>
          <h3 className="text-white font-bold text-base mb-1">Continue: CV Writing & Personal Branding</h3>
          <p className="text-white/60 text-xs">Module 4 of 4 · 50 min remaining</p>
        </div>
        <button
          onClick={() => onNavigate("student-academy")}
          className="flex items-center gap-2 bg-fin-gold hover:bg-fin-gold-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex-shrink-0 ml-4"
        >
          Continue <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
