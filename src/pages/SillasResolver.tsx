import { useParams } from "react-router-dom";
import { getCategoryBySlug, getProductBySlug } from "@/lib/chairsData";
import SillasCategoria from "./SillasCategoria";
import SillaDetalle from "./SillaDetalle";
import NotFound from "./NotFound";

/**
 * Resolves /sillas/:param — determines if param is a category slug or product slug.
 * No extra Suspense layer — the parent LazyRoute already handles chunk loading.
 */
const SillasResolver = () => {
  const { param } = useParams();

  if (!param) return <NotFound />;

  if (getCategoryBySlug(param)) {
    return <SillasCategoria />;
  }

  if (getProductBySlug(param)) {
    return <SillaDetalle />;
  }

  return <NotFound />;
};

export default SillasResolver;
