export interface ChairVariant {
  id: string;          // e.g. "ejecutiva", "operativa", "cajero"
  label: string;       // Display label
  assetFolder: string; // Path relative to src/assets/1. SILLAS/
}

export interface ChairProduct {
  name: string;
  slug: string;
  description: string;
  defaultVariant: string;         // ID of the default variant
  variants: ChairVariant[];
  appearsInCategories: string[];  // Which category pages show this product
}

export interface ChairCategory {
  name: string;
  slug: string;
  chairs: string[]; // Slugs referencing ChairProduct
}

// ── Categories ──────────────────────────────────────────────

export const chairCategories: ChairCategory[] = [
  {
    name: "Ejecutivas",
    slug: "ejecutivas",
    chairs: ["delphi", "alek", "fortis", "lavo", "wau", "oasis", "marin", "flo", "apollo"],
  },
  {
    name: "Operativas",
    slug: "operativas",
    chairs: ["slide", "task-d251", "eli", "ace", "pogo", "cube-mesh", "lumi-task", "kaden", "apollo"],
  },
  {
    name: "Visitas",
    slug: "visitas",
    chairs: ["lumi", "chico", "clark-d327", "unique-d325", "apollo"],
  },
  {
    name: "Barra",
    slug: "barra",
    chairs: ["olla", "mod", "plaza", "kopio"],
  },
  {
    name: "Lounge",
    slug: "lounge",
    chairs: ["sophia-mod-lineal", "domino", "grid", "jackie", "momo", "cosmos", "cuve", "lutie", "valerio", "tranquo", "qbuks", "rest"],
  },
  {
    name: "Estadio",
    slug: "estadio",
    chairs: ["oahu2", "sporta"],
  },
];

// ── Products ────────────────────────────────────────────────

export const chairProducts: ChairProduct[] = [
  // ── EJECUTIVAS ──
  {
    name: "Delphi",
    slug: "delphi",
    description: "Diseñada para impresionar y brindar el máximo confort, esta silla ejecutiva combina elegancia con funcionalidad. Su tapizado en piel, respaldo alto con cabecera y base de aluminio la convierten en la opción ideal para espacios ejecutivos donde el estilo y el bienestar van de la mano.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/1. DELPHI" },
    ],
    appearsInCategories: ["ejecutivas"],
  },
  {
    name: "Alek",
    slug: "alek",
    description: "Silla ejecutiva con diseño moderno y ergonómico, ideal para largas jornadas de trabajo.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/2. ALEK" },
    ],
    appearsInCategories: ["ejecutivas"],
  },
  {
    name: "Fortis",
    slug: "fortis",
    description: "Silla ejecutiva robusta con soporte lumbar avanzado y acabados premium.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/3. FORTIS" },
    ],
    appearsInCategories: ["ejecutivas"],
  },
  {
    name: "Lavo",
    slug: "lavo",
    description: "Silla ejecutiva con mecanismo sincronizado y respaldo alto para máximo confort.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/4. LAVO" },
    ],
    appearsInCategories: ["ejecutivas"],
  },
  {
    name: "Wau",
    slug: "wau",
    description: "Silla ejecutiva con diseño contemporáneo, múltiples ajustes y certificaciones internacionales.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/5. WAU" },
    ],
    appearsInCategories: ["ejecutivas"],
  },
  {
    name: "Oasis",
    slug: "oasis",
    description: "Silla ejecutiva con respaldo de malla y soporte ergonómico para uso intensivo.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/6. OASIS" },
    ],
    appearsInCategories: ["ejecutivas"],
  },
  {
    name: "Marin",
    slug: "marin",
    description: "Silla ejecutiva premium con cabecero ajustable y certificaciones de calidad.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/7. MARIN" },
    ],
    appearsInCategories: ["ejecutivas"],
  },
  {
    name: "Flo",
    slug: "flo",
    description: "Silla ejecutiva con líneas fluidas y diseño elegante para oficinas de alto nivel.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/8. FLO" },
    ],
    appearsInCategories: ["ejecutivas"],
  },
  {
    name: "Apollo",
    slug: "apollo",
    description: "Diseñada para impresionar y brindar el máximo confort, esta silla combina elegancia con funcionalidad. Su tapizado en piel, respaldo alto con cabecera y base de aluminio la convierten en la opción ideal para espacios donde el estilo y el bienestar van de la mano.",
    defaultVariant: "ejecutiva",
    variants: [
      { id: "ejecutiva", label: "Ejecutiva", assetFolder: "1. EJECUTIVAS/9. APOLLO EJECUTIVA" },
      { id: "operativa", label: "Operativa", assetFolder: "1. EJECUTIVAS/9. APOLLO OPERATIVA" },
      { id: "visita", label: "Visita", assetFolder: "1. EJECUTIVAS/9. APOLLO VISITA" },
    ],
    appearsInCategories: ["ejecutivas", "operativas", "visitas"],
  },

  // ── OPERATIVAS ──
  {
    name: "Slide",
    slug: "slide",
    description: "Silla operativa con diseño limpio y funcional para ambientes de trabajo dinámicos.",
    defaultVariant: "operativa",
    variants: [
      { id: "operativa", label: "Operativa", assetFolder: "2. OPERATIVAS/1. SLIDE" },
    ],
    appearsInCategories: ["operativas"],
  },
  {
    name: "Task D251",
    slug: "task-d251",
    description: "Silla operativa Task con múltiples configuraciones adaptables a cada necesidad.",
    defaultVariant: "operativa",
    variants: [
      { id: "operativa", label: "Operativa", assetFolder: "2. OPERATIVAS/2. TASK D251" },
    ],
    appearsInCategories: ["operativas"],
  },
  {
    name: "Eli",
    slug: "eli",
    description: "Silla operativa Eli con respaldo ergonómico, disponible en versión operativa y cajero.",
    defaultVariant: "operativa",
    variants: [
      { id: "operativa", label: "Operativa", assetFolder: "2. OPERATIVAS/3. ELI" },
      { id: "cajero", label: "Cajero", assetFolder: "2. OPERATIVAS/3. ELI CAJERO D209SF" },
    ],
    appearsInCategories: ["operativas"],
  },
  {
    name: "Ace",
    slug: "ace",
    description: "Silla operativa Ace con diseño deportivo y múltiples configuraciones.",
    defaultVariant: "operativa",
    variants: [
      { id: "operativa", label: "Operativa", assetFolder: "2. OPERATIVAS/4. ACE" },
    ],
    appearsInCategories: ["operativas"],
  },
  {
    name: "Pogo",
    slug: "pogo",
    description: "Silla operativa Pogo con asiento dinámico para movimiento activo.",
    defaultVariant: "operativa",
    variants: [
      { id: "operativa", label: "Operativa", assetFolder: "2. OPERATIVAS/5. POGO" },
    ],
    appearsInCategories: ["operativas"],
  },
  {
    name: "Cube Mesh",
    slug: "cube-mesh",
    description: "Silla operativa con respaldo de malla transpirable y diseño moderno.",
    defaultVariant: "operativa",
    variants: [
      { id: "operativa", label: "Operativa", assetFolder: "2. OPERATIVAS/6. CUBE MESH" },
    ],
    appearsInCategories: ["operativas"],
  },
  {
    name: "Lumi Task",
    slug: "lumi-task",
    description: "Silla operativa Lumi Task con líneas minimalistas y certificaciones de calidad.",
    defaultVariant: "operativa",
    variants: [
      { id: "operativa", label: "Operativa", assetFolder: "2. OPERATIVAS/7. LUMI TASK" },
    ],
    appearsInCategories: ["operativas"],
  },
  {
    name: "Kaden",
    slug: "kaden",
    description: "Silla operativa Kaden con diseño contemporáneo y confort superior.",
    defaultVariant: "operativa",
    variants: [
      { id: "operativa", label: "Operativa", assetFolder: "2. OPERATIVAS/8. KADEN" },
    ],
    appearsInCategories: ["operativas"],
  },

  // ── VISITAS ──
  {
    name: "Lumi",
    slug: "lumi",
    description: "Silla de visita Lumi con estructura liviana y diseño versátil.",
    defaultVariant: "visita",
    variants: [
      { id: "visita", label: "Visita", assetFolder: "3. VISITAS/1. LUMI" },
    ],
    appearsInCategories: ["visitas"],
  },
  {
    name: "Chico",
    slug: "chico",
    description: "Silla de visita compacta y apilable, ideal para espacios multifuncionales.",
    defaultVariant: "visita",
    variants: [
      { id: "visita", label: "Visita", assetFolder: "3. VISITAS/2. CHICO" },
    ],
    appearsInCategories: ["visitas"],
  },
  {
    name: "Clark D327",
    slug: "clark-d327",
    description: "Silla de visita Clark con base de 4 patas y múltiples acabados.",
    defaultVariant: "visita",
    variants: [
      { id: "visita", label: "Visita", assetFolder: "3. VISITAS/3. CLARK D327" },
    ],
    appearsInCategories: ["visitas"],
  },
  {
    name: "Unique D325",
    slug: "unique-d325",
    description: "Silla de visita Unique con diseño distinguido y elegante.",
    defaultVariant: "visita",
    variants: [
      { id: "visita", label: "Visita", assetFolder: "3. VISITAS/4. UNIQUE D325" },
    ],
    appearsInCategories: ["visitas"],
  },

  // ── BARRA ──
  {
    name: "Olla",
    slug: "olla",
    description: "Silla de barra Olla con base giratoria y diseño orgánico.",
    defaultVariant: "barra",
    variants: [
      { id: "barra", label: "Barra", assetFolder: "4. BARRA/1. OLLA" },
    ],
    appearsInCategories: ["barra"],
  },
  {
    name: "Mod",
    slug: "mod",
    description: "Silla de barra Mod disponible en versiones Air y Standard con certificaciones.",
    defaultVariant: "standard",
    variants: [
      { id: "standard", label: "Standard", assetFolder: "4. BARRA/2. MOD" },
    ],
    appearsInCategories: ["barra"],
  },
  {
    name: "Plaza",
    slug: "plaza",
    description: "Silla de barra Plaza con diseño versátil y múltiples configuraciones.",
    defaultVariant: "barra",
    variants: [
      { id: "barra", label: "Barra", assetFolder: "4. BARRA/3. PLAZA" },
    ],
    appearsInCategories: ["barra"],
  },
  {
    name: "Kopio",
    slug: "kopio",
    description: "Silla de barra Kopio con estructura de madera y estilo nórdico.",
    defaultVariant: "barra",
    variants: [
      { id: "barra", label: "Barra", assetFolder: "4. BARRA/4. KOPIO" },
    ],
    appearsInCategories: ["barra"],
  },

  // ── LOUNGE ──
  {
    name: "Sophia Mod Lineal",
    slug: "sophia-mod-lineal",
    description: "Sofá modular Sophia con configuración lineal para espacios lounge.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/1. SOPHIA MOD LINEAL" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Domino",
    slug: "domino",
    description: "Mesa de centro Domino con opciones de tapa en madera y vidrio.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/2. DOMINO" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Grid",
    slug: "grid",
    description: "Módulo lounge Grid con diseño geométrico y modular.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/3. GRID" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Jackie",
    slug: "jackie",
    description: "Sillón lounge Jackie con líneas clásicas y confort excepcional.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/4. JACKIE" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Momo",
    slug: "momo",
    description: "Sillón lounge Momo con diseño orgánico y envolvente.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/5. MOMO" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Cosmos",
    slug: "cosmos",
    description: "Sillón lounge Cosmos con formas envolventes y presencia escultórica.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/6. COSMOS" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Cuve",
    slug: "cuve",
    description: "Sillón lounge Cuve con estructura curvada y diseño contemporáneo.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/7. CUVE" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Lutie",
    slug: "lutie",
    description: "Sillón lounge Lutie con diseño acogedor y múltiples opciones de tapizado.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/8. LUTIE" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Valerio",
    slug: "valerio",
    description: "Sofá lounge Valerio con estilo contemporáneo y líneas depuradas.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/10. VALERIO" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Tranquo",
    slug: "tranquo",
    description: "Módulo lounge Tranquo para espacios de descanso y colaboración.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/11. TRANQUO" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Qbuks",
    slug: "qbuks",
    description: "Módulo lounge Qbuks con diseño modular y configurable.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/12. QBUKS" },
    ],
    appearsInCategories: ["lounge"],
  },
  {
    name: "Rest",
    slug: "rest",
    description: "Sillón lounge Rest con máximo confort y diseño envolvente.",
    defaultVariant: "lounge",
    variants: [
      { id: "lounge", label: "Lounge", assetFolder: "5. LOUNGE/13. REST" },
    ],
    appearsInCategories: ["lounge"],
  },

  // ── ESTADIO ──
  {
    name: "Oahu2",
    slug: "oahu2",
    description: "Butaca de estadio Oahu2 resistente a la intemperie con diseño ergonómico.",
    defaultVariant: "estadio",
    variants: [
      { id: "estadio", label: "Estadio", assetFolder: "8. ESTADIO/1. OAHU2" },
    ],
    appearsInCategories: ["estadio"],
  },
  {
    name: "Sporta",
    slug: "sporta",
    description: "Butaca de estadio Sporta con diseño deportivo y alta durabilidad.",
    defaultVariant: "estadio",
    variants: [
      { id: "estadio", label: "Estadio", assetFolder: "8. ESTADIO/2. SPORTA" },
    ],
    appearsInCategories: ["estadio"],
  },
];

// ── Glob all chair images lazily ──

const allChairImages = import.meta.glob<{ default: string }>(
  "/src/assets/1. SILLAS/**/*.webp",
  { eager: false }
);

const chairImageCache: Record<string, string> = {};

export async function resolveChairImage(fullPath: string): Promise<string> {
  if (chairImageCache[fullPath]) return chairImageCache[fullPath];
  const loader = allChairImages[fullPath];
  if (loader) {
    const mod = await loader();
    chairImageCache[fullPath] = mod.default;
    return mod.default;
  }
  return "";
}

// ── Image path helpers ──

export function getVariantImagePaths(assetFolder: string): {
  gallery: string[];
  ambientadas: string[];
  colores: string[];
  opciones: string[];
  medidas: string[];
} {
  const prefix = `/src/assets/1. SILLAS/${assetFolder}/`;
  const allPaths = Object.keys(allChairImages).filter((p) => p.startsWith(prefix));

  const classify = (path: string) => {
    const rel = path.slice(prefix.length).toUpperCase();
    if (rel.includes("AMBIENTAD")) return "ambientadas";
    if (rel.includes("OPCIONES") || rel.includes("OPCION")) return "opciones";
    if (rel.includes("COLORES")) return "colores";
    if (rel.includes("MEDIDAS")) return "medidas";
    return "gallery";
  };

  const groups: Record<string, string[]> = {
    gallery: [], ambientadas: [], colores: [], opciones: [], medidas: [],
  };

  for (const p of allPaths) {
    const cat = classify(p);
    groups[cat].push(p);
  }

  for (const k of Object.keys(groups)) groups[k].sort();

  return {
    gallery: groups.gallery,
    ambientadas: groups.ambientadas,
    colores: groups.colores,
    opciones: groups.opciones,
    medidas: groups.medidas,
  };
}

// ── Lookups ──

export function getCategoryBySlug(slug: string): ChairCategory | undefined {
  return chairCategories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): ChairProduct | undefined {
  return chairProducts.find((p) => p.slug === slug);
}

export function getProductsForCategory(categorySlug: string): ChairProduct[] {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return [];
  return cat.chairs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is ChairProduct => !!p);
}

/**
 * Get the preferred variant for a product when accessed from a specific category.
 * E.g., Apollo from "operativas" → variant "operativa"
 */
export function getPreferredVariant(product: ChairProduct, fromCategory?: string): string {
  if (!fromCategory) return product.defaultVariant;
  // Try to match category slug to a variant id
  const catToVariant: Record<string, string> = {
    ejecutivas: "ejecutiva",
    operativas: "operativa",
    visitas: "visita",
    barra: "barra",
    lounge: "lounge",
    estadio: "estadio",
  };
  const preferred = catToVariant[fromCategory];
  if (preferred && product.variants.some((v) => v.id === preferred)) {
    return preferred;
  }
  return product.defaultVariant;
}

/**
 * Get the main image folder for a product (uses default variant).
 */
export function getProductMainAssetFolder(product: ChairProduct): string {
  return product.variants[0].assetFolder;
}
