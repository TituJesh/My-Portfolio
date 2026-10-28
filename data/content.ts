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
  // card on the home page
  thumbnail: { src: string; width: number; height: number; alt: string };
  // wide image at the top of the project page; falls back to the thumbnail
  banner?: { src: string; width: number; height: number; alt: string };
  repo: string;
  // short facts pulled from the repository (language, tests, region, licence)
  facts: { label: string; value: string }[];
  problem: string;
  features: string[];
  decisions: string[];
  architecture: { image?: { src: string; width: number; height: number; alt: string }; components: { name: string; role: string }[] };
  stack: { layer: string; items: string }[];
  api?: { method: string; path: string; note: string }[];
  result: string;
};

// Project copy and facts come from each repository's README on GitHub (TituJesh/CloudExpire, TituJesh/Acedra,
// DevForgeCore/Self-Healing-Cloud-Infrastructure). Re-read the README before changing numbers here.
export const projects: Project[] = [
  {
    slug: "cloudexpire",
    title: "CloudExpire",
    meta: "AWS · Terraform · FastAPI · Lambda",
    outcome: "Temporary AWS resources that clean up after themselves.",
    status: "Serverless · open source",
    thumbnail: { src: "/work/cloudexpire-mark.webp", width: 640, height: 400, alt: "CloudExpire logo: the word cloud with its o drawn as a cloud dissolving into dots, above the word expire" },
    banner: { src: "/work/cloudexpire-banner.webp", width: 1600, height: 836, alt: "CloudExpire poster: the logo on a dark grid with torn paper, and a line describing the AWS-powered temporary resource management system" },
    repo: "https://github.com/TituJesh/CloudExpire",
    facts: [
      { label: "Language", value: "Python 3.12 · Terraform (HCL)" },
      { label: "Tests", value: "24 unit and integration, run in CI" },
      { label: "Region", value: "ap-south-1 (Mumbai)" },
      { label: "Default mode", value: "Dry run, destruction off" },
    ],
    problem:
      "Temporary cloud environments outlive their purpose, creating unnecessary cost and a wider security surface. CloudExpire is a serverless lifecycle engine: it provisions short-lived EC2 instances with a time to live of 1 to 24 hours, tracks the expiry state in DynamoDB and terminates expired resources from a scheduled Lambda.",
    features: [
      "On-demand provisioning: request an EC2 instance over a REST API with a configurable TTL of 1 to 24 hours.",
      "TTL tracking: DynamoDB keeps the creation timestamp, expiry window and active state of every resource.",
      "Automated cleanup: EventBridge triggers a cleanup Lambda every five minutes to terminate expired instances.",
      "Safety guardrails: destruction is disabled by default (dry run) and ownership tags are validated before any termination.",
      "State reconciliation: stale unprovisioned requests are recovered, and resources move through REQUESTED, ACTIVE, CLEANUP_PENDING, CLEANED or FAILED.",
      "Infrastructure as code: the whole AWS footprint is defined and provisioned with Terraform.",
      "Observability: structured execution summaries and metrics go to CloudWatch with 14-day retention.",
    ],
    decisions: [
      "A FastAPI application behind API Gateway and Lambda handles requests; DynamoDB stores creation and expiry timestamps with the resource metadata in a single table.",
      "EventBridge invokes a separate cleanup Lambda every five minutes. Cleanup evaluates expiry timestamps itself instead of relying on DynamoDB TTL deletion.",
      "Ownership tags (Project, ManagedBy, ResourceId) are validated before any termination; EC2 launch and termination stay disabled unless enabled through explicit environment flags.",
      "Stale requests without an instance are marked FAILED after a grace period, so the table never fills with ghosts.",
      "The cleanup role restricts ec2:TerminateInstances with tag conditions; DynamoDB is on demand and the API bearer token lives in SSM Parameter Store as a SecureString.",
      "Terraform ignores the Lambda code hash so the cleanup package can be deployed from CI independently of the infrastructure.",
    ],
    architecture: {
      image: { src: "/work/cloudexpire-arch.webp", width: 1000, height: 511, alt: "CloudExpire AWS architecture: GitHub Actions and Terraform on top, Lambda, DynamoDB, EventBridge and EC2 inside the AWS cloud" },
      components: [
        { name: "API Gateway", role: "Public REST interface forwarding to the FastAPI Lambda" },
        { name: "Lambda (API)", role: "FastAPI application handling resource requests and auth" },
        { name: "DynamoDB", role: "Single-table resource metadata, status and TTL" },
        { name: "EventBridge", role: "Cron rule invoking cleanup every five minutes" },
        { name: "Lambda (cleanup)", role: "Scans expired records, checks EC2 tags, terminates" },
        { name: "EC2", role: "Temporary instances launched with ownership tags" },
        { name: "SSM Parameter Store", role: "Bearer token for API authentication" },
        { name: "CloudWatch Logs", role: "14-day execution logs and operational metrics" },
      ],
    },
    stack: [
      { layer: "Backend and API", items: "Python 3.12, FastAPI, Pydantic v2, Uvicorn" },
      { layer: "Cloud services", items: "EC2, DynamoDB, Lambda, EventBridge, API Gateway, SSM, CloudWatch" },
      { layer: "IaC and tooling", items: "Terraform, Docker, pytest, GitHub Actions" },
    ],
    api: [
      { method: "GET", path: "/health", note: "Public service health check" },
      { method: "POST", path: "/resources", note: "Register and provision a temporary resource" },
      { method: "GET", path: "/resources", note: "List all tracked resources" },
      { method: "GET", path: "/resources/{id}", note: "Resource details and lifecycle status" },
    ],
    result:
      "Twenty-four unit and integration tests run on every push in GitHub Actions. Cleanup runs on a five-minute schedule and never terminates an instance that is not tagged as CloudExpire's own. A planned next step is cross-account provisioning through IAM roles and STS, so users could have resources created in their own AWS accounts.",
  },
  {
    slug: "acedra",
    title: "Acedra",
    meta: "FastAPI · PostgreSQL · S3 · Docker",
    outcome: "A cloud-native student information and document vault for institutions.",
    status: "Backend · containerised",
    thumbnail: { src: "/work/acedra.webp", width: 640, height: 400, alt: "Acedra logo" },
    banner: { src: "/work/acedra-banner.webp", width: 1600, height: 840, alt: "Acedra poster: the A mark with ruled lines inside, the ACEDRA wordmark, on paper with a dotted grid and soft shadows" },
    repo: "https://github.com/TituJesh/Acedra",
    facts: [
      { label: "Language", value: "Python 3.12 · Terraform · Shell" },
      { label: "Database", value: "PostgreSQL on Amazon RDS, private subnet" },
      { label: "Region", value: "ap-south-1 (Mumbai)" },
      { label: "Licence", value: "MIT" },
    ],
    problem:
      "Academic institutions need student records and documents kept strictly apart by role, with secrets out of the codebase. Acedra is a REST backend for student information and document management built for universities, departments and faculties.",
    features: [
      "Modular REST routes across authentication, students, departments and documents.",
      "Role-based access control with strict separation between admin and student roles; a student reaching for another student's record or file gets 403.",
      "A secure document vault: files stream to a private S3 bucket and are downloaded only through presigned URLs that expire after 300 seconds.",
      "Zero hardcoded secrets: a local .env in development and AWS Secrets Manager in production.",
      "Relational integrity on PostgreSQL 16 through SQLAlchemy 2.0, with reversible Alembic migrations.",
      "Interactive OpenAPI 3.0 documentation at /docs and /redoc.",
    ],
    decisions: [
      "A one-to-one link from user to student profile, and departments that own students; deletions of a department are guarded by enrolment.",
      "JWT (HS256) authentication with bcrypt password hashing; ownership is enforced at the service level, not just in the router.",
      "Uploads are capped at 10 MB and never leave a private bucket; nothing in S3 is reachable without a short-lived signed URL.",
      "Pydantic v2 validation and SQLAlchemy parameterised queries keep input sanitised and SQL injection out.",
      "The test suite runs against an in-memory SQLite database with S3 fully mocked, so CI needs no AWS account.",
      "A multi-stage Dockerfile runs the app as an unprivileged user; GitHub Actions publishes to ECR keylessly through OIDC on every push to main.",
    ],
    architecture: {
      image: { src: "/work/acedra-arch.webp", width: 819, height: 1024, alt: "Acedra AWS architecture in ap-south-1: GitHub Actions, Docker and ECR on top; a VPC with a public subnet holding the EC2 host and private subnets holding the RDS database; Secrets Manager and CloudWatch beside it" },
      components: [
        { name: "GitHub Actions → ECR", role: "Builds and tests the image, pushes to a private registry with scan on push" },
        { name: "EC2 (public subnet)", role: "t2.micro API host behind an internet gateway; port 80 open, SSH restricted" },
        { name: "RDS PostgreSQL (private subnet)", role: "db.t4g.micro, reachable only from the EC2 security group on 5432" },
        { name: "Amazon S3", role: "Private document vault with presigned downloads" },
        { name: "AWS Secrets Manager", role: "Database credentials and app secrets injected at runtime" },
        { name: "CloudWatch", role: "Centralised logs, metrics and alarms" },
      ],
    },
    stack: [
      { layer: "Backend", items: "Python 3.12, FastAPI, Pydantic v2, Uvicorn and Gunicorn" },
      { layer: "Data", items: "PostgreSQL 16, Psycopg 3, SQLAlchemy 2.0, Alembic" },
      { layer: "Cloud and security", items: "S3 (boto3), Secrets Manager, JWT (HS256), bcrypt" },
      { layer: "DevOps and IaC", items: "Docker, Amazon ECR, GitHub Actions (OIDC), Terraform, CloudFormation" },
    ],
    api: [
      { method: "POST", path: "/auth/register · /auth/login", note: "Registration and JWT issue; /auth/me for identity" },
      { method: "GET", path: "/students/ · /students/me · /students/search", note: "Directory with dept, year and gender filters; admin write" },
      { method: "GET", path: "/departments/", note: "Department catalogue, enrolment-guarded deletes" },
      { method: "POST", path: "/documents/upload/{id}", note: "Private S3 upload, 10 MB limit; download via a 300 s signed URL" },
    ],
    result: "Student and admin data are kept strictly apart, every document URL expires in five minutes, and the schema can be migrated forward and back without manual SQL. The whole stack deploys to ap-south-1 from Terraform or CloudFormation.",
  },
  {
    slug: "self-healing-cloud",
    title: "Self-Healing Cloud Infra",
    meta: "Java 21 · Spring Boot · Linux",
    outcome: "Monitor, detect, decide, recover: a control loop for a Linux host.",
    status: "Team project · prototype",
    thumbnail: { src: "/work/selfheal.svg", width: 640, height: 400, alt: "Diagram of the monitor, detect, decide, recover loop" },
    repo: "https://github.com/DevForgeCore/Self-Healing-Cloud-Infrastructure",
    facts: [
      { label: "Language", value: "Java 21, Spring Boot 3.2" },
      { label: "Build", value: "Maven" },
      { label: "Runs on", value: "Linux / Ubuntu, port 8080" },
      { label: "Organisation", value: "DevForgeCore, final-year project" },
    ],
    problem:
      "When a host runs out of CPU, memory or disk, someone has to notice and act. This educational prototype watches a Linux host, classifies resource trouble and runs a predefined recovery action without waiting for a human, while keeping a tamper-evident record of what it did.",
    features: [
      "Monitoring: live CPU, RAM and disk metrics with a resource-history chart.",
      "Detection: rule-based detection of supported overload conditions.",
      "Decisions: a decision engine maps each classified issue to a configured action.",
      "Recovery: demonstrated recovery for CPU, memory and disk scenarios.",
      "Event logs: incident and recovery records with blockchain-inspired, hash-chained integrity logging.",
      "Dashboard: system status, decisions, processes, logs and trust information in one interface.",
    ],
    decisions: [
      "Threshold rules rather than a trained model: the README is explicit that detection is rule-based until a real ML model is added.",
      "Recovery is limited to predefined actions on demo processes and project-owned test files, never free-form automation.",
      "Every event is appended to a hash chain so the recovery history cannot be quietly edited afterwards.",
      "Recovery controls are meant for a disposable test VM and must not be exposed publicly without authentication and allow-lists.",
    ],
    architecture: {
      components: [
        { name: "Monitoring", role: "Collects Linux CPU, memory and disk metrics" },
        { name: "Failure detection", role: "Threshold rules decide normal versus issue" },
        { name: "Classification", role: "CPU overload, memory overload or disk pressure" },
        { name: "Decision engine", role: "Maps the issue class to a recovery action" },
        { name: "Recovery service", role: "Runs the action on the host" },
        { name: "Event and integrity logging", role: "Hash-chained record feeding the dashboard" },
      ],
    },
    stack: [
      { layer: "Backend", items: "Java 21, Spring Boot 3.2.5, Maven" },
      { layer: "Frontend", items: "HTML, CSS, JavaScript, Chart.js" },
      { layer: "Integration", items: "REST API, Linux / Ubuntu" },
    ],
    api: [
      { method: "GET", path: "/api/system-health", note: "Current resource metrics and status" },
      { method: "GET", path: "/api/logs", note: "Application and recovery logs" },
      { method: "GET", path: "/api/processes", note: "Process information" },
    ],
    result: "A working monitor-detect-decide-recover loop with a verifiable log, built with a team under the DevForgeCore organisation. Planned next: SHA-256 hash-chain verification, safer recovery checks with rollback, authentication and container monitoring.",
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

// The "also a multimedia designer" poster at the foot of the page. Swap any ring image by editing this list;
// each entry is one card on the rotating ring around the head. Files live in /public/design.
export const designerPoster = {
  eyebrow: "also a",
  title: ["Multimedia", "Designer"],
  cornerLeft: ["Made for screens", "Made by hand"],
  cornerRight: ["Designed by", "Titu Jeshurun"],
  sideLeft: "Every pixel is a decision",
  sideRight: "Posters · reels · logos",
  blurb: "A multimedia designer combines graphics, video, audio and animation into one visual story. Five years of posters, first-look reveals, reels and logos for short films, symposiums and brands.",
  photo: { src: "/design/titu-profile.webp", width: 2000, height: 1493, alt: "Titu Jeshurun in profile" },
  backdrop: "/design/poster-cloth.webp", // crumpled cloth behind the poster, the same in both themes
  ring: [
    { src: "/design/ring-synexzia-logo.webp", alt: "Synexzia 3D logo" },
    { src: "/design/ring-coming-soon.webp", alt: "Synexzia 2K25 coming soon poster" },
    { src: "/design/ring-mission-impossible.webp", alt: "Mission Impossible event poster" },
    { src: "/design/ring-accidental-backend.webp", alt: "The Accidental Backend cover" },
    { src: "/design/ring-serenity.webp", alt: "Serenity poster" },
    { src: "/design/ring-soa.webp", alt: "Singam Oonai Aatukutty pilot film poster" },
    { src: "/design/ring-meant-to-be.webp", alt: "Meant To Be trailer poster" },
    { src: "/design/ring-rameez-logo.webp", alt: "Rameez Choreography gold logo" },
    { src: "/design/ring-acedra.webp", alt: "Acedra poster" },
    { src: "/design/ring-sea.webp", alt: "Figure facing the sea" },
  ],
};
