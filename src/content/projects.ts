import type { L } from "@/i18n";

export type Project = {
  slug: string;
  name: string;
  client?: string;
  summary: L;
  stack: string[];
  image: string;
  imageAlt: L;
  /** Posición del recorte de la imagen en la tarjeta (object-position). */
  imagePosition?: "top" | "center";
  url?: string;
  repo?: string;
};

export type CaseStudy = Project & {
  role: L;
  period: L;
  platforms: L;
  links: { label: L; href: string }[];
  sections: { title: L; body: L[] }[];
};

/* ------------------------------------------------------------------ */
/* Destacado                                                           */
/* ------------------------------------------------------------------ */

export const valoo: CaseStudy = {
  slug: "valoo",
  name: "Valoo",
  client: "Lengar Studio",
  summary: {
    es: "Plataforma de propinas digitales y gestión de equipos para gastronomía. Los clientes dejan propina y valoran al personal escaneando un QR; los comercios arman equipos, juntan las propinas en un pozo común y las reparten con reglas configurables.",
    en: "Digital tipping and team management platform for hospitality. Guests tip and rate staff by scanning a personal QR code; venues build teams, pool tips and split them with configurable rules.",
  },
  stack: ["React Native", "Expo", "TypeScript", "Laravel", "MySQL", "Mercado Pago", "Docker", "pnpm", "EAS"],
  image: "/projects/icon-valoo.png",
  imageAlt: { es: "Ícono de la app Valoo", en: "Valoo app icon" },
  role: {
    es: "Fundador · producto, diseño y desarrollo",
    en: "Founder · product, design and engineering",
  },
  period: { es: "2025 – actualidad", en: "2025 – present" },
  platforms: { es: "iOS, Android y web", en: "iOS, Android and web" },
  links: [
    { label: { es: "Sitio: valoo.la", en: "Website: valoo.la" }, href: "https://valoo.la/" },
    { label: { es: "App Store", en: "App Store" }, href: "https://apps.apple.com/ar/app/valoo/id6770953091" },
    { label: { es: "Google Play", en: "Google Play" }, href: "https://play.google.com/store/apps/details?id=la.valoo.app" },
  ],
  sections: [
    {
      title: { es: "El problema", en: "The problem" },
      body: [
        {
          es: "En gastronomía, cada vez menos clientes pagan en efectivo, y la propina se pierde o queda en manos de pocos. Los comercios no tienen una forma simple y transparente de recibir propinas digitales ni de repartirlas entre todo el equipo.",
          en: "In hospitality, fewer and fewer guests pay in cash, so tips get lost or end up with only a few people. Venues have no simple, transparent way to collect digital tips or share them across the whole team.",
        },
      ],
    },
    {
      title: { es: "La solución", en: "The solution" },
      body: [
        {
          es: "Cada integrante del equipo tiene un QR personal. El cliente lo escanea, deja la propina y valora la atención sin descargar nada. Del lado del comercio, la app permite armar equipos, juntar las propinas en un pozo común y liquidarlas según reglas configurables.",
          en: "Every team member gets a personal QR code. Guests scan it, leave a tip and rate the service without installing anything. On the venue side, the app lets managers build teams, pool tips and pay them out with configurable rules.",
        },
      ],
    },
    {
      title: { es: "Mi rol", en: "My role" },
      body: [
        {
          es: "Lo construí de punta a punta como fundador único: investigación, decisiones de producto, modelo de precios, diseño UX/UI y todo el desarrollo, desde la app mobile hasta la API y la publicación en las tiendas.",
          en: "I built it end to end as sole founder: research, product decisions, pricing model, UX/UI design and all of the engineering, from the mobile app to the API and the store releases.",
        },
      ],
    },
    {
      title: { es: "Arquitectura", en: "Architecture" },
      body: [
        {
          es: "Monorepo TypeScript con pnpm y Docker. La app está hecha con React Native + Expo y comparte un design system multiplataforma: design tokens comunes y capas de UI separadas para web y nativo.",
          en: "TypeScript monorepo with pnpm and Docker. The app is built with React Native + Expo on top of a cross-platform design system: shared design tokens with separate UI layers for web and native.",
        },
        {
          es: "El backend es una API REST en Laravel + MySQL que resuelve la lógica de pozo común y liquidación de propinas. Los pagos se integran con el checkout de Mercado Pago.",
          en: "The backend is a Laravel + MySQL REST API that handles tip pooling and payout logic. Payments go through Mercado Pago checkout.",
        },
        {
          es: "CI/CD mobile con EAS Build y EAS Submit para publicar builds en App Store y Google Play.",
          en: "Mobile CI/CD with EAS Build and EAS Submit to ship builds to the App Store and Google Play.",
        },
      ],
    },
    {
      title: { es: "Sitio y lanzamiento", en: "Website and launch" },
      body: [
        {
          es: "También diseñé y desarrollé valoo.la, el sitio del producto: explica cómo funciona para comercios y personal, y lleva a la descarga en App Store y Google Play.",
          en: "I also designed and built valoo.la, the product website: it explains how Valoo works for venues and staff and drives downloads on the App Store and Google Play.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Lengar Studio y clientes                                            */
/* ------------------------------------------------------------------ */

export const studio: Project = {
  slug: "lengar-studio",
  name: "Lengar Studio",
  summary: {
    es: "El sitio de mi estudio: animaciones con GSAP y Lenis, formulario de contacto con Resend y Turnstile, y un panel privado de cotización que arma presupuestos en PDF.",
    en: "My studio's website: GSAP and Lenis animations, a contact form with Resend and Turnstile, and a private quoting panel that generates PDF estimates.",
  },
  stack: ["Next.js", "TypeScript", "GSAP", "Lenis", "Resend", "React PDF"],
  image: "/projects/lengar-home.jpg",
  imageAlt: { es: "Home del sitio lengarstudio.com", en: "lengarstudio.com home page" },
  imagePosition: "center",
  url: "https://lengarstudio.com",
};

export const clientProjects: Project[] = [
  {
    slug: "tekun",
    name: "Tekun Agropecuaria",
    summary: {
      es: "Rediseño completo de la web institucional, nueva identidad de marca y posicionamiento en Google. Prerenderizado estático, clima y mercado del día, y tests end-to-end con chequeos de accesibilidad.",
      en: "Full redesign of the company website, new brand identity and Google positioning. Statically prerendered, with live weather and market data and end-to-end tests with accessibility checks.",
    },
    stack: ["React Router", "TypeScript", "Tailwind CSS", "Radix UI", "Playwright"],
    image: "/projects/tekun-devices.webp",
    imageAlt: { es: "Sitio de Tekun en notebook y celular", en: "Tekun website on laptop and phone" },
    imagePosition: "center",
    url: "https://tekun.com.ar/",
  },
  {
    slug: "proyecto-bonifacio",
    name: "Proyecto Bonifacio 1819",
    client: "Construcserv",
    summary: {
      es: "Landing para un desarrollo inmobiliario en Caballito, con galería y formulario de contacto conectado a su propia API.",
      en: "Landing page for a residential development in Caballito, Buenos Aires, with a gallery and a contact form backed by its own API.",
    },
    stack: ["React", "TypeScript", "Tailwind CSS", "Next.js API"],
    image: "/projects/construcserv-bonifacio.webp",
    imageAlt: { es: "Portada de Bonifacio 1819, Caballito", en: "Bonifacio 1819 cover, Caballito" },
    imagePosition: "center",
    url: "https://proyectobonifacio.construcserv.com/",
  },
  {
    slug: "logistran",
    name: "Logistran",
    summary: {
      es: "Sistema interno para la operación diaria de una empresa de logística, más el diseño de su marca y su landing.",
      en: "Internal system for a logistics company's day-to-day operations, plus its brand design and landing page.",
    },
    stack: ["React", "Tailwind CSS", "MUI", "React Hook Form"],
    image: "/projects/logistran-desktop.webp",
    imageAlt: { es: "Landing de Logistran", en: "Logistran landing page" },
    imagePosition: "top",
    url: "https://logistran.com.ar/",
  },
  {
    slug: "corte-argentino",
    name: "Corte Argentino",
    summary: {
      es: "Landing interactiva para una marca de carne premium, pensada para sus clientes internacionales, con mapa de sucursales.",
      en: "Interactive landing page for a premium beef brand aimed at international customers, with a map of locations.",
    },
    stack: ["React", "Vite", "Leaflet"],
    image: "/projects/corte-argentino-cover.webp",
    imageAlt: { es: "Landing de Corte Argentino", en: "Corte Argentino landing page" },
    imagePosition: "center",
    url: "https://corteargentino.com/",
  },
  {
    slug: "malevo",
    name: "Malevo",
    summary: {
      es: "Diseño de etiquetas para la línea de cervezas artesanales de la marca.",
      en: "Label design for the brand's craft beer line.",
    },
    stack: ["Packaging", "Branding"],
    image: "/projects/malevo-cover.webp",
    imageAlt: { es: "Latas de cerveza Malevo con las etiquetas diseñadas", en: "Malevo beer cans with the label design" },
    imagePosition: "center",
  },
];
