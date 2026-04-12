export interface BlogSection {
  type: "text-image" | "image-text" | "quote" | "text-only";
  textLeft?: string;
  textRight?: string;
  image?: string;
  quoteText?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  sections: BlogSection[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const STORE_KEY = "admin_blog_posts";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function getDefaultSections(): BlogSection[] {
  return [
    { type: "text-image", textLeft: "", textRight: "", image: "", ctaLabel: "Ver Film", ctaUrl: "" },
    { type: "quote", quoteText: "" },
    { type: "text-image", textLeft: "", textRight: "", image: "", ctaLabel: "Ver Línea Legan", ctaUrl: "" },
    { type: "image-text", textLeft: "", textRight: "", image: "" },
    { type: "text-image", textLeft: "", textRight: "", image: "", ctaLabel: "Ver catálogo completo", ctaUrl: "" },
  ];
}

export function getAllPosts(): BlogPost[] {
  try {
    const data = localStorage.getItem(STORE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getPostById(id: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.id === id);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function createPost(data: { title: string; subtitle: string; coverImage: string; sections: BlogSection[] }): BlogPost {
  const posts = getAllPosts();
  const now = new Date().toISOString();
  const post: BlogPost = {
    id: generateId(),
    title: data.title,
    subtitle: data.subtitle,
    coverImage: data.coverImage,
    sections: data.sections,
    slug: generateSlug(data.title),
    createdAt: now,
    updatedAt: now,
  };
  posts.unshift(post);
  localStorage.setItem(STORE_KEY, JSON.stringify(posts));
  return post;
}

export function updatePost(id: string, data: Partial<Pick<BlogPost, "title" | "subtitle" | "coverImage" | "sections">>): BlogPost | null {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  if (data.title !== undefined) {
    posts[idx].title = data.title;
    posts[idx].slug = generateSlug(data.title);
  }
  if (data.subtitle !== undefined) posts[idx].subtitle = data.subtitle;
  if (data.coverImage !== undefined) posts[idx].coverImage = data.coverImage;
  if (data.sections !== undefined) posts[idx].sections = data.sections;
  posts[idx].updatedAt = new Date().toISOString();
  localStorage.setItem(STORE_KEY, JSON.stringify(posts));
  return posts[idx];
}

export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  localStorage.setItem(STORE_KEY, JSON.stringify(filtered));
  return true;
}
