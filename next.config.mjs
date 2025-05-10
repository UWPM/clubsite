/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // ! THIS IS FOR TESTING
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/((?!apply$|api/email).*)", // Exclude /api/email from redirect
  //       destination: "/apply",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
