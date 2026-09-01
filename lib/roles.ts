/** Section 11 — the three perspectives shown in the interactive console. */

export type RoleView = {
  id: "student" | "lecturer" | "administrator";
  label: string;
  headline: string;
  summary: string;
  /** Left-hand navigation of the mock console. */
  nav: string[];
  /** Three headline figures. Values are illustrative, not measured. */
  metrics: { label: string; value: string; note: string }[];
  /** Rows of the main table. */
  table: { columns: string[]; rows: string[][] };
  /** The trail of what happened, shown as a system log. */
  trail: string[];
};

export const ROLE_VIEWS: RoleView[] = [
  {
    id: "student",
    label: "Student",
    headline: "Identity, academics, attendance, finance, records.",
    summary:
      "One sign-in. The student sees their own state across the institution and nothing else.",
    nav: ["Overview", "Identity", "Courses", "Attendance", "Finance", "Records"],
    metrics: [
      { label: "Registered courses", value: "6", note: "Session 2025/26 · First semester" },
      { label: "Attendance", value: "92%", note: "Across registered courses" },
      { label: "Clearance", value: "Cleared", note: "Semester fees settled" },
    ],
    table: {
      columns: ["Course", "Title", "Attendance", "Status"],
      rows: [
        ["CSC 401", "Distributed Systems", "94%", "Registered"],
        ["CSC 415", "Database Design", "90%", "Registered"],
        ["MTH 407", "Numerical Analysis", "88%", "Registered"],
        ["GST 402", "Entrepreneurship", "96%", "Registered"],
      ],
    },
    trail: [
      "Identity issued at admission · institution-scoped",
      "Registration written to Core · 6 courses",
      "Attendance verified against enrolment · CSC 401",
      "Clearance resolved against finance record",
    ],
  },
  {
    id: "lecturer",
    label: "Lecturer",
    headline: "Courses, attendance, class management, student data.",
    summary:
      "A lecturer reaches the courses they are responsible for — and stops there.",
    nav: ["Overview", "My courses", "Sessions", "Attendance", "Class list", "Reports"],
    metrics: [
      { label: "Courses assigned", value: "3", note: "Computer Science · 400 level" },
      { label: "Class today", value: "CSC 401", note: "Lecture theatre 2 · 10:00" },
      { label: "Checked in", value: "118 / 132", note: "Live, this session" },
    ],
    table: {
      columns: ["Session", "Course", "Present", "State"],
      rows: [
        ["Mon 10:00", "CSC 401", "118 / 132", "Open"],
        ["Fri 08:00", "CSC 401", "124 / 132", "Closed"],
        ["Wed 14:00", "CSC 415", "97 / 110", "Closed"],
        ["Tue 12:00", "CSC 415", "101 / 110", "Closed"],
      ],
    },
    trail: [
      "Role scoped to assigned courses · 3 of 214",
      "Attendance session opened · CSC 401",
      "Presence verified against enrolment record",
      "Session closed · attendance written to Core",
    ],
  },
  {
    id: "administrator",
    label: "Administrator",
    headline: "Institution, users, departments, analytics, audit.",
    summary:
      "The institution's own view: structure, people, permissions and the record of what was done.",
    nav: ["Overview", "Institution", "Departments", "Users", "Modules", "Audit"],
    metrics: [
      { label: "Faculties", value: "9", note: "Configured in Core" },
      { label: "Active modules", value: "4", note: "ScanMark · UniReg · NADA · Clearr" },
      { label: "Roles defined", value: "12", note: "Scoped per institution" },
    ],
    table: {
      columns: ["Department", "Programmes", "Registered", "Modules"],
      rows: [
        ["Computer Science", "4", "1,240", "All active"],
        ["Mechanical Engineering", "3", "980", "All active"],
        ["Accounting", "2", "1,415", "All active"],
        ["Architecture", "2", "610", "3 active"],
      ],
    },
    trail: [
      "Role created · Head of Department, Accounting",
      "Module activated · Clearr, Faculty of Management",
      "Permission scope changed · logged with actor and time",
      "Session revoked · administrator device removed",
    ],
  },
];
