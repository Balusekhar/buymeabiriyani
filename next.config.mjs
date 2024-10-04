/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**", // Matches any path on this domain
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/**", // Matches any path on this domain
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**", // Matches any path on this domain
      },
    ],
  },
};

export default nextConfig;