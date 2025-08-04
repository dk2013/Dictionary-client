const path = require("path");

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        implementation: require("sass"),
        sassOptions: {
          fiber: false,
        },
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          // Check for environment variable first
          let envPath = process.env.ENV_FILE_PATH;

          // If not set, try relative path (for local development)
          if (!envPath) {
            envPath = path.resolve(__dirname, "../client_env/.env");
          }

          // If relative path doesn't exist, try absolute path (for server)

          console.log("Loading environment variables from:", envPath);

          webpackConfig.plugins.forEach((plugin) => {
            if (plugin.constructor.name === "DefinePlugin") {
              const dotenv = require("dotenv").config({ path: envPath });
              const envKeys = Object.keys(dotenv.parsed || {}).reduce(
                (prev, next) => {
                  prev[`process.env.${next}`] = JSON.stringify(
                    dotenv.parsed[next]
                  );
                  return prev;
                },
                {}
              );
              plugin.definitions = { ...plugin.definitions, ...envKeys };
            }
          });
          return webpackConfig;
        },
      },
    },
  ],
};
