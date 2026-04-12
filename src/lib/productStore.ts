export interface ProductFeature {
  num: string;
  label: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  category: string;
  categories: string[];
  description: string;
  coverVideo: string;
  coverPoster: string;
  thumbnails: string[];
  featuresImage: string;
  features: ProductFeature[];
  colors: string[];
  accordionSections: { title: string; content: string }[];
  createdAt: string;
  updatedAt: string;
}

const STORE_KEY = "admin_products";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function getDefaultProduct(): Omit<Product, "id" | "slug" | "createdAt" | "updatedAt"> {
  return {
    name: "",
    enabled: true,
    category: "EJECUTIVA",
    categories: ["VISITA", "EJECUTIVA", "OPERATIVA"],
    description: "",
    coverVideo: "",
    coverPoster: "",
    thumbnails: ["", "", ""],
    featuresImage: "",
    features: [
      { num: "1", label: "", image: "" },
      { num: "2", label: "", image: "" },
      { num: "3", label: "", image: "" },
      { num: "4", label: "", image: "" },
    ],
    colors: ["#1E1E1E"],
    accordionSections: [
      { title: "Garantía", content: "" },
      { title: "Certificados", content: "" },
      { title: "Catálogo", content: "" },
    ],
  };
}

export function getAllProducts(): Product[] {
  try {
    const data = localStorage.getItem(STORE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getEnabledProducts(): Product[] {
  return getAllProducts().filter((p) => p.enabled);
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug && p.enabled);
}

export function createProduct(data: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">): Product {
  const products = getAllProducts();
  const now = new Date().toISOString();
  const product: Product = {
    ...data,
    id: generateId(),
    slug: generateSlug(data.name || "product"),
    createdAt: now,
    updatedAt: now,
  };
  products.unshift(product);
  localStorage.setItem(STORE_KEY, JSON.stringify(products));
  return product;
}

export function updateProduct(id: string, data: Partial<Product>): Product | null {
  const products = getAllProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...products[idx], ...data, updatedAt: new Date().toISOString() };
  if (data.name) updated.slug = generateSlug(data.name);
  products[idx] = updated;
  localStorage.setItem(STORE_KEY, JSON.stringify(products));
  return updated;
}

export function toggleProduct(id: string): Product | null {
  const product = getProductById(id);
  if (!product) return null;
  return updateProduct(id, { enabled: !product.enabled });
}

export function deleteProduct(id: string): boolean {
  const products = getAllProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  localStorage.setItem(STORE_KEY, JSON.stringify(filtered));
  return true;
}
