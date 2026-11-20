import type { NextConfig } from "next";

// GitHub Pages statik dosya sunar: site `out/` klasörüne HTML olarak dışa aktarılır.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Kök layout [lang] altında olduğu için eşleşmeyen URL'ler bu sayfaya (404.html) düşer.
    globalNotFound: true,
  },
};

export default nextConfig;
