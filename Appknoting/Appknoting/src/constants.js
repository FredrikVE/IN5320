// Fyll inn deres faktiske UIDs her:
export const PROGRAM_UID = "PROGRAM_UID_SCHOOL_INSPECTION"; // School Inspection program
export const STAGE_UID   = "PROGRAM_STAGE_UID_INSPECTION";  // Inspection stage

// DataElements i inspeksjons-skjemaet (brukes i validering og posting av hendelser)
export const DE = {
  NUM_STUDENTS: "DE_NUM_STUDENTS_UID",
  NUM_TEACHERS: "DE_NUM_TEACHERS_UID",
  NUM_TOILETS: "DE_NUM_TOILETS_UID",
  NUM_SEATS: "DE_NUM_SEATS_UID",
  NUM_TEXTBOOKS: "DE_NUM_TEXTBOOKS_UID",
  NUM_FEMALE_STUDENTS: "DE_F_STUDENTS_UID",
  NUM_MALE_STUDENTS: "DE_M_STUDENTS_UID",
  NUM_FEMALE_TEACHERS: "DE_F_TEACHERS_UID",
  NUM_MALE_TEACHERS: "DE_M_TEACHERS_UID",
  COMMENTS: "DE_COMMENTS_UID",
};

// Analyseindikatorer (dersom dere har definert dem i DHIS2).
// Alternativt regnes forholdstall i frontend fra dataelementer/events.
export const IND = {
  PTR: "IND_PUPIL_TEACHER_RATIO_UID",
  PCR: "IND_PUPIL_CLASSROOM_RATIO_UID", // hvis dere har klassrom som eget DE/indikator
  PBR: "IND_PUPIL_BOOK_RATIO_UID",
  PSR: "IND_PUPIL_SEAT_RATIO_UID",
  PTR_TOILET: "IND_PUPIL_TOILET_RATIO_UID",
  GPI_STUDENTS: "IND_GPI_STUDENTS_UID",
  GPI_TEACHERS: "IND_GPI_TEACHERS_UID",
};

// Minimumsstandarder fra caset
export const STANDARDS = {
  PUPIL_SEAT: 1,          // ≤ 1:1
  PUPIL_BOOK: 1,          // ≤ 1:1
  PUPIL_CLASSROOM: 53,    // < 53:1
  PUPIL_TEACHER: 45,      // < 45:1
  PUPIL_TOILET: 25,       // < 25:1
  // GPI er “likhet nær 1”, vi viser som avvik fra 1 (f.eks. 0.97–1.03 som grønn)
  GPI_TOLERANCE: 0.03,
};

// Topp-orgunit for inspektørens distrikt (for Planner & Analytics)
export const ROOT_OU = "DISTRICT_OU_UID"; // Sett til OU inspektøren tilhører
