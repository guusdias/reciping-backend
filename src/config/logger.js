import { createLogger, format, transports } from 'winston';

const customLevels = {
  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    notice: 3,
    warn: 4,
    error: 5,
    fatal: 6
  },
  colors: {
    trace: 'white',
    debug: 'blue',
    info: 'green',
    notice: 'yellow',
    warn: 'orange',
    error: 'red',
    fatal: 'magenta'
  }
};

const logger = createLogger({
    levels: customLevels.levels,
    level: process.env.NODE_ENV === 'production' ? 'error' : 'trace',
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/app.log' })
    ]
  });
  

import { addColors } from 'winston';
addColors(customLevels.colors);

export default logger;
