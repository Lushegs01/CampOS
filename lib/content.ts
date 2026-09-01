/**
 * Site copy as typed data. Sections stay presentational; nothing here asserts a
 * customer, a metric or a partnership that has not been verified.
 */

export type Capability = { name: string; detail: string };

/** The functions a university runs — the rail under the hero. */
export const DOMAINS = [
  "Identity",
  "Academics",
  "Attendance",
  "Finance",
  "Records",
  "Services",
] as const;

/** Section 01 — the fragmented estate. */
export const FRAGMENTS = [
  { name: "Attendance", note: "Paper sheets, proxies" },
  { name: "Registration", note: "Portal + spreadsheets" },
  { name: "Finance", note: "Bank slips, receipts" },
  { name: "Identity", note: "Re-keyed per system" },
  { name: "Housing", note: "Departmental lists" },
  { name: "Records", note: "Reconciled by hand" },
  { name: "Notifications", note: "Noticeboards, groups" },
  { name: "Analytics", note: "Assembled on request" },
] as const;

/** Section 02 — what CampOS Core actually provides. */
export const CORE_INPUTS = [
  "Identity",
  "Security",
  "Institutions",
  "Permissions",
  "Records",
  "Finance",
  "Analytics",
  "Notifications",
] as const;

export const CORE_CAPABILITIES: Capability[] = [
  {
    name: "Institutional structure",
    detail:
      "Faculties, departments, programmes, levels and academic sessions are modelled once. Every module reads the same structure instead of maintaining its own.",
  },
  {
    name: "Verified identity",
    detail:
      "A student, lecturer or administrator exists once in the institution and is issued a single institutional identity that every application authenticates against.",
  },
  {
    name: "Permissions and roles",
    detail:
      "Roles are defined per institution and scoped to what a person is responsible for — a course, a department, a faculty — and enforced consistently across modules.",
  },
  {
    name: "Records and interoperability",
    detail:
      "Enrolment, attendance, payment and academic records are written to one data layer, and exposed to modules through documented, permissioned APIs.",
  },
];

/** Section 03 — the ecosystem. */
export type Product = {
  slug: string;
  name: string;
  role: string;
  problem: string;
  inCore: string;
  institution: string;
  student: string;
  status: "Live in the ecosystem" | "Outside the current core rollout";
};

export const PRODUCTS: Product[] = [
  {
    slug: "scanmark",
    name: "ScanMark",
    role: "Attendance and presence verification",
    problem:
      "Attendance is signed on paper, passed down a row, or reconstructed weeks later. Nobody can defend the number.",
    inCore:
      "Verifies presence against the enrolment record registration already created, and writes attendance back to the same record.",
    institution:
      "Attendance that holds up per course, department and session — without a clerk retyping sheets.",
    student:
      "Check in from your own device and see your own attendance as it accumulates.",
    status: "Live in the ecosystem",
  },
  {
    slug: "unireg",
    name: "UniReg",
    role: "Registration and academic administration",
    problem:
      "Course registration is spread across forms, a portal and departmental spreadsheets that disagree with each other.",
    inCore:
      "Writes enrolment into CampOS Core, where attendance, finance and records read it rather than copy it.",
    institution:
      "A live view of registration by programme and level, and one definition of who is enrolled.",
    student:
      "Register once. It holds everywhere else you are expected to appear.",
    status: "Live in the ecosystem",
  },
  {
    slug: "nada",
    name: "NADA",
    role: "Verified student communication",
    problem:
      "Campus conversation happens on platforms with no link to the institution, where nobody can tell a student from an outsider.",
    inCore:
      "Membership is proven through institutional identity, while the conversation itself stays anonymous by design.",
    institution:
      "A channel that is genuinely of the university, with verified membership and no identity register to leak.",
    student:
      "Speak as a verified student on your campus without publishing who you are.",
    status: "Live in the ecosystem",
  },
  {
    slug: "clearr",
    name: "Clearr",
    role: "Student finance and clearance",
    problem:
      "Fees, receipts and clearance stamps sit apart from academic status, so clearance becomes a queue and a signature hunt.",
    inCore:
      "Reads the same enrolment and academic records the rest of the ecosystem writes, so a clearance decision resolves against real state.",
    institution:
      "Clearance that resolves against live data, with a trail behind every decision.",
    student:
      "One place to see what is owed, what is paid and what is cleared.",
    status: "Live in the ecosystem",
  },
];

export const HALOFT = {
  name: "Haloft",
  role: "Campus and student housing",
  note: "Part of the CampOS ecosystem, and currently outside the core integration rollout. It is listed here for completeness rather than presented as an integrated module.",
};

/** Section 04 — the identity thread. */
export const IDENTITY_JOURNEY = [
  { stage: "Admission", detail: "The institution admits. The identity is created here, once." },
  { stage: "CampOS Identity", detail: "One institutional identity, scoped to the institution that issued it." },
  { stage: "Registration", detail: "Programme, level and courses attach to that identity." },
  { stage: "Attendance", detail: "Presence is verified against the enrolment already recorded." },
  { stage: "Fees and clearance", detail: "Payment and clearance resolve on the same record." },
  { stage: "Academic records", detail: "Results accumulate on the record, not beside it." },
  { stage: "Graduation", detail: "What leaves with the graduate is what the institution kept." },
] as const;

/** Section 05 — security controls. Described as implemented architecture. */
export const SECURITY_CONTROLS = [
  {
    name: "Tenant isolation",
    detail:
      "Every record belongs to exactly one institution, and every query is scoped to it. Institutions are separated by construction, not by convention.",
  },
  {
    name: "PostgreSQL Row-Level Security",
    detail:
      "Isolation policies are enforced by the database itself, so an application-level mistake cannot return another institution's rows.",
  },
  {
    name: "Role-based access control",
    detail:
      "Roles are defined per institution and carry scoped permissions. A lecturer's access ends at their courses; a bursar's ends at finance.",
  },
  {
    name: "Secure module SSO",
    detail:
      "Modules never handle credentials. A signed hand-off issues a short-lived, single-use authorization code that is exchanged for a scoped session.",
  },
  {
    name: "Session security and revocation",
    detail:
      "Sessions are server-tracked and bound to their institution and role, so access can be revoked immediately rather than waiting for expiry.",
  },
  {
    name: "Audit trails",
    detail:
      "Privileged actions are recorded with actor, institution, target and time, so administrative decisions can be reviewed after the fact.",
  },
  {
    name: "Encrypted secrets",
    detail:
      "Module credentials and integration secrets are stored encrypted and issued per institution, so a rotation is contained to one tenant.",
  },
  {
    name: "Controlled onboarding",
    detail:
      "Institutions are provisioned deliberately by CampOS, with verified administrators. There is no self-serve route into an institution's data.",
  },
] as const;

/** Section 07 — executive outcomes. */
export const LEADER_OUTCOMES = [
  {
    title: "Fewer disconnected systems",
    detail:
      "One foundation to govern and fund, instead of a growing estate of tools that each need their own integration.",
  },
  {
    title: "Clearer institutional data",
    detail:
      "Registration, attendance and finance describe the same students, so a figure means the same thing in every office.",
  },
  {
    title: "Faster administration",
    detail:
      "Work that exists only to reconcile systems — re-keying, cross-checking, clearance queues — stops being necessary.",
  },
  {
    title: "Stronger identity control",
    detail:
      "One institutional identity per person, issued and revoked centrally, rather than a login per department.",
  },
  {
    title: "Operational visibility",
    detail:
      "Leadership can see the state of registration, attendance and clearance without commissioning a report to assemble it.",
  },
  {
    title: "Auditable workflows",
    detail:
      "Privileged actions leave a trail, so decisions can be reviewed and defended long after they were made.",
  },
  {
    title: "Simpler student experience",
    detail:
      "Students meet one login and one set of rules, which removes a large share of routine support load.",
  },
  {
    title: "Infrastructure that scales",
    detail:
      "New modules and new campuses join the same foundation instead of starting another integration project.",
  },
] as const;

/** Section 08 — the student's view. */
export const STUDENT_JOURNEY = [
  { step: "Sign in", detail: "One login for everything the university runs." },
  { step: "Identity", detail: "Your verified student identity, issued by your institution." },
  { step: "Academics", detail: "Programme, level and registered courses in one place." },
  { step: "Attendance", detail: "Check in, and see your own record as it builds." },
  { step: "Finance", detail: "What is owed, what is paid, what is cleared." },
  { step: "Records", detail: "Results and academic history that follow you." },
  { step: "Campus services", detail: "The rest of campus, behind the same identity." },
] as const;

/** Section 09 — onboarding, in plain English. */
export const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Connect the institution",
    detail:
      "CampOS provisions the university in Core: its faculties, departments, programmes and academic sessions, together with the administrators who will run it. Nothing is self-serve, and nothing is guessed.",
  },
  {
    number: "02",
    title: "Configure the university",
    detail:
      "Roles, permissions and academic rules are set to match how the institution already works — who approves, who reads, who is responsible for which courses, faculties and offices.",
  },
  {
    number: "03",
    title: "Activate the ecosystem",
    detail:
      "Modules are switched on one at a time. Each inherits the identity, structure and permissions already in place, so activation is a decision rather than a migration.",
  },
] as const;

/** Section 10 — what we will actually put in front of an evaluator. */
export const PROOF_ITEMS = [
  {
    title: "Architecture walkthrough",
    detail:
      "A working session with your ICT team covering the data model, tenancy, identity flow and module integration.",
  },
  {
    title: "Live product demonstration",
    detail:
      "The modules running as an institution would use them, with your own structure loaded rather than a generic sandbox.",
  },
  {
    title: "Security review",
    detail:
      "Isolation, access control, session handling and audit design, documented and open to your review before anything is deployed.",
  },
  {
    title: "Structured pilot",
    detail:
      "A defined scope — a faculty, a session, a set of courses — with the results measured on your data and reported back to you.",
  },
] as const;

/** Section 12 — the technical stack, top to bottom. */
export const ARCHITECTURE_LAYERS = [
  {
    layer: "CampOS applications",
    detail: "ScanMark, UniReg, NADA and Clearr — each a product in its own right.",
  },
  {
    layer: "Module integration layer",
    detail: "Signed hand-off, scoped sessions and permissioned APIs between modules and Core.",
  },
  {
    layer: "CampOS Core",
    detail: "Institutional structure, records, and the contracts every module builds on.",
  },
  {
    layer: "Authentication and identity",
    detail: "One institutional identity per person, with server-tracked sessions.",
  },
  {
    layer: "Authorization and RBAC",
    detail: "Per-institution roles resolved to scoped permissions on every request.",
  },
  {
    layer: "PostgreSQL with Row-Level Security",
    detail: "Tenant isolation enforced in the database, beneath the application.",
  },
  {
    layer: "Infrastructure",
    detail: "Encrypted secrets, environment separation and audited administrative access.",
  },
] as const;
