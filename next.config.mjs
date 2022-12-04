const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  images: {
    unoptimized: true,
  },
  assetPrefix: isProduction ? '/juliaselk' : '',
};

export default nextConfig;