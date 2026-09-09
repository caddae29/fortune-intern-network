Update the **Fortune Intern Network (FIN)** prototype by creating a modern, production-ready **authentication experience** for students, employers and administrators.

Use the existing FIN design system, uploaded FIN logo, typography, spacing, components and the color combinations referenced from the `@all` sample website.

Do NOT create a generic login template.

The authentication experience should feel like a modern career-tech platform.

---

# AUTHENTICATION EXPERIENCE

Create a complete authentication flow containing:

1. Welcome / Get Started
2. Role Selection
3. Student Sign Up
4. Employer Sign Up
5. Sign In
6. Forgot Password
7. Reset Password
8. Email Verification
9. Account Creation Success
10. Authentication Loading / Error States

---

# 1. GET STARTED SCREEN

Create a beautiful FIN welcome screen.

Display the official FIN logo prominently.

Headline:

**Your next opportunity starts here.**

Supporting text:

**Discover internships, build your skills, and take the next step in your career with Fortune Intern Network.**

Primary CTA:

**Get Started**

Secondary CTA:

**Sign In**

Include a subtle visual showing the FIN career journey:

**DISCOVER → LEARN → APPLY → TRACK → GET PLACED**

Keep the page clean and visually focused.

---

# 2. ROLE SELECTION

When a new user clicks **Get Started**, show a modern role-selection screen.

Headline:

**How will you use FIN?**

Supporting text:

**Choose the experience that best describes you.**

Create two large interactive cards:

### STUDENT

Icon: Graduation cap / student icon

Title:

**I'm looking for an internship**

Description:

**Discover internship opportunities, build your profile, apply to companies, track applications and grow your career.**

CTA:

**Continue as Student**

---

### EMPLOYER

Icon: Building / briefcase icon

Title:

**I'm hiring interns**

Description:

**Post internship opportunities, discover talented students and manage applications from one place.**

CTA:

**Continue as Employer**

---

Do NOT display Admin as a normal public role.

Admin access should use a separate secure administrative login portal.

Add a small link below the cards:

**Already have an account? Sign In**

---

# 3. STUDENT SIGN UP

After selecting Student, create a dedicated student registration form.

Header:

**Create your FIN student account**

Supporting text:

**Start discovering internship opportunities and building your career.**

Fields:

* First Name
* Last Name
* Email Address
* Phone Number
* Password
* Confirm Password
* University
* Program
* Level

Include:

☐ Agree to FIN Terms & Privacy Policy

Primary CTA:

**Create Student Account**

Also include:

**Already have an account? Sign In**

Add password strength feedback.

Use inline validation.

Show clear error states.

---

# 4. EMPLOYER SIGN UP

After selecting Employer, create a dedicated employer registration form.

Header:

**Create your employer account**

Supporting text:

**Connect with talented students and post internship opportunities on FIN.**

Fields:

* Company Name
* Company Email
* Contact Person
* Phone Number
* Company Website
* Industry
* Company Description
* Password
* Confirm Password

Include:

☐ Agree to FIN Terms & Privacy Policy

Primary CTA:

**Create Employer Account**

Show:

**Already have an account? Sign In**

---

# 5. SIGN IN

Create ONE unified sign-in page for normal users.

Do NOT ask users to select Student or Employer again if their account already exists.

Header:

**Welcome back**

Supporting text:

**Sign in to continue your FIN journey.**

Fields:

Email Address

Password

Include:

**Forgot password?**

Primary CTA:

**Sign In**

Secondary option:

**Continue with Google**

Divider:

**OR**

Add:

**Don't have an account? Create one**

When the user successfully authenticates, automatically identify their account role and redirect them to the correct dashboard.

Student:

→ Student Dashboard

Employer:

→ Employer Dashboard

Admin:

→ Admin Dashboard

Do not expose the role-routing logic visually to the user.

---

# 6. ADMIN LOGIN

Create a separate secure administrative login experience.

Do NOT include an "Admin" card beside Student and Employer on the public registration page.

Create a dedicated screen titled:

**FIN Administration**

Supporting text:

**Authorized personnel only.**

Fields:

* Admin Email
* Password

CTA:

**Secure Sign In**

Include a subtle security indicator.

After successful authentication:

→ Admin Dashboard

The admin interface should have a visually distinct but related FIN identity.

---

# 7. FORGOT PASSWORD

Create a modern password recovery screen.

Header:

**Forgot your password?**

Supporting text:

**Enter your email address and we'll send you instructions to reset your password.**

Field:

Email Address

CTA:

**Send Reset Link**

Success state:

**Check your email**

" We've sent a password reset link to your email address."

Include:

**Back to Sign In**

---

# 8. PASSWORD RESET

Create:

**Create a new password**

Fields:

* New Password
* Confirm New Password

Show password requirements:

✓ At least 8 characters

✓ Contains a number

✓ Contains an uppercase letter

CTA:

**Reset Password**

Success state:

**Password successfully updated**

CTA:

**Continue to Sign In**

---

# 9. EMAIL VERIFICATION

After registration, show:

**Verify your email**

Supporting text:

**We've sent a verification link to your email address. Verify your email to activate your FIN account.**

Show:

* Email icon
* Masked email address
* Resend verification button
* Change email option

CTA:

**I've Verified My Email**

Include a countdown before allowing another verification email.

---

# 10. ACCOUNT CREATION SUCCESS

After successful registration, show a celebratory but professional success screen.

For students:

**Welcome to FIN, [Name]!**

"You've taken the first step toward your next opportunity."

CTA:

**Complete My Profile**

For employers:

**Welcome to FIN!**

"Let's set up your company profile and start connecting with talented students."

CTA:

**Set Up Company Profile**

---

# ROLE-BASED EXPERIENCE

The authentication architecture should clearly support role-based access.

Use these roles:

### STUDENT

Access:

* Student Dashboard
* Internship Marketplace
* Applications
* Live Application Tracking
* FIN Academy
* Certificates
* Super AI Assistant
* Profile
* Saved Internships
* Notifications

### EMPLOYER

Access:

* Employer Dashboard
* Company Profile
* Post Internship
* Manage Internships
* Applicants
* Applicant Profiles
* Application Management
* Notifications

### ADMIN

Access:

* Admin Dashboard
* Students
* Employers
* Internships
* Applications
* Payments
* Programs
* Announcements
* Analytics
* Automated Emails
* Internship Letters
* Automation Center
* System Activity

---

# AUTHENTICATION FLOW

Design the prototype so the screens connect logically.

### STUDENT

Landing

↓

Get Started

↓

Choose:

**I'm looking for an internship**

↓

Student Sign Up

↓

Email Verification

↓

Complete Profile

↓

Student Dashboard

---

### EMPLOYER

Landing

↓

Get Started

↓

Choose:

**I'm hiring interns**

↓

Employer Sign Up

↓

Email Verification

↓

Company Profile Setup

↓

Employer Dashboard

---

### EXISTING USERS

Landing

↓

Sign In

↓

Email + Password

↓

Authentication

↓

Automatic Role Detection

↓

Correct Dashboard

---

### ADMIN

Secure Admin Portal

↓

Admin Sign In

↓

Authentication

↓

Admin Dashboard

---

# MODERN UX REQUIREMENTS

Make the authentication experience feel:

* Simple
* Fast
* Trustworthy
* Premium
* Friendly
* Accessible
* Mobile-first

Do not overwhelm users with too many fields on the first screen.

Use progressive disclosure where appropriate.

Use large, accessible buttons.

Use clear validation messages.

Use password visibility toggles.

Use loading states when authentication is processing.

Use success and error states.

Use subtle animations and transitions.

---

# VISUAL DESIGN

Use the existing FIN visual identity.

Use the uploaded official FIN logo.

Reference the `@all` sample website for visual/color inspiration.

Use:

* Clean white/neutral surfaces
* FIN brand colors
* Rounded cards
* Subtle shadows
* Modern typography
* Strong spacing
* Professional icons
* Accessible contrast

Avoid:

* Excessive gradients
* Overly complicated illustrations
* Too many colors
* Huge amounts of text
* Generic authentication templates
* Old-fashioned radio-button role selection

---

# RESPONSIVE BEHAVIOR

### MOBILE

Use a single-column layout.

Role cards should stack vertically.

Forms should use full-width inputs.

Buttons should be large and touch-friendly.

Keep the FIN logo visible.

### TABLET

Use a centered authentication container with generous spacing.

### DESKTOP

Use a polished split-screen or centered authentication layout.

One side can contain the authentication form while the other side contains a FIN career visual.

Example:

**Left:**

FIN branding + career visual

**Right:**

Authentication form

Do not make the split-screen layout feel like a generic SaaS template.

---

# PROTOTYPE INTERACTIONS

Connect all authentication screens together.

Make these interactions clickable:

Get Started

→ Role Selection

Student

→ Student Sign Up

Employer

→ Employer Sign Up

Sign In

→ Unified Sign In

Forgot Password

→ Password Recovery

Create Account

→ Email Verification

Verification

→ Account Success

Student Login

→ Student Dashboard

Employer Login

→ Employer Dashboard

Admin Login

→ Admin Dashboard

Ensure the prototype demonstrates a complete authentication journey.

---

# FINAL AUTHENTICATION PRINCIPLE

The experience should communicate:

**One FIN platform. Different experiences for different users.**

Students come to FIN to:

**DISCOVER → LEARN → APPLY → TRACK → GET PLACED**

Employers come to FIN to:

**POST → DISCOVER TALENT → REVIEW → SHORTLIST → HIRE**

Administrators manage the ecosystem securely through the **FIN Admin Portal**.

Create all screens as reusable components within the existing FIN design system.
