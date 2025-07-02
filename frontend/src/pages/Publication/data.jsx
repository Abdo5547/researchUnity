export const publicationTypes = [
    { value: 'Article', label: 'Article' },
    { value: 'Book', label: 'Book' },
    { value: 'Chapter', label: 'Chapter' },
    { value: 'Code', label: 'Code' },
    { value: 'Conference Paper', label: 'Conference Paper' },
    { value: 'Cover Page', label: 'Cover Page' },
    { value: 'Data', label: 'Data' },
    { value: 'Experiment Findings', label: 'Experiment Findings' },
    { value: 'Method', label: 'Method' },
    { value: 'Negative Results', label: 'Negative Results' },
    { value: 'Patent', label: 'Patent' },
    { value: 'Poster', label: 'Poster' },
    { value: 'Preprint', label: 'Preprint' },
    { value: 'Presentation', label: 'Presentation' },
    { value: 'Raw Data', label: 'Raw Data' },
    { value: 'Research Proposal', label: 'Research Proposal' },
    { value: 'Technical Report', label: 'Technical Report' },
    { value: 'Thesis', label: 'Thesis' },
    { value: 'Research', label: 'Research' },
  ];

  
  export const keywords = [
    { domain: "Informatique-Développement Web", category: "Développement Web", keywords: ["HTML", "CSS", "JavaScript", "Front-end", "Back-end", "CMS", "PHP", "Node.js", "React", "Angular", "Vue.js", "Django", "REST", "GraphQL"] },
    { domain: "Informatique-Bases de Données", category: "Bases de Données", keywords: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis"] },
    { domain: "Informatique-Réseaux et Sécurité", category: "Réseaux et Sécurité", keywords: ["TCP/IP", "HTTP/HTTPS", "VPN", "Firewall", "Cryptographie", "SSL/TLS", "Injection SQL"] },
    { domain: "Informatique-Systèmes d'Exploitation", category: "Systèmes d'Exploitation", keywords: ["Windows", "Linux", "MacOS", "Unix", "Shell", "Processus", "Système de fichiers", "Permissions"] },
    { domain: "Informatique-Intelligence Artificielle et Data Science", category: "Intelligence Artificielle et Data Science", keywords: ["Machine Learning", "Deep Learning", "Réseaux de neurones", "NLP", "Vision par ordinateur", "Data Mining", "Big Data", "Pandas", "NumPy", "SciPy", "TensorFlow", "PyTorch", "Keras"] },
    { domain: "Informatique-DevOps et Cloud Computing", category: "DevOps et Cloud Computing", keywords: ["AWS", "Azure", "Google Cloud Platform", "Docker", "Kubernetes", "Terraform", "Microservices", "CI/CD", "Monitoring", "Logging"] },
    { domain: "Informatique-Divers", category: "Divers", keywords: ["IoT", "Blockchain", "Cryptomonnaie", "Réalité virtuelle", "Réalité augmentée", "Edge computing", "Quantum computing"] },
    { domain: "Physique", category: "Physique", keywords: ["Mécanique quantique", "Relativité", "Physique des particules", "Astrophysique", "Thermodynamique", "Électromagnétisme", "Optique", "Acoustique", "Physique statistique"] },
    { domain: "Biologie", category: "Biologie", keywords: ["Biologie moléculaire", "Génétique", "Biotechnologie", "Écologie", "Biologie cellulaire", "Physiologie", "Évolution", "Microbiologie", "Biochimie"] },
    { domain: "Médecine", category: "Médecine", keywords: ["Anatomie", "Physiologie", "Pharmacologie", "Pathologie", "Microbiologie", "Chirurgie", "Neurologie", "Cardiologie", "Oncologie", "Pédiatrie"] },
    { domain: "Mathématiques", category: "Mathématiques", keywords: ["Algèbre", "Analyse", "Géométrie", "Probabilités", "Statistiques", "Calcul différentiel", "Calcul intégral", "Théorie des nombres", "Logique mathématique", "Théorie des ensembles"] },
    { domain: "Chimie", category: "Chimie", keywords: ["Chimie organique", "Chimie inorganique", "Chimie physique", "Chimie analytique", "Chimie des matériaux", "Catalyse", "Chimie quantique", "Spectroscopie", "Réactions chimiques"] }
  ];




export const dataer = [
  {
    id: 1,
    type: "Article",
    title: "The Impact of Quantum Computing on Cryptography",
    date: "November 2023",
    reads: 1240,
    citations: 56,
    mainAuthor: {
      firstName: "John",
      lastName: "Doe",
      image: "https://example.com/images/john_doe.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 2,
    type: "Conference Paper",
    title: "Advancements in Artificial Intelligence for Healthcare",
    date: "February 2024",
    reads: 1980,
    citations: 102,
    mainAuthor: {
      firstName: "Alice",
      lastName: "Johnson",
      image: "https://example.com/images/alice_johnson.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 3,
    type: "Book Chapter",
    title: "Machine Learning Techniques for Big Data",
    date: "May 2023",
    reads: 750,
    citations: 33,
    mainAuthor: {
      firstName: "Maria",
      lastName: "Garcia",
      image: "https://example.com/images/maria_garcia.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 4,
    type: "Journal Article",
    title: "Exploring Renewable Energy Sources for Sustainable Development",
    date: "July 2023",
    reads: 1260,
    citations: 78,
    mainAuthor: {
      firstName: "James",
      lastName: "Smith",
      image: "https://example.com/images/james_smith.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 5,
    type: "Conference Paper",
    title: "Applications of Blockchain Technology in Supply Chain Management",
    date: "September 2023",
    reads: 1550,
    citations: 92,
    mainAuthor: {
      firstName: "Sophie",
      lastName: "Johnson",
      image: "https://example.com/images/sophie_johnson.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 6,
    type: "Book Chapter",
    title:
      "Advances in Neurotechnology: Implications for Brain-Computer Interfaces",
    date: "March 2024",
    reads: 890,
    citations: 45,
    mainAuthor: {
      firstName: "Lucas",
      lastName: "Anderson",
      image: "https://example.com/images/lucas_anderson.jpg",
    },
    coAuthors: [
      {
        firstName: "Grace",
        lastName: "Thomas",
        image: "https://example.com/images/grace_thomas.jpg",
      },
      {
        firstName: "Sophia",
        lastName: "Walker",
        image: "https://example.com/images/sophia_walker.jpg",
      },
      {
        firstName: "Elijah",
        lastName: "Mitchell",
        image: "https://example.com/images/elijah_mitchell.jpg",
      },
    ],
  },
  {
    id: 7,
    type: "Journal Article",
    title: "The Role of Microorganisms in Soil Fertility",
    date: "April 2024",
    reads: 820,
    citations: 67,
    mainAuthor: {
      firstName: "Emma",
      lastName: "Brown",
      image: "https://example.com/images/emma_brown.jpg",
    },
    coAuthors: [
      {
        firstName: "Benjamin",
        lastName: "Wilson",
        image: "https://example.com/images/benjamin_wilson.jpg",
      },
      {
        firstName: "Natalie",
        lastName: "Evans",
        image: "https://example.com/images/natalie_evans.jpg",
      },
      {
        firstName: "William",
        lastName: "Johnson",
        image: "https://example.com/images/william_johnson.jpg",
      },
    ],
  },
  {
    id: 8,
    type: "Conference Paper",
    title: "Future Prospects of Artificial Intelligence in Education",
    date: "May 2024",
    reads: 1050,
    citations: 81,
    mainAuthor: {
      firstName: "Noah",
      lastName: "Miller",
      image: "https://example.com/images/noah_miller.jpg",
    },
    coAuthors: [
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Amelia",
        lastName: "Thompson",
        image: "https://example.com/images/amelia_thompson.jpg",
      },
      {
        firstName: "Lucy",
        lastName: "Harris",
        image: "https://example.com/images/lucy_harris.jpg",
      },
      {
        firstName: "Jack",
        lastName: "Robinson",
        image: "https://example.com/images/jack_robinson.jpg",
      },
    ],
  },
];
 
  
