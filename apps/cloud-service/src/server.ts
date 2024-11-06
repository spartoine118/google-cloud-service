import koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { errorHandler, httpLogger } from 'koa-middleware';
import { googleAuth } from './core/google/authentication.middleware';
import { documentRouter } from './document/document.router';
import { logger } from './core/logger/logger';

export const app = new koa();

app.use(errorHandler(logger));
app.use(cors({ origin: '*' }));
app.use(httpLogger(logger));
app.use(bodyParser());
app.use(googleAuth);

app.use(documentRouter.routes()).use(documentRouter.allowedMethods());
