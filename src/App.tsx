import { lazy, Suspense, useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PreloadScreen from "@/components/PreloadScreen";
import SectionLoader from "@/components/SectionLoader";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ComingSoon from "./pages/ComingSoon.tsx";

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
const SillasResolver = lazy(() => import("./pages/SillasResolver.tsx"));
const EstacionLegan = lazy(() => import("./pages/EstacionLegan.tsx"));

const queryClient = new QueryClient();

const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionLoader />}>
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
            <Route path="/sillas/:param" element={<LazyRoute><SillasResolver /></LazyRoute>} />
            <Route path="/estaciones/legan" element={<LazyRoute><EstacionLegan /></LazyRoute>} />
            <Route path="/nosotros" element={<LazyRoute><Nosotros /></LazyRoute>} />
            <Route path="/blog" element={<LazyRoute><Blog /></LazyRoute>} />
            <Route path="/blog/back-to-the-90s" element={<LazyRoute><BlogArticle90s /></LazyRoute>} />
            <Route path="/blog/:slug" element={<LazyRoute><DynamicBlogArticle /></LazyRoute>} />
            <Route path="/contacto" element={<LazyRoute><Contacto /></LazyRoute>} />
            <Route path="/proyectos" element={<LazyRoute><Proyectos /></LazyRoute>} />
            <Route path="/proyectos/:category/:year" element={<LazyRoute><ProyectoCategoria /></LazyRoute>} />
            <Route path="/proyecto/:projectSlug" element={<LazyRoute><ProyectoDetalle /></LazyRoute>} />
            <Route path="/admin" element={<LazyRoute><AdminLogin /></LazyRoute>} />
            <Route path="/admin/dashboard" element={<LazyRoute><ProtectedRoute><AdminDashboard /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/blogs" element={<LazyRoute><ProtectedRoute><AdminBlogs /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/blogs/new" element={<LazyRoute><ProtectedRoute><AdminBlogEditor /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/blogs/edit/:id" element={<LazyRoute><ProtectedRoute><AdminBlogEditor /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/products" element={<LazyRoute><ProtectedRoute><AdminProducts /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/products/new" element={<LazyRoute><ProtectedRoute><AdminProductEditor /></ProtectedRoute></LazyRoute>} />
            <Route path="/admin/products/edit/:id" element={<LazyRoute><ProtectedRoute><AdminProductEditor /></ProtectedRoute></LazyRoute>} />
            <Route path="/productos/:slug" element={<LazyRoute><DynamicProduct /></LazyRoute>} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
