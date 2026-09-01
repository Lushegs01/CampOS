/**
 * The one model the whole site is built on: four university functions, four
 * applications, and the operations each one performs against CampOS Core.
 * The hero map, the ecosystem demos and the final CTA all read from this.
 */

export type ModuleId = "scanmark" | "unireg" | "clearr" | "nada";

export type SystemFlow = {
  id: ModuleId;
  module: string;
  /** The university function this application serves. */
  domain: string;
  role: string;
  /** What the application writes into Core. */
  writes: string;
  /** What it reads back out of Core. */
  reads: string;
  /** One sentence, shown under the map when this route is active. */
  caption: string;
};

export const SYSTEM_FLOWS: SystemFlow[] = [
  {
    id: "scanmark",
    module: "ScanMark",
    domain: "Presence",
    role: "Attendance",
    writes: "attendance record",
    reads: "enrolment · identity",
    caption:
      "ScanMark verifies a student against the enrolment UniReg wrote to Core, then writes attendance back to the same record.",
  },
  {
    id: "unireg",
    module: "UniReg",
    domain: "Academics",
    role: "Registration",
    writes: "enrolment record",
    reads: "structure · identity",
    caption:
      "UniReg writes enrolment into Core once. Attendance, finance and records read it from there instead of keeping copies.",
  },
  {
    id: "clearr",
    module: "Clearr",
    domain: "Finance",
    role: "Clearance",
    writes: "payment · clearance state",
    reads: "enrolment · records",
    caption:
      "Clearr resolves a clearance decision against live enrolment and academic state, and publishes the result back to Core.",
  },
  {
    id: "nada",
    module: "NADA",
    domain: "Campus life",
    role: "Community",
    writes: "nothing identifying",
    reads: "membership proof",
    caption:
      "NADA asks Core one question — is this a member of this institution — and never learns which student answered it.",
  },
];

/** Everything Core holds, used by the architecture view. */
export type CoreCapability = {
  id: string;
  name: string;
  detail: string;
  /** Which applications depend on this capability. */
  usedBy: ModuleId[];
};

export const CORE_CAPABILITIES_MAP: CoreCapability[] = [
  {
    id: "identity",
    name: "Identity",
    detail:
      "One institutional identity per person, issued at admission and authenticated by every application.",
    usedBy: ["scanmark", "unireg", "clearr", "nada"],
  },
  {
    id: "institutions",
    name: "Institutions",
    detail:
      "Faculties, departments, programmes, levels and academic sessions, modelled once for the whole institution.",
    usedBy: ["unireg", "clearr"],
  },
  {
    id: "authorization",
    name: "Authorization",
    detail:
      "Per-institution roles resolved to scoped permissions on every request, consistently across modules.",
    usedBy: ["scanmark", "unireg", "clearr", "nada"],
  },
  {
    id: "records",
    name: "Academic records",
    detail:
      "Enrolment, attendance and results accumulate on one record rather than in four parallel ones.",
    usedBy: ["scanmark", "unireg", "clearr"],
  },
  {
    id: "finance",
    name: "Finance",
    detail:
      "Fees, payments and clearance state, readable by any workflow that needs to know whether a student is cleared.",
    usedBy: ["clearr", "unireg"],
  },
  {
    id: "files",
    name: "Files",
    detail:
      "Institution-scoped document storage for the evidence behind admissions, payments and clearance.",
    usedBy: ["unireg", "clearr"],
  },
  {
    id: "notifications",
    name: "Notifications",
    detail:
      "One delivery path to students and staff, addressed by institutional identity rather than a scraped list.",
    usedBy: ["scanmark", "unireg", "clearr", "nada"],
  },
  {
    id: "audit",
    name: "Audit",
    detail:
      "Privileged actions recorded with actor, institution, target and time, so decisions can be reviewed later.",
    usedBy: ["scanmark", "unireg", "clearr", "nada"],
  },
  {
    id: "integration",
    name: "Module integration",
    detail:
      "Signed hand-off, short-lived authorization codes and permissioned APIs — how a module joins the platform.",
    usedBy: ["scanmark", "unireg", "clearr", "nada"],
  },
];
