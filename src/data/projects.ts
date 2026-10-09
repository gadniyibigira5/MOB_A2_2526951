export type Project = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  contribution: string;
  technologies: string[];
  offline: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 'sms',
    title: 'Student Management System',
    summary: 'Desktop application for managing student records, marks, transfers and reports.',
    problem:
      'Schools needed a reliable way to manage student records, marks, transfers and reports without relying on manual paperwork.',
    contribution:
      'I built core features in Java Swing with MySQL: student registration, update, delete, search, marks entry with automatic grade calculation, and multiple report types with Excel export and printable QR ID cards.',
    technologies: ['Java 21', 'Java Swing', 'FlatLaf', 'MySQL', 'JDBC', 'Apache POI', 'ZXing', 'JavaMail'],
    offline: true,
  },
  {
    id: 'milkcheck',
    title: 'Milk Check',
    summary: 'Mobile app that warns a rural milk collection centre of likely milk rejection before the lab test.',
    problem:
      'Collectors at a rural milk collection centre needed an early warning of rejection risk before the lab test, and the network at the collection point is unreliable.',
    contribution:
      'I built the React Native mobile app that records four values per delivery (farmer ID, litres, temperature, hours since milking) and shows the risk as Low, Medium or High with a recommendation. The same logistic-regression model runs on the phone so the app keeps working offline.',
    technologies: ['React Native', 'FastAPI', 'Logistic Regression', 'Offline inference'],
    offline: true,
  },
];