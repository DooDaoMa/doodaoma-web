/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doodaoma-images.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
