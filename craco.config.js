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
          const envPath = path.resolve(__dirname, "../client_env/.env");
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
