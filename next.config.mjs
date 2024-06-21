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
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/fonts/",
            publicPath: "/_next/static/fonts/",
          },
        },
      ],
    });
    config.node = {
      __dirname: true,
    };
    return config;
  },
};

export default nextConfig;
