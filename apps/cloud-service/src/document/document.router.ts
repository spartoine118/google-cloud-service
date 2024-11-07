import Router from 'koa-router';
import { validate } from 'koa-middleware';
import z from 'zod';
import { logger } from '../core/logger/logger';

export const documentRouter = new Router();

documentRouter.get('/document', async (ctx) => {
  logger('Authorized passed and in /document path', 'info');
  ctx.status = 200;
  ctx.body = { message: 'Hello world' };
});

export const doSomethingSchema = z.object({
  id: z.string().min(1, 'Document ID is required'),
});

export type DoSomething = z.infer<typeof doSomethingSchema>;

documentRouter.post(
  '/document/do-something',
  validate({ schema: doSomethingSchema, key: 'body' }),
  async (ctx) => {
    const data = ctx.request.body as DoSomething;

    ctx.status = 200;
    ctx.body = { message: `Hello Document ${data.id}` };
  }
);
