import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { getCategoryBySlug, getProductBySlug } from "@/lib/chairsData";
import SectionLoader from "@/components/SectionLoader";

const SillasCategoria = lazy(() => import("./SillasCategoria"));
const SillaDetalle = lazy(() => import("./SillaDetalle"));
const NotFound = lazy(() => import("./NotFound"));

/**
 * Resolves /sillas/:param — determines if param is a category slug or product slug.
 */
const SillasResolver = () => {
  const { param } = useParams();

  if (!param) return <NotFound />;

  if (getCategoryBySlug(param)) {
    return (
      <Suspense fallback={<SectionLoader label="Cargando categoría" />}>
        <SillasCategoria />
      </Suspense>
    );
  }

  if (getProductBySlug(param)) {
    return (
      <Suspense fallback={<SectionLoader label="Cargando producto" />}>
        <SillaDetalle />
      </Suspense>
    );
  }

  return <NotFound />;
};

export default SillasResolver;
