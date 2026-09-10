import { useState } from "react";
import { BookOpen, CheckCircle, Lock, Play, ArrowLeft, Clock, Award, ChevronRight } from "lucide-react";
import { courses, currentStudent } from "../../data";
import Logo from "./assets/finLogo.jpg"
interface Props {
  onNavigate: (page: string) => void;
}

type AcademyView = "courses" | "course-detail" | "lesson" | "certificates";

export default function Academy({ onNavigate }: Props) {
  const [view, setView] = useState<AcademyView>("courses");
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedModule, setSelectedModule] = useState<(typeof courses[0]["moduleList"][0]) | null>(null);

  const completedCount = courses.filter(c => c.status === "completed").length;
  const certsCount = currentStudent.certificates.length;

  return (
    <div className="flex-1 overflow-y-auto bg-fin-ground pb-24 md:pb-6">

      {/* Courses list */}
      {view === "courses" && (
        <div className="p-4 md:p-6 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-fin-navy">FIN Academy</h2>
            <p className="text-fin-muted text-sm mt-1">Build career-ready skills through our structured learning program.</p>
          </div>

          {/* Progress banner */}
          <div className="bg-fin-navy rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Your Progress</p>
                <h3 className="text-white font-bold text-xl mt-0.5">{completedCount} / {courses.length} Courses</h3>
              </div>
              <button onClick={() => setView("certificates")} className="flex items-center gap-2 bg-fin-gold hover:bg-fin-gold-dark text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">
                <Award size={14} />
                {certsCount} Certificates
              </button>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-2 bg-fin-gold rounded-full transition-all" style={{ width: `${(completedCount / courses.length) * 100}%` }} />
            </div>
          </div>

          {/* Course grid */}
          <div className="space-y-4">
            {courses.map((course) => {
              const canAccess = course.status !== "locked";
              return (
                <div
                  key={course.id}
                  onClick={() => canAccess && (setSelectedCourse(course), setView("course-detail"))}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all ${canAccess ? "border-fin-border hover:shadow-md hover:border-fin-blue/30 cursor-pointer" : "border-fin-border opacity-70 cursor-not-allowed"}`}
                >
                  <div className="md:flex">
                    <div className="relative h-32 md:h-auto md:w-40 flex-shrink-0 overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      {!canAccess && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Lock size={24} className="text-white" />
                        </div>
                      )}
                      {course.status === "completed" && (
                        <div className="absolute top-2 right-2 bg-fin-green rounded-full p-1">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {course.status === "completed" && <span className="text-[10px] font-bold bg-fin-green-light text-fin-green px-2 py-0.5 rounded-full">Completed</span>}
                            {course.status === "in-progress" && <span className="text-[10px] font-bold bg-fin-gold-light text-fin-gold-dark px-2 py-0.5 rounded-full">In Progress</span>}
                            {course.status === "locked" && <span className="text-[10px] font-bold bg-fin-ground text-fin-muted px-2 py-0.5 rounded-full flex items-center gap-1"><Lock size={8} /> Locked</span>}
                          </div>
                          <h3 className="font-bold text-fin-navy text-sm leading-tight">{course.title}</h3>
                          <p className="text-fin-muted text-xs mt-1 leading-relaxed line-clamp-2">{course.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-fin-muted flex items-center gap-1"><BookOpen size={11} /> {course.modules} modules</span>
                        <span className="text-xs text-fin-muted flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                      </div>
                      {canAccess && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-fin-muted">{course.completedModules}/{course.modules} modules</span>
                            <span className="text-[10px] font-bold text-fin-blue">{course.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-fin-ground rounded-full overflow-hidden">
                            <div className={`h-1.5 rounded-full ${course.status === "completed" ? "bg-fin-green" : "bg-fin-blue"}`} style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>
                      )}
                      {canAccess && (
                        <button className={`mt-3 flex items-center gap-1.5 text-xs font-bold transition-colors ${course.status === "completed" ? "text-fin-green" : "text-fin-blue"}`}>
                          {course.status === "completed" ? <><CheckCircle size={12} /> View Certificate</> : <><Play size={12} /> {course.progress > 0 ? "Continue" : "Start"} Course</>}
                          <ChevronRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Course detail */}
      {view === "course-detail" && selectedCourse && (
        <div className="p-4 md:p-6 space-y-5 animate-fade-in">
          <button onClick={() => setView("courses")} className="flex items-center gap-2 text-fin-muted hover:text-fin-text text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Back to Courses
          </button>

          {/* Header */}
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-fin-navy/90 to-transparent flex items-end p-5">
              <div>
                <h2 className="text-white font-bold text-xl">{selectedCourse.title}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-white/70 text-xs flex items-center gap-1"><BookOpen size={11} /> {selectedCourse.modules} modules</span>
                  <span className="text-white/70 text-xs flex items-center gap-1"><Clock size={11} /> {selectedCourse.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-fin-text text-sm leading-relaxed">{selectedCourse.description}</p>

          {/* Progress */}
          {selectedCourse.status !== "locked" && (
            <div className="bg-white rounded-xl border border-fin-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-fin-navy">Your Progress</span>
                <span className="font-bold text-fin-blue text-sm">{selectedCourse.progress}%</span>
              </div>
              <div className="w-full h-2 bg-fin-ground rounded-full overflow-hidden">
                <div className={`h-2 rounded-full ${selectedCourse.status === "completed" ? "bg-fin-green" : "bg-fin-blue"}`} style={{ width: `${selectedCourse.progress}%` }} />
              </div>
              <p className="text-xs text-fin-muted mt-2">{selectedCourse.completedModules} of {selectedCourse.modules} modules completed</p>
            </div>
          )}

          {/* Module list */}
          <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
            <div className="px-5 py-4 border-b border-fin-border">
              <h3 className="font-bold text-fin-navy text-sm">Modules</h3>
            </div>
            {selectedCourse.moduleList.map((mod, i) => (
              <button
                key={mod.id}
                onClick={() => mod.status !== "locked" && (setSelectedModule(mod), setView("lesson"))}
                className={`w-full flex items-center gap-4 px-5 py-4 border-b border-fin-border last:border-0 text-left transition-colors ${mod.status === "locked" ? "opacity-60 cursor-not-allowed" : "hover:bg-fin-ground"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  mod.status === "completed" ? "bg-fin-blue" :
                  mod.status === "in-progress" ? "bg-fin-gold border-2 border-fin-gold-dark" :
                  mod.status === "locked" ? "bg-fin-ground border-2 border-fin-border" :
                  "bg-fin-ground border-2 border-fin-border"
                }`}>
                  {mod.status === "completed" ? <CheckCircle size={14} className="text-white" /> :
                   mod.status === "locked" ? <Lock size={12} className="text-fin-muted" /> :
                   <span className="text-xs font-bold text-fin-muted">{i + 1}</span>}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-fin-navy text-sm">{mod.title}</p>
                  <p className="text-xs text-fin-muted mt-0.5 flex items-center gap-1"><Clock size={10} /> {mod.duration}</p>
                </div>
                {mod.status !== "locked" && <ChevronRight size={14} className="text-fin-muted" />}
              </button>
            ))}
          </div>

          {selectedCourse.status === "completed" && (
            <button onClick={() => setView("certificates")} className="w-full flex items-center justify-center gap-2 bg-fin-gold hover:bg-fin-gold-dark text-white font-bold py-3.5 rounded-xl transition-colors">
              <Award size={16} /> View Certificate
            </button>
          )}
          {selectedCourse.status === "in-progress" && (
            <button onClick={() => { const next = selectedCourse.moduleList.find(m => m.status !== "completed" && m.status !== "locked"); if (next) { setSelectedModule(next); setView("lesson"); } }} className="w-full flex items-center justify-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl transition-colors">
              <Play size={16} /> Continue Course
            </button>
          )}
        </div>
      )}

      {/* Lesson view */}
      {view === "lesson" && selectedModule && (
        <div className="p-4 md:p-6 space-y-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <button onClick={() => setView("course-detail")} className="flex items-center gap-2 text-fin-muted hover:text-fin-text text-sm font-medium transition-colors">
              <ArrowLeft size={16} />
            </button>
            <div>
              <p className="text-xs text-fin-muted">{selectedCourse.title}</p>
              <h2 className="font-bold text-fin-navy text-base">{selectedModule.title}</h2>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-fin-ground rounded-full overflow-hidden">
            <div className="h-1 bg-fin-blue rounded-full" style={{ width: "35%" }} />
          </div>

          {/* Video placeholder */}
          <div className="bg-fin-navy rounded-2xl h-48 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              <Play size={28} className="text-white ml-1" />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-fin-border p-5 space-y-4">
            <h3 className="font-bold text-fin-navy text-base">{selectedModule.title}</h3>
            <p className="text-fin-text text-sm leading-relaxed">
              In this module, you will explore the core principles and best practices that professionals use every day. The content is designed to be practical and immediately applicable to your career development journey.
            </p>
            <p className="text-fin-text text-sm leading-relaxed">
              By the end of this module, you will have a clear understanding of how to apply these concepts in real-world professional settings, giving you a competitive edge in your internship applications and workplace performance.
            </p>
            <div className="border-t border-fin-border pt-4">
              <h4 className="font-bold text-fin-navy text-sm mb-3">Key Takeaways</h4>
              <ul className="space-y-2">
                {["Understand the foundational principles covered in this module", "Apply practical techniques to your own career context", "Identify opportunities to demonstrate these skills to employers", "Build confidence through structured knowledge and practice"].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-fin-text">
                    <CheckCircle size={14} className="text-fin-blue flex-shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button onClick={() => setView("course-detail")} className="flex items-center gap-2 border border-fin-border text-fin-navy font-semibold px-5 py-3 rounded-xl hover:bg-white transition-colors text-sm">
              <ArrowLeft size={14} /> Previous
            </button>
            <button onClick={() => setView("course-detail")} className="flex-1 flex items-center justify-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3 rounded-xl transition-colors text-sm">
              Mark as Complete <CheckCircle size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Certificates */}
      {view === "certificates" && (
        <div className="p-4 md:p-6 space-y-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <button onClick={() => setView("courses")} className="flex items-center gap-2 text-fin-muted hover:text-fin-text text-sm font-medium transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <h2 className="text-xl font-bold text-fin-navy">My Certificates</h2>
          </div>

          {currentStudent.certificates.map(cert => (
            <div key={cert.id} className="bg-white rounded-2xl border border-fin-border overflow-hidden">
              {/* Certificate preview */}
              <div className="bg-gradient-to-br from-fin-navy to-fin-navy-muted p-6 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-fin-gold/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-fin-blue/10 rounded-full translate-y-1/2 -translate-x-1/3" />
                <div className="relative">
                  {/* Certificate header with real logo */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-white rounded-xl p-0.5 flex-shrink-0">
                        <img
                          src={Logo}
                          alt="FIN"
                          className="w-full h-full object-contain"
                          draggable={false}
                        />
                      </div>
                      <div>
                        <p className="text-white font-extrabold text-sm leading-none">FIN</p>
                        <p className="text-fin-gold text-[10px] font-bold tracking-widest uppercase">Academy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-[10px]">Certificate of</p>
                      <p className="text-fin-gold text-[10px] font-bold uppercase tracking-wide">Completion</p>
                    </div>
                  </div>
                  <div className="border-t border-white/15 pt-4">
                    <p className="text-white/50 text-xs mb-1">This certifies that</p>
                    <p className="text-white font-bold text-lg leading-tight">{currentStudent.name}</p>
                    <p className="text-white/60 text-xs">{currentStudent.university} · {currentStudent.program}</p>
                    <p className="text-white/50 text-xs mt-2">has successfully completed</p>
                    <h3 className="text-fin-gold font-bold text-base leading-tight mt-1">{cert.course}</h3>
                  </div>
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/15">
                    <div>
                      <p className="text-white/40 text-[10px]">Completed</p>
                      <p className="text-white/80 text-xs font-semibold">{cert.completedAt}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px]">Certificate ID</p>
                      <p className="text-white/70 text-[10px] font-mono">{cert.certId}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 border-2 border-fin-gold/40 rounded-full flex items-center justify-center">
                        <Award size={14} className="text-fin-gold" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-fin-border text-fin-navy font-semibold py-2.5 rounded-xl hover:bg-fin-ground transition-colors text-sm">
                  <Award size={14} /> View
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-2.5 rounded-xl transition-colors text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}

          {currentStudent.certificates.length === 0 && (
            <div className="text-center py-16">
              <Award size={40} className="text-fin-border mx-auto mb-3" />
              <p className="text-fin-muted font-medium">No certificates yet</p>
              <p className="text-fin-subtle text-sm mt-1">Complete a FIN Academy course to earn your first certificate.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
