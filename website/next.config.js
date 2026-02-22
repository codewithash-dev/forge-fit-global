const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force project root to this directory so module resolution uses website/node_modules (not parent ForgeFitGlobal)
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
