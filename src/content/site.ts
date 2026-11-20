import type { L } from "@/i18n";

/* ------------------------------------------------------------------ */
/* Textos de interfaz                                                  */
/* ------------------------------------------------------------------ */

export const ui = {
  nav: {
    work: { es: "Proyectos", en: "Work" },
    experience: { es: "Experiencia", en: "Experience" },
    skills: { es: "Stack", en: "Stack" },
    contact: { es: "Contacto", en: "Contact" },
  },
  downloadCv: { es: "Descargar CV", en: "Download CV" },
  contactMe: { es: "Escribime", en: "Get in touch" },
  featured: { es: "Proyecto destacado", en: "Featured project" },
  readCase: { es: "Ver caso de estudio", en: "Read case study" },
  clientWork: { es: "Lengar Studio y clientes", en: "Lengar Studio & client work" },
  clientWorkIntro: {
    es: "Sitios, sistemas y marcas que diseñé y desarrollé, la mayoría a través de Lengar Studio.",
    en: "Websites, systems and brands I designed and built, most of them through Lengar Studio.",
  },
  visit: { es: "Ver sitio", en: "Visit site" },
  code: { es: "Código", en: "Code" },
  experience: { es: "Experiencia", en: "Experience" },
  skills: { es: "Habilidades técnicas", en: "Technical skills" },
  education: { es: "Educación", en: "Education" },
  languages: { es: "Idiomas", en: "Languages" },
  contactTitle: {
    es: "¿Trabajamos juntos?",
    en: "Let's work together",
  },
  contactBody: {
    es: "Estoy buscando sumarme a un equipo de producto, en remoto o con relocalización. También tomo proyectos puntuales a través de Lengar Studio.",
    en: "I'm looking to join a product team, remote or with relocation. I also take on client projects through Lengar Studio.",
  },
  back: { es: "Volver al inicio", en: "Back to home" },
  role: { es: "Rol", en: "Role" },
  period: { es: "Período", en: "Period" },
  platforms: { es: "Plataformas", en: "Platforms" },
  stack: { es: "Stack", en: "Stack" },
  switchTo: { es: "English", en: "Español" },
  skipToContent: { es: "Saltar al contenido", en: "Skip to content" },
  hello: { es: "Hola, soy Edmundo — vivo en Buenos Aires, Argentina", en: "Hi, I'm Edmundo — based in Buenos Aires, Argentina" },
  emailMe: { es: "Escribime", en: "Email me" },
  selectedWork: { es: "Trabajos seleccionados", en: "Selected work" },
  clients: { es: "Clientes", en: "Clients" },
  clientsTitle: { es: "Marcas para las que trabajé", en: "Brands I've built for" },
  clientsCount: { es: "clientes · web y marca", en: "clients · web & brand" },
  featuredLabel: { es: "Destacado · producto propio", en: "Featured · own product" },
  hiringTitle: { es: "¿Contratando o con un proyecto en mente?", en: "Hiring, or have a project in mind?" },
  hiringBody: {
    es: "Vivo en Buenos Aires (GMT-3) y trabajo en remoto con equipos de Estados Unidos y Argentina.",
    en: "Based in Buenos Aires (GMT-3), working remotely with teams in the US and Argentina.",
  },
  soundOn: { es: "Silenciar sonidos", en: "Mute sounds" },
  soundOff: { es: "Activar sonidos", en: "Unmute sounds" },
  openSite: { es: "Abrir sitio", en: "Open site" },
} satisfies Record<string, L | Record<string, L>>;

/* ------------------------------------------------------------------ */
/* Perfil                                                              */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Edmundo Alvarez",
  role: {
    es: "Desarrollador Full Stack & React Native",
    en: "Full Stack & React Native Developer",
  },
  headline: {
    es: "Construyo productos web y mobile de punta a punta.",
    en: "I build web and mobile products end to end.",
  },
  summary: {
    es: "Más de 3 años desarrollando con React Native, React, TypeScript, Node.js y Laravel. Fundé Lengar Studio, donde diseñé y desarrollé Valoo: una plataforma de propinas digitales publicada en App Store y Google Play. Vengo del diseño UX/UI y trabajé de forma remota con equipos de Estados Unidos y Argentina.",
    en: "3+ years building with React Native, React, TypeScript, Node.js and Laravel. I founded Lengar Studio, where I designed and built Valoo, a digital tipping platform live on the App Store and Google Play. I have a UX/UI design background and experience working remotely with teams in the US and Argentina.",
  },
  facts: [
    { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" },
    {
      es: "Ciudadanía española: trabajo en la UE sin visado",
      en: "Spanish citizen: EU work authorization",
    },
    { es: "Remoto o relocalización", en: "Remote or relocation" },
  ],
  metaDescription: {
    es: "Desarrollador Full Stack y React Native en Buenos Aires. Fundador de Lengar Studio y creador de Valoo, publicada en App Store y Google Play. Disponible para remoto o UE.",
    en: "Full Stack & React Native developer based in Buenos Aires. Founder of Lengar Studio and builder of Valoo, live on the App Store and Google Play. Open to remote or EU roles.",
  },
  availability: {
    es: "Disponible para roles full-time · remoto o relocalización en la UE",
    en: "Open to full-time roles · remote or EU relocation",
  },
  quickFacts: [
    { label: { es: "Vivo en", en: "Based in" }, value: { es: "Buenos Aires", en: "Buenos Aires" } },
    { label: { es: "Permiso", en: "Work auth" }, value: { es: "Ciudadano UE", en: "EU citizen" } },
    { label: { es: "Inglés", en: "English" }, value: { es: "B2 profesional", en: "B2 professional" } },
  ],
  cv: {
    es: "/cv/edmundo-alvarez-cv-es.pdf",
    en: "/cv/edmundo-alvarez-cv-en.pdf",
  },
};

/* ------------------------------------------------------------------ */
/* Experiencia                                                         */
/* ------------------------------------------------------------------ */

export type Experience = {
  company: string;
  role: L;
  period: L;
  location: L;
  bullets: L[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Lengar Studio",
    role: { es: "Fundador e Ingeniero de Software", en: "Founder & Software Engineer" },
    period: { es: "Sep 2025 – Actualidad", en: "Sep 2025 – Present" },
    location: { es: "Remoto", en: "Remote" },
    bullets: [
      {
        es: "Diseñé y desarrollé Valoo de punta a punta como fundador único: producto, UX/UI, modelo de precios y desarrollo.",
        en: "Designed and built Valoo end to end as sole founder: product, UX/UI, pricing model and engineering.",
      },
      {
        es: "App en React Native + Expo dentro de un monorepo TypeScript (pnpm + Docker) y API REST en Laravel + MySQL.",
        en: "React Native + Expo app in a TypeScript monorepo (pnpm + Docker) backed by a Laravel + MySQL REST API.",
      },
      {
        es: "Design system multiplataforma con design tokens compartidos, pagos con Mercado Pago y CI/CD con EAS Build/Submit.",
        en: "Cross-platform design system with shared design tokens, Mercado Pago payments and CI/CD with EAS Build/Submit.",
      },
      {
        es: "Diseñé y desarrollé los sitios lengarstudio.com y valoo.la, y proyectos web y de identidad visual para clientes como Tekun Agropecuaria, Construcserv y Malevo.",
        en: "Designed and built lengarstudio.com and valoo.la, plus web and visual identity projects for clients such as Tekun Agropecuaria, Construcserv and Malevo.",
      },
    ],
    stack: ["React Native", "Expo", "TypeScript", "Next.js", "Laravel", "MySQL", "Docker"],
  },
  {
    company: "RO Medical",
    role: { es: "Full Stack Developer", en: "Full Stack Developer" },
    period: { es: "Oct 2024 – Sep 2025", en: "Oct 2024 – Sep 2025" },
    location: { es: "Híbrido · Buenos Aires", en: "Hybrid · Buenos Aires" },
    bullets: [
      {
        es: "Desarrollé y mantuve el sistema interno de gestión, mejorando rendimiento y mantenibilidad.",
        en: "Built and maintained the internal management system, improving performance and maintainability.",
      },
      {
        es: "Automaticé flujos de carga de datos administrativos y desarrollé APIs REST internas entre módulos.",
        en: "Automated administrative data-entry workflows and built internal REST APIs between modules.",
      },
      {
        es: "Rediseñé flujos clave de la interfaz para mejorar la usabilidad del personal.",
        en: "Redesigned key UI flows to improve usability for internal staff.",
      },
    ],
    stack: ["PHP", "MySQL", "Node.js", "REST APIs", "JavaScript"],
  },
  {
    company: "Freelance",
    role: { es: "Desarrollador Web", en: "Web Developer" },
    period: { es: "Jun 2023 – Ago 2025", en: "Jun 2023 – Aug 2025" },
    location: { es: "Remoto", en: "Remote" },
    bullets: [
      {
        es: "Sitios web, e-commerce, sistemas administrativos y plataformas de eventos para Corte Argentino, Logistran, Naistat y Tekun Agropecuaria.",
        en: "Websites, e-commerce, admin systems and event platforms for Corte Argentino, Logistran, Naistat and Tekun Agropecuaria.",
      },
      {
        es: "Diseño responsivo, SEO, testing automatizado (PHPUnit), branding y piezas gráficas.",
        en: "Responsive design, SEO, automated testing (PHPUnit), branding and graphic design.",
      },
    ],
    stack: ["Laravel", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Shopify"],
  },
  {
    company: "United Soccer League (USL)",
    role: { es: "Digital Services Intern", en: "Digital Services Intern" },
    period: { es: "Sep 2023 – Dic 2023", en: "Sep 2023 – Dec 2023" },
    location: { es: "Remoto · Tampa, EE. UU.", en: "Remote · Tampa, FL, USA" },
    bullets: [
      {
        es: "Mantenimiento de los sitios WordPress de la liga y desarrollo del menú de equipos de USL League Two y USL W League.",
        en: "Maintained the league's WordPress sites and built the team menu for USL League Two and USL W League.",
      },
      {
        es: "Mejoras de UX/UI trabajando de forma asincrónica con el equipo digital en Estados Unidos.",
        en: "UX/UI improvements working asynchronously with the US-based digital team.",
      },
    ],
    stack: ["WordPress", "PHP", "CSS"],
  },
];

/* ------------------------------------------------------------------ */
/* Skills, educación, idiomas                                          */
/* ------------------------------------------------------------------ */

export const skills: { group: L; items: string[] }[] = [
  {
    group: { es: "Mobile", en: "Mobile" },
    items: ["React Native", "Expo", "EAS Build/Submit", "iOS & Android"],
  },
  {
    group: { es: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS"],
  },
  {
    group: { es: "Backend", en: "Backend" },
    items: ["Node.js", "PHP", "Laravel", "REST APIs", "MySQL", "MongoDB", "Firebase"],
  },
  {
    group: { es: "DevOps y testing", en: "DevOps & testing" },
    items: ["Git", "CI/CD", "Docker", "pnpm monorepos", "AWS", "Google Cloud", "Playwright", "PHPUnit"],
  },
  {
    group: { es: "IA", en: "AI tools" },
    items: ["Claude Code", "Cursor", "ChatGPT", "Gemini"],
  },
  {
    group: { es: "Diseño", en: "Design" },
    items: ["UX/UI", "Figma", "Illustrator", "Photoshop"],
  },
];

export const education: { title: L; school: string; year: L }[] = [
  {
    title: {
      es: "Tecnicatura Superior en Diseño y Programación Web",
      en: "Associate Degree in Web Design & Development",
    },
    school: "Escuela Da Vinci",
    year: { es: "2023 (cursada completa)", en: "2023 (coursework completed)" },
  },
  {
    title: { es: "Tecnicatura en Periodismo", en: "Associate Degree in Journalism" },
    school: "TEA & Deportea",
    year: { es: "2020", en: "2020" },
  },
];

export const spokenLanguages: L[] = [
  { es: "Español — nativo", en: "Spanish — native" },
  { es: "Inglés — B2, competencia profesional", en: "English — B2, professional proficiency" },
];
