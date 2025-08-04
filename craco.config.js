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

          console.log("Loading environment variables from:", envPath);

          webpackConfig.plugins.forEach((plugin) => {
            if (plugin.constructor.name === "DefinePlugin") {
              // Try to load from .env file first
              const dotenv = require("dotenv").config({ path: envPath });
              
              // Get environment variables from .env file
              const envFromFile = dotenv.parsed || {};
              
              // Get environment variables from process.env (for production builds)
              const envFromProcess = {
                DOMAIN: process.env.DOMAIN,
                EMAIL: process.env.EMAIL,
                TRAEFIK_PASSWORD_HASH: process.env.TRAEFIK_PASSWORD_HASH,
                PROJECT_DIR: process.env.PROJECT_DIR,
                NODE_ENV: process.env.NODE_ENV,
                ENV: process.env.NODE_ENV === 'production' ? 'PROD' : 'LOCAL',
                // Add any other environment variables you need
              };
              
              // Merge environment variables (process.env takes precedence)
              const allEnvVars = { ...envFromFile, ...envFromProcess };
              
              // Remove undefined values
              const filteredEnvVars = Object.keys(allEnvVars).reduce((prev, next) => {
                if (allEnvVars[next] !== undefined) {
                  prev[`process.env.${next}`] = JSON.stringify(allEnvVars[next]);
                }
                return prev;
              }, {});
              
              plugin.definitions = { ...plugin.definitions, ...filteredEnvVars };
            }
          });
          return webpackConfig;
        },
      },
    },
  ],
};
