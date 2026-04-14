import { lazy, Suspense, useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PreloadScreen from "@/components/PreloadScreen";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// Lazy-loaded routes
const ApolloProduct = lazy(() => import("./pages/ApolloProduct.tsx"));
const Nosotros = lazy(() => import("./pages/Nosotros.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogArticle90s = lazy(() => import("./pages/BlogArticle90s.tsx"));
const DynamicBlogArticle = lazy(() => import("./pages/DynamicBlogArticle.tsx"));
const Contacto = lazy(() => import("./pages/Contacto.tsx"));
const Proyectos = lazy(() => import("./pages/Proyectos.tsx"));
const ProyectoCategoria = lazy(() => import("./pages/ProyectoCategoria.tsx"));
const ProyectoDetalle = lazy(() => import("./pages/ProyectoDetalle.tsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs.tsx"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor.tsx"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts.tsx"));
const AdminProductEditor = lazy(() => import("./pages/admin/AdminProductEditor.tsx"));
const DynamicProduct = lazy(() => import("./pages/DynamicProduct.tsx"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute.tsx"));
const Sillas = lazy(() => import("./pages/Sillas.tsx"));
const SillasCategoria = lazy(() => import("./pages/SillasCategoria.tsx"));
const SillaDetalle = lazy(() => import("./pages/SillaDetalle.tsx"));

const queryClient = new QueryClient();

const LazyFallback = () => (
  <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-6">
      <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-black tracking-tighter text-foreground leading-none">
        Generación<br />
        <span className="font-normal italic">Modular.</span>
      </h1>
      <div className="w-48 md:w-64 h-[3px] bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-loading-grow" />
      </div>
      <p className="text-muted-foreground text-xs tracking-widest uppercase">Cargando</p>
    </div>
  </div>
);

const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LazyFallback />}>
    {children}
  </Suspense>
);

const App = () => {
  const [preloaded, setPreloaded] = useState(false);
  const handlePreloadFinished = useCallback(() => setPreloaded(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!preloaded && <PreloadScreen onFinished={handlePreloadFinished} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/productos/apollo" element={<LazyRoute><ApolloProduct /></LazyRoute>} />
            <Route path="/sillas" element={<LazyRoute><Sillas /></LazyRoute>} />
            <Route path="/sillas/:category" element={<LazyRoute><SillasCategoria /></LazyRoute>} />
            <Route path="/sillas/:slug" element={<LazyRoute><SillaDetalle /></LazyRoute>} />
            <Route path="/nosotros" element={<LazyRoute><Nosotros /></LazyRoute>} />
            <Route path="/blog" element={<LazyRoute><Blog /></LazyRoute>} />
            <Route path="/blog/back-to-the-90s" element={<LazyRoute><BlogArticle90s /></LazyRoute>} />
            <Route path="/blog/:slug" element={<LazyRoute><DynamicBlogArticle /></LazyRoute>} />
            <Route path="/contacto" element={<LazyRoute><Contacto /></LazyRoute>} />
            <Route path="/proyectos" element={<LazyRoute><Proyectos /></LazyRoute>} />
            <Route path="/proyectos/:category/:year" element={<Suspense fallback={null}><ProyectoCategoria /></Suspense>} />
            <Route path="/proyecto/:projectSlug" element={<Suspense fallback={null}><ProyectoDetalle /></Suspense>} />
            <Route path="/admin" element={<LazyRoute><AdminLogin /></LazyRoute>} />
            <Route path="/admin/dashboard" element={<LazyRoute><ProtectedRoute><AdminDashboard /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/blogs" element={<LazyRoute><ProtectedRoute><AdminBlogs /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/blogs/new" element={<LazyRoute><ProtectedRoute><AdminBlogEditor /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/blogs/edit/:id" element={<LazyRoute><ProtectedRoute><AdminBlogEditor /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/products" element={<LazyRoute><ProtectedRoute><AdminProducts /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/products/new" element={<LazyRoute><ProtectedRoute><AdminProductEditor /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/products/edit/:id" element={<LazyRoute><ProtectedRoute><AdminProductEditor /></ProtectedRoute></LazyRoute>} />
            <Route path="/productos/:slug" element={<LazyRoute><DynamicProduct /></LazyRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
