export interface ProjectItem {
  name: string;
  slug: string;
  image: string;
  imageFolder: string;
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

// Glob all project images lazily from the real folder structure
const allProjectImages = import.meta.glob<{ default: string }>(
  '/src/assets/3. PROYECTOS/**/*.{jpg,jpeg,png}',
  { eager: false }
);

// Also keep the old thumbnail glob for backward compat
const thumbnailImages = import.meta.glob<{ default: string }>(
  '/src/assets/projects/*.{jpg,png}',
  { eager: false }
);

const imageCache: Record<string, string> = {};

export async function resolveImage(path: string): Promise<string> {
  if (imageCache[path]) return imageCache[path];
  const loader = allProjectImages[path] || thumbnailImages[path];
  if (loader) {
    const mod = await loader();
    imageCache[path] = mod.default;
    return mod.default;
  }
  return '/placeholder.svg';
}

/** Get all image paths for a project folder */
export function getProjectImagePaths(folder: string): string[] {
  const prefix = folder.endsWith('/') ? folder : folder + '/';
  return Object.keys(allProjectImages)
    .filter((k) => k.startsWith(prefix))
    .sort();
}

function thumbPath(filename: string): string {
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
  thumbFile: string,
  year: string,
  category: string,
  imageFolder: string,
  extra?: { client?: string; designer?: string; description?: string[] }
): ProjectItem {
  return {
    name,
    slug: makeSlug(name),
    image: thumbPath(thumbFile),
    imageFolder,
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

const F = "/src/assets/3. PROYECTOS";

const categories: CategoryData[] = [
  {
    slug: "corporativo",
    title: "Corporativo.",
    years: ["2025", "2024", "2023", "2022", "2020"],
    projects: {
      "2025": [
        proj("BANCO DE GUAYAQUIL.", "corporativo-2025-banco-de-guayaquil.jpg", "2025", "corporativo", `${F}/1. OFICINAS/2025/2. BANCO DE GUAYAQUIL`, { client: "Banco de Guayaquil" }),
        proj("GENERAL MOTORS.", "corporativo-2025-general-motors.jpg", "2025", "corporativo", `${F}/1. OFICINAS/2025/3. GENERAL MOTORS`, { client: "General Motors Ecuador" }),
        proj("TERMIKON.", "corporativo-2025-termikon.jpg", "2025", "corporativo", `${F}/1. OFICINAS/2025/4. TERMIKON`, { client: "Termikon S.A." }),
        proj("PROYECTO ANA.", "corporativo-2025-proyecto-ana.jpg", "2025", "corporativo", `${F}/1. OFICINAS/2025/5. PROYECTO ANA`, { client: "Proyecto Ana" }),
      ],
      "2024": [
        proj("IBM.", "corporativo-2024-ibm.jpg", "2024", "corporativo", `${F}/1. OFICINAS/2024/IBM`, { client: "IBM Ecuador" }),
      ],
      "2023": [
        proj("DANEC.", "corporativo-2023-danec.jpg", "2023", "corporativo", `${F}/1. OFICINAS/2023/8. DANEC`, { client: "Danec S.A." }),
        proj("USFQ.", "corporativo-2023-usfq.jpg", "2023", "corporativo", `${F}/1. OFICINAS/2023/9. USFQ`, { client: "Universidad San Francisco de Quito" }),
      ],
      "2022": [
        proj("MERINO LIZARZABURU ABOGADOS.", "corporativo-2022-merino-lizarzaburu-abogados.jpg", "2022", "corporativo", `${F}/1. OFICINAS/2022/7. MERINO LIZARZABURU ABOGADOS/EDITADAS`, { client: "Merino Lizarzaburu Abogados" }),
      ],
      "2020": [
        proj("COFACE.", "corporativo-2020-coface.jpg", "2020", "corporativo", `${F}/1. OFICINAS/2020/1. COFACE`, { client: "Coface" }),
        proj("PTIE.", "corporativo-2020-ptie.jpg", "2020", "corporativo", `${F}/1. OFICINAS/2020/2. PTIE`, { client: "PTIE" }),
        proj("GRUPO SUPERIOR.", "corporativo-2020-grupo-superior.jpg", "2020", "corporativo", `${F}/1. OFICINAS/2020/3.GRUPO SUPERIOR`, { client: "Grupo Superior" }),
        proj("KUSHKI.", "corporativo-2020-kushki.jpg", "2020", "corporativo", `${F}/1. OFICINAS/2020/4.KUSHKI`, { client: "Kushki" }),
        proj("PFIZER.", "corporativo-2020-pfizer.jpg", "2020", "corporativo", `${F}/1. OFICINAS/2020/5. PFIZER`, { client: "Pfizer Ecuador" }),
        proj("SEMAICA ENERGIA.", "corporativo-2020-semaica-energia.jpg", "2020", "corporativo", `${F}/1. OFICINAS/2020/6. SEMAICA ENERGIA`, { client: "Semaica Energía" }),
      ],
    },
  },
  {
    slug: "educacion",
    title: "Educación.",
    years: ["2025"],
    projects: {
      "2025": [
        proj("COLEGIO MENOR.", "educacion-2025-colegio-menor.jpg", "2025", "educacion", `${F}/2. EDUCACIÓN/2025/2. COLEGIO MENOR`, { client: "Colegio Menor" }),
        proj("CRISFE BY OBJEKT.", "educacion-2025-crisfe-by-objekt.jpg", "2025", "educacion", `${F}/2. EDUCACIÓN/2025/3. CRISFE by Objekt`, { client: "Crisfe by Objekt" }),
      ],
    },
  },
  {
    slug: "salud",
    title: "Salud.",
    years: ["2025", "2024", "2019", "2015"],
    projects: {
      "2025": [
        proj("CLINICA SANTA LUCIA.", "salud-2025-clinica-santa-lucia.jpg", "2025", "salud", `${F}/3. SALUD/2025/2. CLINICA SANTA LUCIA`, { client: "Clínica Santa Lucía" }),
        proj("DR CORNEJO.", "salud-2025-dr-cornejo.jpg", "2025", "salud", `${F}/3. SALUD/2025/3. DR CORNEJO`, { client: "Dr. Cornejo" }),
      ],
      "2024": [
        proj("CLINICA PASTEUR.", "salud-2024-clinica-pasteur.jpg", "2024", "salud", `${F}/3. SALUD/2024/1. CLINICA PASTEUR`, { client: "Clínica Pasteur" }),
      ],
      "2019": [
        proj("AXXIS - RADIOLOGOS ASOCIADOS.", "salud-2019-axxis-radiologos-asociados.jpg", "2019", "salud", `${F}/3. SALUD/2019/AXXIS - RADIOLOGOS ASOCIADOS`, { client: "Axxis - Radiólogos Asociados" }),
      ],
      "2015": [
        proj("HOSPITAL PASTEUR  ETAPA 1.", "salud-2015-hospital-pasteur-etapa-1.jpg", "2015", "salud", `${F}/3. SALUD/2015/HOSPITAL PASTEUR  ETAPA 1`, { client: "Hospital Pasteur" }),
      ],
    },
  },
  {
    slug: "hospitalidad",
    title: "Hospitalidad.",
    years: ["2025", "2023", "2021"],
    projects: {
      "2025": [
        proj("AEROPUERTO MARISCAL SUCRE.", "hospitalidad-2025-aeropuerto-mariscal-sucre.jpg", "2025", "hospitalidad", `${F}/4. HOSPITALIDAD/2025/1. AEROPUERTO MARISCAL SUCRE`, { client: "Aeropuerto Mariscal Sucre" }),
        proj("ORO VERDE.", "hospitalidad-2025-oro-verde.jpg", "2025", "hospitalidad", `${F}/4. HOSPITALIDAD/2025/3. ORO VERDE`, { client: "Hotel Oro Verde" }),
      ],
      "2023": [
        proj("HAMPTON INN.", "hospitalidad-2023-hampton-inn.png", "2023", "hospitalidad", `${F}/4. HOSPITALIDAD/2023/HAMPTON INN`, { client: "Hampton Inn" }),
      ],
      "2021": [
        proj("NOVOPAN.", "hospitalidad-2021-novopan.jpg", "2021", "hospitalidad", `${F}/4. HOSPITALIDAD/2021/2. NOVOPAN`, { client: "Novopan" }),
      ],
    },
  },
  {
    slug: "retail",
    title: "Retail.",
    years: ["2024", "2023", "2017"],
    projects: {
      "2024": [
        proj("AGRINAG.", "retail-2024-agrinag.jpg", "2024", "retail", `${F}/5. RETAIL/2024/Agrinag`, { client: "Agrinag" }),
      ],
      "2023": [
        proj("1001 CARROS.", "retail-2023-1001-carros.jpg", "2023", "retail", `${F}/5. RETAIL/2023/1001 CARROS`, { client: "1001 Carros" }),
        proj("CASABACA.", "retail-2023-casabaca.jpg", "2023", "retail", `${F}/5. RETAIL/2023/CASABACA`, { client: "Casabaca" }),
      ],
      "2017": [
        proj("ALMACENES JAPON.", "retail-2017-almacenes-japon.jpg", "2017", "retail", `${F}/5. RETAIL/2017/ALMACENES JAPON`, { client: "Almacenes Japón" }),
        proj("BELLINI.", "retail-2017-bellini.jpg", "2017", "retail", `${F}/5. RETAIL/2017/BELLINI`, { client: "Bellini" }),
        proj("CHAIDE.", "retail-2017-chaide.jpg", "2017", "retail", `${F}/5. RETAIL/2017/CHAIDE`, { client: "Chaide" }),
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
