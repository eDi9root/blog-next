import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
                protocol: "https",
            },
            {
                hostname: "images.unsplash.com",
                protocol: "https",
            },
            {
				protocol: "https",
				hostname: "source.unsplash.com",
			},
        ],
    },
};

export default withPWA(nextConfig);
