import { useState } from "react";
import { Users, Building2, Briefcase, FileText, BarChart2, CreditCard, Zap, Bell, Search, ChevronDown, LogOut, CheckCircle, Clock, AlertCircle, TrendingUp, Mail, Award, Activity, Lock, EyeOff, Eye, KeyRound, Settings, X, Shield, ChevronRight } from "lucide-react";
import { LogoFull } from "../../components/Logo";
import finLogoSrc from "../../imports/logo.jpeg";
import { adminStats, adminApplications, adminPayments, employers } from "../../data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface Props {
  onNavigate: (page: string) => void;
}

type AdminSection = "dashboard" | "applications" | "students" | "employers" | "payments" | "automation" | "analytics" | "letters" | "account";

// ── Change Password modal (admin only — no delete) ─────────────────
function AdminModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
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

function AdminChangePwModal({ onClose }: { onClose: () => void }) {
  const [shows, setShows] = useState([false, false, false]);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggle = (i: number) => setShows(s => s.map((v, idx) => idx === i ? !v : v));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1200); };
  return (
    <AdminModal title="Change Admin Password" onClose={onClose}>
      {done ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 bg-fin-green-light rounded-2xl flex items-center justify-center mx-auto mb-3"><KeyRound size={24} className="text-fin-green" /></div>
          <h3 className="font-bold text-fin-navy text-base mb-1">Password updated!</h3>
          <p className="text-fin-muted text-sm mb-5">Your admin password has been changed.</p>
          <button onClick={onClose} className="w-full bg-fin-navy hover:bg-fin-navy-light text-white font-bold py-3 rounded-xl text-sm transition-colors">Done</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {["Current password", "New password", "Confirm new password"].map((label, i) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-fin-text mb-1.5">{label}</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                <input type={shows[i] ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-11 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-navy focus:ring-2 focus:ring-fin-navy/10 transition-all" />
                <button type="button" onClick={() => toggle(i)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fin-muted hover:text-fin-text transition-colors">
                  {shows[i] ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-fin-border text-fin-navy font-semibold py-3 rounded-xl text-sm hover:bg-fin-ground transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-fin-navy hover:bg-fin-navy-light disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors">
              {loading ? "Updating…" : "Update Password"}
            </button>
          </div>
        </form>
      )}
    </AdminModal>
  );
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart2 },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "students", label: "Students", icon: Users },
  { id: "employers", label: "Employers", icon: Building2 },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "automation", label: "Automation", icon: Zap },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "letters", label: "Letters & Emails", icon: Mail },
  { id: "account", label: "My Account", icon: Settings }
];

const statusColors: Record<string, string> = {
  applied: "bg-fin-blue-light text-fin-blue",
  review: "bg-fin-gold-light text-fin-gold-dark",
  interview: "bg-purple-50 text-purple-600",
  offer: "bg-fin-green-light text-fin-green",
  paid: "bg-fin-green-light text-fin-green",
  pending: "bg-fin-gold-light text-fin-gold-dark",
  failed: "bg-fin-red-light text-fin-red",
  successful: "bg-fin-green-light text-fin-green",
  active: "bg-fin-green-light text-fin-green"
};

const appData = [
  { month: "Jun", apps: 112 }, { month: "Jul", apps: 198 }, { month: "Aug", apps: 287 }, { month: "Sep", apps: 412 }
];
const revenueData = [
  { month: "Jun", revenue: 5600 }, { month: "Jul", revenue: 9900 }, { month: "Aug", revenue: 14350 }, { month: "Sep", revenue: 20600 }
];

export default function Admin({ onNavigate }: Props) {
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [search, setSearch] = useState("");
  const [showChangePw, setShowChangePw] = useState(false);

  const stats = [
    { label: "Total Students", value: adminStats.totalStudents.toLocaleString(), icon: Users, color: "bg-fin-blue-light text-fin-blue", trend: "+12% this month" },
    { label: "Employers", value: adminStats.totalEmployers.toString(), icon: Building2, color: "bg-fin-gold-light text-fin-gold-dark", trend: "+5 this month" },
    { label: "Internships", value: adminStats.totalInternships.toString(), icon: Briefcase, color: "bg-purple-50 text-purple-600", trend: "+28 this month" },
    { label: "Applications", value: adminStats.totalApplications.toLocaleString(), icon: FileText, color: "bg-fin-green-light text-fin-green", trend: "+125 this week" }
  ];

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-fin-navy flex-shrink-0">
        <div className="px-4 py-4 border-b border-white/10 space-y-3">
          <LogoFull size="sm" onDark />
          <div className="inline-flex items-center gap-1.5 bg-red-500/20 border border-red-400/30 rounded-full px-2.5 py-1">
            <Activity size={10} className="text-red-300" />
            <span className="text-red-300 text-[10px] font-bold">Admin Portal</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id as AdminSection)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${section === item.id ? "bg-fin-blue text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={() => onNavigate("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-fin-ground">
        {/* Mobile nav */}
        <div className="md:hidden flex overflow-x-auto gap-2 px-4 py-3 bg-white border-b border-fin-border">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setSection(item.id as AdminSection)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${section === item.id ? "bg-fin-navy text-white" : "bg-fin-ground text-fin-muted"}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6 animate-fade-in">

          {/* Dashboard */}
          {section === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-fin-navy">Admin Dashboard</h2>
                <p className="text-fin-muted text-sm mt-1">Platform overview · September 9, 2026</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-fin-border shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                      <s.icon size={18} />
                    </div>
                    <div className="text-2xl font-bold text-fin-navy">{s.value}</div>
                    <div className="text-xs text-fin-muted font-medium mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-fin-green font-semibold mt-1">{s.trend}</div>
                  </div>
                ))}
              </div>

              {/* Revenue & apps charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-fin-border p-5">
                  <h3 className="font-bold text-fin-navy text-sm mb-1">Application Volume</h3>
                  <p className="text-fin-muted text-xs mb-4">Monthly applications submitted</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={appData} barSize={24}>
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={30} />
                      <Tooltip contentStyle={{ background: "#0D1B2A", border: "none", borderRadius: "10px", color: "white", fontSize: 12 }} />
                      <Bar dataKey="apps" fill="#2563EB" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-2xl border border-fin-border p-5">
                  <h3 className="font-bold text-fin-navy text-sm mb-1">Revenue (GHS)</h3>
                  <p className="text-fin-muted text-xs mb-4">Monthly application fee revenue</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={40} />
                      <Tooltip contentStyle={{ background: "#0D1B2A", border: "none", borderRadius: "10px", color: "white", fontSize: 12 }} />
                      <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: "#F59E0B", r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Placement rate */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-fin-navy rounded-2xl p-5 text-center">
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wide mb-2">Placement Rate</p>
                  <div className="text-5xl font-bold text-fin-gold">{adminStats.placementRate}%</div>
                  <p className="text-white/60 text-xs mt-2">Students successfully placed</p>
                </div>
                <div className="bg-white rounded-2xl border border-fin-border p-5 text-center">
                  <p className="text-fin-muted text-xs font-medium uppercase tracking-wide mb-2">Revenue This Month</p>
                  <div className="text-3xl font-bold text-fin-navy">GHS {adminStats.revenueThisMonth.toLocaleString()}</div>
                  <p className="text-fin-muted text-xs mt-2">{adminStats.paymentsThisMonth} payments processed</p>
                </div>
                <div className="bg-white rounded-2xl border border-fin-border p-5 text-center">
                  <p className="text-fin-muted text-xs font-medium uppercase tracking-wide mb-2">Active Programs</p>
                  <div className="text-3xl font-bold text-fin-navy">{adminStats.activePrograms}</div>
                  <p className="text-fin-muted text-xs mt-2">FIN Academy courses running</p>
                </div>
              </div>
            </div>
          )}

          {/* Applications table */}
          {section === "applications" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-fin-navy">Applications</h2>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fin-muted" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applications..." className="pl-8 pr-4 py-2 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue bg-white w-56" />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-fin-border bg-fin-ground">
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Reference</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Student</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden md:table-cell">Internship</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden lg:table-cell">Company</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden md:table-cell">Payment</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden lg:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminApplications.filter(a =>
                        !search || a.student.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())
                      ).map(app => (
                        <tr key={app.id} className="border-b border-fin-border last:border-0 hover:bg-fin-ground transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-fin-muted">{app.id}</td>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-fin-navy text-xs">{app.student}</p>
                            <p className="text-fin-muted text-[10px]">{app.university}</p>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-xs text-fin-text">{app.internship}</td>
                          <td className="px-4 py-3 hidden lg:table-cell text-xs text-fin-text">{app.company}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[app.status]}`}>{app.status}</span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[app.payment]}`}>{app.payment}</span>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell text-xs text-fin-muted">{app.submitted}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Students */}
          {section === "students" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-fin-navy">Students</h2>
                <span className="text-sm font-bold text-fin-navy bg-white border border-fin-border px-3 py-1.5 rounded-xl">{adminStats.totalStudents.toLocaleString()} total</span>
              </div>
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-fin-border bg-fin-ground">
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Student</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden md:table-cell">University</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden md:table-cell">Program</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminApplications.map((app, i) => (
                        <tr key={i} className="border-b border-fin-border last:border-0 hover:bg-fin-ground">
                          <td className="px-4 py-3 font-semibold text-fin-navy text-sm">{app.student}</td>
                          <td className="px-4 py-3 hidden md:table-cell text-xs text-fin-text">{app.university}</td>
                          <td className="px-4 py-3 hidden md:table-cell text-xs text-fin-text">BSc Computer Science</td>
                          <td className="px-4 py-3 text-xs font-bold text-fin-blue">2</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Employers */}
          {section === "employers" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-fin-navy">Employers</h2>
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-fin-border bg-fin-ground">
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Company</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden md:table-cell">Industry</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Internships</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden md:table-cell">Applications</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employers.map(emp => (
                        <tr key={emp.id} className="border-b border-fin-border last:border-0 hover:bg-fin-ground">
                          <td className="px-4 py-3">
                            <p className="font-semibold text-fin-navy">{emp.name}</p>
                            <p className="text-fin-muted text-xs">{emp.email}</p>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-xs text-fin-text">{emp.industry}</td>
                          <td className="px-4 py-3 text-xs font-bold text-fin-blue">{emp.posted}</td>
                          <td className="px-4 py-3 hidden md:table-cell text-xs text-fin-text">{emp.applications}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[emp.status]}`}>{emp.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payments */}
          {section === "payments" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-fin-navy">Payments</h2>
                <p className="text-fin-muted text-sm mt-1">GHS {adminStats.revenueThisMonth.toLocaleString()} revenue this month · {adminStats.paymentsThisMonth} transactions</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Successful", value: "411", color: "bg-fin-green-light text-fin-green" },
                  { label: "Pending", value: "1", color: "bg-fin-gold-light text-fin-gold-dark" },
                  { label: "Failed", value: "0", color: "bg-fin-red-light text-fin-red" }
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-fin-border p-4 text-center">
                    <div className={`text-2xl font-bold mb-1 ${s.color.split(" ")[1]}`}>{s.value}</div>
                    <div className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${s.color}`}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-fin-border bg-fin-ground">
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Reference</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Student</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden md:table-cell">Company</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Amount</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-fin-muted hidden md:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminPayments.map(p => (
                        <tr key={p.ref} className="border-b border-fin-border last:border-0 hover:bg-fin-ground">
                          <td className="px-4 py-3 font-mono text-xs text-fin-muted">{p.ref}</td>
                          <td className="px-4 py-3 font-semibold text-fin-navy text-sm">{p.student}</td>
                          <td className="px-4 py-3 hidden md:table-cell text-xs text-fin-text">{p.company}</td>
                          <td className="px-4 py-3 font-bold text-fin-navy text-sm">{p.amount}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-xs text-fin-muted">{p.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Automation */}
          {section === "automation" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-fin-navy">Automation Center</h2>
              <p className="text-fin-muted text-sm">Monitor and manage FIN's automated workflows.</p>

              {[
                {
                  title: "Application Automation",
                  color: "border-fin-blue/30 bg-fin-blue-light",
                  iconColor: "bg-fin-blue text-white",
                  steps: ["Application submitted", "Payment verified", "FIN Screening", "Employer notification", "Status tracking"],
                  stats: "1,923 applications processed · 100% automation rate"
                },
                {
                  title: "Letter Automation",
                  color: "border-fin-gold/30 bg-fin-gold-light",
                  iconColor: "bg-fin-gold text-white",
                  steps: ["Placement confirmed", "Letter generated", "Letter reviewed", "Letter sent to student"],
                  stats: "312 letters generated · Avg. 2 min generation time"
                },
                {
                  title: "Email Automation",
                  color: "border-fin-green/30 bg-fin-green-light",
                  iconColor: "bg-fin-green text-white",
                  steps: ["Application received", "Email generated", "Email sent to company", "Delivery confirmed"],
                  stats: "1,847 emails sent · 98.7% delivery rate"
                },
                {
                  title: "Notification Automation",
                  color: "border-purple-200 bg-purple-50",
                  iconColor: "bg-purple-600 text-white",
                  steps: ["Status changed", "Student notified", "Employer notified"],
                  stats: "5,234 notifications sent · Real-time delivery"
                }
              ].map((workflow, i) => (
                <div key={i} className={`bg-white rounded-2xl border ${workflow.color} p-5`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${workflow.iconColor} flex items-center justify-center`}>
                        <Zap size={16} />
                      </div>
                      <h3 className="font-bold text-fin-navy">{workflow.title}</h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-fin-green animate-pulse-dot" />
                      <span className="text-xs font-semibold text-fin-green">Active</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {workflow.steps.map((step, j) => (
                      <div key={j} className="flex items-center gap-1.5">
                        <span className="text-xs font-medium bg-white border border-fin-border text-fin-navy px-2.5 py-1 rounded-full">{step}</span>
                        {j < workflow.steps.length - 1 && <span className="text-fin-muted text-xs">→</span>}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-fin-muted">{workflow.stats}</p>
                </div>
              ))}
            </div>
          )}

          {/* Letters & Emails */}
          {section === "letters" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-fin-navy">Letters & Emails</h2>

              {/* Internship letter preview */}
              <div>
                <h3 className="font-bold text-fin-navy text-base mb-3">Generated Internship Letter Preview</h3>
                <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                  <div className="bg-fin-navy p-5 flex items-center justify-between">
                    <LogoFull size="sm" onDark />
                    <span className="text-white/60 text-xs">Internship Placement Letter</span>
                  </div>
                  <div className="p-8 font-serif" style={{ fontFamily: "Georgia, serif" }}>
                    <p className="text-fin-muted text-sm mb-6">September 9, 2026</p>
                    <h3 className="font-bold text-fin-navy text-lg mb-1">Letter of Internship Placement</h3>
                    <p className="text-xs text-fin-muted mb-6 font-sans">Reference: FIN-LETTER-2026-00847</p>
                    <p className="text-fin-text text-sm leading-relaxed mb-4">Dear <strong>Amara Johnson</strong>,</p>
                    <p className="text-fin-text text-sm leading-relaxed mb-4">
                      We are pleased to inform you that you have been successfully placed for an internship with <strong>MTN Ghana</strong> through the Fortune Intern Network (FIN) placement program.
                    </p>
                    <div className="bg-fin-ground rounded-xl p-4 mb-4 space-y-2">
                      {[
                        ["Student Name", "Amara Johnson"],
                        ["University", "University of Ghana"],
                        ["Program", "BSc Computer Science"],
                        ["Internship Position", "Software Development Intern"],
                        ["Company", "MTN Ghana"],
                        ["Internship Duration", "3 Months · Oct 1 – Dec 31, 2026"],
                        ["Application Reference", "FIN-APP-2026-00847"]
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span className="text-fin-muted">{label}:</span>
                          <span className="font-medium text-fin-navy">{value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-fin-text text-sm leading-relaxed mb-8">
                      This letter serves as official confirmation of your internship placement. Please present this letter to your university's internship coordinator. Congratulations and best of luck in your placement!
                    </p>
                    <div className="border-t border-fin-border pt-4">
                      <p className="text-fin-navy font-bold text-sm">FIN Placement Team</p>
                      <p className="text-fin-muted text-xs">Fortune Intern Network · placements@fortuneinternnetwork.com</p>
                    </div>
                  </div>
                  <div className="px-5 py-4 border-t border-fin-border flex gap-3">
                    <button className="flex items-center gap-2 border border-fin-border text-fin-navy font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-fin-ground transition-colors">
                      <Award size={14} /> Preview
                    </button>
                    <button className="flex items-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                      <FileText size={14} /> Generate & Send
                    </button>
                  </div>
                </div>
              </div>

              {/* Email automation log */}
              <div>
                <h3 className="font-bold text-fin-navy text-base mb-3">Company Email Activity</h3>
                <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                  {[
                    { student: "Amara Johnson", company: "MTN Ghana", status: "sent", time: "Sep 4, 2026 · 08:00 AM" },
                    { student: "Amara Johnson", company: "Ecobank Ghana", status: "sent", time: "Sep 7, 2026 · 09:01 AM" },
                    { student: "Kwame Asante", company: "Hubtel", status: "sent", time: "Sep 2, 2026 · 10:30 AM" },
                    { student: "Ama Owusu", company: "Vodafone Ghana", status: "sent", time: "Aug 31, 2026 · 11:00 AM" }
                  ].map((email, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-fin-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-fin-blue-light rounded-lg flex items-center justify-center">
                          <Mail size={14} className="text-fin-blue" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-fin-navy">{email.student} → {email.company}</p>
                          <p className="text-xs text-fin-muted">Application email sent</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-fin-green-light text-fin-green px-2 py-0.5 rounded-full">Sent ✓</span>
                        <span className="text-xs text-fin-subtle hidden md:block">{email.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics */}
          {section === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-fin-navy">Platform Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-fin-border p-5">
                  <h3 className="font-bold text-fin-navy text-sm mb-4">Monthly Applications</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={appData} barSize={28}>
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={30} />
                      <Tooltip contentStyle={{ background: "#0D1B2A", border: "none", borderRadius: "10px", color: "white", fontSize: 12 }} />
                      <Bar dataKey="apps" fill="#2563EB" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-2xl border border-fin-border p-5">
                  <h3 className="font-bold text-fin-navy text-sm mb-4">Revenue Growth (GHS)</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={45} />
                      <Tooltip contentStyle={{ background: "#0D1B2A", border: "none", borderRadius: "10px", color: "white", fontSize: 12 }} />
                      <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: "#F59E0B", r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Avg. Match Score", value: "84%" },
                  { label: "Avg. Application Time", value: "8 min" },
                  { label: "Email Delivery Rate", value: "98.7%" },
                  { label: "Student Satisfaction", value: "4.8/5" }
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-fin-border p-4 text-center">
                    <div className="text-2xl font-bold text-fin-navy">{s.value}</div>
                    <div className="text-xs text-fin-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Account */}
          {section === "account" && (
            <div className="space-y-5 max-w-xl">
              <div>
                <h2 className="text-2xl font-bold text-fin-navy">My Account</h2>
                <p className="text-fin-muted text-sm mt-1">Manage your administrator profile and security settings.</p>
              </div>

              {/* Admin profile card */}
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="bg-fin-navy px-5 py-5 flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-500/20 border border-red-400/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield size={24} className="text-red-300" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">FIN Administrator</p>
                    <p className="text-white/60 text-xs">admin@fortuneinternnetwork.com</p>
                    <div className="inline-flex items-center gap-1 bg-red-500/20 border border-red-400/30 rounded-full px-2 py-0.5 mt-1">
                      <Activity size={9} className="text-red-300" />
                      <span className="text-red-300 text-[10px] font-bold">Super Admin</span>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-fin-border">
                  {[
                    { label: "Full Name", value: "FIN Administrator" },
                    { label: "Email", value: "admin@fortuneinternnetwork.com" },
                    { label: "Role", value: "Super Administrator" },
                    { label: "Last Login", value: "September 9, 2026 · 09:14 AM" }
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between px-5 py-3.5">
                      <div>
                        <p className="text-[10px] text-fin-muted">{item.label}</p>
                        <p className="text-sm font-medium text-fin-navy">{item.value}</p>
                      </div>
                      <ChevronRight size={15} className="text-fin-muted" />
                    </div>
                  ))}
                </div>
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
                      <p className="text-xs text-fin-muted">Update your administrator password</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-fin-muted" />
                </button>
                <div className="flex items-center justify-between px-5 py-4 border-t border-fin-border">
                  <div className="flex items-center gap-3">
                    <Shield size={15} className="text-fin-muted" />
                    <div>
                      <p className="text-sm font-medium text-fin-navy">Two-Factor Authentication</p>
                      <p className="text-xs text-fin-muted">Extra layer of account security</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-fin-gold-light text-fin-gold-dark px-2 py-0.5 rounded-full">Recommended</span>
                </div>
              </div>

              {/* Note: no delete account for admin */}
              <div className="bg-fin-blue-light border border-fin-blue/20 rounded-xl px-4 py-3 flex items-center gap-3">
                <Shield size={15} className="text-fin-blue flex-shrink-0" />
                <p className="text-xs text-fin-blue leading-relaxed">Administrator accounts cannot be self-deleted. Contact your system owner to remove admin access.</p>
              </div>

              {/* Sign out */}
              <button onClick={() => onNavigate("landing")} className="w-full flex items-center justify-center gap-2 bg-white border border-fin-border text-fin-navy font-bold py-3.5 rounded-xl hover:bg-fin-ground transition-colors">
                <LogOut size={16} /> Sign Out of Admin Portal
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Modal */}
      {showChangePw && <AdminChangePwModal onClose={() => setShowChangePw(false)} />}
    </div>
  );
}
