import type { MetadataRoute } from "next";
import { dictionaries, locales, person } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = person.site;
  const lastModified = new Date("2026-11-20");
  const paths = ["", ...dictionaries.tr.projects.map((p) => `/work/${p.slug}`)];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${base}/${lang}${path}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: { tr: `${base}/tr${path}/`, en: `${base}/en${path}/` } },
    })),
  );
}
