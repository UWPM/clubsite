/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // ! THIS IS FOR TESTING
  },
  async redirects() {
    return [
      {
        source: "/((?!apply$).*)",
        destination: "/apply",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
