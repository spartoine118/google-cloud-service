import { Context, Next } from 'koa';
import { ZodSchema } from 'zod';
import { parseZodError } from '../util/util';

export interface ValidateParams {
  schema: ZodSchema;
  key?: 'body' | 'query';
  status?: number;
}
/**
 * Koa middleware that validates the specified schema with the request body or query params
 * and respond with specified error status (defaults to 400)
 * in case the validation fails
 */
export function validate({
  schema,
  key = 'body',
  status = 400,
}: ValidateParams) {
  return async (ctx: Context, next: Next) => {
    // eslint-disable-next-line
    const obj = key === 'body' ? (ctx.request as any).body : ctx.request.query;

    const result = schema.safeParse(obj);

    if (!result.success) {
      ctx.status = status;
      const error = parseZodError(result.error);

      ctx.body = error;
      return;
    }

    await next();
  };
}
