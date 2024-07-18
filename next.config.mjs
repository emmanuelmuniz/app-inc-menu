/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/',
                destination: '/site',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
