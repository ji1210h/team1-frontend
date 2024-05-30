// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: "/:path*",
          destination: "http://54.180.2.181:3000/:path*",
        },
      ];
    },
  };
  
  module.exports = nextConfig;