import { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip, Sparkles, RefreshCw, FileText, Briefcase, MessageSquare } from "lucide-react";
import { currentStudent } from "../../data";
import Logo from "../../assets/finLogo.jpg"
interface Props {
  onClose: () => void;
}

type Message = {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
};

const suggestions = [
  { icon: FileText, text: "Help me write a cover letter" },
  { icon: FileText, text: "Build my CV" },
  { icon: Briefcase, text: "Find internships for me" },
  { icon: MessageSquare, text: "Prepare me for an interview" },
  { icon: RefreshCw, text: "Improve my application" },
  { icon: Sparkles, text: "Improve my professional profile" }
];

const aiResponses: Record<string, string> = {
  "Help me write a cover letter": "I'd love to help you write a compelling cover letter! Based on your profile as a Level 300 Computer Science student at the University of Ghana with skills in Python, JavaScript, and React, here's what I'll need:\n\n• Which internship are you applying for?\n• What's the company name?\n• Are there any specific requirements or responsibilities you want to address?\n\nOnce you share these details, I'll draft a professional, personalized cover letter tailored to the role.",
  "Build my CV": "Let me build a professional CV for you based on your FIN profile!\n\n✅ **Personal Information** — Amara Johnson\n✅ **Education** — BSc Computer Science, University of Ghana, Level 300\n✅ **Skills** — Python, JavaScript, React, Data Analysis, SQL\n✅ **Experience** — IT Volunteer, GhanaCode Foundation\n✅ **Projects** — Student Record System, Market Price Tracker\n✅ **Certificates** — 2 FIN Academy certificates\n\nI'll format this into a clean, ATS-friendly CV. Shall I generate it now?",
  "Find internships for me": "Based on your Computer Science background and skills in Python, JavaScript, and React, here are my top recommendations for you:\n\n🌟 **92% Match** — Software Development Intern @ MTN Ghana\n→ GHS 1,200/month · Hybrid · Deadline: Sep 30\n\n🌟 **87% Match** — Data Analytics Intern @ Ecobank Ghana\n→ GHS 1,000/month · On-site · Deadline: Oct 15\n\n🌟 **79% Match** — UI/UX Design Intern @ Hubtel\n→ GHS 1,100/month · Hybrid · Deadline: Oct 20\n\nWould you like me to help you apply to any of these?",
  "Prepare me for an interview": "Great — let's get you interview-ready! Here are some common questions for a Software Development internship, plus tips on how to answer them:\n\n**1. Tell me about yourself.**\n→ Start with your name, university, program, and key skills. Mention 1-2 relevant projects.\n\n**2. Why do you want to intern here?**\n→ Research the company. Mention their products, culture, or impact. Be specific.\n\n**3. Tell me about a technical challenge you solved.**\n→ Use the STAR method: Situation, Task, Action, Result.\n\nWould you like me to run a mock interview with you?",
  default: "That's a great question! I'm Super, your FIN Career Assistant. I'm here to help you discover opportunities, build your application materials, and grow your career. Could you tell me a bit more about what you need so I can give you the most helpful response?"
};

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-white border border-fin-border flex-shrink-0 p-0.5 shadow-sm">
        <img src={Logo} alt="Super" className="w-full h-full object-contain" draggable={false} />
      </div>
      <div className="bg-white border border-fin-border rounded-2xl rounded-tl-none px-4 py-3">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-fin-muted animate-pulse-dot" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Super({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "ai",
      content: `Hi ${currentStudent.firstName}! 👋 I'm **Super**, your FIN Career Assistant.\n\nI can help you:\n• Write cover letters and CVs\n• Find matching internships\n• Prepare for interviews\n• Improve your applications\n• Answer career questions\n\nWhat can I help you with today?`,
      timestamp: "Just now"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: "Just now"
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responseKey = Object.keys(aiResponses).find(k => text.toLowerCase().includes(k.toLowerCase().slice(0, 10)));
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "ai",
        content: responseKey ? aiResponses[responseKey] : aiResponses.default,
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-bold text-fin-navy">{line.slice(2, -2)}</p>;
      }
      if (line.includes("**")) {
        const parts = line.split(/(\*\*[^*]+\*\*)/);
        return (
          <p key={i} className="text-sm leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith("**") ? <strong key={j}>{part.slice(2, -2)}</strong> : part
            )}
          </p>
        );
      }
      if (line.startsWith("→") || line.startsWith("•")) {
        return <p key={i} className="text-sm leading-relaxed pl-2">{line}</p>;
      }
      return line ? <p key={i} className="text-sm leading-relaxed">{line}</p> : <div key={i} className="h-1" />;
    });
  };

  return (
    <div className="flex flex-col h-full bg-fin-ground">
      {/* Header */}
      <div className="bg-fin-navy px-4 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* FIN logo mark */}
          <div className="w-10 h-10 bg-white rounded-xl p-0.5 flex-shrink-0 shadow-sm">
            <img
              src={Logo}
              alt="FIN"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          <div>
            <h2 className="font-bold text-white text-base leading-none">Super</h2>
            <p className="text-fin-gold text-[10px] font-semibold mt-0.5">Your FIN Career Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-fin-green/20 border border-fin-green/30 rounded-full px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-fin-green animate-pulse-dot" />
            <span className="text-fin-green text-[10px] font-semibold">Online</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ml-1">
            <X size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-xl bg-white border border-fin-border flex-shrink-0 p-0.5 shadow-sm">
                <img src={Logo} alt="Super" className="w-full h-full object-contain" draggable={false} />
              </div>
            )}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img src={currentStudent.avatar} alt="You" className="w-full h-full object-cover" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === "ai"
                ? "bg-white border border-fin-border rounded-tl-none"
                : "bg-fin-blue text-white rounded-tr-none"
            }`}>
              <div className={`space-y-1 ${msg.role === "user" ? "text-white" : "text-fin-text"}`}>
                {formatContent(msg.content)}
              </div>
              <p className={`text-[10px] mt-2 ${msg.role === "user" ? "text-white/50" : "text-fin-subtle"}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {suggestions.map(s => (
              <button
                key={s.text}
                onClick={() => sendMessage(s.text)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-fin-border rounded-xl text-xs font-medium text-fin-navy hover:border-fin-blue/40 hover:bg-fin-blue-light transition-colors whitespace-nowrap flex-shrink-0"
              >
                <s.icon size={12} className="text-fin-blue" /> {s.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 flex-shrink-0">
        <div className="flex items-end gap-2 bg-white border border-fin-border rounded-2xl px-3 py-2">
          <button className="w-8 h-8 flex items-center justify-center text-fin-muted hover:text-fin-text transition-colors flex-shrink-0">
            <Paperclip size={16} />
          </button>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Ask Super anything about your career..."
            rows={1}
            className="flex-1 text-sm text-fin-text placeholder:text-fin-muted resize-none focus:outline-none bg-transparent py-1"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${input.trim() ? "bg-fin-blue hover:bg-fin-blue-dark" : "bg-fin-ground"}`}
          >
            <Send size={14} className={input.trim() ? "text-white" : "text-fin-muted"} />
          </button>
        </div>
        <p className="text-center text-[10px] text-fin-subtle mt-2">Super is AI-powered. Always verify important information.</p>
      </div>
    </div>
  );
}
