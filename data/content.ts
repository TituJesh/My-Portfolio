// All editable content lives here. Sources: github.com/TituJesh (profile README and repositories) and Titu's resume.

export const site = {
  name: "Titu Jeshurun",
  fullName: "Titu Jeshurun B",
  initials: "TJ",
  role: "Designer + Cloud Engineer",
  tagline: "Designs it. Deploys it.",
  description:
    "Titu Jeshurun is a cloud engineer and multimedia designer in Chennai, India. AWS, Terraform, Docker and GitHub Actions by day; posters, reels and logos for short films and symposiums by night.",
  // Set this to the production domain before deploying (canonical URL, sitemap and Open Graph use it).
  url: "https://titujeshurun.vercel.app",
  location: "Chennai, India",
  region: "ap-south-1",
  timeZone: "Asia/Kolkata",
  email: "titujesh@gmail.com",
  photo: "/avatar-figure.webp", // transparent ink sketch, face to shoulders; the disc behind it follows the theme
  github: "https://github.com/TituJesh",
  githubHandle: "TituJesh",
  linkedin: "https://www.linkedin.com/in/titu-jeshurun",
  instagram: "https://instagram.com/titu_jeshurun",
  gallery: "https://titujeshurun-portfolio.vercel.app",
  availability: "Open to cloud, DevOps and platform roles",
  deployHost: "Vercel",
  version: "v1.0.0",
  year: 2026,
};

export const stages = [
  { id: "top", label: "TJ", short: "Top" },
  { id: "index", label: "Index", short: "Index" },
  { id: "work", label: "Work", short: "Work" },
  { id: "stack", label: "Stack", short: "Stack" },
  { id: "log", label: "Log", short: "Log" },
  { id: "words", label: "Words", short: "Words" },
  { id: "contact", label: "Contact", short: "Contact" },
  { id: "design", label: "Design", short: "Design" },
] as const;

export type StageId = (typeof stages)[number]["id"];

export const bio = [
  "I'm Titu, a cloud engineer from Chennai. I work mostly on AWS, writing infrastructure in Terraform, packaging services with Docker and shipping them through GitHub Actions.",
  "A lot of my time goes into making sure the things I run are secure, cost-aware and tested on every push.",
  "The other half of me designs: five years of posters, first-look reveals, reels and logos for short films, symposiums and brands.",
];

// A pull quote for the Index section, lifted from the GitHub profile README.
export const pullQuote = "I like systems that are small, well documented and easy to rebuild.";

// What is going on this month. Keep it honest and short; dated so it is obvious when it goes stale.
export const now = {
  asOf: "October 2026",
  items: [
    { label: "building", text: "CloudExpire and Acedra, both pushed to GitHub this month." },
    { label: "learning", text: "Cloud and DevOps, one small system at a time: AWS, Terraform, GitHub Actions." },
    { label: "designing", text: "Posters and reels for short films and symposiums, when a brief comes in." },
    { label: "open to", text: "Cloud, DevOps and platform roles. Say hello." },
  ],
};

// Client words from the design gallery (titujeshurun-portfolio.vercel.app).
export const testimonials = [
  {
    quote: "Absolutely phenomenal work! The poster design not only exceeded our expectations but became the talk of the entire film. The attention to detail and creative vision is unmatched.",
    name: "Ashraf",
    role: "Short film director and actor, Chickums TV",
  },
  {
    quote: "Professional, innovative, and delivered ahead of schedule. The poster design and promotional videos perfectly captured our brand essence and significantly boosted our event attendance.",
    name: "Pratheesh Kumar",
    role: "Event manager, Synexzia",
  },
  {
    quote: "From concept to delivery, everything was handled with care and creativity. The final result was polished, eye-catching, and exactly what we needed.",
    name: "Carlin Akila",
    role: "Founder, Carlin's Aari Paradise",
  },
];

export const identities = [
  {
    title: "Design",
    lead: "Posters that get the first look.",
    points: [
      "Short-film posters, thumbnails and first-look reveals for Chickums TV and independent directors.",
      "Event identity for Synexzia '25: name reveal, posters, promo reels and a 3D logo.",
      "Ten-plus motion pieces cut in After Effects and Premiere Pro.",
    ],
  },
  {
    title: "Cloud",
    lead: "Infrastructure that is small, documented and rebuildable.",
    points: [
      "Temporary EC2 with an expiry, enforced by Lambda, DynamoDB and EventBridge (CloudExpire).",
      "FastAPI on PostgreSQL 16 with JWT roles, an S3 document vault and secrets kept out of the code (Acedra).",
      "Terraform fmt, validate and plan plus pytest on every push through GitHub Actions.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  meta: string;
  outcome: string;
  status: string;
  thumbnail: { src: string; width: number; height: number; alt: string };
  repo: string;
  problem: string;
  decisions: string[];
  architecture: { image?: { src: string; width: number; height: number; alt: string }; components: { name: string; role: string }[] };
  result: string;
};

export const projects: Project[] = [
  {
    slug: "cloudexpire",
    title: "CloudExpire",
    meta: "AWS · Terraform · FastAPI · Lambda",
    outcome: "Temporary AWS resources that clean up after themselves.",
    status: "Serverless · open source",
    thumbnail: { src: "/work/cloudexpire-arch.webp", width: 1000, height: 511, alt: "CloudExpire AWS architecture: GitHub Actions and Terraform on top, Lambda, DynamoDB, EventBridge and EC2 inside the AWS cloud" },
    repo: "https://github.com/TituJesh/CloudExpire",
    problem:
      "Temporary cloud environments outlive their purpose, creating unnecessary cost and a wider security surface. CloudExpire provisions EC2 instances with a time to live of 1 to 24 hours, tracks their expiry and cleans up eligible resources automatically.",
    decisions: [
      "A FastAPI application behind API Gateway and Lambda handles requests; DynamoDB stores creation and expiry timestamps with the resource metadata.",
      "EventBridge invokes a separate cleanup Lambda every five minutes. Cleanup evaluates expiry timestamps itself instead of relying on DynamoDB TTL deletion.",
      "Ownership tags (Project, ManagedBy, ResourceId) are validated before any termination; destructive actions stay disabled unless enabled deliberately, and a read-only cleanup mode exists.",
      "Resource states are reconciled through REQUESTED, ACTIVE, CLEANUP_PENDING, CLEANED and FAILED; stale requests without an instance are marked FAILED after a grace period.",
      "All infrastructure is Terraform; the cleanup role uses scoped IAM permissions with tag-based conditions, DynamoDB is on-demand and log groups keep 14 days.",
    ],
    architecture: {
      image: { src: "/work/cloudexpire-arch.webp", width: 1000, height: 511, alt: "CloudExpire architecture diagram" },
      components: [
        { name: "API Gateway + Lambda", role: "Runs the FastAPI application" },
        { name: "DynamoDB", role: "Resource metadata and expiry timestamps" },
        { name: "EventBridge", role: "Triggers cleanup every five minutes" },
        { name: "Cleanup Lambda", role: "Evaluates expiry, validates tags, terminates EC2" },
        { name: "Parameter Store", role: "API bearer token as a SecureString" },
        { name: "CloudWatch", role: "Structured execution summaries, 14-day retention" },
      ],
    },
    result: "Twenty-four unit and integration tests run on every push in GitHub Actions. Cleanup runs on a five-minute schedule and never terminates an instance that is not tagged as CloudExpire's own.",
  },
  {
    slug: "acedra",
    title: "Acedra",
    meta: "FastAPI · PostgreSQL · S3 · Docker",
    outcome: "A cloud-native student information and document vault for institutions.",
    status: "Backend · containerised",
    thumbnail: { src: "/work/acedra.webp", width: 640, height: 400, alt: "Acedra logo" },
    repo: "https://github.com/TituJesh/Acedra",
    problem:
      "Academic institutions need student records and documents kept strictly apart by role, with secrets out of the codebase. Acedra is a REST backend for student information and document management built for departments and faculties.",
    decisions: [
      "Modular FastAPI routes for authentication, students, departments and documents, with OpenAPI docs generated at /docs.",
      "PostgreSQL 16 through SQLAlchemy 2.0 with reversible Alembic migrations; a one-to-one user to student profile and departments that own students.",
      "JWT (HS256) authentication with bcrypt hashing and strict admin versus student role separation to prevent cross-tenant access.",
      "Documents stream to a private S3 bucket and are served through 300-second presigned URLs only.",
      "Dual-mode configuration: a local .env for development and AWS Secrets Manager in production, so nothing sensitive is hardcoded.",
    ],
    architecture: {
      components: [
        { name: "FastAPI on Uvicorn", role: "Async REST gateway with OAuth2 and RBAC" },
        { name: "PostgreSQL 16", role: "Users, students, departments, documents" },
        { name: "Amazon S3", role: "Private document vault, presigned downloads" },
        { name: "AWS Secrets Manager", role: "Production configuration and keys" },
        { name: "Docker + Amazon ECR", role: "Container image build and registry" },
        { name: "GitHub Actions (OIDC) + Terraform", role: "CI and infrastructure" },
      ],
    },
    result: "Student and admin data are kept strictly apart, every document URL expires in five minutes, and the schema can be migrated forward and back without manual SQL.",
  },
  {
    slug: "self-healing-cloud",
    title: "Self-Healing Cloud Infra",
    meta: "Java 21 · Spring Boot · Linux",
    outcome: "Monitor, detect, decide, recover: a control loop for a Linux host.",
    status: "Team project · prototype",
    thumbnail: { src: "/work/selfheal.svg", width: 640, height: 400, alt: "Diagram of the monitor, detect, decide, recover loop" },
    repo: "https://github.com/DevForgeCore/Self-Healing-Cloud-Infrastructure",
    problem:
      "When a host runs out of CPU, memory or disk, someone has to notice and act. This educational prototype watches a Linux host, classifies resource trouble and runs a predefined recovery action without waiting for a human, while keeping a tamper-evident record of what it did.",
    decisions: [
      "Live CPU, memory and disk metrics with threshold-based detection of overload conditions.",
      "A decision engine maps each classified issue to a predefined recovery action rather than free-form automation.",
      "Every event is appended to a hash-chained log so the recovery history cannot be quietly edited afterwards.",
      "A dashboard shows resource history, process details and recovery logs.",
    ],
    architecture: {
      components: [
        { name: "Monitor", role: "Collects CPU, memory and disk metrics" },
        { name: "Detector", role: "Threshold rules classify the problem" },
        { name: "Decision engine", role: "Maps issue class to a recovery action" },
        { name: "Recovery executor", role: "Runs the action on the Linux host" },
        { name: "Hash-chain log", role: "Tamper-evident event record" },
        { name: "Dashboard", role: "Spring Boot UI with Chart.js history" },
      ],
    },
    result: "A working monitor-detect-decide-recover loop with a verifiable log, built with a team under the DevForgeCore organisation. It is a prototype for learning, not a production agent.",
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Cloud (AWS)", items: ["Lambda", "EC2", "S3", "DynamoDB", "EventBridge", "Secrets Manager", "ECR", "CloudWatch", "IAM", "VPC"] },
  { group: "Infra and delivery", items: ["Terraform", "Docker", "GitHub Actions", "Linux", "Git"] },
  { group: "Backend", items: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "pytest", "Java 21", "Spring Boot", "TypeScript"] },
  { group: "Design tools", items: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro", "Lightroom"] },
];

export type Entry = { when: string; title: string; where: string; bullets: string[] };

export const log: Entry[] = [
  {
    when: "Jun to Jul 2025",
    title: "Java intern",
    where: "Big Bucks Innovation Pvt. Ltd., hybrid",
    bullets: ["Java application development and database programming in a team of five or more.", "Sprint planning, daily stand-ups, debugging and code maintenance."],
  },
  {
    when: "2025",
    title: "Chief editor, Synexzia '25",
    where: "College technical symposium",
    bullets: ["Coordinated the technical content and supported event activities.", "Designed the event identity: name reveal, posters, promo reels and logo."],
  },
  {
    when: "2021 to present",
    title: "Freelance multimedia designer",
    where: "Short films, events, brands",
    bullets: ["Short-film posters, thumbnails and first-look reveals.", "More than ten motion graphics videos, intros and reels."],
  },
  {
    when: "2022 to 2026",
    title: "B.Tech, Information Technology",
    where: "Agni College of Technology, Chennai",
    bullets: ["CGPA 7.98 / 10."],
  },
];

export const certifications = [
  { name: "AWS Cloud Practitioner Essentials", issuer: "AWS Skill Builder" },
  { name: "The Joy of Computing Using Python", issuer: "NPTEL" },
  { name: "Programming in Java", issuer: "NPTEL" },
  { name: "Object-Oriented Programming in Java", issuer: "Great Learning" },
];

// The "also a multimedia designer" poster at the foot of the page, used as is. Replace the file to change it.
export const designerPoster = {
  poster: { src: "/design/poster.webp", width: 2000, height: 1495, alt: "Also a multimedia designer. Titu Jeshurun in profile with a ring of poster designs around his head." },
};
