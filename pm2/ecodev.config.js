module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'acumenwasteAPI',
            script: "index.js",
            env: {
                SEND_MAIL_SECRET_KEY: '',
                PORT: '7010',
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: '7010',
            }
        }
    ]
};
