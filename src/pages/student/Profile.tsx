import { useState } from "react";
import { User, Mail, GraduationCap, Briefcase, Award, LogOut, ChevronRight, Edit3, Camera, Bell, Lock, Shield, Eye, EyeOff, X, AlertTriangle, Trash2, KeyRound } from "lucide-react";
import { currentStudent } from "../../data";

// ── Shared overlay modal shell ────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
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

// ── Change Password modal ─────────────────────────────────────────
function ChangePwModal({ onClose }: { onClose: () => void }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  return (
    <Modal title="Change Password" onClose={onClose}>
      {done ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 bg-fin-green-light rounded-2xl flex items-center justify-center mx-auto mb-3">
            <KeyRound size={24} className="text-fin-green" />
          </div>
          <h3 className="font-bold text-fin-navy text-base mb-1">Password updated!</h3>
          <p className="text-fin-muted text-sm mb-5">Your password has been changed successfully.</p>
          <button onClick={onClose} className="w-full bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3 rounded-xl text-sm transition-colors">Done</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Current password", show: showCurrent, toggle: () => setShowCurrent(p => !p) },
            { label: "New password", show: showNew, toggle: () => setShowNew(p => !p) },
            { label: "Confirm new password", show: showConfirm, toggle: () => setShowConfirm(p => !p) }
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-semibold text-fin-text mb-1.5">{f.label}</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                <input type={f.show ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-11 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all" />
                <button type="button" onClick={f.toggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fin-muted hover:text-fin-text transition-colors">
                  {f.show ? <EyeOff size={15} /> : <Eye size={15} />}
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

// ── Delete Account modal ──────────────────────────────────────────
function DeleteAccountModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const ready = confirmText === "DELETE";

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => { onConfirm(); }, 1500);
  };

  return (
    <Modal title="Delete Account" onClose={onClose}>
      <div className="bg-fin-red-light border border-fin-red/20 rounded-xl p-4 flex gap-3 mb-5">
        <AlertTriangle size={18} className="text-fin-red flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-fin-red mb-1">This action is permanent and irreversible.</p>
          <p className="text-xs text-fin-red/80 leading-relaxed">Deleting your account will remove all your data, applications, certificates, and academy progress. You cannot undo this.</p>
        </div>
      </div>
      <p className="text-sm text-fin-text mb-2">Type <span className="font-bold font-mono bg-fin-ground px-1.5 py-0.5 rounded text-fin-red">DELETE</span> to confirm:</p>
      <input
        value={confirmText}
        onChange={e => setConfirmText(e.target.value)}
        placeholder="Type DELETE"
        className="w-full px-4 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-red focus:ring-2 focus:ring-fin-red/10 transition-all font-mono mb-4"
      />
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 border border-fin-border text-fin-navy font-semibold py-3 rounded-xl text-sm hover:bg-fin-ground transition-colors">Cancel</button>
        <button
          onClick={handleDelete}
          disabled={!ready || loading}
          className="flex-1 bg-fin-red hover:bg-red-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 size={14} />
          {loading ? "Deleting…" : "Delete Account"}
        </button>
      </div>
    </Modal>
  );
}

interface Props {
  onNavigate: (page: string) => void;
}

type ProfileTab = "profile" | "settings";

export default function Profile({ onNavigate }: Props) {
  const [tab, setTab] = useState<ProfileTab>("profile");
  const [showChangePw, setShowChangePw] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [notifications, setNotifications] = useState({
    applicationUpdates: true,
    newInternships: true,
    academyUpdates: false,
    deadlineReminders: true,
    emailNotifications: true
  });

  return (
    <div className="flex-1 overflow-y-auto bg-fin-ground pb-24 md:pb-6">
      <div className="p-4 md:p-6 space-y-5 animate-fade-in">
        {/* Header tabs */}
        <div className="flex gap-2">
          {(["profile", "settings"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${tab === t ? "bg-fin-navy text-white" : "bg-white border border-fin-border text-fin-muted hover:text-fin-navy"}`}
            >
              {t === "profile" ? "My Profile" : "Settings"}
            </button>
          ))}
        </div>

        {/* Profile view */}
        {tab === "profile" && (
          <div className="space-y-5">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
              {/* Cover */}
              <div className="h-24 bg-gradient-to-r from-fin-navy to-fin-navy-muted" />
              <div className="px-5 pb-5">
                <div className="relative -mt-10 mb-4 flex items-end justify-between">
                  <div className="relative">
                    <img src={currentStudent.avatar} alt={currentStudent.name} className="w-20 h-20 rounded-2xl border-4 border-white shadow-md object-cover bg-fin-ground" />
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-fin-blue rounded-full flex items-center justify-center border-2 border-white">
                      <Camera size={10} className="text-white" />
                    </button>
                  </div>
                  <button className="flex items-center gap-1.5 border border-fin-border text-fin-navy font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-fin-ground transition-colors">
                    <Edit3 size={12} /> Edit Profile
                  </button>
                </div>
                <h2 className="text-xl font-bold text-fin-navy">{currentStudent.name}</h2>
                <p className="text-fin-muted text-sm">{currentStudent.program} · {currentStudent.level}</p>
                <p className="text-fin-muted text-sm">{currentStudent.university}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-fin-muted">Profile Completion</span>
                    <span className="text-xs font-bold text-fin-blue">{currentStudent.profileCompletion}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-fin-ground rounded-full overflow-hidden">
                    <div className="h-1.5 bg-fin-blue rounded-full" style={{ width: `${currentStudent.profileCompletion}%` }} />
                  </div>
                </div>
                <p className="text-fin-text text-sm leading-relaxed mt-4">{currentStudent.bio}</p>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-fin-navy text-sm flex items-center gap-2"><GraduationCap size={16} className="text-fin-blue" /> Education</h3>
                <button className="text-xs text-fin-blue font-semibold"><Edit3 size={12} /></button>
              </div>
              {currentStudent.education.map((edu, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-fin-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={16} className="text-fin-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-fin-navy text-sm">{edu.degree}</p>
                    <p className="text-fin-muted text-xs">{edu.institution}</p>
                    <p className="text-fin-muted text-xs">{edu.year} · GPA: {edu.gpa}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-fin-navy text-sm">Skills</h3>
                <button className="text-xs text-fin-blue font-semibold">+ Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentStudent.skills.map(skill => (
                  <span key={skill} className="text-xs font-medium bg-fin-blue-mid text-fin-blue px-3 py-1.5 rounded-full">{skill}</span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-fin-navy text-sm flex items-center gap-2"><Briefcase size={16} className="text-fin-blue" /> Experience</h3>
                <button className="text-xs text-fin-blue font-semibold">+ Add</button>
              </div>
              {currentStudent.experience.map((exp, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-fin-gold-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase size={16} className="text-fin-gold-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-fin-navy text-sm">{exp.role}</p>
                    <p className="text-fin-muted text-xs">{exp.org} · {exp.period}</p>
                    <p className="text-fin-text text-xs leading-relaxed mt-1">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-fin-navy text-sm flex items-center gap-2"><Award size={16} className="text-fin-gold" /> Certificates</h3>
                <span className="text-xs font-bold text-fin-gold bg-fin-gold-light px-2 py-0.5 rounded-full">{currentStudent.certificates.length}</span>
              </div>
              {currentStudent.certificates.map(cert => (
                <div key={cert.id} className="flex items-center gap-3 py-2 border-b border-fin-border last:border-0">
                  <div className="w-8 h-8 bg-fin-gold-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award size={14} className="text-fin-gold-dark" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-fin-navy text-xs">{cert.course}</p>
                    <p className="text-fin-muted text-[10px]">{cert.completedAt}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Career Interests */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <h3 className="font-bold text-fin-navy text-sm mb-4">Career Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentStudent.careerInterests.map(interest => (
                  <span key={interest} className="text-xs font-medium bg-fin-gold-light text-fin-gold-dark px-3 py-1.5 rounded-full">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings view */}
        {tab === "settings" && (
          <div className="space-y-5">
            {/* Account */}
            <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
              <div className="px-5 py-4 border-b border-fin-border">
                <h3 className="font-bold text-fin-navy text-sm">Account Information</h3>
              </div>
              {[
                { label: "Full Name", value: currentStudent.name },
                { label: "Email", value: currentStudent.email },
                { label: "University", value: currentStudent.university },
                { label: "Program", value: currentStudent.program }
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between px-5 py-3.5 border-b border-fin-border last:border-0">
                  <div>
                    <p className="text-xs text-fin-muted">{item.label}</p>
                    <p className="text-sm font-medium text-fin-navy">{item.value}</p>
                  </div>
                  <ChevronRight size={16} className="text-fin-muted" />
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
              <div className="px-5 py-4 border-b border-fin-border">
                <h3 className="font-bold text-fin-navy text-sm flex items-center gap-2"><Bell size={14} /> Notifications</h3>
              </div>
              {[
                { key: "applicationUpdates" as const, label: "Application status updates", sub: "Get notified when your application status changes" },
                { key: "newInternships" as const, label: "New matching internships", sub: "Internships that match your skills and interests" },
                { key: "academyUpdates" as const, label: "FIN Academy updates", sub: "New courses, modules, and certificates" },
                { key: "deadlineReminders" as const, label: "Deadline reminders", sub: "Reminders before application deadlines close" },
                { key: "emailNotifications" as const, label: "Email notifications", sub: "Receive important updates via email" }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between px-5 py-4 border-b border-fin-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-fin-navy">{item.label}</p>
                    <p className="text-xs text-fin-muted">{item.sub}</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifications[item.key] ? "bg-fin-blue" : "bg-fin-border"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[item.key] ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
              <div className="px-5 py-4 border-b border-fin-border">
                <h3 className="font-bold text-fin-navy text-sm flex items-center gap-2"><Shield size={14} /> Security & Privacy</h3>
              </div>
              <button onClick={() => setShowChangePw(true)} className="w-full flex items-center justify-between px-5 py-4 border-b border-fin-border hover:bg-fin-ground transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Lock size={15} className="text-fin-muted" />
                  <span className="text-sm font-medium text-fin-navy">Change Password</span>
                </div>
                <ChevronRight size={16} className="text-fin-muted" />
              </button>
              <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-fin-ground transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Eye size={15} className="text-fin-muted" />
                  <span className="text-sm font-medium text-fin-navy">Privacy Settings</span>
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
                  <p className="text-sm font-semibold text-fin-navy">Delete my account</p>
                  <p className="text-xs text-fin-muted mt-0.5">Permanently remove your account and all data. This cannot be undone.</p>
                </div>
                <button onClick={() => setShowDeleteAccount(true)} className="flex items-center gap-1.5 bg-fin-red-light hover:bg-red-100 text-fin-red font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex-shrink-0 ml-4 border border-fin-red/20">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showChangePw && <ChangePwModal onClose={() => setShowChangePw(false)} />}
      {showDeleteAccount && (
        <DeleteAccountModal
          onClose={() => setShowDeleteAccount(false)}
          onConfirm={() => onNavigate("landing")}
        />
      )}
    </div>
  );
}
