import { useState } from "react";
import { CheckCircle, Clock, Circle, ChevronRight, FileText, AlertCircle, Zap } from "lucide-react";
import { applications } from "../../data";

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const statusColors: Record<string, string> = {
  applied: "bg-fin-blue-light text-fin-blue",
  review: "bg-fin-gold-light text-fin-gold-dark",
  interview: "bg-purple-50 text-purple-600",
  offer: "bg-fin-green-light text-fin-green"
};

const statusLabels: Record<string, string> = {
  applied: "Applied",
  review: "Under Review",
  interview: "Interview",
  offer: "Offer Received"
};

export default function Tracking({ onNavigate }: Props) {
  const [selectedApp, setSelectedApp] = useState(applications[0]);

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden animate-fade-in">
      {/* Left: application list */}
      <div className="md:w-80 lg:w-96 flex-shrink-0 border-b md:border-b-0 md:border-r border-fin-border bg-white overflow-y-auto">
        <div className="p-4 border-b border-fin-border">
          <h2 className="font-bold text-fin-navy text-base">My Applications</h2>
          <p className="text-fin-muted text-xs mt-0.5">{applications.length} active applications</p>
        </div>
        <div className="p-3 space-y-2">
          {applications.map(app => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selectedApp.id === app.id ? "border-fin-blue bg-fin-blue-light" : "border-fin-border bg-white hover:shadow-sm"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-fin-ground overflow-hidden border border-fin-border flex-shrink-0">
                  <img src={app.companyLogo} alt={app.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-fin-navy truncate">{app.internship}</p>
                  <p className="text-xs text-fin-muted">{app.company}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[app.status]}`}>
                      {statusLabels[app.status]}
                    </span>
                    <span className="text-[10px] text-fin-muted">{app.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
          {applications.length === 0 && (
            <div className="text-center py-12">
              <FileText size={28} className="text-fin-border mx-auto mb-2" />
              <p className="text-fin-muted text-sm">No applications yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: detail */}
      {selectedApp && (
        <div className="flex-1 overflow-y-auto bg-fin-ground p-4 md:p-6 pb-24 md:pb-6">
          <div className="max-w-2xl space-y-5">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-fin-ground overflow-hidden border border-fin-border flex-shrink-0">
                  <img src={selectedApp.companyLogo} alt={selectedApp.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-fin-navy text-lg">{selectedApp.internship}</h2>
                  <p className="text-fin-muted text-sm">{selectedApp.company}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[selectedApp.status]}`}>
                      {statusLabels[selectedApp.status]}
                    </span>
                    <span className="text-xs text-fin-muted bg-fin-ground px-2.5 py-1 rounded-full">Ref: {selectedApp.reference}</span>
                    <span className="text-xs text-fin-muted">Submitted: {selectedApp.submittedAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FIN screening promise */}
            {selectedApp.status === "review" && (
              <div className="bg-fin-blue-light border border-fin-blue/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle size={16} className="text-fin-blue flex-shrink-0 mt-0.5" />
                <p className="text-sm text-fin-blue">Your application is currently being reviewed. <strong>FIN's screening team aims to review all applications within 72 hours.</strong> You will be notified of any status change.</p>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <h3 className="font-bold text-fin-navy text-sm mb-5">Application Timeline</h3>
              <div className="space-y-0">
                {selectedApp.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Icon column */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        item.completed ? "bg-fin-blue" :
                        (item as any).active ? "bg-fin-gold border-2 border-fin-gold-dark" :
                        "bg-white border-2 border-fin-border"
                      }`}>
                        {item.completed ? (
                          <CheckCircle size={14} className="text-white" />
                        ) : (item as any).active ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse-dot" />
                        ) : (
                          <Circle size={10} className="text-fin-border" />
                        )}
                      </div>
                      {i < selectedApp.timeline.length - 1 && (
                        <div className={`w-0.5 flex-1 my-1 ${item.completed ? "bg-fin-blue" : "bg-fin-border"}`} style={{ minHeight: "24px" }} />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`pb-5 flex-1 ${i === selectedApp.timeline.length - 1 ? "pb-0" : ""}`}>
                      <div className="flex items-center justify-between">
                        <p className={`font-bold text-sm ${item.completed ? "text-fin-navy" : (item as any).active ? "text-fin-gold-dark" : "text-fin-muted"}`}>
                          {item.stage}
                        </p>
                        {item.date && <span className="text-xs text-fin-muted">{item.date}</span>}
                      </div>
                      {item.note && <p className={`text-xs mt-0.5 leading-relaxed ${(item as any).active ? "text-fin-navy font-medium" : "text-fin-muted"}`}>{item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation log */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-fin-gold" />
                <h3 className="font-bold text-fin-navy text-sm">FIN Automation Activity</h3>
              </div>
              <div className="space-y-2">
                {selectedApp.automationLog.map((log, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-fin-border last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-fin-blue flex-shrink-0" />
                      <span className="text-xs text-fin-navy">{log.event}</span>
                    </div>
                    <span className="text-[10px] text-fin-muted flex-shrink-0 ml-2">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment info */}
            <div className="bg-white rounded-2xl border border-fin-border p-5">
              <h3 className="font-bold text-fin-navy text-sm mb-3">Payment Information</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-fin-muted">Application fee</span>
                <span className="text-sm font-bold text-fin-navy">GHS 50.00</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-fin-muted">Status</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-fin-green-light text-fin-green">Paid ✓</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-fin-muted">Reference</span>
                <span className="text-xs font-mono text-fin-muted">{selectedApp.paymentRef}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
