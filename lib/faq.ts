export type FaqItem = { question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    question: "What is CampOS?",
    answer:
      "CampOS is the digital infrastructure a university runs on. It provides one verified identity for every member of the institution, one model of the institution's structure, and one place where academic, attendance and finance records are written — then connects the applications that use them.",
  },
  {
    question: "Who is CampOS for?",
    answer:
      "The institution first: management, registry, ICT, bursary, faculties and student affairs. Students and lecturers are the daily users, but the platform is bought, governed and configured by the university.",
  },
  {
    question: "What is CampOS Core?",
    answer:
      "Core is the layer underneath every CampOS application. It holds institutional structure, identity, permissions, records and the APIs modules build on. Applications do not keep private copies of the student; they read and write through Core.",
  },
  {
    question: "How is this different from a student portal?",
    answer:
      "A portal is a screen over existing systems. CampOS is the system underneath: identity, permissions and records live here, and interfaces — for students, lecturers and administrators — are built on top of them. Replacing a portal changes what students see; replacing the foundation changes what the institution can rely on.",
  },
  {
    question: "Can CampOS support multiple institutions?",
    answer:
      "Yes. CampOS is multi-tenant by design. Every record belongs to exactly one institution, isolation is enforced in the database rather than in application code, and each institution configures its own structure, roles and modules.",
  },
  {
    question: "How does CampOS protect institutional data?",
    answer:
      "Through tenant isolation enforced by PostgreSQL Row-Level Security, role-based access control scoped per institution, server-tracked sessions that can be revoked, short-lived single-use codes for module sign-on, encrypted secrets and audit trails on privileged actions. We will walk your ICT team through each control before deployment.",
  },
  {
    question: "Can existing university systems integrate with CampOS?",
    answer:
      "Core exposes permissioned APIs, and modules integrate through the same contracts an external system would use. Whether a particular system can be connected depends on what it exposes, so we assess it with your ICT team during onboarding rather than promising it in advance.",
  },
  {
    question: "What modules are available today?",
    answer:
      "ScanMark for attendance and presence verification, UniReg for registration and academic administration, NADA for verified student communication, and Clearr for student finance and clearance. Haloft, our housing product, sits in the wider ecosystem and is outside the current core integration rollout.",
  },
  {
    question: "How does institution onboarding work?",
    answer:
      "In three stages. CampOS provisions the institution and its administrators, the university's structure and roles are configured to match how it already works, and modules are then activated one at a time. Institutions are onboarded deliberately — there is no self-serve path into an institution's data.",
  },
  {
    question: "How does CampOS handle roles and permissions?",
    answer:
      "Roles are defined per institution and carry scoped permissions, so access follows responsibility: a lecturer reaches their own courses, a head of department their department, a bursar the finance functions. Permissions are resolved on every request and enforced consistently across every module.",
  },
];
