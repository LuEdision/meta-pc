module.exports = {
  apps: [
    {
      name: 'loan-app-website',
      // script: 'run serve',
      script: 'npm run serve',
      args: 'start',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
