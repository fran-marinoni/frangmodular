import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}

const BASE_URL = "https://generacionmodular.com";

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "https://storage.googleapis.com/gpt-engineer-file-uploads/0yXXeOFykUVPAOIE0B5RXXt5g4z1/social-images/social-1776040966729-C5014PS-WH_474_135_2-2.webp",
  ogType = "website",
  jsonLd,
  noindex = false,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Generación Modular")
    ? title
    : `${title} | Generación Modular`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="es_EC" />
      <meta property="og:site_name" content="Generación Modular" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
