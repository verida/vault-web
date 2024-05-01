/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TODO: Enable the check again. This is now to disable next.js checking node_modules type errors on building the app
    ignoreBuildErrors: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.node = {
      __dirname: true,
    };
    
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/fonts/',
          outputPath: `${isServer ? '../' : ''}static/fonts/`,
        },
      },
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        // protocol: 'http',
        hostname: '127.0.0.1',
        port: '5021',
        // pathname: '/account123/**',
      },
      {
        // protocol: 'http',
        hostname: '192.168.68.137',
        port: '5021',
        // pathname: '/account123/**',
      },
    ],
  }
};

export default nextConfig;
