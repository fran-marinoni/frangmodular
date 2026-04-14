export interface ChairModel {
  name: string;
  slug: string;
  assetFolder: string; // path relative to src/assets/1. SILLAS/
  description: string;
}

export interface ChairCategory {
  name: string;
  slug: string;
  folderPrefix: string;
  chairs: ChairModel[];
}

export const chairCategories: ChairCategory[] = [
  {
    name: "Ejecutivas",
    slug: "ejecutivas",
    folderPrefix: "1. EJECUTIVAS",
    chairs: [
      { name: "Delphi", slug: "delphi", assetFolder: "1. EJECUTIVAS/1. DELPHI", description: "Silla ejecutiva de alto respaldo con tapizado en piel y base de aluminio." },
      { name: "Alek", slug: "alek", assetFolder: "1. EJECUTIVAS/2. ALEK", description: "Silla ejecutiva con diseño moderno y ergonómico." },
      { name: "Fortis", slug: "fortis", assetFolder: "1. EJECUTIVAS/3. FORTIS", description: "Silla ejecutiva robusta con soporte lumbar avanzado." },
      { name: "Lavo", slug: "lavo", assetFolder: "1. EJECUTIVAS/4. LAVO", description: "Silla ejecutiva con mecanismo sincronizado y respaldo alto." },
      { name: "Wau", slug: "wau", assetFolder: "1. EJECUTIVAS/5. WAU", description: "Silla ejecutiva con diseño contemporáneo y múltiples ajustes." },
      { name: "Oasis", slug: "oasis", assetFolder: "1. EJECUTIVAS/6. OASIS", description: "Silla ejecutiva con respaldo de malla y soporte ergonómico." },
      { name: "Marin", slug: "marin", assetFolder: "1. EJECUTIVAS/7. MARIN", description: "Silla ejecutiva premium con cabecero ajustable." },
      { name: "Flo", slug: "flo", assetFolder: "1. EJECUTIVAS/8. FLO", description: "Silla ejecutiva con líneas fluidas y diseño elegante." },
      { name: "Apollo Ejecutiva", slug: "apollo-ejecutiva", assetFolder: "1. EJECUTIVAS/9. APOLLO EJECUTIVA", description: "Silla ejecutiva Apollo con cabecero, apoyabrazos fijos y mecanismo Knee Tilt." },
      { name: "Apollo Operativa", slug: "apollo-operativa", assetFolder: "1. EJECUTIVAS/9. APOLLO OPERATIVA", description: "Versión operativa de la silla Apollo con diseño ergonómico." },
      { name: "Apollo Visita", slug: "apollo-visita", assetFolder: "1. EJECUTIVAS/9. APOLLO VISITA", description: "Versión visita de la silla Apollo, ideal para salas de reunión." },
    ],
  },
  {
    name: "Operativas",
    slug: "operativas",
    folderPrefix: "2. OPERATIVAS",
    chairs: [
      { name: "Slide", slug: "slide", assetFolder: "2. OPERATIVAS/1. SLIDE", description: "Silla operativa con diseño limpio y funcional." },
      { name: "Task D251", slug: "task-d251", assetFolder: "2. OPERATIVAS/2. TASK D251", description: "Silla operativa Task con múltiples configuraciones." },
      { name: "Eli", slug: "eli", assetFolder: "2. OPERATIVAS/3. ELI", description: "Silla operativa Eli con respaldo ergonómico." },
      { name: "Eli Cajero D209SF", slug: "eli-cajero-d209sf", assetFolder: "2. OPERATIVAS/3. ELI CAJERO D209SF", description: "Silla cajero Eli con base alta y reposapiés." },
      { name: "Ace", slug: "ace", assetFolder: "2. OPERATIVAS/4. ACE", description: "Silla operativa Ace con diseño deportivo." },
      { name: "Pogo", slug: "pogo", assetFolder: "2. OPERATIVAS/5. POGO", description: "Silla operativa Pogo con asiento dinámico." },
      { name: "Cube Mesh", slug: "cube-mesh", assetFolder: "2. OPERATIVAS/6. CUBE MESH", description: "Silla operativa con respaldo de malla transpirable." },
      { name: "Lumi Task", slug: "lumi-task", assetFolder: "2. OPERATIVAS/7. LUMI TASK", description: "Silla operativa Lumi Task con líneas minimalistas." },
      { name: "Kaden", slug: "kaden", assetFolder: "2. OPERATIVAS/8. KADEN", description: "Silla operativa Kaden con diseño contemporáneo." },
    ],
  },
  {
    name: "Visitas",
    slug: "visitas",
    folderPrefix: "3. VISITAS",
    chairs: [
      { name: "Lumi", slug: "lumi", assetFolder: "3. VISITAS/1. LUMI", description: "Silla de visita Lumi con estructura liviana." },
      { name: "Chico", slug: "chico", assetFolder: "3. VISITAS/2. CHICO", description: "Silla de visita compacta y apilable." },
      { name: "Clark D327", slug: "clark-d327", assetFolder: "3. VISITAS/3. CLARK D327", description: "Silla de visita Clark con base de 4 patas." },
      { name: "Unique D325", slug: "unique-d325", assetFolder: "3. VISITAS/4. UNIQUE D325", description: "Silla de visita Unique con diseño distinguido." },
    ],
  },
  {
    name: "Barra",
    slug: "barra",
    folderPrefix: "4. BARRA",
    chairs: [
      { name: "Olla", slug: "olla", assetFolder: "4. BARRA/1. OLLA", description: "Silla de barra Olla con base giratoria." },
      { name: "Mod", slug: "mod", assetFolder: "4. BARRA/2. MOD", description: "Silla de barra Mod con opciones Air y Standard." },
      { name: "Plaza", slug: "plaza", assetFolder: "4. BARRA/3. PLAZA", description: "Silla de barra Plaza con diseño versátil." },
      { name: "Kopio", slug: "kopio", assetFolder: "4. BARRA/4. KOPIO", description: "Silla de barra Kopio con estructura de madera." },
    ],
  },
  {
    name: "Lounge",
    slug: "lounge",
    folderPrefix: "5. LOUNGE",
    chairs: [
      { name: "Sophia Mod Lineal", slug: "sophia-mod-lineal", assetFolder: "5. LOUNGE/1. SOPHIA MOD LINEAL", description: "Sofá modular Sophia con configuración lineal." },
      { name: "Domino", slug: "domino", assetFolder: "5. LOUNGE/2. DOMINO", description: "Mesa de centro Domino con opciones de tapa." },
      { name: "Grid", slug: "grid", assetFolder: "5. LOUNGE/3. GRID", description: "Módulo lounge Grid con diseño geométrico." },
      { name: "Jackie", slug: "jackie", assetFolder: "5. LOUNGE/4. JACKIE", description: "Sillón lounge Jackie con líneas clásicas." },
      { name: "Momo", slug: "momo", assetFolder: "5. LOUNGE/5. MOMO", description: "Sillón lounge Momo con diseño orgánico." },
      { name: "Cosmos", slug: "cosmos", assetFolder: "5. LOUNGE/6. COSMOS", description: "Sillón lounge Cosmos con formas envolventes." },
      { name: "Cuve", slug: "cuve", assetFolder: "5. LOUNGE/7. CUVE", description: "Sillón lounge Cuve con estructura curvada." },
      { name: "Lutie", slug: "lutie", assetFolder: "5. LOUNGE/8. LUTIE", description: "Sillón lounge Lutie con diseño acogedor." },
      { name: "Valerio", slug: "valerio", assetFolder: "5. LOUNGE/10. VALERIO", description: "Sofá lounge Valerio con estilo contemporáneo." },
      { name: "Tranquo", slug: "tranquo", assetFolder: "5. LOUNGE/11. TRANQUO", description: "Módulo lounge Tranquo para espacios de descanso." },
      { name: "Qbuks", slug: "qbuks", assetFolder: "5. LOUNGE/12. QBUKS", description: "Módulo lounge Qbuks con diseño modular." },
      { name: "Rest", slug: "rest", assetFolder: "5. LOUNGE/13. REST", description: "Sillón lounge Rest con máximo confort." },
    ],
  },
  {
    name: "Estadio",
    slug: "estadio",
    folderPrefix: "8. ESTADIO",
    chairs: [
      { name: "Oahu2", slug: "oahu2", assetFolder: "8. ESTADIO/1. OAHU2", description: "Butaca de estadio Oahu2 resistente a la intemperie." },
      { name: "Sporta", slug: "sporta", assetFolder: "8. ESTADIO/2. SPORTA", description: "Butaca de estadio Sporta con diseño deportivo." },
    ],
  },
];

// Glob all chair images lazily
const allChairImages = import.meta.glob<{ default: string }>(
  "/src/assets/1. SILLAS/**/*.{webp,jpg,jpeg,png}",
  { eager: false }
);

/**
 * Resolve a chair image path to a URL.
 * The imagePath should be relative to the chair's assetFolder.
 */
export async function resolveChairImage(fullPath: string): Promise<string> {
  const loader = allChairImages[fullPath];
  if (loader) {
    const mod = await loader();
    return mod.default;
  }
  return "";
}

/**
 * Get all image paths for a chair from its asset folder.
 * Returns paths grouped by subfolder.
 */
export function getChairImagePaths(assetFolder: string): {
  main: string[];
  thumbnails: string[];
  ambientadas: string[];
  opciones: string[];
  colores: string[];
  medidas: string[];
  all360: string[];
} {
  const prefix = `/src/assets/1. SILLAS/${assetFolder}/`;
  const allPaths = Object.keys(allChairImages).filter((p) => p.startsWith(prefix));

  const classify = (path: string) => {
    const rel = path.slice(prefix.length).toUpperCase();
    if (rel.includes("AMBIENTAD")) return "ambientadas";
    if (rel.includes("OPCIONES") || rel.includes("OPCION")) return "opciones";
    if (rel.includes("COLORES")) return "colores";
    if (rel.includes("MEDIDAS")) return "medidas";
    if (rel.includes("360") || rel.includes("PNG/") || rel.includes("PRODUCTO")) return "360";
    return "root";
  };

  const groups: Record<string, string[]> = { "360": [], root: [], ambientadas: [], opciones: [], colores: [], medidas: [] };

  for (const p of allPaths) {
    const cat = classify(p);
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(p);
  }

  // Sort each group
  for (const k of Object.keys(groups)) groups[k].sort();

  // Main product images: 360 first, then root
  const main = groups["360"].length > 0 ? groups["360"] : groups.root;
  const thumbnails = main.slice(0, 3);

  return {
    main,
    thumbnails,
    ambientadas: groups.ambientadas,
    opciones: groups.opciones,
    colores: groups.colores,
    medidas: groups.medidas,
    all360: groups["360"],
  };
}

// Helpers
export function getCategoryBySlug(slug: string): ChairCategory | undefined {
  return chairCategories.find((c) => c.slug === slug);
}

export function getChairBySlug(categorySlug: string, chairSlug: string): ChairModel | undefined {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.chairs.find((c) => c.slug === chairSlug);
}

export function getChairBySlugs(categorySlug: string, chairSlug: string): { category: ChairCategory; chair: ChairModel } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const chair = category.chairs.find((c) => c.slug === chairSlug);
  if (!chair) return undefined;
  return { category, chair };
}
