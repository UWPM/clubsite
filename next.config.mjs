/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // ! THIS IS FOR TESTING
  },
  async redirects() {
    return [
      {
        // Exclude pages that should NOT redirect to /apply. Added 'prodcon' so
        // requests to /prodcon render the new route instead of being redirected.
        source: "/((?!apply|dashboard|hidden-login|api|prodcon).*)",
        destination: "/apply",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
