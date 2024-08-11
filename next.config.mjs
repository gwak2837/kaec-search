/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'lms.kmooc.kr' }],
  },
}

export default nextConfig
