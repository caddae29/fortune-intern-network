import { useState } from "react";
import { Briefcase, Users, Plus, Eye, EyeOff, CheckCircle, Clock, X, ArrowLeft, ChevronRight, MapPin, Building2, BarChart2, FileText, LogOut, Edit, Lock, KeyRound, AlertTriangle, Trash2, Settings, Mail, Phone, Globe } from "lucide-react";
import { LogoFull } from "../../components/Logo";

interface Props {
  onNavigate: (page: string) => void;
}

type EmpPage = "dashboard" | "post" | "manage" | "applicants" | "applicant-detail" | "account";

// ── Shared modal shell ────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full md:max-w-md rounded-t-3xl md:rounded-2xl shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-fin-border">
          <h2 className="font-bold text-fin-navy text-base">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-fin-ground hover:bg-fin-border flex items-center justify-center transition-colors">
            <X size={16} className="text-fin-muted" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function ChangePwModal({ onClose }: { onClose: () => void }) {
  const [shows, setShows] = useState([false, false, false]);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggle = (i: number) => setShows(s => s.map((v, idx) => idx === i ? !v : v));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1200); };

  return (
    <Modal title="Change Password" onClose={onClose}>
      {done ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 bg-fin-green-light rounded-2xl flex items-center justify-center mx-auto mb-3"><KeyRound size={24} className="text-fin-green" /></div>
          <h3 className="font-bold text-fin-navy text-base mb-1">Password updated!</h3>
          <p className="text-fin-muted text-sm mb-5">Your password has been changed successfully.</p>
          <button onClick={onClose} className="w-full bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3 rounded-xl text-sm transition-colors">Done</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {["Current password", "New password", "Confirm new password"].map((label, i) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-fin-text mb-1.5">{label}</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                <input type={shows[i] ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-11 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all" />
                <button type="button" onClick={() => toggle(i)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fin-muted hover:text-fin-text transition-colors">
                  {shows[i] ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-fin-border text-fin-navy font-semibold py-3 rounded-xl text-sm hover:bg-fin-ground transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-fin-blue hover:bg-fin-blue-dark disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors">
              {loading ? "Updating…" : "Update Password"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

function DeleteAccountModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const ready = confirmText === "DELETE";
  return (
    <Modal title="Delete Employer Account" onClose={onClose}>
      <div className="bg-fin-red-light border border-fin-red/20 rounded-xl p-4 flex gap-3 mb-5">
        <AlertTriangle size={18} className="text-fin-red flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-fin-red mb-1">This action is permanent and irreversible.</p>
          <p className="text-xs text-fin-red/80 leading-relaxed">Deleting your employer account will remove your company profile, all posted internships, and applicant data.</p>
        </div>
      </div>
      <p className="text-sm text-fin-text mb-2">Type <span className="font-bold font-mono bg-fin-ground px-1.5 py-0.5 rounded text-fin-red">DELETE</span> to confirm:</p>
      <input value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder="Type DELETE" className="w-full px-4 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-red focus:ring-2 focus:ring-fin-red/10 transition-all font-mono mb-4" />
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 border border-fin-border text-fin-navy font-semibold py-3 rounded-xl text-sm hover:bg-fin-ground transition-colors">Cancel</button>
        <button onClick={() => { setLoading(true); setTimeout(onConfirm, 1500); }} disabled={!ready || loading} className="flex-1 bg-fin-red hover:bg-red-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
          <Trash2 size={14} />{loading ? "Deleting…" : "Delete Account"}
        </button>
      </div>
    </Modal>
  );
}

const empInternships = [
  { id: "ei-001", title: "Software Development Intern", department: "Engineering", location: "Accra · Hybrid", arrangement: "Hybrid", type: "Paid", stipend: "GHS 1,200/mo", deadline: "Sep 30, 2026", applications: 47, status: "active" },
  { id: "ei-002", title: "Data Analytics Intern", department: "Business Intelligence", location: "Accra · On-site", arrangement: "On-site", type: "Paid", stipend: "GHS 900/mo", deadline: "Oct 10, 2026", applications: 23, status: "active" },
  { id: "ei-003", title: "UI/UX Design Intern", department: "Product", location: "Accra · Remote", arrangement: "Remote", type: "Paid", stipend: "GHS 1,000/mo", deadline: "Sep 15, 2026", applications: 31, status: "closed" }
];

const applicants = [
  { id: "ap-001", name: "Amara Johnson", university: "University of Ghana", program: "BSc Computer Science", level: "Level 300", internship: "Software Development Intern", status: "interview", appliedAt: "Sep 3, 2026", skills: ["JavaScript", "React", "Python", "SQL"], matchScore: 92, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&auto=format" },
  { id: "ap-002", name: "Kwame Asante", university: "KNUST", program: "BSc Computer Engineering", level: "Level 400", internship: "Software Development Intern", status: "review", appliedAt: "Sep 4, 2026", skills: ["Java", "React", "Node.js", "Docker"], matchScore: 88, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format" },
  { id: "ap-003", name: "Ama Owusu", university: "Ashesi University", program: "BSc CS & Information Systems", level: "Level 300", internship: "Software Development Intern", status: "applied", appliedAt: "Sep 5, 2026", skills: ["Python", "Flask", "PostgreSQL", "JavaScript"], matchScore: 85, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&auto=format" },
  { id: "ap-004", name: "Kofi Mensah", university: "University of Cape Coast", program: "BSc Computer Science", level: "Level 300", internship: "Software Development Intern", status: "offer", appliedAt: "Sep 2, 2026", skills: ["React", "TypeScript", "Node.js", "MongoDB"], matchScore: 95, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format" }
];

const statusConfig: Record<string, { label: string; color: string }> = {
  applied: { label: "Applied", color: "bg-fin-blue-light text-fin-blue" },
  review: { label: "Under Review", color: "bg-fin-gold-light text-fin-gold-dark" },
  interview: { label: "Interview", color: "bg-purple-50 text-purple-600" },
  offer: { label: "Offer Sent", color: "bg-fin-green-light text-fin-green" },
  rejected: { label: "Rejected", color: "bg-fin-red-light text-fin-red" }
};

export default function Employer({ onNavigate }: Props) {
  const [page, setPage] = useState<EmpPage>("dashboard");
  const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]);
  const [showChangePw, setShowChangePw] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const dashboardStats = [
    { label: "Internships Posted", value: "3", icon: Briefcase, color: "bg-fin-blue-light text-fin-blue" },
    { label: "Total Applications", value: "101", icon: Users, color: "bg-fin-gold-light text-fin-gold-dark" },
    { label: "Under Review", value: "23", icon: Clock, color: "bg-purple-50 text-purple-600" },
    { label: "Offers Sent", value: "5", icon: CheckCircle, color: "bg-fin-green-light text-fin-green" }
  ];

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-fin-navy flex-shrink-0 flex flex-col hidden md:flex">
        <div className="px-4 py-4 border-b border-white/10 space-y-3">
          <LogoFull size="sm" onDark />
          <div className="inline-flex items-center gap-1.5 bg-fin-gold/20 border border-fin-gold/30 rounded-full px-2.5 py-1">
            <Building2 size={10} className="text-fin-gold" />
            <span className="text-fin-gold text-[10px] font-bold">Employer Portal</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart2 },
            { id: "post", label: "Post Internship", icon: Plus },
            { id: "manage", label: "My Internships", icon: Briefcase },
            { id: "applicants", label: "Applicants", icon: Users },
            { id: "account", label: "Account", icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id as EmpPage)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${page === item.id ? "bg-fin-blue text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              <item.icon size={17} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-2">
          <button onClick={() => onNavigate("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-fin-ground">
        {/* Mobile top bar */}
        <div className="md:hidden bg-white border-b border-fin-border px-4 py-3 flex items-center justify-between">
          <LogoFull size="sm" onDark={false} />
          <button onClick={() => onNavigate("landing")} className="text-fin-muted text-xs font-medium">Exit</button>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex overflow-x-auto gap-2 px-4 py-3 bg-white border-b border-fin-border">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "post", label: "Post" },
            { id: "manage", label: "Internships" },
            { id: "applicants", label: "Applicants" }
          ].map(item => (
            <button key={item.id} onClick={() => setPage(item.id as EmpPage)} className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${page === item.id ? "bg-fin-navy text-white" : "bg-fin-ground text-fin-muted"}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6 animate-fade-in">

          {/* Dashboard */}
          {page === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-fin-navy">Employer Dashboard</h2>
                <p className="text-fin-muted text-sm mt-1">Welcome back, MTN Ghana · Manage your internships and applicants.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dashboardStats.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-fin-border shadow-sm text-center">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
                      <s.icon size={18} />
                    </div>
                    <div className="text-3xl font-bold text-fin-navy">{s.value}</div>
                    <div className="text-xs text-fin-muted font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Recent applicants */}
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-fin-border">
                  <h3 className="font-bold text-fin-navy text-sm">Recent Applicants</h3>
                  <button onClick={() => setPage("applicants")} className="text-fin-blue text-xs font-semibold hover:underline">View all</button>
                </div>
                {applicants.slice(0, 3).map(ap => (
                  <div key={ap.id} className="flex items-center gap-3 px-5 py-3.5 border-b border-fin-border last:border-0 hover:bg-fin-ground transition-colors cursor-pointer" onClick={() => { setSelectedApplicant(ap); setPage("applicant-detail"); }}>
                    <img src={ap.avatar} alt={ap.name} className="w-9 h-9 rounded-full object-cover bg-fin-border" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-fin-navy text-sm">{ap.name}</p>
                      <p className="text-xs text-fin-muted">{ap.university} · {ap.program}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig[ap.status].color}`}>{statusConfig[ap.status].label}</span>
                    <ChevronRight size={14} className="text-fin-muted" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Post Internship */}
          {page === "post" && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-fin-navy">Post New Internship</h2>
              <div className="bg-white rounded-2xl border border-fin-border p-6 space-y-5">
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">Internship Title *</label>
                  <input type="text" placeholder="e.g. Software Development Intern" className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-fin-muted block mb-1.5">Department</label>
                    <input type="text" placeholder="e.g. Engineering" className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-fin-muted block mb-1.5">Location</label>
                    <input type="text" placeholder="e.g. Accra, Ghana" className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-fin-muted block mb-1.5">Work Arrangement</label>
                    <select className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue bg-white">
                      <option>On-site</option><option>Hybrid</option><option>Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-fin-muted block mb-1.5">Type</label>
                    <select className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue bg-white">
                      <option>Paid</option><option>Unpaid</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">Monthly Stipend (GHS)</label>
                  <input type="text" placeholder="e.g. 1,200" className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">Application Deadline</label>
                  <input type="date" className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">Description *</label>
                  <textarea rows={4} placeholder="Describe the internship role, work environment, and what the intern will do..." className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 resize-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">Required Skills (comma-separated)</label>
                  <input type="text" placeholder="e.g. JavaScript, React, Python" className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl transition-colors">
                  <Plus size={16} /> Post Internship
                </button>
              </div>
            </div>
          )}

          {/* Manage Internships */}
          {page === "manage" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-fin-navy">My Internships</h2>
                <button onClick={() => setPage("post")} className="flex items-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">
                  <Plus size={14} /> Post New
                </button>
              </div>
              <div className="space-y-4">
                {empInternships.map(int => (
                  <div key={int.id} className="bg-white rounded-2xl border border-fin-border p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-fin-navy">{int.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${int.status === "active" ? "bg-fin-green-light text-fin-green" : "bg-fin-ground text-fin-muted"}`}>
                            {int.status === "active" ? "Active" : "Closed"}
                          </span>
                        </div>
                        <p className="text-fin-muted text-xs">{int.department} · {int.location}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-fin-muted">{int.arrangement}</span>
                          <span className="text-xs text-fin-muted">·</span>
                          <span className="text-xs text-fin-muted">{int.stipend}</span>
                          <span className="text-xs text-fin-muted">·</span>
                          <span className="text-xs text-fin-muted">Deadline: {int.deadline}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 border border-fin-border rounded-lg flex items-center justify-center hover:bg-fin-ground transition-colors">
                          <Edit size={14} className="text-fin-muted" />
                        </button>
                        <button onClick={() => setPage("applicants")} className="flex items-center gap-1.5 bg-fin-blue-light text-fin-blue font-bold px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-fin-blue hover:text-white">
                          <Users size={12} /> {int.applications} Applicants
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applicants list */}
          {page === "applicants" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-fin-navy">Applicants</h2>
                <div className="flex gap-2">
                  <select className="text-sm border border-fin-border rounded-xl px-3 py-2 bg-white focus:outline-none text-fin-muted">
                    <option>All Internships</option>
                    {empInternships.map(i => <option key={i.id}>{i.title}</option>)}
                  </select>
                  <select className="text-sm border border-fin-border rounded-xl px-3 py-2 bg-white focus:outline-none text-fin-muted">
                    <option>All Status</option>
                    <option>Applied</option><option>Review</option><option>Interview</option><option>Offer</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                {applicants.map(ap => (
                  <div key={ap.id} onClick={() => { setSelectedApplicant(ap); setPage("applicant-detail"); }} className="bg-white rounded-2xl border border-fin-border p-5 cursor-pointer hover:shadow-md hover:border-fin-blue/30 transition-all">
                    <div className="flex items-start gap-4">
                      <img src={ap.avatar} alt={ap.name} className="w-12 h-12 rounded-xl object-cover bg-fin-border flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-fin-navy">{ap.name}</h3>
                            <p className="text-fin-muted text-xs">{ap.university} · {ap.program} · {ap.level}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-fin-green bg-fin-green-light px-2 py-0.5 rounded-full">{ap.matchScore}% Match</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig[ap.status].color}`}>{statusConfig[ap.status].label}</span>
                          </div>
                        </div>
                        <p className="text-xs text-fin-muted mt-1">Applying for: <span className="font-medium text-fin-navy">{ap.internship}</span></p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {ap.skills.slice(0, 4).map(s => (
                            <span key={s} className="text-[10px] font-medium bg-fin-blue-mid text-fin-blue px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applicant detail */}
          {page === "applicant-detail" && selectedApplicant && (
            <div className="space-y-5 max-w-2xl">
              <button onClick={() => setPage("applicants")} className="flex items-center gap-2 text-fin-muted hover:text-fin-text text-sm font-medium transition-colors">
                <ArrowLeft size={16} /> Back to Applicants
              </button>
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="bg-fin-navy p-6 flex items-center gap-4">
                  <img src={selectedApplicant.avatar} alt={selectedApplicant.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20" />
                  <div>
                    <h2 className="text-white font-bold text-xl">{selectedApplicant.name}</h2>
                    <p className="text-white/70 text-sm">{selectedApplicant.program} · {selectedApplicant.level}</p>
                    <p className="text-white/60 text-sm">{selectedApplicant.university}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-lg font-bold text-fin-green bg-fin-green-light px-3 py-1.5 rounded-xl">{selectedApplicant.matchScore}% Match</span>
                  </div>
                </div>
                <div className="p-5 space-y-5">
                  <div>
                    <p className="text-xs text-fin-muted mb-1">Applying for</p>
                    <p className="font-bold text-fin-navy">{selectedApplicant.internship}</p>
                    <p className="text-xs text-fin-muted">Applied {selectedApplicant.appliedAt}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-fin-navy text-sm mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.skills.map(s => (
                        <span key={s} className="text-xs font-medium bg-fin-blue-mid text-fin-blue px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-fin-navy text-sm mb-3">Update Application Status</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["review", "interview", "offer", "rejected"].map(status => (
                        <button
                          key={status}
                          className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all capitalize ${selectedApplicant.status === status ? "border-fin-blue bg-fin-blue text-white" : "border-fin-border text-fin-muted hover:border-fin-blue/50"}`}
                        >
                          {statusConfig[status]?.label || status}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-fin-border text-fin-navy font-semibold py-3 rounded-xl hover:bg-fin-ground transition-colors text-sm">
                      <FileText size={14} /> View CV
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3 rounded-xl transition-colors text-sm">
                      <Eye size={14} /> View Application
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Account */}
          {page === "account" && (
            <div className="space-y-5 max-w-xl">
              <div>
                <h2 className="text-2xl font-bold text-fin-navy">Account Settings</h2>
                <p className="text-fin-muted text-sm mt-1">Manage your employer account, password, and preferences.</p>
              </div>

              {/* Company info */}
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="px-5 py-4 border-b border-fin-border">
                  <h3 className="font-bold text-fin-navy text-sm flex items-center gap-2"><Building2 size={14} /> Company Information</h3>
                </div>
                {[
                  { Icon: Building2, label: "Company Name", value: "MTN Ghana" },
                  { Icon: Mail, label: "Company Email", value: "hr@mtn.com.gh" },
                  { Icon: Phone, label: "Phone", value: "+233 30 202 5000" },
                  { Icon: Globe, label: "Website", value: "www.mtn.com.gh" }
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between px-5 py-3.5 border-b border-fin-border last:border-0 hover:bg-fin-ground transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <item.Icon size={15} className="text-fin-muted" />
                      <div>
                        <p className="text-[10px] text-fin-muted">{item.label}</p>
                        <p className="text-sm font-medium text-fin-navy">{item.value}</p>
                      </div>
                    </div>
                    <Edit size={14} className="text-fin-muted" />
                  </div>
                ))}
              </div>

              {/* Security */}
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="px-5 py-4 border-b border-fin-border">
                  <h3 className="font-bold text-fin-navy text-sm flex items-center gap-2"><Lock size={14} /> Security</h3>
                </div>
                <button onClick={() => setShowChangePw(true)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-fin-ground transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <KeyRound size={15} className="text-fin-muted" />
                    <div>
                      <p className="text-sm font-medium text-fin-navy">Change Password</p>
                      <p className="text-xs text-fin-muted">Update your account password</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-fin-muted" />
                </button>
              </div>

              {/* Sign out */}
              <button onClick={() => onNavigate("landing")} className="w-full flex items-center justify-center gap-2 bg-white border border-fin-border text-fin-navy font-bold py-3.5 rounded-xl hover:bg-fin-ground transition-colors">
                <LogOut size={16} /> Sign Out
              </button>

              {/* Danger zone */}
              <div className="bg-white rounded-2xl border border-fin-red/30 overflow-hidden">
                <div className="px-5 py-4 border-b border-fin-red/20 bg-fin-red-light/50">
                  <h3 className="font-bold text-fin-red text-sm flex items-center gap-2"><AlertTriangle size={14} /> Danger Zone</h3>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-fin-navy">Delete employer account</p>
                    <p className="text-xs text-fin-muted mt-0.5">Removes your company profile, internships, and all associated data permanently.</p>
                  </div>
                  <button onClick={() => setShowDeleteAccount(true)} className="flex items-center gap-1.5 bg-fin-red-light hover:bg-red-100 text-fin-red font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex-shrink-0 ml-4 border border-fin-red/20">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modals */}
      {showChangePw && <ChangePwModal onClose={() => setShowChangePw(false)} />}
      {showDeleteAccount && <DeleteAccountModal onClose={() => setShowDeleteAccount(false)} onConfirm={() => onNavigate("landing")} />}
    </div>
  );
}
