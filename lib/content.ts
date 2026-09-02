/**
 * Site copy as typed data. Sections stay presentational; nothing here asserts a
 * customer, a metric or a partnership that has not been verified.
 */

/** Section 01 — the fragmented estate. */
export const FRAGMENTS = [
  { name: "Attendance", note: "Paper sheets, proxies", connected: "Verified against enrolment" },
  { name: "Registration", note: "Portal + spreadsheets", connected: "One enrolment record" },
  { name: "Finance", note: "Bank slips, receipts", connected: "Resolves against records" },
  { name: "Identity", note: "Re-keyed per system", connected: "Issued once, read everywhere" },
  { name: "Housing", note: "Departmental lists", connected: "Reads institutional identity" },
  { name: "Records", note: "Reconciled by hand", connected: "Written, never reconciled" },
  { name: "Notifications", note: "Noticeboards, groups", connected: "Addressed by identity" },
  { name: "Analytics", note: "Assembled on request", connected: "Reads live institutional state" },
] as const;

/** Section 03 — the one ecosystem member that is not integrated. */
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
      "Every record belongs to one institution, and every query is scoped to it. Separation by construction, not convention.",
  },
  {
    name: "PostgreSQL Row-Level Security",
    detail:
      "Policies are enforced by the database, so an application-level mistake cannot return another institution's rows.",
  },
  {
    name: "Role-based access control",
    detail:
      "Roles are per institution and scoped: a lecturer's access ends at their courses, a bursar's at finance.",
  },
  {
    name: "Secure module SSO",
    detail:
      "Modules never handle credentials. A signed hand-off issues a short-lived, single-use code, exchanged for a scoped session.",
  },
  {
    name: "Session security and revocation",
    detail:
      "Sessions are server-tracked and bound to institution and role, so access can be revoked immediately rather than expiring.",
  },
  {
    name: "Audit trails",
    detail:
      "Privileged actions are recorded with actor, institution, target and time, and can be reviewed long after.",
  },
  {
    name: "Encrypted secrets",
    detail:
      "Integration secrets are encrypted and issued per institution, so a rotation is contained to one tenant.",
  },
  {
    name: "Controlled onboarding",
    detail:
      "Institutions are provisioned by CampOS with verified administrators. There is no self-serve route into their data.",
  },
] as const;

/** Section 07 — executive outcomes. */
export const LEADER_OUTCOMES = [
  {
    title: "Fewer disconnected systems",
    detail:
      "One foundation to govern and fund, instead of an estate of tools that each need their own integration.",
  },
  {
    title: "Clearer institutional data",
    detail:
      "Registration, attendance and finance describe the same students — a figure means the same thing in every office.",
  },
  {
    title: "Faster administration",
    detail:
      "Work that exists only to reconcile systems — re-keying, clearance queues — stops being necessary.",
  },
  {
    title: "Stronger identity control",
    detail:
      "One identity per person, issued and revoked centrally, rather than a login per department.",
  },
  {
    title: "Operational visibility",
    detail:
      "Registration, attendance and clearance state, without commissioning a report to assemble it.",
  },
  {
    title: "Auditable workflows",
    detail:
      "Privileged actions leave a trail, so decisions can be defended long after they were made.",
  },
  {
    title: "Simpler student experience",
    detail:
      "One login and one set of rules removes a large share of routine support load.",
  },
  {
    title: "Infrastructure that scales",
    detail:
      "New modules and campuses join the same foundation instead of starting another integration project.",
  },
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
