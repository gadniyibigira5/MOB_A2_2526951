export type EducationEntry = {
  institution: string;
  program: string;
  period: string;
  detail: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    institution: 'INES-Ruhengeri',
    program: 'BSc Computer Science',
    period: '2024 – 2027 (expected)',
    detail: 'Mobile application development, databases, and software engineering.',
  },
  {
    institution: 'ES Cyabingo',
    program: 'Advanced Level — Mathematics, Computer Science, Economics (MCE)',
    period: '2020 – 2023',
    detail: 'Foundations in programming and analytical problem solving.',
  },
  {
    institution: 'Regina Pacis',
    program: 'Ordinary Level',
    period: '2017 – 2019',
    detail: 'General secondary education.',
  },
];