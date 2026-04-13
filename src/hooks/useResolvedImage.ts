import { useState, useEffect } from "react";
import { resolveImage } from "@/lib/projectsData";

export function useResolvedImage(imagePath: string): string {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    resolveImage(imagePath).then((resolved) => {
      if (!cancelled) setSrc(resolved);
    });
    return () => { cancelled = true; };
  }, [imagePath]);

  return src;
}

export function useResolvedImages(paths: string[]): Record<string, string> {
  const [resolved, setResolved] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      paths.map(async (p) => {
        const src = await resolveImage(p);
        return [p, src] as const;
      })
    ).then((entries) => {
      if (!cancelled) setResolved(Object.fromEntries(entries));
    });
    return () => { cancelled = true; };
  }, [paths.join(",")]);

  return resolved;
}
