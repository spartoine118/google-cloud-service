import { Context, Middleware, Next } from 'koa';
import { Logger } from '../types/logger.type';

export const DEFAULT_ERROR_MESSAGE =
  'Sorry there was an error please try again later';

export function errorHandler(
  logger: Logger,
  message: string = DEFAULT_ERROR_MESSAGE
): Middleware {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (e) {
      logger(e as string);
      ctx.status = 500;
      ctx.body = [{ message }];
    }
  };
}
