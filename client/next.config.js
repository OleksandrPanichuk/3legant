const API_URL = process.env.NEXT_PUBLIC_API_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				hostname: 'res.cloudinary.com',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${API_URL}/:path*`,
			},
		]
	},
}

module.exports = nextConfig
