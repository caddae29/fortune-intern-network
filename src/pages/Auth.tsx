import { useState, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, User,
  Building2, Shield, CheckCircle, GraduationCap, Briefcase,
  BookOpen, Sparkles, Phone, Globe, ChevronRight, RefreshCw
} from "lucide-react";
import { LogoFull } from "../components/fin-logo";
import Logo from "./assets/finLogo.jpg"
interface Props {
  mode: "login" | "signup";
  onNavigate: (page: string) => void;
}

type AuthView =
  | "welcome"
  | "role-select"
  | "student-signup"
  | "employer-signup"
  | "login"
  | "admin-login"
  | "forgot"
  | "forgot-sent"
  | "reset"
  | "reset-success"
  | "verify"
  | "success-student"
  | "success-employer";

// ─── Small helpers ───────────────────────────────────────────────

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "Contains a number", ok: /\d/.test(password) },
    { label: "Contains an uppercase letter", ok: /[A-Z]/.test(password) }
  ];
  const score = checks.filter(c => c.ok).length;
  const bar = ["bg-fin-red", "bg-fin-gold", "bg-fin-green"];
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i < score ? bar[score - 1] : "bg-fin-border"}`} />
        ))}
      </div>
      <div className="space-y-1">
        {checks.map(c => (
          <p key={c.label} className={`text-[10px] flex items-center gap-1.5 ${c.ok ? "text-fin-green" : "text-fin-muted"}`}>
            <CheckCircle size={10} className={c.ok ? "text-fin-green" : "text-fin-border"} />
            {c.label}
          </p>
        ))}
      </div>
    </div>
  );
}

function InputField({
  label, type = "text", placeholder, icon: Icon, rightSlot, hint
}: {
  label: string; type?: string; placeholder: string;
  icon?: React.ComponentType<{ size: number; className?: string }>;
  rightSlot?: React.ReactNode; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-fin-text mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full py-3 border border-fin-border rounded-xl text-sm bg-white text-fin-text placeholder:text-fin-muted focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all ${Icon ? "pl-10" : "pl-4"} ${rightSlot ? "pr-12" : "pr-4"}`}
        />
        {rightSlot && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {hint && <p className="text-xs text-fin-muted mt-1">{hint}</p>}
    </div>
  );
}

function PrimaryBtn({ children, loading, onClick, type = "submit" }: { children: React.ReactNode; loading?: boolean; onClick?: () => void; type?: "submit" | "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full bg-fin-blue hover:bg-fin-blue-dark disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm flex items-center justify-center gap-2"
    >
      {loading ? (
        <><RefreshCw size={15} className="animate-spin" /> Processing…</>
      ) : children}
    </button>
  );
}

// ─── Left branding panel (desktop) ───────────────────────────────

const journeySteps = ["Discover", "Learn", "Apply", "Track", "Get Placed"];

function BrandPanel() {
  return (
    <div className="hidden md:flex md:w-[44%] lg:w-[42%] bg-fin-navy flex-col relative overflow-hidden flex-shrink-0">
      <div className="absolute top-0 right-0 w-96 h-96 bg-fin-blue/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-fin-gold/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative flex flex-col h-full px-10 py-10">
        <LogoFull size="sm" onDark />
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-20 h-20 bg-white rounded-2xl p-1.5 shadow-2xl mb-8">
            <img src={Logo} alt="FIN" className="w-full h-full object-contain" draggable={false} />
          </div>
          <h2 className="text-3xl font-extrabold text-white leading-snug mb-3">
            Your next<br />opportunity<br /><span className="text-fin-gold">starts here.</span>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-xs">
            Discover internships, build your skills, and take the next step in your career with Fortune Intern Network.
          </p>
          <div className="flex items-center gap-1.5 flex-wrap mb-10">
            {journeySteps.map((s, i) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="text-white/80 text-xs font-bold">{s}</span>
                {i < journeySteps.length - 1 && <ChevronRight size={12} className="text-fin-gold/60" />}
              </span>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { Icon: Briefcase, text: "287 paid internships from top companies" },
              { Icon: BookOpen, text: "5 career courses · 23 skill-building modules" },
              { Icon: Sparkles, text: "AI career assistant — Super" },
              { Icon: CheckCircle, text: "72-hour screening promise" }
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-fin-gold" />
                </div>
                <span className="text-white/70 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
          {[["2,400+", "Students"], ["124", "Employers"], ["GHS 1,100", "Avg Stipend"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-lg font-extrabold text-white">{v}</div>
              <div className="text-white/40 text-[10px] font-medium mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Auth component ──────────────────────────────────────────

export default function Auth({ mode, onNavigate }: Props) {
  const [view, setView] = useState<AuthView>(mode === "signup" ? "welcome" : "login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [logoTaps, setLogoTaps] = useState(0);

  const handleLogoTap = () => {
    const next = logoTaps + 1;
    if (next >= 5) { go("admin-login"); setLogoTaps(0); }
    else setLogoTaps(next);
  };

  useEffect(() => {
    if (resendCountdown > 0) {
      const t = setTimeout(() => setResendCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendCountdown]);

  const go = (v: AuthView) => { setView(v); setLoading(false); };

  const submit = (e: React.FormEvent, next: AuthView | string) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (next === "student-overview" || next === "employer-dashboard" || next === "admin-dashboard") {
        onNavigate(next);
      } else {
        go(next as AuthView);
        if (next === "verify") setResendCountdown(60);
      }
    }, 1200);
  };

  const eyeBtn = (show: boolean, toggle: () => void) => (
    <button type="button" onClick={toggle} className="text-fin-muted hover:text-fin-text transition-colors">
      {show ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  );

  return (
    <div className="min-h-full flex flex-col md:flex-row">
      <BrandPanel />

      {/* Right — scrollable form area */}
      <div className="flex-1 flex flex-col bg-fin-ground min-h-full overflow-y-auto">
        {/* Mobile top bar */}
        <div className="md:hidden bg-white border-b border-fin-border px-5 py-3 flex items-center justify-between flex-shrink-0">
          <button onClick={() => onNavigate("landing")} className="flex items-center gap-1.5 text-fin-muted hover:text-fin-text text-sm font-medium">
            <ArrowLeft size={16} /> Back
          </button>
          <LogoFull size="sm" onDark={false} />
          <div className="w-16" />
        </div>

        <div className="flex-1 flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-[400px]">
            {/* Desktop back link */}
            {(view === "login" || view === "welcome") && (
              <button onClick={() => onNavigate("landing")} className="hidden md:flex items-center gap-1.5 text-fin-muted hover:text-fin-text text-sm mb-6 transition-colors">
                <ArrowLeft size={14} /> Back to home
              </button>
            )}
            {view !== "login" && view !== "welcome" && (
              <button onClick={() => {
                const back: Record<AuthView, AuthView | null> = {
                  "welcome": null, "login": null, "role-select": "welcome",
                  "student-signup": "role-select", "employer-signup": "role-select",
                  "admin-login": "login", "forgot": "login", "forgot-sent": "forgot",
                  "reset": "forgot", "reset-success": "reset", "verify": "student-signup",
                  "success-student": null, "success-employer": null
                };
                const b = back[view];
                if (b) go(b);
              }} className="hidden md:flex items-center gap-1.5 text-fin-muted hover:text-fin-text text-sm mb-6 transition-colors">
                <ArrowLeft size={14} /> Back
              </button>
            )}

            {/* ── WELCOME ── */}
            {view === "welcome" && (
              <div className="text-center animate-fade-scale">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-white rounded-2xl p-1.5 shadow-lg border border-fin-border">
                    <img src={Logo} alt="FIN" className="w-full h-full object-contain" draggable={false} />
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-fin-navy mb-3">Your next opportunity<br />starts here.</h1>
                <p className="text-fin-muted text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                  Discover internships, build your skills, and take the next step in your career with Fortune Intern Network.
                </p>
                <div className="flex gap-3 mb-6">
                  <button onClick={() => go("role-select")} className="flex-1 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                    Get Started <ArrowRight size={16} />
                  </button>
                  <button onClick={() => go("login")} className="flex-1 bg-white border border-fin-border hover:border-fin-blue/40 hover:bg-fin-blue-light text-fin-navy font-bold py-3.5 rounded-xl text-sm transition-all">
                    Sign In
                  </button>
                </div>
                {/* Journey pills */}
                <div className="flex items-center justify-center gap-1 flex-wrap">
                  {journeySteps.map((s, i) => (
                    <span key={s} className="flex items-center gap-1">
                      <span className="text-[10px] font-bold text-fin-muted bg-white border border-fin-border px-2 py-0.5 rounded-full">{s}</span>
                      {i < journeySteps.length - 1 && <ChevronRight size={10} className="text-fin-border" />}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── ROLE SELECT ── */}
            {view === "role-select" && (
              <div className="animate-fade-scale">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-extrabold text-fin-navy">How will you use FIN?</h1>
                  <p className="text-fin-muted text-sm mt-2">Choose the experience that best describes you.</p>
                </div>
                <div className="space-y-4 mb-6">
                  <button onClick={() => go("student-signup")} className="w-full bg-white border-2 border-fin-border hover:border-fin-blue rounded-2xl p-5 text-left transition-all group hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-fin-blue-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-fin-blue transition-colors">
                        <GraduationCap size={22} className="text-fin-blue group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-fin-navy text-base mb-1">{"I'm looking for an internship"}</p>
                        <p className="text-fin-muted text-sm leading-relaxed">Discover opportunities, build your profile, apply to companies, track applications and grow your career.</p>
                        <span className="inline-flex items-center gap-1 text-fin-blue text-xs font-bold mt-2">Continue as Student <ArrowRight size={12} /></span>
                      </div>
                    </div>
                  </button>

                  <button onClick={() => go("employer-signup")} className="w-full bg-white border-2 border-fin-border hover:border-fin-gold rounded-2xl p-5 text-left transition-all group hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-fin-gold-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-fin-gold transition-colors">
                        <Building2 size={22} className="text-fin-gold-dark group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-fin-navy text-base mb-1">{"I'm hiring interns"}</p>
                        <p className="text-fin-muted text-sm leading-relaxed">Post internship opportunities, discover talented students and manage applications from one place.</p>
                        <span className="inline-flex items-center gap-1 text-fin-gold-dark text-xs font-bold mt-2">Continue as Employer <ArrowRight size={12} /></span>
                      </div>
                    </div>
                  </button>
                </div>
                <p className="text-center text-sm text-fin-muted">
                  Already have an account?{" "}
                  <button onClick={() => go("login")} className="text-fin-blue font-bold hover:underline">Sign In</button>
                </p>
              </div>
            )}

            {/* ── STUDENT SIGNUP ── */}
            {view === "student-signup" && (
              <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-7 animate-fade-scale">
                <div className="mb-6">
                  <h1 className="text-xl font-extrabold text-fin-navy">Create your FIN student account</h1>
                  <p className="text-fin-muted text-xs mt-1">Start discovering internship opportunities and building your career.</p>
                </div>
                <form onSubmit={(e) => submit(e, "verify")} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="First name" placeholder="Amara" />
                    <InputField label="Last name" placeholder="Johnson" />
                  </div>
                  <InputField label="Email address" type="email" placeholder="amara@ug.edu.gh" icon={Mail} />
                  <InputField label="Phone number" type="tel" placeholder="+233 20 000 0000" icon={Phone} />
                  <InputField label="University" placeholder="University of Ghana" icon={GraduationCap} />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Program" placeholder="BSc Computer Sci." />
                    <InputField label="Level" placeholder="Level 300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{eyeBtn(showPass, () => setShowPass(!showPass))}</div>
                    </div>
                    {password && <PasswordStrength password={password} />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">Confirm password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                      <input type={showConfirm ? "text" : "password"} placeholder="Repeat your password" className="w-full pl-10 pr-12 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all" />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{eyeBtn(showConfirm, () => setShowConfirm(!showConfirm))}</div>
                    </div>
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 accent-fin-blue" />
                    <span className="text-xs text-fin-muted leading-relaxed">I agree to FIN's <span className="text-fin-blue cursor-pointer">Terms of Service</span> and <span className="text-fin-blue cursor-pointer">Privacy Policy</span>.</span>
                  </label>
                  <PrimaryBtn loading={loading}>Create Student Account</PrimaryBtn>
                </form>
                <p className="text-center text-sm text-fin-muted mt-4">Already have an account? <button onClick={() => go("login")} className="text-fin-blue font-bold hover:underline">Sign In</button></p>
              </div>
            )}

            {/* ── EMPLOYER SIGNUP ── */}
            {view === "employer-signup" && (
              <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-7 animate-fade-scale">
                <div className="mb-6">
                  <h1 className="text-xl font-extrabold text-fin-navy">Create your employer account</h1>
                  <p className="text-fin-muted text-xs mt-1">Connect with talented students and post internship opportunities on FIN.</p>
                </div>
                <form onSubmit={(e) => submit(e, "verify")} className="space-y-3.5">
                  <InputField label="Company name" placeholder="e.g. Hubtel" icon={Building2} />
                  <InputField label="Company email" type="email" placeholder="hr@company.com" icon={Mail} />
                  <InputField label="Contact person" placeholder="HR Manager name" icon={User} />
                  <InputField label="Phone number" type="tel" placeholder="+233 30 000 0000" icon={Phone} />
                  <InputField label="Company website" type="url" placeholder="https://yourcompany.com" icon={Globe} />
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">Industry</label>
                    <select className="w-full px-4 py-3 border border-fin-border rounded-xl text-sm bg-white text-fin-text focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all">
                      <option value="">Select industry</option>
                      {["Technology", "Banking & Finance", "Telecommunications", "Fintech", "Healthcare", "Education", "Manufacturing", "Other"].map(i => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">Company description <span className="text-fin-muted font-normal">(optional)</span></label>
                    <textarea rows={2} placeholder="Brief description of your company..." className="w-full px-4 py-3 border border-fin-border rounded-xl text-sm bg-white text-fin-text placeholder:text-fin-muted focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                      <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" className="w-full pl-10 pr-12 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all" />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{eyeBtn(showPass, () => setShowPass(!showPass))}</div>
                    </div>
                    {password && <PasswordStrength password={password} />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">Confirm password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                      <input type={showConfirm ? "text" : "password"} placeholder="Repeat your password" className="w-full pl-10 pr-12 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all" />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{eyeBtn(showConfirm, () => setShowConfirm(!showConfirm))}</div>
                    </div>
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 accent-fin-blue" />
                    <span className="text-xs text-fin-muted leading-relaxed">I agree to FIN's <span className="text-fin-blue cursor-pointer">Terms of Service</span> and <span className="text-fin-blue cursor-pointer">Privacy Policy</span>.</span>
                  </label>
                  <PrimaryBtn loading={loading}>Create Employer Account</PrimaryBtn>
                </form>
                <p className="text-center text-sm text-fin-muted mt-4">Already have an account? <button onClick={() => go("login")} className="text-fin-blue font-bold hover:underline">Sign In</button></p>
              </div>
            )}

            {/* ── LOGIN ── */}
            {view === "login" && (
              <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-8 animate-fade-scale">
                <div className="mb-7">
                  <h1 className="text-2xl font-extrabold text-fin-navy" onClick={handleLogoTap}>Welcome back</h1>
                  <p className="text-fin-muted text-sm mt-1.5">Sign in to continue your FIN journey.</p>
                </div>
                <form onSubmit={(e) => submit(e, "student-overview")} className="space-y-4">
                  <InputField label="Email address" type="email" placeholder="amara@ug.edu.gh" icon={Mail} />
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-semibold text-fin-text">Password</label>
                      <button type="button" onClick={() => go("forgot")} className="text-xs text-fin-blue font-semibold hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                      <input type={showPass ? "text" : "password"} placeholder="Enter your password" defaultValue="password123" className="w-full pl-10 pr-12 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all" />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{eyeBtn(showPass, () => setShowPass(!showPass))}</div>
                    </div>
                  </div>
                  <PrimaryBtn loading={loading}>Sign In</PrimaryBtn>
                </form>

                {/* Google divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-fin-border" />
                  <span className="text-xs text-fin-muted font-medium">OR</span>
                  <div className="flex-1 h-px bg-fin-border" />
                </div>
                <button className="w-full flex items-center justify-center gap-2.5 border border-fin-border rounded-xl py-3 text-sm font-semibold text-fin-navy hover:bg-fin-ground transition-colors">
                  <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.5 33 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l6-6C34.5 6.4 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" /><path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.5 19.2 13 24 13c3.1 0 5.8 1.1 7.9 2.9l6-6C34.5 6.4 29.6 4 24 4 16.3 4 9.7 8.5 6.3 14.7z" /><path fill="#FBBC04" d="M24 44c5.6 0 10.6-1.9 14.4-5.1l-6.7-5.5C29.7 34.9 27 36 24 36c-5.8 0-10.5-3-11.8-7.5l-7 5.4C8.9 39.5 15.9 44 24 44z" /><path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.5 2.7-1.9 5-4 6.5l6.7 5.5C42.1 37 44.5 31 44.5 24c0-1.3-.1-2.7-.2-4z" /></svg>
                  Continue with Google
                </button>

                <p className="text-center text-sm text-fin-muted mt-5">
                  {"Don't have an account? "}<button onClick={() => go("role-select")} className="text-fin-blue font-bold hover:underline">Create one</button>
                </p>

                {/* Portal shortcuts — Admin entry is invisible but reachable via logo triple-click */}
                <div className="mt-5 pt-5 border-t border-fin-border">
                  <p className="text-[10px] text-fin-subtle text-center font-bold uppercase tracking-widest mb-3">Quick access</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Student", Icon: User, action: () => onNavigate("student-overview") },
                      { label: "Employer", Icon: Building2, action: () => onNavigate("employer-dashboard") }
                    ].map(({ label, Icon, action }) => (
                      <button key={label} onClick={action} className="flex flex-col items-center gap-1.5 py-3 px-2 border border-fin-border rounded-xl hover:border-fin-blue/40 hover:bg-fin-blue-light transition-all group">
                        <Icon size={16} className="text-fin-muted group-hover:text-fin-blue transition-colors" />
                        <span className="text-xs text-fin-muted font-semibold group-hover:text-fin-blue transition-colors">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── ADMIN LOGIN ── */}
            {view === "admin-login" && (
              <div className="animate-fade-scale">
                <div className="bg-fin-navy rounded-2xl p-6 mb-4 text-center">
                  <div className="w-12 h-12 bg-fin-gold/20 border border-fin-gold/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield size={22} className="text-fin-gold" />
                  </div>
                  <h1 className="text-xl font-extrabold text-white">FIN Administration</h1>
                  <p className="text-white/50 text-xs mt-1">Authorized personnel only.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-7">
                  <div className="flex items-center gap-2 bg-fin-gold-light border border-fin-gold/25 rounded-xl px-3 py-2.5 mb-5">
                    <Shield size={13} className="text-fin-gold-dark flex-shrink-0" />
                    <p className="text-xs text-fin-gold-dark font-semibold">Secure administrative access. This session will be logged.</p>
                  </div>
                  <form onSubmit={(e) => submit(e, "admin-dashboard")} className="space-y-4">
                    <InputField label="Admin email" type="email" placeholder="admin@fortuneinternnetwork.com" icon={Mail} />
                    <div>
                      <label className="block text-sm font-semibold text-fin-text mb-1.5">Password</label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                        <input type={showPass ? "text" : "password"} placeholder="Admin password" className="w-full pl-10 pr-12 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-navy focus:ring-2 focus:ring-fin-navy/10 transition-all" />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{eyeBtn(showPass, () => setShowPass(!showPass))}</div>
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-fin-navy hover:bg-fin-navy-light disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                      {loading ? <><RefreshCw size={15} className="animate-spin" /> Authenticating…</> : <><Shield size={15} /> Secure Sign In</>}
                    </button>
                  </form>
                  <p className="text-center text-xs text-fin-muted mt-4">
                    <button onClick={() => go("login")} className="text-fin-blue hover:underline">← Back to user login</button>
                  </p>
                </div>
              </div>
            )}

            {/* ── FORGOT PASSWORD ── */}
            {view === "forgot" && (
              <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-8 animate-fade-scale">
                <div className="text-center mb-7">
                  <div className="w-14 h-14 bg-fin-blue-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock size={24} className="text-fin-blue" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-fin-navy">Forgot your password?</h1>
                  <p className="text-fin-muted text-sm mt-2 max-w-xs mx-auto">Enter your email and we'll send you instructions to reset your password.</p>
                </div>
                <form onSubmit={(e) => submit(e, "forgot-sent")} className="space-y-4">
                  <InputField label="Email address" type="email" placeholder="amara@ug.edu.gh" icon={Mail} />
                  <PrimaryBtn loading={loading}>Send Reset Link</PrimaryBtn>
                </form>
                <p className="text-center mt-5"><button onClick={() => go("login")} className="text-fin-blue font-bold text-sm hover:underline flex items-center gap-1 mx-auto"><ArrowLeft size={13} /> Back to Sign In</button></p>
              </div>
            )}

            {/* ── FORGOT SENT ── */}
            {view === "forgot-sent" && (
              <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-8 animate-fade-scale text-center">
                <div className="w-14 h-14 bg-fin-green-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={26} className="text-fin-green" />
                </div>
                <h1 className="text-2xl font-extrabold text-fin-navy mb-2">Check your email</h1>
                <p className="text-fin-muted text-sm leading-relaxed mb-6 max-w-xs mx-auto">{"We've sent a password reset link to your email address. Follow the instructions to reset your password."}</p>
                <button onClick={() => go("reset")} className="w-full bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm">
                  Enter Reset Code
                </button>
                <p className="text-center text-sm text-fin-muted mt-4"><button onClick={() => go("login")} className="text-fin-blue font-bold hover:underline flex items-center gap-1 mx-auto"><ArrowLeft size={13} /> Back to Sign In</button></p>
              </div>
            )}

            {/* ── RESET PASSWORD ── */}
            {view === "reset" && (
              <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-8 animate-fade-scale">
                <div className="text-center mb-7">
                  <h1 className="text-2xl font-extrabold text-fin-navy">Create a new password</h1>
                  <p className="text-fin-muted text-sm mt-2">Enter the code from your email and choose a new password.</p>
                </div>
                <form onSubmit={(e) => submit(e, "reset-success")} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">6-digit reset code</label>
                    <input type="text" placeholder="000000" className="w-full px-4 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all text-center tracking-[0.5em] font-mono font-bold text-fin-navy" maxLength={6} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">New password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                      <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter new password" className="w-full pl-10 pr-12 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all" />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{eyeBtn(showPass, () => setShowPass(!showPass))}</div>
                    </div>
                    {password && <PasswordStrength password={password} />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-fin-text mb-1.5">Confirm new password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fin-muted" />
                      <input type={showConfirm ? "text" : "password"} placeholder="Repeat new password" className="w-full pl-10 pr-12 py-3 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all" />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{eyeBtn(showConfirm, () => setShowConfirm(!showConfirm))}</div>
                    </div>
                  </div>
                  <PrimaryBtn loading={loading}>Reset Password</PrimaryBtn>
                </form>
              </div>
            )}

            {/* ── RESET SUCCESS ── */}
            {view === "reset-success" && (
              <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-8 animate-fade-scale text-center">
                <div className="w-16 h-16 bg-fin-green-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={30} className="text-fin-green" />
                </div>
                <h1 className="text-2xl font-extrabold text-fin-navy mb-2">Password updated!</h1>
                <p className="text-fin-muted text-sm mb-7">Your password has been successfully reset. You can now sign in with your new password.</p>
                <button onClick={() => go("login")} className="w-full bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                  Continue to Sign In <ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* ── EMAIL VERIFY ── */}
            {view === "verify" && (
              <div className="bg-white rounded-2xl shadow-sm border border-fin-border p-8 animate-fade-scale text-center">
                <div className="w-16 h-16 bg-fin-gold-mid rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} className="text-fin-gold-dark" />
                </div>
                <h1 className="text-2xl font-extrabold text-fin-navy mb-2">Verify your email</h1>
                <p className="text-fin-muted text-sm mb-1 max-w-xs mx-auto leading-relaxed">
                  {"We've sent a verification code to"}
                </p>
                <p className="text-fin-navy font-bold text-sm mb-6">amara.johnson@ug.edu.gh</p>
                <div className="flex gap-2 justify-center mb-7">
                  {[...Array(6)].map((_, i) => (
                    <input key={i} type="text" maxLength={1} className="w-11 h-14 border-2 border-fin-border rounded-xl text-center text-xl font-extrabold text-fin-navy focus:outline-none focus:border-fin-blue transition-colors bg-fin-ground" />
                  ))}
                </div>
                <button onClick={() => go("success-student")} className="w-full bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm">
                  {"I've Verified My Email"}
                </button>
                <div className="mt-4 space-y-1">
                  <button
                    disabled={resendCountdown > 0}
                    onClick={() => setResendCountdown(60)}
                    className="text-fin-blue font-semibold text-sm hover:underline disabled:text-fin-muted disabled:no-underline disabled:cursor-default transition-colors"
                  >
                    {resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : "Resend verification code"}
                  </button>
                  <br />
                  <button className="text-fin-muted text-xs hover:text-fin-text transition-colors">Change email address</button>
                </div>
              </div>
            )}

            {/* ── SUCCESS — STUDENT ── */}
            {view === "success-student" && (
              <div className="animate-fade-scale text-center">
                <div className="bg-fin-navy rounded-2xl p-8 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-fin-gold/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-fin-blue/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
                  </div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-white rounded-2xl p-1.5 shadow-xl mx-auto mb-4">
                      <img src={Logo} alt="FIN" className="w-full h-full object-contain" draggable={false} />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white mb-1">Welcome to FIN, Amara!</h1>
                    <p className="text-white/60 text-sm">{"You've taken the first step toward your next opportunity."}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-fin-border p-6">
                  <p className="text-fin-muted text-sm mb-5">Complete your profile to get personalized internship matches and start applying.</p>
                  <button onClick={() => onNavigate("student-overview")} className="w-full bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                    Complete My Profile <ArrowRight size={15} />
                  </button>
                  <button onClick={() => onNavigate("student-overview")} className="w-full text-fin-muted text-sm font-medium mt-3 hover:text-fin-text transition-colors">
                    Skip for now
                  </button>
                </div>
              </div>
            )}

            {/* ── SUCCESS — EMPLOYER ── */}
            {view === "success-employer" && (
              <div className="animate-fade-scale text-center">
                <div className="bg-fin-navy rounded-2xl p-8 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-fin-gold/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  </div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-fin-gold/20 border border-fin-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Building2 size={26} className="text-fin-gold" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white mb-1">Welcome to FIN!</h1>
                    <p className="text-white/60 text-sm">{"Let's set up your company profile and start connecting with talented students."}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-fin-border p-6">
                  <button onClick={() => onNavigate("employer-dashboard")} className="w-full bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                    Set Up Company Profile <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
