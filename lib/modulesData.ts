export interface LectureItem {
  id: string;
  lectureNumber: number;
  title: string;
  videoId: string;
  duration: string;
  instructor: string;
  description?: string;
}

export interface StudyModule {
  id: string;
  moduleNumber: number;
  moduleLabel: string;
  title: string;
  subject: string;
  category: "core" | "non-core" | "lecture" | "temp_pdf";
  description: string;
  lectures: LectureItem[]; // Array of YT video lectures for this module
  pdfUrl: string;
  isTemp?: boolean;
}

export const MODULES_CATALOG: StudyModule[] = [
  // ==================== CORE SUBJECTS ====================
  // Mathematics-1
  {
    id: "math-1-mod-1",
    moduleNumber: 1,
    moduleLabel: "MODULE 1",
    title: "Differential Calculus & Matrix Algebra",
    subject: "Mathematics-1",
    category: "core",
    description: "Partial differentiation, Taylor series expansions, matrix rank, eigenvalues, and system of linear equations.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "math-1-l1",
        lectureNumber: 1,
        title: "Lecture 1: Limits, Continuity & Partial Differentiation",
        videoId: "dQw4w9WgXcQ",
        duration: "45 mins",
        instructor: "Prof. Euler",
        description: "Introduction to multivariable functions, partial derivatives, and Euler's theorem for homogeneous functions.",
      },
      {
        id: "math-1-l2",
        lectureNumber: 2,
        title: "Lecture 2: Taylor Series & Maclaurin Expansion",
        videoId: "L302GZou0jI",
        duration: "52 mins",
        instructor: "Dr. Isaac Newton",
        description: "Expansions of functions of two variables, maxima and minima of multivariable functions, and Lagrange multipliers.",
      },
      {
        id: "math-1-l3",
        lectureNumber: 3,
        title: "Lecture 3: Matrix Rank, Eigenvalues & Cayley-Hamilton",
        videoId: "dQw4w9WgXcQ",
        duration: "58 mins",
        instructor: "Prof. Arthur Cayley",
        description: "Echelon form of matrices, linear independence, characteristic equations, and Cayley-Hamilton theorem applications.",
      },
    ],
  },
  {
    id: "math-1-mod-2",
    moduleNumber: 2,
    moduleLabel: "MODULE 2",
    title: "Integral & Vector Calculus",
    subject: "Mathematics-1",
    category: "core",
    description: "Double and triple integrals, gradient, divergence, curl, Green's theorem, and Stokes' theorem applications.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "math-1-l4",
        lectureNumber: 1,
        title: "Lecture 1: Double Integrals & Change of Order",
        videoId: "L302GZou0jI",
        duration: "48 mins",
        instructor: "Dr. Carl Friedrich Gauss",
        description: "Evaluation of double integrals, changing to polar coordinates, and area calculations.",
      },
      {
        id: "math-1-l5",
        lectureNumber: 2,
        title: "Lecture 2: Vector Differential Calculus & Gradient",
        videoId: "dQw4w9WgXcQ",
        duration: "54 mins",
        instructor: "Prof. Josiah Willard Gibbs",
        description: "Scalar and vector fields, directional derivatives, gradient, divergence, and curl vector operations.",
      },
      {
        id: "math-1-l6",
        lectureNumber: 3,
        title: "Lecture 3: Green's, Stokes' & Divergence Theorems",
        videoId: "L302GZou0jI",
        duration: "62 mins",
        instructor: "Dr. George Green",
        description: "Line, surface, and volume integrals with comprehensive proofs and applications of integral vector theorems.",
      },
    ],
  },
  {
    id: "math-1-mod-3",
    moduleNumber: 3,
    moduleLabel: "MODULE 3",
    title: "Differential Equations & Infinite Series",
    subject: "Mathematics-1",
    category: "core",
    description: "First and second-order linear differential equations, Laplace transforms, Fourier series, and convergence tests.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "math-1-l7",
        lectureNumber: 1,
        title: "Lecture 1: First-Order Exact Differential Equations",
        videoId: "dQw4w9WgXcQ",
        duration: "42 mins",
        instructor: "Prof. Joseph Fourier",
        description: "Integrating factors, Bernoulli equations, and orthogonal trajectories.",
      },
      {
        id: "math-1-l8",
        lectureNumber: 2,
        title: "Lecture 2: Laplace Transforms & Inverse Transforms",
        videoId: "L302GZou0jI",
        duration: "50 mins",
        instructor: "Dr. Pierre-Simon Laplace",
        description: "Laplace transforms of elementary functions, unit step functions, and solving ODEs.",
      },
    ],
  },

  // Engineering Physics
  {
    id: "physics-mod-1",
    moduleNumber: 1,
    moduleLabel: "MODULE 1",
    title: "Wave Optics & Interference Mechanics",
    subject: "Engineering Physics",
    category: "core",
    description: "Interference of light, Young's double slit experiment, Newton's rings, thin film diffraction, and polarization.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "phys-l1",
        lectureNumber: 1,
        title: "Lecture 1: Thin Film Interference & Newton's Rings",
        videoId: "L302GZou0jI",
        duration: "46 mins",
        instructor: "Dr. Thomas Young",
        description: "Interference in wedge-shaped films, Newton's ring diameter derivations, and antireflection coatings.",
      },
      {
        id: "phys-l2",
        lectureNumber: 2,
        title: "Lecture 2: Diffraction & Grating Resolving Power",
        videoId: "dQw4w9WgXcQ",
        duration: "52 mins",
        instructor: "Prof. Augustin-Jean Fresnel",
        description: "Fraunhofer single and double slit diffraction, diffraction gratings, and Rayleigh criterion.",
      },
    ],
  },
  {
    id: "physics-mod-2",
    moduleNumber: 2,
    moduleLabel: "MODULE 2",
    title: "Lasers, Fiber Optics & Electromagnetism",
    subject: "Engineering Physics",
    category: "core",
    description: "Einstein's A & B coefficients, He-Ne laser mechanics, optical fiber numerical aperture, and Maxwell's equations.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "phys-l3",
        lectureNumber: 1,
        title: "Lecture 1: Spontaneous Emission & He-Ne Lasers",
        videoId: "dQw4w9WgXcQ",
        duration: "50 mins",
        instructor: "Dr. Albert Einstein",
        description: "Population inversion, optical pumping, Ruby laser, and Helium-Neon gas laser mechanics.",
      },
      {
        id: "phys-l4",
        lectureNumber: 2,
        title: "Lecture 2: Optical Fiber Acceptance Angle & Modes",
        videoId: "L302GZou0jI",
        duration: "44 mins",
        instructor: "Prof. Charles Kao",
        description: "Total internal reflection, step-index vs graded-index fibers, and attenuation losses.",
      },
    ],
  },
  {
    id: "physics-mod-3",
    moduleNumber: 3,
    moduleLabel: "MODULE 3",
    title: "Quantum Mechanics & Wave Equations",
    subject: "Engineering Physics",
    category: "core",
    description: "De Broglie hypothesis, Heisenberg uncertainty principle, Schrödinger time-independent equation, and particle in a box.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "phys-l5",
        lectureNumber: 1,
        title: "Lecture 1: Wave-Particle Duality & Matter Waves",
        videoId: "L302GZou0jI",
        duration: "48 mins",
        instructor: "Dr. Louis de Broglie",
        description: "Davisson-Germer experiment, phase and group velocity, and wavepacket localization.",
      },
      {
        id: "phys-l6",
        lectureNumber: 2,
        title: "Lecture 2: Schrödinger Equation & Quantum Box",
        videoId: "dQw4w9WgXcQ",
        duration: "60 mins",
        instructor: "Dr. Erwin Schrödinger",
        description: "1D potential well, energy quantization, wavefunctions, and quantum tunneling probability.",
      },
    ],
  },

  // Data Structures & Algorithms
  {
    id: "dsa-mod-1",
    moduleNumber: 1,
    moduleLabel: "MODULE 1",
    title: "C/Python Memory Layout & Pointers",
    subject: "Data Structures & Algorithms",
    category: "core",
    description: "Stack vs Heap memory allocations, dynamic memory (malloc/free), pointer arithmetic, and struct data types.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "dsa-l1",
        lectureNumber: 1,
        title: "Lecture 1: Pointers, References & Dynamic Memory Allocation",
        videoId: "dQw4w9WgXcQ",
        duration: "45 mins",
        instructor: "Prof. Dennis Ritchie",
        description: "Pointer dereferencing, stack vs heap memory management, memory leaks, and malloc/calloc in C.",
      },
      {
        id: "dsa-l2",
        lectureNumber: 2,
        title: "Lecture 2: Structs, Unions & Memory Alignment",
        videoId: "L302GZou0jI",
        duration: "48 mins",
        instructor: "Dr. Ken Thompson",
        description: "Custom data structures, struct padding, bit fields, and pass-by-reference mechanisms.",
      },
    ],
  },
  {
    id: "dsa-mod-2",
    moduleNumber: 2,
    moduleLabel: "MODULE 2",
    title: "Arrays, Linked Lists, Stacks & Queues",
    subject: "Data Structures & Algorithms",
    category: "core",
    description: "Singly/doubly linked lists, array implementations, stack LIFO operations, queue FIFO mechanics, and circular queues.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "dsa-l3",
        lectureNumber: 1,
        title: "Lecture 1: Singly & Doubly Linked List Operations",
        videoId: "L302GZou0jI",
        duration: "52 mins",
        instructor: "Prof. Alan Turing",
        description: "Insertion, deletion, reversal, and cycle detection algorithms in linear linked data structures.",
      },
      {
        id: "dsa-l4",
        lectureNumber: 2,
        title: "Lecture 2: Stack Expressions & Circular Queues",
        videoId: "dQw4w9WgXcQ",
        duration: "50 mins",
        instructor: "Dr. Edsger Dijkstra",
        description: "Infix to postfix conversion, stack evaluation, circular queue implementation, and priority queues.",
      },
    ],
  },
  {
    id: "dsa-mod-3",
    moduleNumber: 3,
    moduleLabel: "MODULE 3",
    title: "Trees, Graphs & Algorithmic Complexity",
    subject: "Data Structures & Algorithms",
    category: "core",
    description: "Binary search trees, AVL rotations, graph BFS/DFS traversals, Dijkstra shortest path, and Big-O time complexity.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "dsa-l5",
        lectureNumber: 1,
        title: "Lecture 1: Binary Search Trees & AVL Rotations",
        videoId: "dQw4w9WgXcQ",
        duration: "58 mins",
        instructor: "Dr. Donald Knuth",
        description: "BST insertion/deletion, tree traversals (inorder, preorder, postorder), and self-balancing AVL tree rotations.",
      },
      {
        id: "dsa-l6",
        lectureNumber: 2,
        title: "Lecture 2: Graph BFS/DFS & Dijkstra's Algorithm",
        videoId: "L302GZou0jI",
        duration: "65 mins",
        instructor: "Dr. Robert Sedgewick",
        description: "Adjacency matrix/list representations, breadth-first search, depth-first search, and shortest path algorithms.",
      },
    ],
  },

  // ==================== NON-CORE ELECTIVES ====================
  // Technical Communication
  {
    id: "tech-comm-mod-1",
    moduleNumber: 1,
    moduleLabel: "MODULE 1",
    title: "Technical Report Writing & Formatting",
    subject: "Technical Communication",
    category: "non-core",
    description: "Structuring engineering documentation, formal lab reports, technical proposal writing, and executive summaries.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "tc-l1",
        lectureNumber: 1,
        title: "Lecture 1: Engineering Documentation & Report Layout",
        videoId: "L302GZou0jI",
        duration: "40 mins",
        instructor: "Dr. Maya Angelou",
        description: "Audience analysis, technical vocabulary, passive vs active voice, and executive summary writing.",
      },
      {
        id: "tc-l2",
        lectureNumber: 2,
        title: "Lecture 2: Writing Technical Proposals & Specs",
        videoId: "dQw4w9WgXcQ",
        duration: "44 mins",
        instructor: "Prof. George Orwell",
        description: "RFP responses, technical specifications, feasibility reports, and documentation standards.",
      },
    ],
  },
  {
    id: "tech-comm-mod-2",
    moduleNumber: 2,
    moduleLabel: "MODULE 2",
    title: "Research Proposals & Presentation Skills",
    subject: "Technical Communication",
    category: "non-core",
    description: "Designing technical slides, oral presentation techniques, group discussions, and professional email etiquette.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "tc-l3",
        lectureNumber: 1,
        title: "Lecture 1: Oral Technical Presentations & Slide Design",
        videoId: "dQw4w9WgXcQ",
        duration: "42 mins",
        instructor: "Prof. Dale Carnegie",
        description: "Visual aids, technical slide composition, public speaking confidence, and Q&A handling.",
      },
    ],
  },

  // Professional Ethics & IP
  {
    id: "ethics-mod-1",
    moduleNumber: 1,
    moduleLabel: "MODULE 1",
    title: "Engineering Ethics & Case Studies",
    subject: "Professional Ethics & IP",
    category: "non-core",
    description: "Moral dilemmas in engineering, safety standards, whistleblowing protocols, and famous case study reviews.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "eth-l1",
        lectureNumber: 1,
        title: "Lecture 1: Codes of Ethics & Engineering Responsibility",
        videoId: "L302GZou0jI",
        duration: "45 mins",
        instructor: "Prof. Michael Sandel",
        description: "IEEE/ACM codes of ethics, public safety obligations, conflict of interest, and whistleblowing.",
      },
    ],
  },
  {
    id: "ethics-mod-2",
    moduleNumber: 2,
    moduleLabel: "MODULE 2",
    title: "Intellectual Property & Patent Law",
    subject: "Professional Ethics & IP",
    category: "non-core",
    description: "Software patent filing procedures, copyright laws, trademarks, trade secrets, and open-source licenses (MIT, Apache, GPL).",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    lectures: [
      {
        id: "eth-l2",
        lectureNumber: 1,
        title: "Lecture 1: Patent Application & Open-Source Licensing",
        videoId: "dQw4w9WgXcQ",
        duration: "48 mins",
        instructor: "Dr. Lawrence Lessig",
        description: "Patent claims, prior art search, copyright protection for code, and permissiveness of MIT vs GPL licenses.",
      },
    ],
  },
];

export function getModuleById(id: string): StudyModule | undefined {
  return MODULES_CATALOG.find((m) => m.id === id);
}

export function getSubjectsByCategory(category: "core" | "non-core"): string[] {
  const set = new Set<string>();
  for (const m of MODULES_CATALOG) {
    if (m.category === category) {
      set.add(m.subject);
    }
  }
  return Array.from(set);
}

export function getModulesBySubject(subject: string): StudyModule[] {
  return MODULES_CATALOG.filter((m) => m.subject.toLowerCase() === subject.toLowerCase()).sort(
    (a, b) => a.moduleNumber - b.moduleNumber
  );
}

export function getAllModulesGroupedBySubject() {
  const map: Record<string, StudyModule[]> = {};
  for (const m of MODULES_CATALOG) {
    if (!map[m.subject]) {
      map[m.subject] = [];
    }
    map[m.subject].push(m);
  }
  return map;
}
