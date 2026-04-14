import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { getCategoryBySlug, getProductBySlug } from "@/lib/chairsData";

const SillasCategoria = lazy(() => import("./SillasCategoria"));
const SillaDetalle = lazy(() => import("./SillaDetalle"));
const NotFound = lazy(() => import("./NotFound"));

/**
 * Resolves /sillas/:param — determines if param is a category slug or product slug.
 */
const SillasResolver = () => {
  const { param } = useParams();

  if (!param) return <NotFound />;

  // Check if it's a category first
  if (getCategoryBySlug(param)) {
    return (
      <Suspense fallback={null}>
        <SillasCategoria />
      </Suspense>
    );
  }

  // Otherwise try as a product
  if (getProductBySlug(param)) {
    return (
      <Suspense fallback={null}>
        <SillaDetalle />
      </Suspense>
    );
  }

  return <NotFound />;
};

export default SillasResolver;
