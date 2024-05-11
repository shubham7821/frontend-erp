/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer, webpack }) => {
      if (!isServer) {
        // Check Webpack version and set up handling for .bpmn files
        if (webpack.version.startsWith('5')) {
          config.module.rules.push({
            test: /\.bpmn$/i,
            type: 'asset/source', // Use asset modules in Webpack 5
          });
        } else {
          // Use raw-loader for Webpack 4
          config.module.rules.push({
            test: /\.bpmn$/i,
            use: 'raw-loader',
          });
        }
      }
      return config;
    },
  };
  
  export default nextConfig;
  