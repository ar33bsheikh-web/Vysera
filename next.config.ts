import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("@google/model-viewer");
    return config;
  },
};

export default withNextIntl(nextConfig);
