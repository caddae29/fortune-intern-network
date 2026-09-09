import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Upload, FileText, CreditCard, AlertCircle, Lock } from "lucide-react";
import { internships, currentStudent } from "../../data";

interface Props {
  internshipId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const steps = [
  { id: 1, label: "Personal Info", short: "Profile" },
  { id: 2, label: "CV / Resume", short: "CV" },
  { id: 3, label: "Cover Letter", short: "Cover Letter" },
  { id: 4, label: "Review", short: "Review" },
  { id: 5, label: "Payment", short: "Payment" },
  { id: 6, label: "Submitted", short: "Done" }
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="px-4 md:px-6 py-4 bg-white border-b border-fin-border">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                current > s.id ? "bg-fin-blue text-white" :
                current === s.id ? "bg-fin-navy text-white" :
                "bg-fin-ground text-fin-muted border border-fin-border"
              }`}>
                {current > s.id ? <CheckCircle size={14} /> : s.id}
              </div>
              <span className={`hidden md:block text-[10px] font-medium mt-1 ${current === s.id ? "text-fin-navy" : "text-fin-muted"}`}>
                {s.short}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-4 md:w-8 mx-1 md:mx-2 transition-all ${current > s.id ? "bg-fin-blue" : "bg-fin-border"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ApplyFlow({ internshipId, onNavigate }: Props) {
  const [step, setStep] = useState(1);
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const internship = internships.find(i => i.id === internshipId) || internships[0];

  const handlePayment = () => {
    setPaymentState("processing");
    setTimeout(() => {
      setPaymentState("success");
      setTimeout(() => setStep(6), 1000);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden animate-fade-in">
      {/* Back nav */}
      <div className="bg-white border-b border-fin-border px-4 md:px-6 py-3.5 flex items-center gap-3">
        <button onClick={() => step > 1 && step < 6 ? setStep(step - 1) : onNavigate("student-marketplace")} className="flex items-center gap-2 text-fin-muted hover:text-fin-text transition-colors">
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="h-4 w-px bg-fin-border" />
        <div>
          <p className="text-xs text-fin-muted font-medium">{internship.company}</p>
          <p className="text-sm font-bold text-fin-navy">{internship.title}</p>
        </div>
      </div>

      <StepIndicator current={step} />

      <div className="flex-1 overflow-y-auto bg-fin-ground">
        <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24 md:pb-6">

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h2 className="text-xl font-bold text-fin-navy">Personal Information</h2>
                <p className="text-fin-muted text-sm mt-1">Confirm your personal and academic details.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-fin-border space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-fin-muted block mb-1.5">First Name</label>
                    <input defaultValue="Amara" className="w-full px-3.5 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-fin-muted block mb-1.5">Last Name</label>
                    <input defaultValue="Johnson" className="w-full px-3.5 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">Email Address</label>
                  <input defaultValue={currentStudent.email} className="w-full px-3.5 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">Phone Number</label>
                  <input defaultValue="+233 55 123 4567" className="w-full px-3.5 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">University</label>
                  <input defaultValue={currentStudent.university} className="w-full px-3.5 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-fin-muted block mb-1.5">Program</label>
                    <input defaultValue="BSc Computer Science" className="w-full px-3.5 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-fin-muted block mb-1.5">Level</label>
                    <select defaultValue="300" className="w-full px-3.5 py-2.5 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue bg-white">
                      <option>100</option><option>200</option><option selected>300</option><option>400</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: CV */}
          {step === 2 && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h2 className="text-xl font-bold text-fin-navy">CV / Resume</h2>
                <p className="text-fin-muted text-sm mt-1">Upload your CV or let Super generate one for you.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-fin-border">
                <div className="border-2 border-dashed border-fin-border rounded-xl p-8 text-center hover:border-fin-blue/50 transition-colors cursor-pointer">
                  <Upload size={32} className="text-fin-muted mx-auto mb-3" />
                  <p className="font-semibold text-fin-navy text-sm mb-1">Upload your CV</p>
                  <p className="text-fin-muted text-xs">PDF, DOC, DOCX up to 5MB</p>
                  <button className="mt-4 bg-fin-blue text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-fin-blue-dark transition-colors">
                    Choose File
                  </button>
                </div>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-fin-border" />
                  <span className="text-xs text-fin-muted font-medium">or</span>
                  <div className="flex-1 h-px bg-fin-border" />
                </div>
                <button className="w-full flex items-center justify-center gap-2 border-2 border-fin-gold/40 bg-fin-gold-light hover:bg-fin-gold-mid text-fin-navy font-semibold py-3 rounded-xl text-sm transition-colors">
                  ✨ Generate CV with Super AI
                </button>
              </div>
              {/* Existing CV preview */}
              <div className="bg-white rounded-2xl p-4 border border-fin-border flex items-center gap-3">
                <div className="w-10 h-10 bg-fin-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-fin-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-fin-navy">Amara_Johnson_CV_2026.pdf</p>
                  <p className="text-xs text-fin-muted">Last updated · Aug 20, 2026 · 124 KB</p>
                </div>
                <button className="text-xs font-semibold text-fin-blue hover:underline flex-shrink-0">Use this</button>
              </div>
            </div>
          )}

          {/* Step 3: Cover Letter */}
          {step === 3 && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h2 className="text-xl font-bold text-fin-navy">Cover Letter</h2>
                <p className="text-fin-muted text-sm mt-1">Write a cover letter or let Super draft one for you.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-fin-border space-y-4">
                <button className="w-full flex items-center justify-center gap-2 border-2 border-fin-gold/40 bg-fin-gold-light hover:bg-fin-gold-mid text-fin-navy font-semibold py-3 rounded-xl text-sm transition-colors">
                  ✨ Write Cover Letter with Super AI
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-fin-border" />
                  <span className="text-xs text-fin-muted font-medium">or write your own</span>
                  <div className="flex-1 h-px bg-fin-border" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-fin-muted block mb-1.5">Cover Letter</label>
                  <textarea
                    rows={10}
                    className="w-full px-3.5 py-3 border border-fin-border rounded-xl text-sm focus:outline-none focus:border-fin-blue focus:ring-2 focus:ring-fin-blue/10 resize-none"
                    defaultValue={`Dear Hiring Manager,

I am excited to apply for the ${internship.title} position at ${internship.company}. As a Level 300 Computer Science student at the University of Ghana with hands-on experience in software development, I am confident in my ability to make a meaningful contribution to your team.

Throughout my academic journey, I have developed strong skills in JavaScript, React, and Python, which align well with the technical requirements of this role. My experience working on real-world projects including a Student Record System and a Market Price Tracker has given me practical exposure to the full software development lifecycle.

I am eager to bring my enthusiasm, technical skills, and strong work ethic to ${internship.company} and would welcome the opportunity to discuss how I can contribute to your team.

Thank you for considering my application.

Sincerely,
Amara Johnson`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h2 className="text-xl font-bold text-fin-navy">Review Application</h2>
                <p className="text-fin-muted text-sm mt-1">Check everything before submitting.</p>
              </div>
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="bg-fin-navy px-5 py-4">
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Applying for</p>
                  <h3 className="text-white font-bold text-lg mt-0.5">{internship.title}</h3>
                  <p className="text-white/70 text-sm">{internship.company} · {internship.location}</p>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { label: "Applicant", value: currentStudent.name },
                    { label: "Email", value: currentStudent.email },
                    { label: "University", value: currentStudent.university },
                    { label: "Program", value: currentStudent.program },
                    { label: "CV", value: "Amara_Johnson_CV_2026.pdf ✓" },
                    { label: "Cover Letter", value: "Included ✓" }
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-fin-border last:border-0">
                      <span className="text-xs font-semibold text-fin-muted">{item.label}</span>
                      <span className="text-sm font-medium text-fin-navy">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-fin-blue-light border border-fin-blue/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle size={16} className="text-fin-blue flex-shrink-0 mt-0.5" />
                <p className="text-sm text-fin-blue">A non-refundable application processing fee of <strong>GHS 50</strong> is required to complete your application. You will be redirected to Paystack to complete payment.</p>
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {step === 5 && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h2 className="text-xl font-bold text-fin-navy">Complete Payment</h2>
                <p className="text-fin-muted text-sm mt-1">Your application is ready. Complete payment to submit.</p>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-fin-border overflow-hidden">
                <div className="px-5 py-4 border-b border-fin-border">
                  <h3 className="font-bold text-fin-navy text-sm">Payment Summary</h3>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { label: "Internship", value: internship.title },
                    { label: "Company", value: internship.company },
                    { label: "Applicant", value: currentStudent.name }
                  ].map(item => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-xs text-fin-muted">{item.label}</span>
                      <span className="text-xs font-medium text-fin-navy">{item.value}</span>
                    </div>
                  ))}
                  <div className="border-t border-fin-border pt-3 flex justify-between">
                    <span className="text-sm font-bold text-fin-navy">Application Fee</span>
                    <span className="text-sm font-bold text-fin-navy">GHS 50.00</span>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="flex items-center gap-2 text-xs text-fin-muted bg-white border border-fin-border rounded-xl p-3">
                <Lock size={12} className="text-fin-green" />
                <span>Secured by <strong>Paystack</strong> · 256-bit SSL encryption · Your payment is safe</span>
              </div>

              {/* Paystack button */}
              {paymentState === "idle" && (
                <button
                  onClick={handlePayment}
                  className="w-full flex items-center justify-center gap-3 bg-[#00C3F7] hover:bg-[#00afd9] text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg"
                >
                  <CreditCard size={18} />
                  Pay GHS 50 with Paystack
                </button>
              )}

              {paymentState === "processing" && (
                <div className="w-full flex items-center justify-center gap-3 bg-fin-ground border border-fin-border py-4 rounded-xl">
                  <div className="w-4 h-4 border-2 border-fin-blue border-t-transparent rounded-full animate-spin" />
                  <span className="text-fin-navy font-semibold">Processing payment...</span>
                </div>
              )}

              {paymentState === "success" && (
                <div className="w-full flex flex-col items-center justify-center gap-2 bg-fin-green-light border border-fin-green/30 py-5 rounded-xl">
                  <CheckCircle size={28} className="text-fin-green" />
                  <span className="text-fin-green font-bold">Payment Successful!</span>
                  <span className="text-fin-muted text-sm">Submitting your application...</span>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Submitted */}
          {step === 6 && (
            <div className="animate-fade-scale text-center py-8 space-y-6">
              <div className="w-24 h-24 bg-fin-green-light rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={48} className="text-fin-green" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-fin-navy mb-2">Application Submitted!</h2>
                <p className="text-fin-muted">Your application to <strong>{internship.company}</strong> has been submitted successfully.</p>
              </div>
              <div className="bg-white rounded-2xl border border-fin-border p-5 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-fin-muted">Reference</span>
                  <span className="text-xs font-mono font-bold text-fin-navy">FIN-APP-2026-00{Math.floor(Math.random() * 900 + 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-fin-muted">Payment</span>
                  <span className="text-xs font-medium text-fin-green">GHS 50 · Confirmed ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-fin-muted">Submitted</span>
                  <span className="text-xs font-medium text-fin-navy">Sep 9, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-fin-muted">Expected review</span>
                  <span className="text-xs font-medium text-fin-navy">Within 72 hours</span>
                </div>
              </div>
              {/* Automation log */}
              <div className="bg-white rounded-2xl border border-fin-border p-5 text-left">
                <h4 className="text-xs font-bold text-fin-navy uppercase tracking-wide mb-4">FIN Automation Status</h4>
                {[
                  { done: true, text: "Application submitted" },
                  { done: true, text: "Payment confirmed (GHS 50)" },
                  { done: true, text: "FIN screening started" },
                  { done: false, text: "Application email being prepared...", active: true },
                  { done: false, text: "Awaiting employer review" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-fin-border last:border-0">
                    {item.done ? (
                      <CheckCircle size={14} className="text-fin-green flex-shrink-0" />
                    ) : item.active ? (
                      <div className="w-3.5 h-3.5 border-2 border-fin-blue border-t-transparent rounded-full animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-fin-border flex-shrink-0" />
                    )}
                    <span className={`text-xs ${item.done ? "text-fin-navy" : item.active ? "text-fin-blue font-medium" : "text-fin-muted"}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate("student-tracking")}
                  className="flex-1 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  Track Application
                </button>
                <button
                  onClick={() => onNavigate("student-marketplace")}
                  className="flex-1 border border-fin-border text-fin-navy font-semibold py-3.5 rounded-xl hover:bg-fin-ground transition-colors"
                >
                  Browse More
                </button>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 5 && (
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 border border-fin-border text-fin-navy font-semibold px-5 py-3 rounded-xl hover:bg-white transition-colors text-sm">
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 flex items-center justify-center gap-2 bg-fin-blue hover:bg-fin-blue-dark text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                {step === 4 ? "Proceed to Payment" : "Continue"} <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
