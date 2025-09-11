/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // ! THIS IS FOR TESTING
  },
  async redirects() {
    return [
      {
        source: "/((?!apply|dashboard|hidden-login|api).*)",
        destination: "/apply",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
