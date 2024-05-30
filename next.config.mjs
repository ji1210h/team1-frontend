/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "(전달받은 API 주소)/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
// export default nextConfig;

