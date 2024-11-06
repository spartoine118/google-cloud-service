import winston from 'winston';

const winstonLogger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  transports: [new winston.transports.Console()],
});

export function logger(
  message: string,
  level: 'info' | 'error' = 'error'
): void {
  winstonLogger.log(level, message);
}
