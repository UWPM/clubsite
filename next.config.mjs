/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // ! THIS IS FOR TESTING
  },
  async redirects() {
    return [
      {
        // Exclude pages and static asset paths that should NOT redirect to /apply.
        // Added 'prodcon' (the new route) and 'images' (public assets) so requests
        // for the banner and other static files are served normally.
        source: "/((?!apply|dashboard|hidden-login|api|prodcon|images|_next|favicon\.ico).*)",
        destination: "/apply",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
