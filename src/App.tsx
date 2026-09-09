import { useState } from "react";
import logo from "./imports/fin-logo.jpeg";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import StudentShell from "./layouts/StudentShell";
import Overview from "./pages/student/Overview";
import Marketplace from "./pages/student/Marketplace";
import ApplyFlow from "./pages/student/ApplyFlow";
import Tracking from "./pages/student/Tracking";
import Academy from "./pages/student/Academy";
import Profile from "./pages/student/Profile";
import Announcements from "./pages/student/Announcements";
import Analytics from "./pages/student/Analytics";
import Notifications from "./pages/student/Notifications";
import Saved from "./pages/student/Saved";
import SuperPanel from "./pages/student/Super";
import Employer from "./pages/employer/Employer";
import Admin from "./pages/admin/Admin";

type Page =
  | "landing"
  | "login"
  | "signup"
  | "student-overview"
  | "student-marketplace"
  | "student-apply"
  | "student-tracking"
  | "student-academy"
  | "student-profile"
  | "student-announcements"
  | "student-analytics"
  | "student-notifications"
  | "student-saved"
  | "employer-dashboard"
  | "admin-dashboard";

type PageParams = Record<string, string>;

const STUDENT_PAGES: Page[] = [
  "student-overview",
  "student-marketplace",
  "student-apply",
  "student-tracking",
  "student-academy",
  "student-profile",
  "student-announcements",
  "student-analytics",
  "student-notifications",
  "student-saved",
];

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [params, setParams] = useState<PageParams>({});
  const [showSuper, setShowSuper] = useState(false);

  const navigate = (targetPage: string, newParams?: PageParams) => {
    setPage(targetPage as Page);
    setParams(newParams || {});
    setShowSuper(false);
  };

  const isStudentPage = STUDENT_PAGES.includes(page);

  if (page === "landing") return <Landing onNavigate={navigate} />;
  if (page === "login") return <Auth mode="login" onNavigate={navigate} />;
  if (page === "signup") return <Auth mode="signup" onNavigate={navigate} />;
  if (page === "employer-dashboard") return <Employer onNavigate={navigate} />;
  if (page === "admin-dashboard") return <Admin onNavigate={navigate} />;

  if (isStudentPage) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <StudentShell
          activePage={page}
          onNavigate={navigate}
          showSuper={showSuper}
          onToggleSuper={() => setShowSuper(!showSuper)}
        >
          {/* Student page content */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            {page === "student-overview" && <Overview onNavigate={navigate} />}
            {page === "student-marketplace" && (
              <Marketplace
                onNavigate={navigate}
                initialInternshipId={params.id}
              />
            )}
            {page === "student-apply" && (
              <ApplyFlow
                internshipId={params.id || "int-001"}
                onNavigate={navigate}
              />
            )}
            {page === "student-tracking" && <Tracking onNavigate={navigate} />}
            {page === "student-academy" && <Academy onNavigate={navigate} />}
            {page === "student-profile" && <Profile onNavigate={navigate} />}
            {page === "student-announcements" && (
              <Announcements onNavigate={navigate} />
            )}
            {page === "student-analytics" && <Analytics />}
            {page === "student-notifications" && (
              <Notifications onNavigate={navigate} />
            )}
            {page === "student-saved" && <Saved onNavigate={navigate} />}
          </div>
        </StudentShell>

        {/* Super AI Panel - overlay */}
        {showSuper && (
          <>
            {/* Mobile: bottom sheet */}
            <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShowSuper(false)}
              />
              <div
                className="relative bg-white rounded-t-3xl overflow-hidden animate-slide-up"
                style={{ height: "85vh" }}
              >
                <SuperPanel onClose={() => setShowSuper(false)} />
              </div>
            </div>

            {/* Desktop: side panel */}
            <div className="hidden md:flex fixed right-0 top-0 bottom-0 w-96 z-50 flex-col bg-white shadow-2xl border-l border-fin-border animate-slide-up">
              <SuperPanel onClose={() => setShowSuper(false)} />
            </div>
          </>
        )}

        {/* Floating Super button (mobile, not shown when super is open) */}
        {!showSuper && (
          <button
            onClick={() => setShowSuper(true)}
            className="md:hidden fixed right-4 bottom-20 z-40 w-14 h-14 shadow-xl rounded-2xl overflow-hidden border-2 border-fin-gold/50 bg-white hover:scale-105 transition-transform"
            style={{ boxShadow: "0 4px 24px rgba(245, 158, 11, 0.45)" }}
            aria-label="Open Super AI Assistant"
          >
            <img
              src={logo}
              alt="Super AI"
              className="w-full h-full object-contain p-0.5"
              draggable={false}
            />
          </button>
        )}
      </div>
    );
  }

  return <Landing onNavigate={navigate} />;
}
