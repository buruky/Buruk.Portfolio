export type Lane = "Salesforce/CRM" | "Full Stack" | "Data Science & Research";

export type Project = {
  slug: string;
  name: string;
  lane: Lane;
  description: string;
  techStack: string[];
  role: string;
  liveUrl: string | null;
  repoUrl: string | null;
  paperUrl?: string | null;
  videoUrl?: string | null;
  demoVideo?: string;
  screenshot?: string;
  screenshotFit?: "cover" | "contain";
  screenshotPosition?: "top" | "center" | "bottom";
  screenshotAspect?: "wide" | "video";
  screenshotPlaceholder: string;
  demoLogin?: { email: string; password: string };
};

export const profile = {
  name: "Buruk Yimesgen",
  tagline: "Software Engineer / Salesforce Developer / Data Scientist",
  bio:
    "I'm a recent Computer Science & Systems and Mathematics double major graduate from the University of Washington Tacoma (June 2026, 3.70 GPA). My work spans Salesforce/CRM development, full stack engineering, and data science, including research in quantum computing and NASA GRACE climate data. I'm looking for entry-level Software Engineer, Data Science, or Salesforce/CRM Developer roles.",
  email: "burukyimesgen@gmail.com",
  github: "https://github.com/buruky",
  linkedin: "https://www.linkedin.com/in/Buruk-Yimesgen/",
  resumeUrl: "/resume.pdf",
  photo: "/images/profile.jpg",
};

// Optional "currently working at" line for the hero, e.g. { title: "SWE Intern", company: "Acme", logo: "/images/company-logo.png" }.
// Leave null until confirmed — do not invent an employer.
export const currentRole: { title: string; company: string; logo: string } | null = null;

export const heroPhoto = "/images/city-bg.jpg";

export const education = {
  school: "University of Washington Tacoma",
  degree: "B.S., Computer Science & Systems and Mathematics (double major)",
  gpa: "3.70",
  honors: "Dean's List",
  graduation: "June 2026",
};

export const skillGroups: { category: string; skills: string[] }[] = [
  {
    category: "Languages",
    skills: ["Java", "Python", "HTML", "CSS", "R", "SQL"],
  },
  {
    category: "Web & Tools",
    skills: ["React", "Node.js", "Docker", "Git"],
  },
  {
    category: "Salesforce",
    skills: ["Apex", "LWC", "Visualforce", "SOQL", "NPSP"],
  },
  {
    category: "Data Science",
    skills: ["scikit-learn"],
  },
];

export const projects: Project[] = [
  {
    slug: "ecc-salesforce-case-management",
    name: "ECC Salesforce Case Management App",
    lane: "Salesforce/CRM",
    description:
      "A Salesforce Lightning case management app (ECC Manager) built for a Washington nonprofit, now headed to the Salesforce AppExchange. An Apex service layer aggregates case records by pipeline stage — Initiation through Closed — and feeds a custom LWC System Health dashboard: a Pipeline Overview funnel, a Bottleneck View that flags cases stalled past their expected case age, and Data Quality Flags for missing or invalid fields. Record-triggered Flows and Approval Processes route cases needing supervisor sign-off and keep case status updated automatically.",
    techStack: ["Apex", "LWC", "Flows", "Approval Processes"],
    role: "Freelance / commissioned developer",
    liveUrl: null,
    repoUrl: null,
    videoUrl: "https://youtu.be/1d_7n7E3ABo",
    demoVideo: "/videos/ecc-demo.mp4",
    screenshot: "/images/screenshots/ecc.png",
    screenshotPlaceholder: "[SCREENSHOT: ECC Case Management App]",
  },
  {
    slug: "fabriq",
    name: "Fabriq — Full Stack AI Fashion Website",
    lane: "Full Stack",
    description:
      "A full-stack AI fashion platform: users build a digital wardrobe and get AI-generated outfit recommendations from their saved garments. Placed 3rd out of 10+ teams at a hackathon.",
    techStack: ["Next.js", "React", "NeonDB", "OpenAI API"],
    role: "Head Developer",
    liveUrl: "https://fabriq-blue.vercel.app/",
    repoUrl: "https://github.com/buruky/Fabriq",
    screenshot: "/images/screenshots/fabriq.png",
    demoLogin: { email: "johndoe@test.com", password: "123456" },
    screenshotPlaceholder: "[SCREENSHOT: Fabriq dashboard]",
  },
  {
    slug: "between-worlds",
    name: "Between Worlds — JavaScript Side Scroller",
    lane: "Full Stack",
    description:
      "A browser-based 2D action game with a custom JavaScript engine built from scratch — players shift between two versions of each level to dodge enemies, reach new paths, and interact with the environment differently.",
    techStack: ["JavaScript", "HTML5 Canvas"],
    role: "Head Developer",
    liveUrl: "https://ku1imrk04.github.io/TCSS491-Between-Worlds/",
    repoUrl: "https://github.com/buruky/Between-Worlds",
    screenshot: "/images/screenshots/between-worlds.png",
    screenshotPosition: "bottom",
    screenshotPlaceholder: "[SCREENSHOT: Between Worlds gameplay]",
  },
  {
    slug: "always-with-compassion",
    name: "Always With Compassion",
    lane: "Full Stack",
    description:
      "A commissioned website for Always With Compassion, an adult family home.",
    techStack: ["React", "React Router", "Tailwind CSS"],
    role: "Freelance / commissioned developer",
    liveUrl: "https://alwayswithcompassion.com/",
    repoUrl: "https://github.com/buruky/CFHome",
    screenshot: "/images/screenshots/always-with-compassion.png",
    screenshotPlaceholder: "[SCREENSHOT: Always With Compassion homepage]",
  },
  {
    slug: "quantum-computing-research",
    name: "Quantum Computing Research",
    lane: "Data Science & Research",
    description:
      "Quantum computing is a developing technology that has the potential to change several aspects of computing as we know it. In this paper, we introduce several essential components of quantum computing such as qubits, superposition, and entanglement. In addition, we discuss two examples of quantum computing: quantum teleportation and Grover's Algorithm. Our coverage of quantum teleportation provides an example of a property of quantum computing that is impossible using classical computing. In addition to this property, we cover Grover's Algorithm which is a key advancement in quantum computing, providing quadratic speedup for unstructured search problems compared to classical algorithms. We explain the algorithm's principles, including amplitude amplification and the role of the oracle. Our findings underscore the significant potential of quantum computing in solving complex problems more efficiently than classical methods.",
    techStack: ["Quantum Computing Theory", "Linear Algebra"],
    role: "Co-author (with Malaya Jove; advised by Dr. Ryan Card)",
    liveUrl: null,
    repoUrl: null,
    paperUrl: "/papers/quantum-computing-research.pdf",
    screenshot: "/images/screenshots/quantum-computing-research.png",
    screenshotFit: "contain",
    screenshotPlaceholder: "[SCREENSHOT or write-up link: Quantum Computing Research]",
  },
  {
    slug: "nasa-grace-climate-research",
    name: "NASA GRACE Climate Data Science Research",
    lane: "Data Science & Research",
    description:
      "This study uses statistical and machine learning techniques to impute missing data from GRACE (Gravity Recovery and Climate Experiment) terrestrial water storage (TWS) datasets. We examined information from 2 of the 62 watersheds across the globe, taking into account variables such as temperature, precipitation, evapotranspiration, NDVI, and ENSO. Creating models to predict TWS and efficiently impute missing values was our aim. We investigated techniques including Extreme Gradient Boosting (XGBoost), Deep Neural Networks (DNN), Generalized Linear Models (GLM), and mean/median imputation. Mean Squared Error (MSE) was used to assess these models' performance to choose the most effective method for precise forecasting and imputation.",
    techStack: ["R", "XGBoost", "Deep Neural Networks", "GLM"],
    role: "Co-author (with Jenna Weldon; advised by Tamer Elbayoumi, mentored by Brett Hunter)",
    liveUrl: null,
    repoUrl: null,
    paperUrl: "/papers/nasa-grace-climate-research.pdf",
    screenshot: "/images/screenshots/nasa-grace-climate-research.png",
    screenshotFit: "contain",
    screenshotPlaceholder: "[SCREENSHOT or write-up link: NASA GRACE Research]",
  },
  {
    slug: "beaches-and-barrels",
    name: "Beaches and Barrels — Python Dungeon Crawler Game",
    lane: "Full Stack",
    description:
      "A beach-themed dungeon crawler set in Crabstone Castle, a magical sand castle with dynamically shifting rooms — battle sea creatures, collect power-ups, and survive escalating challenges.",
    techStack: ["Python"],
    role: "Head Developer",
    liveUrl: null,
    repoUrl: "https://github.com/buruky/Beaches-N-Barrels",
    screenshot: "/images/screenshots/beaches-and-barrels.png",
    screenshotPosition: "bottom",
    screenshotAspect: "video",
    screenshotPlaceholder: "[SCREENSHOT: Beaches and Barrels gameplay]",
  },
];

export const laneColors: Record<Lane, string> = {
  "Salesforce/CRM": "text-lane-salesforce",
  "Full Stack": "text-lane-fullstack",
  "Data Science & Research": "text-lane-data",
};
