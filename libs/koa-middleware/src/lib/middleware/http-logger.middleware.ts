import { Context, Middleware, Next } from 'koa';
import { Logger } from '../types/logger.type';

export function httpLogger(logger: Logger): Middleware {
  return async (ctx: Context, next: Next) => {
    const start = Date.now();

    await next();

    const end = Date.now();

    const elapsed = end - start;

    const message = `${ctx.method} ${ctx.url} ${elapsed} ms status: ${ctx.status}`;

    logger(message, 'info');
  };
}
