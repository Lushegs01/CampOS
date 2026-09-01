/**
 * The platform tour: three seats in the same institution, and what each one is
 * allowed to see. Figures are illustrative — the section says so on the page.
 */

export type PanelRow = { label: string; value: string; tone?: "positive" | "pending" };

export type Panel = {
  id: string;
  label: string;
  title: string;
  note: string;
  rows: PanelRow[];
  trace: string;
};

export type RoleView = {
  id: "student" | "lecturer" | "administrator";
  label: string;
  headline: string;
  summary: string;
  scope: string;
  panels: Panel[];
};

export const ROLE_VIEWS: RoleView[] = [
  {
    id: "student",
    label: "Student",
    headline: "Their own state, and nothing else.",
    summary:
      "One sign-in covers identity, courses, attendance, finance and records — scoped to the person signed in.",
    scope: "Scope · one student, one institution",
    panels: [
      {
        id: "overview",
        label: "Overview",
        title: "This semester",
        note: "Everything the institution has recorded, in one place.",
        rows: [
          { label: "Registered courses", value: "6 · 15 units", tone: "positive" },
          { label: "Attendance", value: "92% across registered courses" },
          { label: "Clearance", value: "Cleared", tone: "positive" },
          { label: "Next class", value: "CSC 401 · 10:00" },
        ],
        trace: "core.identity.read → one session, one institution",
      },
      {
        id: "identity",
        label: "Identity",
        title: "Institutional identity",
        note: "Issued once at admission, authenticated by every module.",
        rows: [
          { label: "Institution", value: "Institution A" },
          { label: "Matriculation", value: "CS/21/0418" },
          { label: "Programme", value: "B.Sc. Computer Science" },
          { label: "Level · session", value: "400 · 2025/26" },
          { label: "Status", value: "Enrolled", tone: "positive" },
        ],
        trace: "core.identity.read · no other student is addressable",
      },
      {
        id: "courses",
        label: "Courses",
        title: "Registered courses",
        note: "Written by UniReg, read by everything downstream.",
        rows: [
          { label: "CSC 401", value: "Distributed Systems · 4u", tone: "positive" },
          { label: "CSC 402", value: "Compiler Construction · 4u", tone: "positive" },
          { label: "MAT 304", value: "Numerical Analysis · 3u", tone: "positive" },
          { label: "GST 302", value: "Entrepreneurship · 2u", tone: "positive" },
        ],
        trace: "core.enrolment.read",
      },
      {
        id: "attendance",
        label: "Attendance",
        title: "Verified presence",
        note: "Each entry was checked against enrolment before it was written.",
        rows: [
          { label: "CSC 401", value: "94% · 16 of 17" },
          { label: "CSC 402", value: "90% · 18 of 20" },
          { label: "MAT 304", value: "88% · 15 of 17" },
          { label: "GST 302", value: "96% · 24 of 25" },
        ],
        trace: "core.attendance.read · own records only",
      },
      {
        id: "finance",
        label: "Finance",
        title: "Fees and clearance",
        note: "The same record the registry reads when it resolves clearance.",
        rows: [
          { label: "Tuition", value: "Paid", tone: "positive" },
          { label: "Faculty levy", value: "Paid", tone: "positive" },
          { label: "Library", value: "Hold cleared", tone: "positive" },
          { label: "Semester clearance", value: "Cleared", tone: "positive" },
        ],
        trace: "core.finance.read → clearance state",
      },
    ],
  },
  {
    id: "lecturer",
    label: "Lecturer",
    headline: "The courses they are responsible for.",
    summary:
      "A lecturer reaches their own courses, their own sessions and the students enrolled in them — and stops there.",
    scope: "Scope · 3 assigned courses of 214",
    panels: [
      {
        id: "overview",
        label: "Overview",
        title: "Today",
        note: "Assigned teaching, and the session currently open.",
        rows: [
          { label: "Courses assigned", value: "3 · Computer Science" },
          { label: "Class today", value: "CSC 401 · 10:00 · LT2" },
          { label: "Checked in", value: "118 of 132", tone: "positive" },
          { label: "Rejected check-ins", value: "3 · not enrolled", tone: "pending" },
        ],
        trace: "core.authorization.resolve → lecturer scope",
      },
      {
        id: "courses",
        label: "My courses",
        title: "Assigned courses",
        note: "Assignment comes from the institution's structure, not a local list.",
        rows: [
          { label: "CSC 401", value: "Distributed Systems · 132 enrolled" },
          { label: "CSC 415", value: "Database Design · 110 enrolled" },
          { label: "CSC 429", value: "Machine Learning · 64 enrolled" },
        ],
        trace: "core.institutions.read → assigned courses",
      },
      {
        id: "session",
        label: "Session",
        title: "CSC 401 · open",
        note: "An attendance session runs against the enrolment record.",
        rows: [
          { label: "Opened", value: "10:00 · lecture theatre 2" },
          { label: "Verified", value: "118", tone: "positive" },
          { label: "Rejected", value: "3 · not enrolled in CSC 401", tone: "pending" },
          { label: "State", value: "Open · closes at 10:20" },
        ],
        trace: "core.enrolment.read → core.attendance.write",
      },
      {
        id: "class",
        label: "Class list",
        title: "Enrolled students",
        note: "Only students enrolled in this course are addressable here.",
        rows: [
          { label: "CS/21/0418", value: "Present · 10:02", tone: "positive" },
          { label: "CS/21/0092", value: "Present · 10:03", tone: "positive" },
          { label: "CS/20/0771", value: "Absent" },
          { label: "CS/21/0233", value: "Present · 10:06", tone: "positive" },
        ],
        trace: "core.records.read · scoped to CSC 401",
      },
      {
        id: "reports",
        label: "Reports",
        title: "Attendance reporting",
        note: "Reports are generated from the record, not assembled by hand.",
        rows: [
          { label: "Weekly average", value: "91% · 6 weeks" },
          { label: "Below threshold", value: "9 students · 75%", tone: "pending" },
          { label: "Submitted to registry", value: "Week 6", tone: "positive" },
          { label: "Export", value: "Audited · actor recorded" },
        ],
        trace: "core.audit.write on every export",
      },
    ],
  },
  {
    id: "administrator",
    label: "Administrator",
    headline: "The institution, and the record of what was done.",
    summary:
      "Structure, people, permissions and modules for one institution — with an audit trail behind every privileged action.",
    scope: "Scope · one institution, all departments",
    panels: [
      {
        id: "overview",
        label: "Overview",
        title: "Institution A",
        note: "The shape of the institution as Core holds it.",
        rows: [
          { label: "Faculties", value: "9" },
          { label: "Departments", value: "34" },
          { label: "Active modules", value: "4", tone: "positive" },
          { label: "Roles defined", value: "12 · scoped" },
        ],
        trace: "core.institutions.read",
      },
      {
        id: "structure",
        label: "Institution",
        title: "Academic structure",
        note: "Modelled once. Every module reads this, none of them redefines it.",
        rows: [
          { label: "Session", value: "2025/26 · first semester", tone: "positive" },
          { label: "Programmes", value: "86 across 9 faculties" },
          { label: "Levels", value: "100 – 700" },
          { label: "Registration window", value: "Open · closes in 9 days" },
        ],
        trace: "core.institutions.write · audited",
      },
      {
        id: "users",
        label: "Users",
        title: "People and roles",
        note: "One identity per person, with permissions scoped to responsibility.",
        rows: [
          { label: "Students", value: "Institution-scoped identities" },
          { label: "Lecturers", value: "Scoped to assigned courses" },
          { label: "Heads of department", value: "Scoped to their department" },
          { label: "Bursary", value: "Finance functions only" },
        ],
        trace: "core.authorization.resolve on every request",
      },
      {
        id: "modules",
        label: "Modules",
        title: "Ecosystem activation",
        note: "Modules are switched on per institution, not per student.",
        rows: [
          { label: "ScanMark", value: "Active", tone: "positive" },
          { label: "UniReg", value: "Active", tone: "positive" },
          { label: "Clearr", value: "Active", tone: "positive" },
          { label: "NADA", value: "Active", tone: "positive" },
          { label: "Haloft", value: "Outside core rollout", tone: "pending" },
        ],
        trace: "core.integration · signed hand-off per module",
      },
      {
        id: "audit",
        label: "Audit",
        title: "Recent privileged actions",
        note: "Actor, institution, target and time — reviewable long after the fact.",
        rows: [
          { label: "Role created", value: "Head of Department · Accounting" },
          { label: "Module activated", value: "Clearr · Faculty of Management" },
          { label: "Permission scope changed", value: "Registry · read extended" },
          { label: "Session revoked", value: "Administrator device removed", tone: "pending" },
        ],
        trace: "core.audit.read · append-only",
      },
    ],
  },
];
