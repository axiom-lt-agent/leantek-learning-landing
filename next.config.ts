import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // next-intl handles i18n routing via middleware
};

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig);
