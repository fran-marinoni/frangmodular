export interface ProjectItem {
  name: string;
  image: string;
}

export interface CategoryData {
  slug: string;
  title: string;
  years: string[];
  projects: Record<string, ProjectItem[]>;
}

// Use dynamic image paths via Vite's glob import pattern
// Images will be resolved at runtime instead of bundled eagerly
const imageModules = import.meta.glob<{ default: string }>(
  '/src/assets/projects/*.{jpg,png}',
  { eager: false }
);

const imageCache: Record<string, string> = {};

export async function resolveImage(path: string): Promise<string> {
  if (imageCache[path]) return imageCache[path];
  const loader = imageModules[path];
  if (loader) {
    const mod = await loader();
    imageCache[path] = mod.default;
    return mod.default;
  }
  return '/placeholder.svg';
}

// Synchronous fallback for initial render — returns placeholder until resolved
function imgPath(filename: string): string {
  return `/src/assets/projects/${filename}`;
}

const categories: CategoryData[] = [
  {
    slug: "corporativo",
    title: "Corporativo.",
    years: ["2025", "2024", "2023", "2022", "2020"],
    projects: {
      "2025": [
        { name: "BANCO DE GUAYAQUIL.", image: imgPath("corporativo-2025-banco-de-guayaquil.jpg") },
        { name: "GENERAL MOTORS.", image: imgPath("corporativo-2025-general-motors.jpg") },
        { name: "TERMIKON.", image: imgPath("corporativo-2025-termikon.jpg") },
        { name: "PROYECTO ANA.", image: imgPath("corporativo-2025-proyecto-ana.jpg") },
      ],
      "2024": [
        { name: "IBM.", image: imgPath("corporativo-2024-ibm.jpg") },
      ],
      "2023": [
        { name: "DANEC.", image: imgPath("corporativo-2023-danec.jpg") },
        { name: "USFQ.", image: imgPath("corporativo-2023-usfq.jpg") },
      ],
      "2022": [
        { name: "MERINO LIZARZABURU ABOGADOS.", image: imgPath("corporativo-2022-merino-lizarzaburu-abogados.jpg") },
      ],
      "2020": [
        { name: "COFACE.", image: imgPath("corporativo-2020-coface.jpg") },
        { name: "PTIE.", image: imgPath("corporativo-2020-ptie.jpg") },
        { name: "GRUPO SUPERIOR.", image: imgPath("corporativo-2020-grupo-superior.jpg") },
        { name: "KUSHKI.", image: imgPath("corporativo-2020-kushki.jpg") },
        { name: "PFIZER.", image: imgPath("corporativo-2020-pfizer.jpg") },
        { name: "SEMAICA ENERGIA.", image: imgPath("corporativo-2020-semaica-energia.jpg") },
      ],
    },
  },
  {
    slug: "educacion",
    title: "Educación.",
    years: ["2025"],
    projects: {
      "2025": [
        { name: "COLEGIO MENOR.", image: imgPath("educacion-2025-colegio-menor.jpg") },
        { name: "CRISFE BY OBJEKT.", image: imgPath("educacion-2025-crisfe-by-objekt.jpg") },
      ],
    },
  },
  {
    slug: "salud",
    title: "Salud.",
    years: ["2025", "2024", "2019", "2015"],
    projects: {
      "2025": [
        { name: "CLINICA SANTA LUCIA.", image: imgPath("salud-2025-clinica-santa-lucia.jpg") },
        { name: "DR CORNEJO.", image: imgPath("salud-2025-dr-cornejo.jpg") },
      ],
      "2024": [
        { name: "CLINICA PASTEUR.", image: imgPath("salud-2024-clinica-pasteur.jpg") },
      ],
      "2019": [
        { name: "AXXIS - RADIOLOGOS ASOCIADOS.", image: imgPath("salud-2019-axxis-radiologos-asociados.jpg") },
      ],
      "2015": [
        { name: "HOSPITAL PASTEUR  ETAPA 1.", image: imgPath("salud-2015-hospital-pasteur-etapa-1.jpg") },
      ],
    },
  },
  {
    slug: "hospitalidad",
    title: "Hospitalidad.",
    years: ["2025", "2023", "2021"],
    projects: {
      "2025": [
        { name: "AEROPUERTO MARISCAL SUCRE.", image: imgPath("hospitalidad-2025-aeropuerto-mariscal-sucre.jpg") },
        { name: "ORO VERDE.", image: imgPath("hospitalidad-2025-oro-verde.jpg") },
      ],
      "2023": [
        { name: "HAMPTON INN.", image: imgPath("hospitalidad-2023-hampton-inn.png") },
      ],
      "2021": [
        { name: "NOVOPAN.", image: imgPath("hospitalidad-2021-novopan.jpg") },
      ],
    },
  },
  {
    slug: "retail",
    title: "Retail.",
    years: ["2024", "2023", "2017"],
    projects: {
      "2024": [
        { name: "AGRINAG.", image: imgPath("retail-2024-agrinag.jpg") },
      ],
      "2023": [
        { name: "1001 CARROS.", image: imgPath("retail-2023-1001-carros.jpg") },
        { name: "CASABACA.", image: imgPath("retail-2023-casabaca.jpg") },
      ],
      "2017": [
        { name: "ALMACENES JAPON.", image: imgPath("retail-2017-almacenes-japon.jpg") },
        { name: "BELLINI.", image: imgPath("retail-2017-bellini.jpg") },
        { name: "CHAIDE.", image: imgPath("retail-2017-chaide.jpg") },
      ],
    },
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategories(): CategoryData[] {
  return categories;
}
