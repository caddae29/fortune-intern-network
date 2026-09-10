import { useState } from "react";
import { LogoFull } from "../components/fin-logo";


import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  MapPin,
  Star,
  Users,
  Zap,
  X,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  FileText,
  Shield,
  Building2,
  Rss,
  Info,
} from "lucide-react";

interface Props {
  onNavigate: (page: string) => void;
}

// ── Modal shell ────────────────────────────────────────────────────
function Modal({
  title,
  icon: Icon,
  onClose,
  children,
}: {
  title: string;
  icon?: React.ComponentType<{ size: number; className?: string }>;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-fin-border flex-shrink-0">
          {Icon && (
            <div className="w-8 h-8 bg-fin-blue-light rounded-lg flex items-center justify-center">
              <Icon size={16} className="text-fin-blue" />
            </div>
          )}
          <h2 className="font-bold text-fin-navy text-base flex-1">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-fin-ground hover:bg-fin-border flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-fin-muted" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ── Modal content components ───────────────────────────────────────
function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="About FIN" icon={Info} onClose={onClose}>
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-xl border border-fin-border p-1 shadow-sm flex-shrink-0">
            <img
              src="/Images/finLogo.jpg"
              alt="FIN"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          <div>
            <h3 className="font-extrabold text-fin-navy text-lg">
              Fortune Intern Network
            </h3>
            <p className="text-fin-muted text-sm">
              {"Ghana's #1 student internship platform"}
            </p>
          </div>
        </div>
        <p className="text-fin-text text-sm leading-relaxed">
          FIN was founded with one mission: to close the gap between ambitious
          Ghanaian students and quality, paid internship opportunities. We
          believe every student deserves a fair shot at career success —
          regardless of connections or background.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Founded", value: "2024" },
            { label: "Headquarters", value: "Accra, Ghana" },
            { label: "Students Placed", value: "2,400+" },
            { label: "Partner Companies", value: "124" },
          ].map((s) => (
            <div key={s.label} className="bg-fin-ground rounded-xl p-4">
              <p className="text-xs text-fin-muted">{s.label}</p>
              <p className="font-bold text-fin-navy text-base mt-0.5">
                {s.value}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-fin-blue-light border border-fin-blue/20 rounded-xl p-4">
          <h4 className="font-bold text-fin-navy text-sm mb-1">Our Mission</h4>
          <p className="text-fin-text text-sm leading-relaxed">
            To empower every Ghanaian student to DISCOVER, LEARN, APPLY, TRACK,
            and GET PLACED — through technology, automation, and a growing
            employer network.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-fin-navy text-sm mb-3">Core Values</h4>
          <div className="space-y-2">
            {[
              {
                v: "Access for all",
                d: "Every student deserves equal access to career opportunities.",
              },
              {
                v: "Transparency",
                d: "Live tracking means no black boxes in your application process.",
              },
              { v: "Growth", d: "FIN Academy ensures learning never stops." },
            ].map((c) => (
              <div key={c.v} className="flex gap-3">
                <CheckCircle
                  size={15}
                  className="text-fin-green flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-fin-text">
                  <span className="font-bold">{c.v}</span> — {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function CareersModal({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (p: string) => void;
}) {
  const roles = [
    {
      title: "Product Designer",
      dept: "Design",
      type: "Full-time",
      location: "Accra, Ghana",
    },
    {
      title: "Backend Engineer (Node.js)",
      dept: "Engineering",
      type: "Full-time",
      location: "Hybrid · Accra",
    },
    {
      title: "Student Success Manager",
      dept: "Operations",
      type: "Full-time",
      location: "Accra, Ghana",
    },
    {
      title: "Growth & Partnerships Lead",
      dept: "Business",
      type: "Full-time",
      location: "Remote (Ghana)",
    },
    {
      title: "Data Analyst",
      dept: "Analytics",
      type: "Contract",
      location: "Accra, Ghana",
    },
  ];
  return (
    <Modal title="Careers at FIN" icon={Briefcase} onClose={onClose}>
      <div className="space-y-5">
        <div className="bg-fin-navy rounded-2xl p-5 text-center">
          <p className="text-white font-bold text-base mb-1">
            Join the team shaping careers
          </p>
          <p className="text-white/60 text-sm">
            {
              "We're building the future of student career development in Ghana. Come build with us."
            }
          </p>
        </div>
        <div className="space-y-3">
          {roles.map((r) => (
            <div
              key={r.title}
              className="bg-fin-ground rounded-xl p-4 flex items-start justify-between gap-3"
            >
              <div>
                <p className="font-bold text-fin-navy text-sm">{r.title}</p>
                <p className="text-fin-muted text-xs mt-0.5">
                  {r.dept} · {r.location}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className="text-[10px] font-bold bg-fin-blue-light text-fin-blue px-2 py-0.5 rounded-full">
                  {r.type}
                </span>
                <button className="text-[10px] font-bold text-fin-blue hover:underline">
                  Apply →
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-fin-muted text-xs text-center">
          {"Don't see a fit? Email us at "}
          <span className="text-fin-blue font-semibold">
            careers@fortuneinternnetwork.com
          </span>
        </p>
      </div>
    </Modal>
  );
}

function BlogModal({ onClose }: { onClose: () => void }) {
  const posts = [
    {
      title: "How FIN helped 2,400 students land paid internships in 2026",
      date: "Sep 5, 2026",
      tag: "Impact",
      readTime: "4 min",
    },
    {
      title: "5 ways AI is transforming internship applications in Ghana",
      date: "Aug 28, 2026",
      tag: "Insights",
      readTime: "6 min",
    },
    {
      title:
        "Meet Amara: From FIN Academy to Software Engineering Intern at MTN",
      date: "Aug 20, 2026",
      tag: "Success Story",
      readTime: "3 min",
    },
    {
      title: "Employer spotlight: Why Ecobank recruits exclusively through FIN",
      date: "Aug 10, 2026",
      tag: "Employers",
      readTime: "5 min",
    },
    {
      title: "Your complete guide to writing a cover letter with Super AI",
      date: "Jul 30, 2026",
      tag: "Career Tips",
      readTime: "7 min",
    },
  ];
  const tagColors: Record<string, string> = {
    Impact: "bg-fin-green-light text-fin-green",
    Insights: "bg-fin-blue-light text-fin-blue",
    "Success Story": "bg-fin-gold-light text-fin-gold-dark",
    Employers: "bg-purple-50 text-purple-600",
    "Career Tips": "bg-fin-blue-light text-fin-blue",
  };
  return (
    <Modal title="FIN Blog" icon={Rss} onClose={onClose}>
      <div className="space-y-3">
        {posts.map((p) => (
          <button
            key={p.title}
            className="w-full text-left bg-fin-ground hover:bg-fin-blue-light hover:border-fin-blue/30 border border-transparent rounded-xl p-4 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[p.tag]}`}
              >
                {p.tag}
              </span>
              <span className="text-[10px] text-fin-muted">
                {p.readTime} read
              </span>
            </div>
            <p className="font-semibold text-fin-navy text-sm leading-snug mb-1">
              {p.title}
            </p>
            <p className="text-fin-muted text-[10px]">{p.date}</p>
          </button>
        ))}
      </div>
    </Modal>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };
  return (
    <Modal title="Contact FIN" icon={Mail} onClose={onClose}>
      {sent ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 bg-fin-green-light rounded-2xl flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={26} className="text-fin-green" />
          </div>
          <h3 className="font-bold text-fin-navy text-base mb-1">
            Message sent!
          </h3>
          <p className="text-fin-muted text-sm mb-5">
            {"Our team will get back to you within 24 hours."}
          </p>
          <button
            onClick={onClose}
            className="bg-fin-blue hover:bg-fin-blue-dark text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                Icon: Mail,
                label: "Email",
                value: "hello@fortuneinternnetwork.com",
              },
              { Icon: Phone, label: "Phone", value: "+233 30 000 1234" },
              { Icon: MapPin, label: "Office", value: "Accra, Ghana" },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-fin-ground rounded-xl p-3 text-center"
              >
                <c.Icon size={16} className="text-fin-blue mx-auto mb-1.5" />
                <p className="text-[10px] text-fin-muted">{c.label}</p>
                <p className="text-xs font-semibold text-fin-navy mt-0.5 leading-tight">
                  {c.value}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-fin-text mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-fin-text mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-fin-text mb-1">
                Subject
              </label>
              <select className="w-full px-3 py-2.5 border border-fin-border rounded-xl text-sm bg-white focus:outline-none focus:border-fin-blue transition-all text-fin-text">
                <option>General Enquiry</option>
                <option>Technical Support</option>
                <option>Partnership / Employer</option>
                <option>Media / Press</option>
                <option>Feedback</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-fin-text mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="How can we help?"
                className="w-full px-3 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-fin-blue hover:bg-fin-blue-dark disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={15} />
              {loading ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Privacy Policy" icon={Shield} onClose={onClose}>
      <div className="space-y-4 text-sm text-fin-text">
        <p className="text-fin-muted text-xs">
          Last updated: September 1, 2026
        </p>
        {[
          {
            heading: "1. Information We Collect",
            body: "We collect information you provide when creating an account — including your name, email, university, program, CV, and career interests. We also collect usage data such as pages visited, internships viewed, and courses completed.",
          },
          {
            heading: "2. How We Use Your Information",
            body: "Your information is used to match you with relevant internships, personalise your FIN Academy experience, send application updates, generate internship letters, and improve the platform. We do not sell your personal data to third parties.",
          },
          {
            heading: "3. Data Sharing",
            body: "We share your application data (name, CV, cover letter) with employers you apply to through FIN. Employers only receive data for applications you explicitly submit. We do not share your data with unaffiliated third parties without your consent.",
          },
          {
            heading: "4. Data Security",
            body: "FIN uses industry-standard encryption to protect your data. Passwords are hashed and never stored in plain text. All connections use HTTPS/TLS.",
          },
          {
            heading: "5. Your Rights",
            body: "You may request access to, correction of, or deletion of your personal data at any time by contacting privacy@fortuneinternnetwork.com. Deleting your account permanently removes all associated personal data.",
          },
          {
            heading: "6. Cookies",
            body: "We use essential cookies to maintain your login session and preferences. We do not use advertising cookies or cross-site tracking cookies.",
          },
          {
            heading: "7. Contact",
            body: "For privacy-related questions, contact us at privacy@fortuneinternnetwork.com or write to FIN Headquarters, Accra, Ghana.",
          },
        ].map((s) => (
          <div key={s.heading}>
            <h4 className="font-bold text-fin-navy text-sm mb-1">
              {s.heading}
            </h4>
            <p className="text-fin-text leading-relaxed text-sm">{s.body}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Terms of Use" icon={FileText} onClose={onClose}>
      <div className="space-y-4 text-sm text-fin-text">
        <p className="text-fin-muted text-xs">
          Last updated: September 1, 2026
        </p>
        {[
          {
            heading: "1. Acceptance of Terms",
            body: "By creating an account or using Fortune Intern Network (FIN), you agree to these Terms of Use. If you do not agree, do not use the platform.",
          },
          {
            heading: "2. Eligibility",
            body: "FIN is available to students currently enrolled in or recently graduated from a recognised university or tertiary institution in Ghana. Employer accounts are available to legally registered organisations.",
          },
          {
            heading: "3. Student Accounts",
            body: "Students must provide accurate information about their education and background. Misrepresenting qualifications in applications is grounds for immediate account suspension.",
          },
          {
            heading: "4. Application Fees",
            body: "Some internship applications require a processing fee, payable via Paystack. All fees are non-refundable once an application is submitted. Fees are clearly disclosed before payment.",
          },
          {
            heading: "5. Employer Accounts",
            body: "Employers must post legitimate paid internship opportunities. Unpaid or exploitative internships that violate Ghanaian labour standards are prohibited and will be removed.",
          },
          {
            heading: "6. Prohibited Conduct",
            body: "You may not use FIN to distribute spam, post fraudulent internships, attempt to access other users' accounts, or engage in any activity that disrupts platform operations.",
          },
          {
            heading: "7. Intellectual Property",
            body: "All FIN content, branding, and software are the intellectual property of Fortune Intern Network Ltd. You may not reproduce or distribute FIN content without written permission.",
          },
          {
            heading: "8. Limitation of Liability",
            body: "FIN facilitates connections between students and employers but does not guarantee placement. We are not liable for the actions of employers or outcomes of internship applications.",
          },
        ].map((s) => (
          <div key={s.heading}>
            <h4 className="font-bold text-fin-navy text-sm mb-1">
              {s.heading}
            </h4>
            <p className="text-fin-text leading-relaxed text-sm">{s.body}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

function HelpModal({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (p: string) => void;
}) {
  const faqs = [
    {
      q: "How do I apply for an internship?",
      a: "Create a free student account, complete your profile, browse the internship marketplace, and click Apply Now on any listing. The 6-step application flow guides you through personal info, CV, cover letter, review, payment, and submission.",
    },
    {
      q: "Is FIN free for students?",
      a: "Creating a FIN account and browsing internships is completely free. Some internship applications have a small processing fee (typically GHS 30–50) which covers FIN's screening and placement services.",
    },
    {
      q: "How long does screening take?",
      a: "FIN's screening team reviews every application within 72 hours. You will be notified by email and in-app when your application status changes.",
    },
    {
      q: "What is FIN Academy?",
      a: "FIN Academy is a built-in learning platform with 5 courses and 23 modules covering professional communication, CV writing, Microsoft Office, interview preparation, and more. Completing courses earns you verifiable certificates.",
    },
    {
      q: "What is Super AI?",
      a: "Super is FIN's AI career assistant. It can help you write cover letters, build your CV, find matching internships, prepare for interviews, and answer any career questions — available 24/7.",
    },
    {
      q: "How do I track my application?",
      a: "Go to My Applications in the student dashboard. You'll see a live pipeline — Applied → Review → Interview → Offer — with timestamps, notes, and FIN's automation activity log.",
    },
    {
      q: "Can employers contact me directly?",
      a: "Employers communicate through FIN. If an employer wants to interview you, FIN notifies you and facilitates the process. Your personal contact details are not shared without your consent.",
    },
    {
      q: "How do I get my internship letter?",
      a: "Once you are successfully placed, FIN automatically generates an official internship placement letter using your details and the company's information. You can download it from your dashboard.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Modal title="Help Center" icon={HelpCircle} onClose={onClose}>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="border border-fin-border rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-fin-ground transition-colors"
            >
              <span className="font-semibold text-fin-navy text-sm pr-4">
                {f.q}
              </span>
              <ChevronRight
                size={16}
                className={`text-fin-muted flex-shrink-0 transition-transform ${open === i ? "rotate-90" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-4 pb-4 border-t border-fin-border bg-fin-ground">
                <p className="text-fin-text text-sm leading-relaxed pt-3">
                  {f.a}
                </p>
              </div>
            )}
          </div>
        ))}
        <div className="bg-fin-blue-light border border-fin-blue/20 rounded-xl p-4 text-center mt-3">
          <p className="text-fin-navy text-sm font-semibold mb-1">
            Still need help?
          </p>
          <p className="text-fin-muted text-xs mb-3">
            Our support team is available Monday – Friday, 8am – 6pm.
          </p>
          <button
            onClick={() => {
              onClose();
              setTimeout(() => onNavigate("contact"), 100);
            }}
            className="text-fin-blue font-bold text-sm hover:underline"
          >
            Contact Support →
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ── Static data ────────────────────────────────────────────────────
const stats = [
  { label: "Students Placed", value: "2,400+", suffix: "" },
  { label: "Partner Companies", value: "124", suffix: "" },
  { label: "Paid Internships", value: "287", suffix: "" },
  { label: "Avg. Stipend", value: "GHS 1,100", suffix: "/mo" },
];

const journey = [
  {
    step: "01",
    label: "Discover",
    description:
      "Browse paid internships curated for Ghanaian students from top companies.",
    icon: Briefcase,
    color: "text-fin-blue",
    bg: "bg-fin-blue/10",
  },
  {
    step: "02",
    label: "Learn",
    description:
      "Build job-ready skills through FIN Academy's structured courses and modules.",
    icon: BookOpen,
    color: "text-fin-gold",
    bg: "bg-fin-gold/10",
  },
  {
    step: "03",
    label: "Apply",
    description:
      "Submit polished applications powered by AI automation and smart matching.",
    icon: Zap,
    color: "text-fin-green",
    bg: "bg-fin-green/10",
  },
  {
    step: "04",
    label: "Track",
    description:
      "Monitor every stage of your application in real time with live updates.",
    icon: LayoutDashboard,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    step: "05",
    label: "Get Placed",
    description:
      "Receive your official internship letter and launch your career.",
    icon: GraduationCap,
    color: "text-fin-gold-dark",
    bg: "bg-fin-gold/15",
  },
];

const features = [
  {
    title: "Paid Internship Marketplace",
    description:
      "Hundreds of verified, paid opportunities from Ghana's leading companies — filtered by skills, location, and arrangement.",
    icon: Briefcase,
    accent: "bg-fin-blue/10 text-fin-blue",
  },
  {
    title: "FIN Academy",
    description:
      "5 career-focused courses, 23 modules covering communication, CV writing, Microsoft Office, and interview mastery.",
    icon: BookOpen,
    accent: "bg-fin-gold/10 text-fin-gold-dark",
  },
  {
    title: "Super AI Assistant",
    description:
      "Personalized career guidance, CV generation, cover letter writing, and application coaching — always available.",
    icon: Star,
    accent: "bg-purple-100 text-purple-600",
  },
  {
    title: "Live Application Tracking",
    description:
      "Watch your application advance through every stage in real time — Applied, Review, Interview, Offer.",
    icon: LayoutDashboard,
    accent: "bg-fin-green/10 text-fin-green",
  },
  {
    title: "Automated Placement Letters",
    description:
      "FIN auto-generates your official internship placement letter the moment you are accepted.",
    icon: CheckCircle,
    accent: "bg-fin-blue/10 text-fin-blue",
  },
  {
    title: "Employer Network",
    description:
      "A growing network of 124+ employers actively sourcing top FIN students for quality internships.",
    icon: Users,
    accent: "bg-fin-gold/10 text-fin-gold-dark",
  },
];

const testimonials = [
  {
    name: "Kwame Asante",
    university: "KNUST",
    role: "Software Engineering Intern @ Hubtel",
    quote:
      "FIN made my internship search so much easier. I applied, tracked my application in real time, and got placed at Hubtel — all within 3 weeks. The automated tracking is incredible.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Ama Owusu",
    university: "Ashesi University",
    role: "Data Analytics Intern @ Ecobank",
    quote:
      "The FIN Academy courses helped me polish my CV and prepare for interviews. I landed my first internship within a month of joining. The Super AI assistant is like having a career coach.",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Kofi Mensah",
    university: "University of Cape Coast",
    role: "Marketing Intern @ Vodafone Ghana",
    quote:
      "Super wrote my cover letter and helped me tailor every application. I received my placement letter within 72 hours of being accepted.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
];

const topInternships = [
  {
    company: "MTN Ghana",
    role: "Software Dev Intern",
    stipend: "GHS 1,200/mo",
    match: 92,
    location: "Hybrid · Accra",
    logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=60&h=60&fit=crop&auto=format",
  },
  {
    company: "Ecobank Ghana",
    role: "Data Analytics Intern",
    stipend: "GHS 1,000/mo",
    match: 87,
    location: "On-site · Accra",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&auto=format",
  },
  {
    company: "Hubtel",
    role: "UI/UX Design Intern",
    stipend: "GHS 1,100/mo",
    match: 79,
    location: "Hybrid · Accra",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&auto=format",
  },
];

type ModalKey =
  | "about"
  | "careers"
  | "blog"
  | "contact"
  | "privacy"
  | "terms"
  | "help"
  | null;

// ── Scroll helper ──────────────────────────────────────────────────
const scrollTo = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ── Main component ─────────────────────────────────────────────────
export default function Landing({ onNavigate }: Props) {
  const [modal, setModal] = useState<ModalKey>(null);
  const open = (m: ModalKey) => setModal(m);
  const close = () => setModal(null);

  return (
    <div className="min-h-full bg-white overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-fin-border">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <LogoFull size="sm" onDark={false} />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-fin-muted">
            <button
              onClick={() => scrollTo("internships")}
              className="hover:text-fin-text transition-colors"
            >
              Internships
            </button>
            <button
              onClick={() => scrollTo("academy")}
              className="hover:text-fin-text transition-colors"
            >
              FIN Academy
            </button>
            <button
              onClick={() => onNavigate("employer-dashboard")}
              className="hover:text-fin-text transition-colors"
            >
              For Employers
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("login")}
              className="text-sm font-semibold text-fin-navy hover:text-fin-blue transition-colors px-3 py-1.5"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate("signup")}
              className="text-sm font-semibold bg-fin-blue text-white px-4 py-2 rounded-lg hover:bg-fin-blue-dark transition-colors shadow-sm"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="relative bg-fin-navy overflow-hidden min-h-[80vh] flex items-center"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-fin-blue/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fin-gold/15 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-5 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-fin-gold animate-pulse-dot" />
                <span className="text-white/90 text-sm font-semibold">
                  {"Ghana's #1 Student Internship Platform"}
                </span>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                  Find Your <br />
                  <span className="text-fin-gold">Fortune</span> in <br />
                  Your Career
                </h1>
                <p className="text-white/65 text-lg md:text-xl leading-relaxed mt-5 max-w-lg">
                  FIN connects ambitious Ghanaian students with paid
                  internships, AI-powered applications, and structured career
                  development — all in one platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate("signup")}
                  className="flex items-center justify-center gap-2 bg-fin-gold hover:bg-fin-gold-dark text-white font-bold px-7 py-4 rounded-xl text-base transition-all hover:scale-[1.02] shadow-lg shadow-fin-gold/25"
                >
                  Find Internships Now <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNavigate("employer-dashboard")}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-4 rounded-xl text-base transition-colors"
                >
                  For Employers <ChevronRight size={18} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format",
                    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=40&h=40&fit=crop&auto=format",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-9 h-9 rounded-full border-2 border-fin-navy object-cover"
                    />
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-fin-navy bg-fin-blue flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">+3K</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm">
                  Join{" "}
                  <span className="text-white font-semibold">
                    3,800+ students
                  </span>{" "}
                  already on FIN
                </p>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-3">
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 bg-white rounded-2xl p-1.5 shadow-2xl shadow-fin-gold/20 border border-white/20">
                  <img
                    src="/Images/finLogo.jpg"
                    alt="Fortune Intern Network"
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
              </div>
              {topInternships.map((job) => (
                <div
                  key={job.company}
                  className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 hover:bg-white/15 transition-colors cursor-pointer"
                  onClick={() => onNavigate("signup")}
                >
                  <div className="w-11 h-11 rounded-xl bg-white p-0.5 flex-shrink-0 shadow-md">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">
                      {job.role}
                    </p>
                    <p className="text-white/60 text-xs">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-fin-green text-xs font-bold">
                      {job.match}% match
                    </span>
                    <span className="text-fin-gold text-[10px] font-semibold">
                      {job.stipend}
                    </span>
                  </div>
                </div>
              ))}
              <div className="bg-fin-gold/20 border border-fin-gold/30 rounded-2xl p-4 flex items-center gap-3 mt-1">
                <div className="w-10 h-10 rounded-xl bg-fin-gold/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} className="text-fin-gold" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    72-Hour Screening Promise
                  </p>
                  <p className="text-white/55 text-xs">
                    FIN reviews every application within 72 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-5 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-white">
                  {s.value}
                  <span className="text-fin-gold text-base">{s.suffix}</span>
                </div>
                <div className="text-white/50 text-xs font-medium mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="py-24 px-5 bg-fin-ground">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-fin-blue font-bold text-xs uppercase tracking-widest bg-fin-blue-light px-3 py-1.5 rounded-full mb-4">
              Your Career Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-fin-navy mt-2 leading-tight">
              Discover → Learn → Apply
              <br className="hidden md:block" /> → Track → Get Placed
            </h2>
            <p className="text-fin-muted mt-5 max-w-lg mx-auto text-base leading-relaxed">
              Everything you need to launch and grow your career, on one
              connected platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {journey.map((j) => (
              <div
                key={j.step}
                className="bg-white rounded-2xl p-6 shadow-sm border border-fin-border hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                onClick={() => onNavigate("signup")}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${j.bg}`}
                >
                  <j.icon size={22} className={j.color} />
                </div>
                <div className="text-[10px] font-bold text-fin-subtle uppercase tracking-widest mb-1">
                  {j.step}
                </div>
                <div className="font-extrabold text-fin-navy text-lg mb-2">
                  {j.label}
                </div>
                <p className="text-fin-muted text-sm leading-relaxed">
                  {j.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — Internships & Academy anchored here */}
      <section id="internships" className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex md:items-end md:justify-between mb-16">
            <div>
              <span className="inline-block text-fin-blue font-bold text-xs uppercase tracking-widest bg-fin-blue-light px-3 py-1.5 rounded-full mb-4">
                The FIN Platform
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-fin-navy mt-2 leading-tight">
                Everything your
                <br />
                career needs
              </h2>
            </div>
            <p className="text-fin-muted max-w-sm text-sm leading-relaxed mt-4 md:mt-0">
              FIN combines internship discovery, AI career coaching, skill
              building, and live tracking — so you never have to juggle multiple
              tools.
            </p>
          </div>
          <div
            id="academy"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-fin-border hover:border-fin-blue/30 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => onNavigate("signup")}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.accent} group-hover:scale-110 transition-transform`}
                >
                  <f.icon size={22} />
                </div>
                <h3 className="font-extrabold text-fin-navy text-base mb-2">
                  {f.title}
                </h3>
                <p className="text-fin-muted text-sm leading-relaxed">
                  {f.description}
                </p>
                <p className="text-fin-blue text-xs font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Get started <ArrowRight size={12} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-5 bg-fin-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fin-blue/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-fin-gold/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-fin-gold font-bold text-xs uppercase tracking-widest bg-fin-gold/15 border border-fin-gold/20 px-3 py-1.5 rounded-full mb-4">
              Student Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
              From FIN to career success
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white/8 border border-white/12 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/12 transition-colors"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="text-fin-gold fill-fin-gold"
                    />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-fin-border flex-shrink-0"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.university}</div>
                    <div className="text-fin-gold text-[10px] font-semibold mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-fin-navy rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 w-96 h-96 bg-fin-blue/20 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-fin-gold/15 rounded-full translate-y-1/2 translate-x-1/4 blur-2xl" />
            </div>
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-xl">
                  <img
                    src="/Images/finLogo.jpg"
                    alt="FIN"
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Start your career journey
                <br />
                today — for free
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                Join over 3,800 students already discovering opportunities,
                building skills, and launching careers with FIN.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate("signup")}
                  className="flex items-center justify-center gap-2 bg-fin-gold hover:bg-fin-gold-dark text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-fin-gold/30"
                >
                  Create Free Account <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNavigate("employer-dashboard")}
                  className="flex items-center justify-center gap-2 bg-white/12 hover:bg-white/20 border border-white/25 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  Post an Internship <Building2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fin-navy border-t border-white/8 py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div className="max-w-xs">
              <LogoFull size="sm" onDark />
              <p className="text-white/40 text-xs mt-3 leading-relaxed">
                {
                  "Ghana's leading platform connecting ambitious students with paid internship opportunities and career development tools."
                }
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              {/* Platform */}
              <div>
                <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest mb-3">
                  Platform
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      scrollTo("internships");
                    }}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Internships
                  </button>
                  <button
                    onClick={() => {
                      scrollTo("academy");
                    }}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    FIN Academy
                  </button>
                  <button
                    onClick={() => onNavigate("signup")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Super AI
                  </button>
                  <button
                    onClick={() => onNavigate("signup")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Analytics
                  </button>
                </div>
              </div>
              {/* Company */}
              <div>
                <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest mb-3">
                  Company
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => open("about")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    About FIN
                  </button>
                  <button
                    onClick={() => onNavigate("employer-dashboard")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    For Employers
                  </button>
                  <button
                    onClick={() => open("careers")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Careers
                  </button>
                  <button
                    onClick={() => open("blog")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Blog
                  </button>
                </div>
              </div>
              {/* Support */}
              <div>
                <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest mb-3">
                  Support
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => open("contact")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => open("privacy")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => open("terms")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Terms of Use
                  </button>
                  <button
                    onClick={() => open("help")}
                    className="block text-white/50 hover:text-white transition-colors text-left"
                  >
                    Help Center
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">
              © 2026 Fortune Intern Network. All rights reserved.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => open("privacy")}
                className="text-white/25 hover:text-white/50 text-xs transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => open("terms")}
                className="text-white/25 hover:text-white/50 text-xs transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => open("contact")}
                className="text-white/25 hover:text-white/50 text-xs transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {modal === "about" && <AboutModal onClose={close} />}
      {modal === "careers" && (
        <CareersModal onClose={close} onNavigate={onNavigate} />
      )}
      {modal === "blog" && <BlogModal onClose={close} />}
      {modal === "contact" && <ContactModal onClose={close} />}
      {modal === "privacy" && <PrivacyModal onClose={close} />}
      {modal === "terms" && <TermsModal onClose={close} />}
      {modal === "help" && (
        <HelpModal onClose={close} onNavigate={onNavigate} />
      )}
    </div>
  );
}
