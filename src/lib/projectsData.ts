export interface ProjectItem {
  name: string;
  slug: string;
  image: string;
  year: string;
  category: string;
  client?: string;
  designer?: string;
  manufacturer?: string;
  description?: string[];
}

export interface CategoryData {
  slug: string;
  title: string;
  years: string[];
  projects: Record<string, ProjectItem[]>;
}

// Use dynamic image paths via Vite's glob import pattern
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

function imgPath(filename: string): string {
  return `/src/assets/projects/${filename}`;
}

function makeSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '');
}

function proj(
  name: string,
  imageFile: string,
  year: string,
  category: string,
  extra?: { client?: string; designer?: string; description?: string[] }
): ProjectItem {
  return {
    name,
    slug: makeSlug(name),
    image: imgPath(imageFile),
    year,
    category,
    client: extra?.client || name.replace(/\.$/, ''),
    designer: extra?.designer || "Generación Modular",
    manufacturer: "Generación Modular",
    description: extra?.description || [
      "Un proyecto que refleja la capacidad de Generación Modular para crear espacios funcionales y estéticamente coherentes. Cada elemento fue diseñado para responder a las necesidades reales del cliente, combinando durabilidad, ergonomía y un lenguaje visual contemporáneo.",
      "La planificación integral del espacio permitió optimizar cada área, logrando un equilibrio entre productividad y confort. El mobiliario modular se adapta a los cambios programáticos, asegurando flexibilidad a largo plazo.",
    ],
  };
}

const categories: CategoryData[] = [
  {
    slug: "corporativo",
    title: "Corporativo.",
    years: ["2025", "2024", "2023", "2022", "2020"],
    projects: {
      "2025": [
        proj("BANCO DE GUAYAQUIL.", "corporativo-2025-banco-de-guayaquil.jpg", "2025", "corporativo", { client: "Banco de Guayaquil" }),
        proj("GENERAL MOTORS.", "corporativo-2025-general-motors.jpg", "2025", "corporativo", { client: "General Motors Ecuador" }),
        proj("TERMIKON.", "corporativo-2025-termikon.jpg", "2025", "corporativo", { client: "Termikon S.A." }),
        proj("PROYECTO ANA.", "corporativo-2025-proyecto-ana.jpg", "2025", "corporativo", { client: "Proyecto Ana" }),
      ],
      "2024": [
        proj("IBM.", "corporativo-2024-ibm.jpg", "2024", "corporativo", { client: "IBM Ecuador" }),
      ],
      "2023": [
        proj("DANEC.", "corporativo-2023-danec.jpg", "2023", "corporativo", { client: "Danec S.A." }),
        proj("USFQ.", "corporativo-2023-usfq.jpg", "2023", "corporativo", { client: "Universidad San Francisco de Quito" }),
      ],
      "2022": [
        proj("MERINO LIZARZABURU ABOGADOS.", "corporativo-2022-merino-lizarzaburu-abogados.jpg", "2022", "corporativo", { client: "Merino Lizarzaburu Abogados" }),
      ],
      "2020": [
        proj("COFACE.", "corporativo-2020-coface.jpg", "2020", "corporativo", { client: "Coface" }),
        proj("PTIE.", "corporativo-2020-ptie.jpg", "2020", "corporativo", { client: "PTIE" }),
        proj("GRUPO SUPERIOR.", "corporativo-2020-grupo-superior.jpg", "2020", "corporativo", { client: "Grupo Superior" }),
        proj("KUSHKI.", "corporativo-2020-kushki.jpg", "2020", "corporativo", { client: "Kushki" }),
        proj("PFIZER.", "corporativo-2020-pfizer.jpg", "2020", "corporativo", { client: "Pfizer Ecuador" }),
        proj("SEMAICA ENERGIA.", "corporativo-2020-semaica-energia.jpg", "2020", "corporativo", { client: "Semaica Energía" }),
      ],
    },
  },
  {
    slug: "educacion",
    title: "Educación.",
    years: ["2025"],
    projects: {
      "2025": [
        proj("COLEGIO MENOR.", "educacion-2025-colegio-menor.jpg", "2025", "educacion", { client: "Colegio Menor" }),
        proj("CRISFE BY OBJEKT.", "educacion-2025-crisfe-by-objekt.jpg", "2025", "educacion", { client: "Crisfe by Objekt" }),
      ],
    },
  },
  {
    slug: "salud",
    title: "Salud.",
    years: ["2025", "2024", "2019", "2015"],
    projects: {
      "2025": [
        proj("CLINICA SANTA LUCIA.", "salud-2025-clinica-santa-lucia.jpg", "2025", "salud", { client: "Clínica Santa Lucía" }),
        proj("DR CORNEJO.", "salud-2025-dr-cornejo.jpg", "2025", "salud", { client: "Dr. Cornejo" }),
      ],
      "2024": [
        proj("CLINICA PASTEUR.", "salud-2024-clinica-pasteur.jpg", "2024", "salud", { client: "Clínica Pasteur" }),
      ],
      "2019": [
        proj("AXXIS - RADIOLOGOS ASOCIADOS.", "salud-2019-axxis-radiologos-asociados.jpg", "2019", "salud", { client: "Axxis - Radiólogos Asociados" }),
      ],
      "2015": [
        proj("HOSPITAL PASTEUR  ETAPA 1.", "salud-2015-hospital-pasteur-etapa-1.jpg", "2015", "salud", { client: "Hospital Pasteur" }),
      ],
    },
  },
  {
    slug: "hospitalidad",
    title: "Hospitalidad.",
    years: ["2025", "2023", "2021"],
    projects: {
      "2025": [
        proj("AEROPUERTO MARISCAL SUCRE.", "hospitalidad-2025-aeropuerto-mariscal-sucre.jpg", "2025", "hospitalidad", { client: "Aeropuerto Mariscal Sucre" }),
        proj("ORO VERDE.", "hospitalidad-2025-oro-verde.jpg", "2025", "hospitalidad", { client: "Hotel Oro Verde" }),
      ],
      "2023": [
        proj("HAMPTON INN.", "hospitalidad-2023-hampton-inn.png", "2023", "hospitalidad", { client: "Hampton Inn" }),
      ],
      "2021": [
        proj("NOVOPAN.", "hospitalidad-2021-novopan.jpg", "2021", "hospitalidad", { client: "Novopan" }),
      ],
    },
  },
  {
    slug: "retail",
    title: "Retail.",
    years: ["2024", "2023", "2017"],
    projects: {
      "2024": [
        proj("AGRINAG.", "retail-2024-agrinag.jpg", "2024", "retail", { client: "Agrinag" }),
      ],
      "2023": [
        proj("1001 CARROS.", "retail-2023-1001-carros.jpg", "2023", "retail", { client: "1001 Carros" }),
        proj("CASABACA.", "retail-2023-casabaca.jpg", "2023", "retail", { client: "Casabaca" }),
      ],
      "2017": [
        proj("ALMACENES JAPON.", "retail-2017-almacenes-japon.jpg", "2017", "retail", { client: "Almacenes Japón" }),
        proj("BELLINI.", "retail-2017-bellini.jpg", "2017", "retail", { client: "Bellini" }),
        proj("CHAIDE.", "retail-2017-chaide.jpg", "2017", "retail", { client: "Chaide" }),
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

export function getProjectBySlug(projectSlug: string): ProjectItem | undefined {
  for (const cat of categories) {
    for (const year of cat.years) {
      const found = cat.projects[year]?.find((p) => p.slug === projectSlug);
      if (found) return found;
    }
  }
  return undefined;
}

export function getProjectsByCategoryAndYear(categorySlug: string, year: string): ProjectItem[] {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return [];
  return cat.projects[year] || [];
}
