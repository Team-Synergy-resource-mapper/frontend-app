/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.ikman-st.com',
          },
        ],
      },
}

module.exports = nextConfig
