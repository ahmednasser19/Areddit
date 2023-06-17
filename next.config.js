/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['uploadthing.com', 'lh3.googleusercontent.com'],
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['@prisma/client', 'bycrpt']
    }
}

module.exports = nextConfig
