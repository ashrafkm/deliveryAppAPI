module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'api',
            script: "index.js",
            env: {
                PORT: '7010'
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: '7010'
            }
        }
    ]
};
