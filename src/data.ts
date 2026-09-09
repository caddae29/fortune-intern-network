export const currentStudent = {
  id: "s001",
  name: "Amara Johnson",
  firstName: "Amara",
  email: "amara.johnson@ug.edu.gh",
  university: "University of Ghana",
  program: "BSc Computer Science",
  level: "Level 300",
  avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format",
  profileCompletion: 75,
  bio: "Passionate Computer Science student interested in software engineering, data analytics, and product development. Actively seeking internship opportunities to grow my career.",
  skills: ["Python", "JavaScript", "Data Analysis", "React", "SQL", "Communication", "Microsoft Office", "Teamwork", "Problem Solving"],
  careerInterests: ["Software Engineering", "Data Science", "Product Management"],
  education: [
    { institution: "University of Ghana", degree: "BSc Computer Science", year: "2022 – Present", gpa: "3.6/4.0" }
  ],
  experience: [
    { role: "IT Volunteer", org: "GhanaCode Foundation", period: "Jun 2023 – Aug 2023", description: "Assisted in teaching basic programming skills to youth in underserved communities." }
  ],
  projects: [
    { name: "Student Record System", description: "Built a web-based student record management system using React and Node.js.", tech: ["React", "Node.js", "MySQL"] },
    { name: "Market Price Tracker", description: "Developed a data scraping tool to monitor commodity prices across Ghanaian markets.", tech: ["Python", "BeautifulSoup", "PostgreSQL"] }
  ],
  certificates: [
    { id: "cert-001", course: "Professional Communication for the Modern Workplace", completedAt: "Aug 14, 2026", certId: "FIN-ACAD-2026-1847" },
    { id: "cert-002", course: "Microsoft Office Essentials", completedAt: "Jul 28, 2026", certId: "FIN-ACAD-2026-1521" }
  ]
};

export const internships = [
  {
    id: "int-001",
    title: "Software Development Intern",
    company: "MTN Ghana",
    companyLogo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop&auto=format",
    location: "Accra, Ghana",
    arrangement: "Hybrid",
    type: "Paid",
    stipend: "GHS 1,200 / month",
    deadline: "Sep 30, 2026",
    industry: "Telecommunications",
    skills: ["JavaScript", "React", "Node.js", "SQL"],
    matchScore: 92,
    description: "Join MTN Ghana's digital innovation team as a Software Development Intern. You will work alongside experienced engineers to build and maintain web applications that serve millions of MTN customers across Ghana.",
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Collaborate with the product team to implement new features",
      "Write clean, well-documented, and testable code",
      "Participate in code reviews and team stand-ups",
      "Assist in debugging and resolving technical issues"
    ],
    requirements: [
      "Currently enrolled in BSc Computer Science or related field (Level 200+)",
      "Basic knowledge of JavaScript, HTML, and CSS",
      "Familiarity with React or any frontend framework",
      "Good communication and teamwork skills",
      "Ability to commit to a minimum of 3 months"
    ],
    benefits: ["Monthly stipend of GHS 1,200", "Mentorship from senior engineers", "Opportunity for full-time offer", "Flexible working hours", "Access to MTN learning resources"],
    postedAt: "Sep 2, 2026",
    saved: false
  },
  {
    id: "int-002",
    title: "Data Analytics Intern",
    company: "Ecobank Ghana",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&auto=format",
    location: "Accra, Ghana",
    arrangement: "On-site",
    type: "Paid",
    stipend: "GHS 1,000 / month",
    deadline: "Oct 15, 2026",
    industry: "Banking & Finance",
    skills: ["Python", "SQL", "Data Analysis", "Excel", "Tableau"],
    matchScore: 87,
    description: "Ecobank is looking for a motivated Data Analytics Intern to join our Business Intelligence team. You will help analyze financial data and generate insights that drive business decisions.",
    responsibilities: [
      "Analyze large datasets to identify trends and business insights",
      "Build and maintain data dashboards using Tableau",
      "Assist in writing SQL queries for data extraction",
      "Prepare reports and presentations for management",
      "Support the BI team in day-to-day analytics operations"
    ],
    requirements: [
      "Studying Finance, Statistics, Computer Science or related field",
      "Proficiency in Microsoft Excel",
      "Basic knowledge of SQL or Python",
      "Strong analytical and problem-solving skills",
      "Attention to detail and accuracy"
    ],
    benefits: ["GHS 1,000 monthly stipend", "Banking sector exposure", "Professional mentorship", "Networking opportunities"],
    postedAt: "Sep 5, 2026",
    saved: true
  },
  {
    id: "int-003",
    title: "Marketing & Communications Intern",
    company: "Vodafone Ghana",
    companyLogo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=80&h=80&fit=crop&auto=format",
    location: "Accra, Ghana",
    arrangement: "Remote",
    type: "Paid",
    stipend: "GHS 800 / month",
    deadline: "Oct 5, 2026",
    industry: "Telecommunications",
    skills: ["Communication", "Social Media", "Content Writing", "Microsoft Office"],
    matchScore: 74,
    description: "Vodafone Ghana is seeking a creative and motivated Marketing Intern to support our communications and brand team.",
    responsibilities: [
      "Create content for social media platforms",
      "Assist in campaign planning and execution",
      "Monitor social media analytics and report on performance",
      "Support event coordination and brand activations",
      "Research market trends and competitor activities"
    ],
    requirements: [
      "Studying Marketing, Communications, Business, or related field",
      "Excellent written and verbal communication skills",
      "Familiarity with social media platforms",
      "Creative mindset and eye for design",
      "Proficiency in Microsoft Office Suite"
    ],
    benefits: ["GHS 800 monthly stipend", "Creative work environment", "Brand experience", "Flexible remote work"],
    postedAt: "Sep 7, 2026",
    saved: false
  },
  {
    id: "int-004",
    title: "Finance & Accounting Intern",
    company: "GCB Bank",
    companyLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format",
    location: "Kumasi, Ghana",
    arrangement: "On-site",
    type: "Paid",
    stipend: "GHS 900 / month",
    deadline: "Sep 25, 2026",
    industry: "Banking & Finance",
    skills: ["Accounting", "Excel", "Financial Reporting", "Attention to Detail"],
    matchScore: 61,
    description: "GCB Bank is offering a Finance & Accounting internship for students looking to gain hands-on experience in banking operations and financial reporting.",
    responsibilities: [
      "Support daily accounting operations and reconciliations",
      "Prepare financial reports and summaries",
      "Assist in internal audit processes",
      "Maintain accurate financial records",
      "Handle data entry and financial documentation"
    ],
    requirements: [
      "Studying Accounting, Finance, or Economics",
      "Strong numerical and analytical skills",
      "Proficiency in Microsoft Excel",
      "High attention to detail and accuracy",
      "Integrity and professionalism"
    ],
    benefits: ["GHS 900 monthly stipend", "Banking operations experience", "Structured mentorship", "Certificate upon completion"],
    postedAt: "Sep 1, 2026",
    saved: false
  },
  {
    id: "int-005",
    title: "UI/UX Design Intern",
    company: "Hubtel",
    companyLogo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=80&h=80&fit=crop&auto=format",
    location: "Accra, Ghana",
    arrangement: "Hybrid",
    type: "Paid",
    stipend: "GHS 1,100 / month",
    deadline: "Oct 20, 2026",
    industry: "Fintech & Technology",
    skills: ["Figma", "UI/UX Design", "Prototyping", "User Research", "Adobe XD"],
    matchScore: 79,
    description: "Hubtel, Ghana's leading digital payment and commerce platform, is looking for a creative UI/UX Design Intern to join our product design team.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Create wireframes, prototypes, and design specifications",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Maintain and evolve the Hubtel design system"
    ],
    requirements: [
      "Studying Graphic Design, Computer Science, or related field",
      "Proficiency in Figma or Adobe XD",
      "Portfolio demonstrating UI/UX design work",
      "Understanding of user-centered design principles",
      "Strong creative and visual communication skills"
    ],
    benefits: ["GHS 1,100 monthly stipend", "Cutting-edge tech environment", "Design portfolio opportunity", "Mentorship from senior designers"],
    postedAt: "Sep 8, 2026",
    saved: true
  }
];

export const applications = [
  {
    id: "app-001",
    internshipId: "int-001",
    internship: "Software Development Intern",
    company: "MTN Ghana",
    companyLogo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop&auto=format",
    reference: "FIN-APP-2026-00847",
    status: "interview",
    submittedAt: "Sep 3, 2026",
    lastUpdate: "Sep 7, 2026",
    paymentStatus: "paid",
    paymentRef: "PAY-MTN-2026-4471",
    timeline: [
      { stage: "Applied", completed: true, date: "Sep 3, 2026", note: "Application submitted successfully" },
      { stage: "Payment Confirmed", completed: true, date: "Sep 3, 2026", note: "Application fee of GHS 50 received" },
      { stage: "FIN Screening", completed: true, date: "Sep 4, 2026", note: "FIN team reviewed and approved your application" },
      { stage: "Company Notified", completed: true, date: "Sep 4, 2026", note: "Application email sent to MTN Ghana HR" },
      { stage: "Under Review", completed: true, date: "Sep 5, 2026", note: "MTN Ghana is reviewing your application" },
      { stage: "Interview", completed: false, date: "Sep 7, 2026", note: "Interview scheduled for September 14, 2026 at 10:00 AM", active: true },
      { stage: "Offer", completed: false, date: null, note: "" }
    ],
    automationLog: [
      { event: "Application submitted", time: "Sep 3 · 09:14 AM" },
      { event: "Payment confirmed (GHS 50)", time: "Sep 3 · 09:15 AM" },
      { event: "FIN screening started", time: "Sep 3 · 09:16 AM" },
      { event: "Application email sent to MTN Ghana", time: "Sep 4 · 08:00 AM" },
      { event: "Application moved to Under Review", time: "Sep 5 · 02:30 PM" },
      { event: "Interview invitation sent", time: "Sep 7 · 11:00 AM" }
    ]
  },
  {
    id: "app-002",
    internshipId: "int-002",
    internship: "Data Analytics Intern",
    company: "Ecobank Ghana",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&auto=format",
    reference: "FIN-APP-2026-00911",
    status: "review",
    submittedAt: "Sep 6, 2026",
    lastUpdate: "Sep 8, 2026",
    paymentStatus: "paid",
    paymentRef: "PAY-ECO-2026-5523",
    timeline: [
      { stage: "Applied", completed: true, date: "Sep 6, 2026", note: "Application submitted successfully" },
      { stage: "Payment Confirmed", completed: true, date: "Sep 6, 2026", note: "Application fee of GHS 50 received" },
      { stage: "FIN Screening", completed: true, date: "Sep 7, 2026", note: "Application approved by FIN team" },
      { stage: "Company Notified", completed: true, date: "Sep 7, 2026", note: "Application sent to Ecobank HR" },
      { stage: "Under Review", completed: false, date: "Sep 8, 2026", note: "Ecobank is reviewing your application. Expected response within 5–7 business days.", active: true },
      { stage: "Interview", completed: false, date: null, note: "" },
      { stage: "Offer", completed: false, date: null, note: "" }
    ],
    automationLog: [
      { event: "Application submitted", time: "Sep 6 · 02:45 PM" },
      { event: "Payment confirmed (GHS 50)", time: "Sep 6 · 02:46 PM" },
      { event: "FIN screening started", time: "Sep 6 · 02:47 PM" },
      { event: "FIN screening completed", time: "Sep 7 · 09:00 AM" },
      { event: "Application email sent to Ecobank Ghana", time: "Sep 7 · 09:01 AM" },
      { event: "Application moved to Under Review", time: "Sep 8 · 10:15 AM" }
    ]
  }
];

export const courses = [
  {
    id: "course-001",
    title: "Professional Communication for the Modern Workplace",
    description: "Master verbal, written, and digital communication skills essential for career success in today's professional environment.",
    modules: 5,
    completedModules: 5,
    duration: "4 hours",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format",
    status: "completed",
    progress: 100,
    moduleList: [
      { id: "m-001", title: "Introduction to Professional Communication", duration: "25 min", status: "completed" },
      { id: "m-002", title: "Written Communication & Email Etiquette", duration: "40 min", status: "completed" },
      { id: "m-003", title: "Verbal Communication & Public Speaking", duration: "45 min", status: "completed" },
      { id: "m-004", title: "Digital Communication & Social Media", duration: "35 min", status: "completed" },
      { id: "m-005", title: "Workplace Communication Strategies", duration: "55 min", status: "completed" }
    ]
  },
  {
    id: "course-002",
    title: "Microsoft Office Essentials",
    description: "Become proficient in Word, Excel, and PowerPoint — the core tools used in every professional environment.",
    modules: 6,
    completedModules: 6,
    duration: "5 hours",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop&auto=format",
    status: "completed",
    progress: 100,
    moduleList: [
      { id: "m-006", title: "Microsoft Word Fundamentals", duration: "45 min", status: "completed" },
      { id: "m-007", title: "Advanced Word: Reports & Documents", duration: "50 min", status: "completed" },
      { id: "m-008", title: "Excel for Beginners", duration: "55 min", status: "completed" },
      { id: "m-009", title: "Excel Data Analysis & Charts", duration: "60 min", status: "completed" },
      { id: "m-010", title: "PowerPoint Presentation Design", duration: "45 min", status: "completed" },
      { id: "m-011", title: "Integrating Office Applications", duration: "25 min", status: "completed" }
    ]
  },
  {
    id: "course-003",
    title: "CV Writing & Personal Branding",
    description: "Learn to craft a standout CV, LinkedIn profile, and personal brand that attracts employers and opportunities.",
    modules: 4,
    completedModules: 3,
    duration: "3 hours",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop&auto=format",
    status: "in-progress",
    progress: 75,
    moduleList: [
      { id: "m-012", title: "Understanding What Employers Look For", duration: "30 min", status: "completed" },
      { id: "m-013", title: "Crafting Your CV Structure", duration: "40 min", status: "completed" },
      { id: "m-014", title: "Writing Powerful CV Bullet Points", duration: "35 min", status: "completed" },
      { id: "m-015", title: "LinkedIn & Digital Personal Brand", duration: "50 min", status: "locked" }
    ]
  },
  {
    id: "course-004",
    title: "Interview Preparation Masterclass",
    description: "Prepare for interviews with proven strategies, common questions, STAR method responses, and confidence-building techniques.",
    modules: 5,
    completedModules: 0,
    duration: "4.5 hours",
    thumbnail: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&h=200&fit=crop&auto=format",
    status: "locked",
    progress: 0,
    moduleList: [
      { id: "m-016", title: "Understanding Interview Types", duration: "30 min", status: "locked" },
      { id: "m-017", title: "The STAR Method Explained", duration: "45 min", status: "locked" },
      { id: "m-018", title: "Top 25 Interview Questions Answered", duration: "60 min", status: "locked" },
      { id: "m-019", title: "Behavioural & Technical Interviews", duration: "50 min", status: "locked" },
      { id: "m-020", title: "Post-Interview Follow-Up Strategy", duration: "25 min", status: "locked" }
    ]
  },
  {
    id: "course-005",
    title: "Workplace Professionalism & Ethics",
    description: "Develop the professional mindset, work ethic, and ethical framework that top employers demand from interns and employees.",
    modules: 3,
    completedModules: 0,
    duration: "2.5 hours",
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop&auto=format",
    status: "locked",
    progress: 0,
    moduleList: [
      { id: "m-021", title: "Professional Mindset & Work Ethic", duration: "40 min", status: "locked" },
      { id: "m-022", title: "Workplace Ethics & Integrity", duration: "45 min", status: "locked" },
      { id: "m-023", title: "Navigating Workplace Dynamics", duration: "65 min", status: "locked" }
    ]
  }
];

export const announcements = [
  {
    id: "ann-001",
    category: "Internship Opportunity",
    title: "New Batch of Paid Internships Now Available",
    description: "Over 25 new paid internship opportunities from top Ghanaian companies have been added to the FIN marketplace. Browse and apply before deadlines close.",
    date: "Sep 9, 2026",
    read: false,
    urgent: true
  },
  {
    id: "ann-002",
    category: "Application Deadline",
    title: "Reminder: GCB Bank Internship Deadline — September 25",
    description: "The application window for the GCB Bank Finance & Accounting Internship closes on September 25, 2026. Ensure your application is complete before the deadline.",
    date: "Sep 8, 2026",
    read: false,
    urgent: true
  },
  {
    id: "ann-003",
    category: "FIN Academy",
    title: "Interview Preparation Masterclass Now Available",
    description: "The highly anticipated Interview Preparation Masterclass has been added to FIN Academy. Learn the STAR method, tackle common interview questions, and build confidence.",
    date: "Sep 7, 2026",
    read: true,
    urgent: false
  },
  {
    id: "ann-004",
    category: "Platform Update",
    title: "Super AI Assistant — Now with CV Generation",
    description: "Super, your FIN Career AI, can now generate a complete, formatted CV based on your profile information. Try it in the Super assistant panel.",
    date: "Sep 5, 2026",
    read: true,
    urgent: false
  },
  {
    id: "ann-005",
    category: "Event",
    title: "FIN Career Bootcamp — October 2026",
    description: "FIN is hosting a 2-day virtual Career Bootcamp on October 10–11, 2026 featuring industry professionals, CV clinics, mock interviews, and networking sessions.",
    date: "Sep 3, 2026",
    read: true,
    urgent: false
  }
];

export const notifications = [
  { id: "n-001", icon: "briefcase", text: "Your application to MTN Ghana has moved to Interview stage.", time: "2 hours ago", read: false, type: "application" },
  { id: "n-002", icon: "award", text: "Your FIN Academy certificate for Microsoft Office Essentials is ready.", time: "1 day ago", read: false, type: "certificate" },
  { id: "n-003", icon: "star", text: "New internship matching your skills: UI/UX Design Intern at Hubtel.", time: "1 day ago", read: false, type: "internship" },
  { id: "n-004", icon: "clock", text: "Application deadline reminder: GCB Bank Finance Intern closes in 16 days.", time: "2 days ago", read: true, type: "deadline" },
  { id: "n-005", icon: "check-circle", text: "Payment of GHS 50 confirmed for Ecobank Ghana application.", time: "3 days ago", read: true, type: "payment" },
  { id: "n-006", icon: "mail", text: "FIN has sent your application email to Ecobank Ghana HR.", time: "3 days ago", read: true, type: "automation" },
  { id: "n-007", icon: "file-text", text: "Your internship letter for MTN Ghana is being prepared.", time: "4 days ago", read: true, type: "letter" },
  { id: "n-008", icon: "bell", text: "FIN Career Bootcamp registration is now open for October 2026.", time: "6 days ago", read: true, type: "event" }
];

export const employers = [
  { id: "emp-001", name: "TechVentures Ltd", email: "hr@techventures.com", industry: "Technology", posted: 3, applications: 47, status: "active" },
  { id: "emp-002", name: "MTN Ghana", email: "careers@mtn.com.gh", industry: "Telecommunications", posted: 5, applications: 128, status: "active" },
  { id: "emp-003", name: "Ecobank Ghana", email: "internships@ecobank.com", industry: "Banking", posted: 2, applications: 63, status: "active" },
  { id: "emp-004", name: "Hubtel", email: "people@hubtel.com", industry: "Fintech", posted: 4, applications: 89, status: "active" },
  { id: "emp-005", name: "Vodafone Ghana", email: "talent@vodafone.com.gh", industry: "Telecommunications", posted: 2, applications: 34, status: "pending" }
];

export const adminStats = {
  totalStudents: 3847,
  totalEmployers: 124,
  totalInternships: 287,
  totalApplications: 1923,
  activePrograms: 5,
  paymentsThisMonth: 412,
  revenueThisMonth: 20600,
  placementRate: 68
};

export const adminApplications = [
  { id: "FA-2026-00847", student: "Amara Johnson", university: "University of Ghana", internship: "Software Development Intern", company: "MTN Ghana", status: "interview", submitted: "Sep 3, 2026", payment: "paid", amount: "GHS 50" },
  { id: "FA-2026-00911", student: "Amara Johnson", university: "University of Ghana", internship: "Data Analytics Intern", company: "Ecobank Ghana", status: "review", submitted: "Sep 6, 2026", payment: "paid", amount: "GHS 50" },
  { id: "FA-2026-00823", student: "Kwame Asante", university: "KNUST", internship: "UI/UX Design Intern", company: "Hubtel", status: "offer", submitted: "Sep 1, 2026", payment: "paid", amount: "GHS 50" },
  { id: "FA-2026-00798", student: "Ama Owusu", university: "Ashesi University", internship: "Marketing & Communications Intern", company: "Vodafone Ghana", status: "applied", submitted: "Aug 30, 2026", payment: "paid", amount: "GHS 50" },
  { id: "FA-2026-00751", student: "Kofi Mensah", university: "University of Cape Coast", internship: "Finance & Accounting Intern", company: "GCB Bank", status: "review", submitted: "Aug 28, 2026", payment: "paid", amount: "GHS 50" }
];

export const adminPayments = [
  { ref: "PAY-MTN-2026-4471", student: "Amara Johnson", internship: "Software Development Intern", company: "MTN Ghana", amount: "GHS 50", date: "Sep 3, 2026", status: "successful" },
  { ref: "PAY-ECO-2026-5523", student: "Amara Johnson", internship: "Data Analytics Intern", company: "Ecobank Ghana", amount: "GHS 50", date: "Sep 6, 2026", status: "successful" },
  { ref: "PAY-HUB-2026-3312", student: "Kwame Asante", internship: "UI/UX Design Intern", company: "Hubtel", amount: "GHS 50", date: "Sep 1, 2026", status: "successful" },
  { ref: "PAY-VOD-2026-2298", student: "Ama Owusu", internship: "Marketing & Communications Intern", company: "Vodafone Ghana", amount: "GHS 50", date: "Aug 30, 2026", status: "successful" },
  { ref: "PAY-GCB-2026-1890", student: "Kofi Mensah", internship: "Finance & Accounting Intern", company: "GCB Bank", amount: "GHS 50", date: "Aug 28, 2026", status: "pending" }
];

export const analyticsData = {
  learningIntensity: [
    { week: "Wk 1", hours: 2 }, { week: "Wk 2", hours: 4 }, { week: "Wk 3", hours: 3 },
    { week: "Wk 4", hours: 6 }, { week: "Wk 5", hours: 5 }, { week: "Wk 6", hours: 7 },
    { week: "Wk 7", hours: 4 }, { week: "Wk 8", hours: 8 }
  ],
  applicationActivity: [
    { month: "Jun", apps: 0 }, { month: "Jul", apps: 1 }, { month: "Aug", apps: 3 },
    { month: "Sep", apps: 2 }
  ],
  competencyMatrix: [
    { skill: "Technical", score: 72 }, { skill: "Communication", score: 85 },
    { skill: "Problem Solving", score: 78 }, { skill: "Teamwork", score: 90 },
    { skill: "Leadership", score: 65 }, { skill: "Professionalism", score: 82 }
  ]
};
