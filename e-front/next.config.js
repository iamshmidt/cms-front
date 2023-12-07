/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            // pathname: 'res.cloudinary.com',
          },
        ],
      },
      experimental:{
        serverActions:true,
        serverComponentsExternalPackages: [
          '@react-email/components',
          '@react-email/tailwind'
      ]
    },
      async rewrites(){
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3000/api/:path*'
          }
        ]
      }

}

module.exports = nextConfig
