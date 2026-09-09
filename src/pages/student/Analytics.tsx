import { BookOpen, Award, Briefcase, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import { analyticsData, currentStudent, applications, courses } from "../../data";

const stats = [
  { label: "Courses Completed", value: "2", icon: BookOpen, color: "bg-fin-blue-light text-fin-blue" },
  { label: "Skills Improved", value: "5", icon: TrendingUp, color: "bg-fin-gold-light text-fin-gold-dark" },
  { label: "Applications", value: String(applications.length), icon: Briefcase, color: "bg-purple-50 text-purple-600" },
  { label: "Certificates", value: String(currentStudent.certificates.length), icon: Award, color: "bg-fin-green-light text-fin-green" }
];

export default function Analytics() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-24 md:pb-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-fin-navy">My Progress</h2>
        <p className="text-fin-muted text-sm mt-1">Track your career development and learning activity.</p>
      </div>

      {/* FIN Journey Progress */}
      <div className="bg-white rounded-2xl border border-fin-border p-5">
        <h3 className="font-bold text-fin-navy text-sm mb-4">Your FIN Journey</h3>
        <div className="flex items-center gap-0">
          {[
            { label: "Discover", done: true, color: "bg-fin-blue" },
            { label: "Learn", done: true, color: "bg-fin-gold" },
            { label: "Apply", done: true, color: "bg-fin-green" },
            { label: "Track", done: true, color: "bg-purple-500" },
            { label: "Get Placed", done: false, color: "bg-fin-navy" }
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${step.done ? step.color : "bg-fin-border"}`}>
                  {step.done ? <BookOpen size={14} /> : <span className="text-fin-subtle text-[10px]">{i + 1}</span>}
                </div>
                <span className={`text-[9px] font-bold mt-1.5 text-center leading-tight ${step.done ? "text-fin-navy" : "text-fin-subtle"}`}>{step.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 rounded-full -mt-4 ${step.done ? "bg-fin-blue/30" : "bg-fin-border"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-fin-muted mt-4 bg-fin-gold-light border border-fin-gold/20 rounded-lg px-3 py-2">
          <span className="font-bold text-fin-gold-dark">Almost there!</span> You're at the Interview stage. Keep going to get placed.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-fin-border shadow-sm text-center">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
              <s.icon size={18} />
            </div>
            <div className="text-3xl font-bold text-fin-navy">{s.value}</div>
            <div className="text-xs text-fin-muted font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Learning Intensity */}
        <div className="bg-white rounded-2xl border border-fin-border p-5">
          <h3 className="font-bold text-fin-navy text-sm mb-1">Learning Intensity</h3>
          <p className="text-fin-muted text-xs mb-4">Hours of learning per week</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={analyticsData.learningIntensity}>
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={20} />
              <Tooltip
                contentStyle={{ background: "#0D1B2A", border: "none", borderRadius: "10px", color: "white", fontSize: 12 }}
                labelStyle={{ color: "#94A3B8" }}
              />
              <Line type="monotone" dataKey="hours" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: "#2563EB", r: 4 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Application Activity */}
        <div className="bg-white rounded-2xl border border-fin-border p-5">
          <h3 className="font-bold text-fin-navy text-sm mb-1">Application Activity</h3>
          <p className="text-fin-muted text-xs mb-4">Applications submitted per month</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={analyticsData.applicationActivity} barSize={28}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={20} />
              <Tooltip
                contentStyle={{ background: "#0D1B2A", border: "none", borderRadius: "10px", color: "white", fontSize: 12 }}
                labelStyle={{ color: "#94A3B8" }}
              />
              <Bar dataKey="apps" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competency Matrix */}
      <div className="bg-white rounded-2xl border border-fin-border p-5">
        <h3 className="font-bold text-fin-navy text-sm mb-1">Competency Matrix</h3>
        <p className="text-fin-muted text-xs mb-4">Your assessed competency levels across key career dimensions</p>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={analyticsData.competencyMatrix}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "#64748B" }} />
                <Radar name="Competency" dataKey="score" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 w-full space-y-3">
            {analyticsData.competencyMatrix.map(c => (
              <div key={c.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-fin-navy">{c.skill}</span>
                  <span className="text-xs font-bold text-fin-blue">{c.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-fin-ground rounded-full overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all ${c.score >= 85 ? "bg-fin-green" : c.score >= 70 ? "bg-fin-blue" : "bg-fin-gold"}`}
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl border border-fin-border p-5">
        <h3 className="font-bold text-fin-navy text-sm mb-4">My Skills</h3>
        <div className="flex flex-wrap gap-2">
          {currentStudent.skills.map(skill => (
            <span key={skill} className="text-xs font-medium bg-fin-blue-mid text-fin-blue px-3 py-1.5 rounded-full">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
