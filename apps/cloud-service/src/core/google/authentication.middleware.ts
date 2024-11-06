import { createGoogleAuthentication } from 'koa-middleware';
import { OAuth2Client } from 'google-auth-library';

export const googleAuthClient = new OAuth2Client();

export const googleAuth = createGoogleAuthentication({
  client: googleAuthClient,
  audience: process.env.AUDIENCE ?? '',
  serviceAccountEmail: process.env.SERVICE_ACCOUNT_EMAIL ?? '',
});
