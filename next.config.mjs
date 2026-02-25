/** @type {import('next').NextConfig} */

const repo = "Scroll-Driven-Hero-Section-Animation";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}`,
};



export default nextConfig;
