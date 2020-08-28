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
                ConnectionString: "mongodb+srv://admin:admin@crusttest-9aoct.mongodb.net/acumenwaste?retryWrites=true&w=majority",
                imageUploadPath: "/var/lib/jenkins/workspace/acumenwasteAPI/uploads/",
                stitchApiUrl: "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/acumenwaste-sicpe/service/",
                databaseName: "acumenwaste",
                stitchAppId: "acumenwaste-sicpe",
                stitchApiKey: "BEHtOgyfXie5bhFdXcTaDKsPOfxqjuvLATm1afK7JKoKRAYEXqU6mR54iWTaxySN",
                enableBigChange: false
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: '7010',
                ConnectionString: "mongodb+srv://admin:admin@crust1.o6usg.mongodb.net/acumenwaste?retryWrites=true&w=majority",
                imageUploadPath: "/usr/share/nginx/api/acumenwasteAPI/uploads/",
                stitchApiUrl: "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/acumenwaste-paopp/service/",
                databaseName: "acumenwaste",
                stitchAppId: "acumenwaste-paopp",
                stitchApiKey: "IE818kjEJCMsuqBnjBrnA6Tqk3wsYqbmCLoo3kbsYvSUfQjleCQkCmqHGXYMBtL9",
                enableBigChange: true
            }
        }
    ]
};
