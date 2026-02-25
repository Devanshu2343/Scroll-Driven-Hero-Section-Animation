/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions && repo ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
