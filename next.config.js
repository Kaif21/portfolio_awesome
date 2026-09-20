/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['kaif21.netlify.app'],
  },
}

module.exports = nextConfig