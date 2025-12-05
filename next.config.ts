import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: 'export', // Commented out to allow Web Service deployment
    images: {
        unoptimized: true,
    },
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
