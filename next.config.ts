import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * The CDISC Maturity Navigator is a self-contained page with its own markup,
   * styles and state, served from public/ rather than rebuilt as a route. This
   * is only so that the address people are given is /maturity rather than the
   * file it happens to be stored as.
   */
  async rewrites() {
    return [{ source: "/maturity", destination: "/maturity/index.html" }];
  },
};

export default nextConfig;
