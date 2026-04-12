import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getAllPosts, deletePost, type BlogPost } from "@/lib/blogStore";

const AdminBlogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>(getAllPosts());

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este artículo?")) return;
    deletePost(id);
    setPosts(getAllPosts());
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">Blog</h1>
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuevo artículo
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="border border-border rounded-md p-12 text-center">
          <p className="text-sm text-muted-foreground">No hay artículos todavía.</p>
        </div>
      ) : (
        <div className="border border-border rounded-md divide-y divide-border">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 p-4">
              {post.coverImage && (
                <img src={post.coverImage} alt="" className="w-16 h-16 object-cover rounded" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold truncate">{post.title}</h3>
                <p className="text-[10px] text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString("es-EC")} · /blog/{post.slug}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-2 hover:bg-muted rounded-md transition-colors text-xs text-muted-foreground"
                >
                  Ver
                </Link>
                <Link
                  to={`/admin/blogs/edit/${post.id}`}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBlogs;
