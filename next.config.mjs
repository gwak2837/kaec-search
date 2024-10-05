/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lms.kmooc.kr' },
      { protocol: 'https', hostname: 'd3njjcbhbojbot.cloudfront.net' },
    ],
  },
}

export default nextConfig
