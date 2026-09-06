import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // tone's package.json "browser" field points at a legacy UMD bundle
    // (build/Tone.js) that webpack prefers over the real ESM build for
    // client bundles. That UMD file doesn't play nice with ESM named/
    // namespace imports (every export resolves to undefined), which
    // surfaces as runtime errors like "Reverb is not a constructor".
    // Force resolution to the proper ESM entry instead.
    config.resolve.alias = {
      ...config.resolve.alias,
      tone: require.resolve("tone/build/esm/index.js"),
    };
    return config;
  },
};

export default nextConfig;
