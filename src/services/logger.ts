import * as debug from 'debug';
import * as fs from 'fs';
import * as winston from 'winston';

const PATHS = {
  LOG: `${process.cwd()}/logs`,
  LOG_ERROR: `${process.cwd()}/logs/_error.log`,
  LOG_INFO: `${process.cwd()}/logs/_info.log`,
  LOG_VERBOSE: `${process.cwd()}/logs/_warn.log`,
  LOG_BIGCHANGEERROR: `${process.cwd()}/logs/_bigChangeError.log`,
};
// ensure log directory exists
(() => fs.existsSync(PATHS.LOG) || fs.mkdirSync(PATHS.LOG))();

export const dbg = debug('express:server');

const myCustomLevels = {
  levels: {
    bigChangeError: 0,
  },
  colors: {
    bigChangeError: 'blue',
  }
};

export const customLevelLogger = winston.createLogger({
  levels: myCustomLevels.levels,
  exitOnError: false,
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.File({
      filename: PATHS.LOG_BIGCHANGEERROR,
      handleExceptions: true,
      level: 'bigChangeError',
      // maxFiles: 2,
      maxsize: 5242880, // 5MB
    }),
  ]
});

export const logger = winston.createLogger({
  exitOnError: false,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.File({
      filename: PATHS.LOG_INFO,
      handleExceptions: true,
      level: 'info',
      // maxFiles: 2,
      maxsize: 5242880, // 5MB
    }),
    new winston.transports.File({
      filename: PATHS.LOG_ERROR,
      handleExceptions: true,
      level: 'error',
      // maxFiles: 2,
      maxsize: 5242880, // 5MB
    }),
    new winston.transports.Console({
      handleExceptions: true,
      level: 'debug',
    }),
    new winston.transports.File({
      filename: PATHS.LOG_VERBOSE,
      handleExceptions: true,
      level: 'warn',
      // maxFiles: 2,
      maxsize: 5242880, // 5MB
    }),
  ],
});
