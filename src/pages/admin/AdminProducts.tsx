import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getAllProducts, deleteProduct, toggleProduct, type Product } from "@/lib/productStore";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(getAllProducts());

  const handleToggle = (id: string) => {
    toggleProduct(id);
    setProducts(getAllProducts());
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    deleteProduct(id);
    setProducts(getAllProducts());
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-foreground">Productos</h1>
        <Link to="/admin/products/new">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Nuevo Producto
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">
          No hay productos creados aún.
        </div>
      ) : (
        <div className="border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-xs">Producto</th>
                <th className="text-left px-4 py-3 font-semibold text-xs">Slug</th>
                <th className="text-center px-4 py-3 font-semibold text-xs">Visible</th>
                <th className="text-right px-4 py-3 font-semibold text-xs">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{product.name || "Sin nombre"}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">/productos/{product.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <Switch
                      checked={product.enabled}
                      onCheckedChange={() => handleToggle(product.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/products/edit/${product.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(product.id, product.name)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
