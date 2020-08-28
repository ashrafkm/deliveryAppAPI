const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

var shell = require('shelljs');

shell.cp('package.json', 'dist/package.json');
shell.cp('-R', 'config/', 'dist/');
shell.cp(isProd ? 'pm2/ecoprod.config.js' : 'pm2/ecodev.config.js', 'dist/ecosystem.config.js');
shell.cp(isProd ? 'pm2/ecoprod.config.js' : 'pm2/ecodev.7020.js', 'dist/ecosystem7020.config.js');
