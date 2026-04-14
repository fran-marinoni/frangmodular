/**
 * optimize-chairs-images.js
 *
 * Convierte recursivamente todas las imágenes (.jpg, .jpeg, .png)
 * dentro de src/assets/1. SILLAS a formato .webp de alta calidad.
 *
 * Uso:
 *   node scripts/optimize-chairs-images.js              (solo convierte)
 *   node scripts/optimize-chairs-images.js --delete      (convierte y borra originales)
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ─── Configuración ───────────────────────────────────────────────────────────

const SOURCE_DIR = path.resolve(__dirname, "..", "src", "assets", "1. SILLAS");
const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const WEBP_QUALITY = 85; // Balance ideal entre peso y calidad visual premium
const DELETE_ORIGINALS = process.argv.includes("--delete");
const CONCURRENCY = 8; // Imágenes procesadas en paralelo

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function pct(before, after) {
  if (before === 0) return "0%";
  return `${(((before - after) / before) * 100).toFixed(1)}%`;
}

/** Recorre recursivamente un directorio y devuelve rutas de imágenes válidas */
function collectImages(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

// ─── Procesamiento de una imagen ─────────────────────────────────────────────

async function processImage(filePath) {
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  const outPath = path.join(dir, `${baseName}.webp`);

  // Saltar si ya existe el .webp equivalente
  if (fs.existsSync(outPath)) {
    return { skipped: true, filePath };
  }

  const originalSize = fs.statSync(filePath).size;
  const ext = path.extname(filePath).toLowerCase();

  // Detectar si tiene canal alfa (transparencia) para preservarla
  const metadata = await sharp(filePath).metadata();
  const hasAlpha = metadata.hasAlpha;

  // Configuración de WebP optimizada para calidad premium
  const webpOptions = {
    quality: WEBP_QUALITY,
    alphaQuality: hasAlpha ? 90 : undefined,
    effort: 4, // Buen balance entre velocidad y compresión
    smartSubsample: true,
  };

  await sharp(filePath)
    .webp(webpOptions)
    .toFile(outPath);

  const newSize = fs.statSync(outPath).size;

  // Si el webp es más grande que el original, conservar el original
  if (newSize >= originalSize) {
    fs.unlinkSync(outPath);
    return { skipped: true, filePath, reason: "webp más grande que original" };
  }

  // Borrar original si se pasó --delete
  if (DELETE_ORIGINALS) {
    fs.unlinkSync(filePath);
  }

  return {
    skipped: false,
    filePath,
    originalSize,
    newSize,
    reduction: pct(originalSize, newSize),
  };
}

// ─── Procesamiento en lotes concurrentes ─────────────────────────────────────

async function processBatch(images, concurrency) {
  const results = [];
  for (let i = 0; i < images.length; i += concurrency) {
    const batch = images.slice(i, i + concurrency);
    const batchResults = await Promise.allSettled(
      batch.map((img) => processImage(img))
    );
    results.push(...batchResults);
  }
  return results;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  Optimización de imágenes — src/assets/1. SILLAS");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`  Calidad WebP: ${WEBP_QUALITY}`);
  console.log(`  Concurrencia: ${CONCURRENCY}`);
  console.log(`  Borrar originales: ${DELETE_ORIGINALS ? "SÍ" : "NO"}`);
  console.log("═══════════════════════════════════════════════════════════\n");

  // Verificar que la carpeta existe
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`ERROR: No se encontró la carpeta: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Recolectar imágenes
  console.log("Escaneando imágenes...\n");
  const images = collectImages(SOURCE_DIR);
  console.log(`Encontradas: ${images.length} imágenes\n`);

  if (images.length === 0) {
    console.log("No hay imágenes para procesar.");
    return;
  }

  // Procesar
  const startTime = Date.now();
  const results = await processBatch(images, CONCURRENCY);

  // Contadores para el resumen
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const result of results) {
    if (result.status === "rejected") {
      errors++;
      console.log(`  ✗ ERROR: ${result.reason}`);
      continue;
    }

    const data = result.value;

    if (data.skipped) {
      skipped++;
      if (data.reason) {
        console.log(
          `  ⊘ SKIP (${data.reason}): ${path.relative(SOURCE_DIR, data.filePath)}`
        );
      }
      continue;
    }

    processed++;
    totalOriginalSize += data.originalSize;
    totalNewSize += data.newSize;

    const rel = path.relative(SOURCE_DIR, data.filePath);
    console.log(
      `  ✓ ${rel}  ${formatBytes(data.originalSize)} → ${formatBytes(data.newSize)}  (−${data.reduction})`
    );
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  // Resumen final
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("  RESUMEN");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`  Procesadas:       ${processed}`);
  console.log(`  Omitidas:         ${skipped} (ya existían o webp más grande)`);
  console.log(`  Errores:          ${errors}`);
  console.log(`  Peso original:    ${formatBytes(totalOriginalSize)}`);
  console.log(`  Peso final:       ${formatBytes(totalNewSize)}`);
  console.log(
    `  Ahorro total:     ${formatBytes(totalOriginalSize - totalNewSize)} (${pct(totalOriginalSize, totalNewSize)})`
  );
  console.log(`  Tiempo:           ${elapsed}s`);
  if (DELETE_ORIGINALS) {
    console.log(`  Originales:       BORRADOS`);
  }
  console.log("═══════════════════════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
