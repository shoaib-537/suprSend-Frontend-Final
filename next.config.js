// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites () {
//     return [
//     // Rewrites all API requests to your Express server
//     {
//     source: "/ap1/v1/:path*",
//     destination: "http: //localhost:5000/api/v1/:path×",
//     }
//   ],
// },
//   images: {
//     domains: ["localhost", "https://img.clerk.com", "img.clerk.com"],
//   },
// };

// module.exports = nextConfig;


//** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Rewrites all API requests to your Express server
        source: "/:path*",
        destination: "http://localhost8000/:path*"
      }
    ];
  },
  images: {
    domains: ["localhost", "img.clerk.com"],
  },
};

module.exports = nextConfig;