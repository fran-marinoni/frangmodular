import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ApolloProduct from "./pages/ApolloProduct.tsx";
import NotFound from "./pages/NotFound.tsx";
import Nosotros from "./pages/Nosotros.tsx";
import Blog from "./pages/Blog.tsx";
import BlogArticle90s from "./pages/BlogArticle90s.tsx";
import DynamicBlogArticle from "./pages/DynamicBlogArticle.tsx";
import Contacto from "./pages/Contacto.tsx";
import Proyectos from "./pages/Proyectos.tsx";
import ProyectoCategoria from "./pages/ProyectoCategoria.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminBlogs from "./pages/admin/AdminBlogs.tsx";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor.tsx";
import AdminProducts from "./pages/admin/AdminProducts.tsx";
import AdminProductEditor from "./pages/admin/AdminProductEditor.tsx";
import DynamicProduct from "./pages/DynamicProduct.tsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/productos/apollo" element={<ApolloProduct />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/back-to-the-90s" element={<BlogArticle90s />} />
          <Route path="/blog/:slug" element={<DynamicBlogArticle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyectos/:category/:year" element={<ProyectoCategoria />} />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><AdminBlogs /></ProtectedRoute>} />
          <Route path="/admin/blogs/new" element={<ProtectedRoute><AdminBlogEditor /></ProtectedRoute>} />
          <Route path="/admin/blogs/edit/:id" element={<ProtectedRoute><AdminBlogEditor /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/products/new" element={<ProtectedRoute><AdminProductEditor /></ProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute><AdminProductEditor /></ProtectedRoute>} />
          <Route path="/productos/:slug" element={<DynamicProduct />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
