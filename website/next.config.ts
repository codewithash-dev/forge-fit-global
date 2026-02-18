import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use current dir as root so Next doesn't infer wrong workspace (monorepo with multiple lockfiles)
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
