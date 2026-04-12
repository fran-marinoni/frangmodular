import img_corporativo_2020_coface from "@/assets/projects/corporativo-2020-coface.jpg";
import img_corporativo_2020_ptie from "@/assets/projects/corporativo-2020-ptie.jpg";
import img_corporativo_2020_grupo_superior from "@/assets/projects/corporativo-2020-grupo-superior.jpg";
import img_corporativo_2020_kushki from "@/assets/projects/corporativo-2020-kushki.jpg";
import img_corporativo_2020_pfizer from "@/assets/projects/corporativo-2020-pfizer.jpg";
import img_corporativo_2020_semaica_energia from "@/assets/projects/corporativo-2020-semaica-energia.jpg";
import img_corporativo_2022_merino_lizarzaburu_abogados from "@/assets/projects/corporativo-2022-merino-lizarzaburu-abogados.jpg";
import img_corporativo_2023_danec from "@/assets/projects/corporativo-2023-danec.jpg";
import img_corporativo_2023_usfq from "@/assets/projects/corporativo-2023-usfq.jpg";
import img_corporativo_2024_ibm from "@/assets/projects/corporativo-2024-ibm.jpg";
import img_corporativo_2025_banco_de_guayaquil from "@/assets/projects/corporativo-2025-banco-de-guayaquil.jpg";
import img_corporativo_2025_general_motors from "@/assets/projects/corporativo-2025-general-motors.jpg";
import img_corporativo_2025_termikon from "@/assets/projects/corporativo-2025-termikon.jpg";
import img_corporativo_2025_proyecto_ana from "@/assets/projects/corporativo-2025-proyecto-ana.jpg";
import img_educacion_2025_colegio_menor from "@/assets/projects/educacion-2025-colegio-menor.jpg";
import img_educacion_2025_crisfe_by_objekt from "@/assets/projects/educacion-2025-crisfe-by-objekt.jpg";
import img_salud_2015_hospital_pasteur_etapa_1 from "@/assets/projects/salud-2015-hospital-pasteur-etapa-1.jpg";
import img_salud_2019_axxis_radiologos_asociados from "@/assets/projects/salud-2019-axxis-radiologos-asociados.jpg";
import img_salud_2024_clinica_pasteur from "@/assets/projects/salud-2024-clinica-pasteur.jpg";
import img_salud_2025_clinica_santa_lucia from "@/assets/projects/salud-2025-clinica-santa-lucia.jpg";
import img_salud_2025_dr_cornejo from "@/assets/projects/salud-2025-dr-cornejo.jpg";
import img_hospitalidad_2021_novopan from "@/assets/projects/hospitalidad-2021-novopan.jpg";
import img_hospitalidad_2023_hampton_inn from "@/assets/projects/hospitalidad-2023-hampton-inn.png";
import img_hospitalidad_2025_aeropuerto_mariscal_sucre from "@/assets/projects/hospitalidad-2025-aeropuerto-mariscal-sucre.jpg";
import img_hospitalidad_2025_oro_verde from "@/assets/projects/hospitalidad-2025-oro-verde.jpg";
import img_retail_2017_almacenes_japon from "@/assets/projects/retail-2017-almacenes-japon.jpg";
import img_retail_2017_bellini from "@/assets/projects/retail-2017-bellini.jpg";
import img_retail_2017_chaide from "@/assets/projects/retail-2017-chaide.jpg";
import img_retail_2023_1001_carros from "@/assets/projects/retail-2023-1001-carros.jpg";
import img_retail_2023_casabaca from "@/assets/projects/retail-2023-casabaca.jpg";
import img_retail_2024_agrinag from "@/assets/projects/retail-2024-agrinag.jpg";

export interface ProjectItem {
  name: string;
  image: string;
}

export interface CategoryData {
  slug: string;
  title: string;
  years: string[];
  projects: Record<string, ProjectItem[]>;
}

const categories: CategoryData[] = [
  {
    slug: "corporativo",
    title: "Corporativo.",
    years: ["2025", "2024", "2023", "2022", "2020"],
    projects: {
      "2025": [
        { name: "BANCO DE GUAYAQUIL.", image: img_corporativo_2025_banco_de_guayaquil },
        { name: "GENERAL MOTORS.", image: img_corporativo_2025_general_motors },
        { name: "TERMIKON.", image: img_corporativo_2025_termikon },
        { name: "PROYECTO ANA.", image: img_corporativo_2025_proyecto_ana },
      ],
      "2024": [
        { name: "IBM.", image: img_corporativo_2024_ibm },
      ],
      "2023": [
        { name: "DANEC.", image: img_corporativo_2023_danec },
        { name: "USFQ.", image: img_corporativo_2023_usfq },
      ],
      "2022": [
        { name: "MERINO LIZARZABURU ABOGADOS.", image: img_corporativo_2022_merino_lizarzaburu_abogados },
      ],
      "2020": [
        { name: "COFACE.", image: img_corporativo_2020_coface },
        { name: "PTIE.", image: img_corporativo_2020_ptie },
        { name: "GRUPO SUPERIOR.", image: img_corporativo_2020_grupo_superior },
        { name: "KUSHKI.", image: img_corporativo_2020_kushki },
        { name: "PFIZER.", image: img_corporativo_2020_pfizer },
        { name: "SEMAICA ENERGIA.", image: img_corporativo_2020_semaica_energia },
      ],
    },
  },
  {
    slug: "educacion",
    title: "Educación.",
    years: ["2025"],
    projects: {
      "2025": [
        { name: "COLEGIO MENOR.", image: img_educacion_2025_colegio_menor },
        { name: "CRISFE BY OBJEKT.", image: img_educacion_2025_crisfe_by_objekt },
      ],
    },
  },
  {
    slug: "salud",
    title: "Salud.",
    years: ["2025", "2024", "2019", "2015"],
    projects: {
      "2025": [
        { name: "CLINICA SANTA LUCIA.", image: img_salud_2025_clinica_santa_lucia },
        { name: "DR CORNEJO.", image: img_salud_2025_dr_cornejo },
      ],
      "2024": [
        { name: "CLINICA PASTEUR.", image: img_salud_2024_clinica_pasteur },
      ],
      "2019": [
        { name: "AXXIS - RADIOLOGOS ASOCIADOS.", image: img_salud_2019_axxis_radiologos_asociados },
      ],
      "2015": [
        { name: "HOSPITAL PASTEUR  ETAPA 1.", image: img_salud_2015_hospital_pasteur_etapa_1 },
      ],
    },
  },
  {
    slug: "hospitalidad",
    title: "Hospitalidad.",
    years: ["2025", "2023", "2021"],
    projects: {
      "2025": [
        { name: "AEROPUERTO MARISCAL SUCRE.", image: img_hospitalidad_2025_aeropuerto_mariscal_sucre },
        { name: "ORO VERDE.", image: img_hospitalidad_2025_oro_verde },
      ],
      "2023": [
        { name: "HAMPTON INN.", image: img_hospitalidad_2023_hampton_inn },
      ],
      "2021": [
        { name: "NOVOPAN.", image: img_hospitalidad_2021_novopan },
      ],
    },
  },
  {
    slug: "retail",
    title: "Retail.",
    years: ["2024", "2023", "2017"],
    projects: {
      "2024": [
        { name: "AGRINAG.", image: img_retail_2024_agrinag },
      ],
      "2023": [
        { name: "1001 CARROS.", image: img_retail_2023_1001_carros },
        { name: "CASABACA.", image: img_retail_2023_casabaca },
      ],
      "2017": [
        { name: "ALMACENES JAPON.", image: img_retail_2017_almacenes_japon },
        { name: "BELLINI.", image: img_retail_2017_bellini },
        { name: "CHAIDE.", image: img_retail_2017_chaide },
      ],
    },
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategories(): CategoryData[] {
  return categories;
}
