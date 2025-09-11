/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // ! THIS IS FOR TESTING
  },
  async redirects() {
    return [
      {
        source: "/((?!apply|dashboard|hidden-login).*)",
        destination: "/apply",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
