import { OAuth2Client } from 'google-auth-library';
import { Context, Next } from 'koa';

export interface CreateGoogleAuthenticationParams {
  client: OAuth2Client;
  audience: string;
  serviceAccountEmail: string;
}

export function createGoogleAuthentication({
  client,
  audience,
  serviceAccountEmail,
}: CreateGoogleAuthenticationParams) {
  return async (ctx: Context, next: Next) => {
    const token = ctx.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      ctx.status = 401;
      return;
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error(`Unknown error authentication could not be done`);
      }

      if (payload.email !== serviceAccountEmail) {
        throw new Error(
          `Service account doesn't match current: ${payload.email} set up ${process.env.DOCUMENT_TOPIC_SERVICE_ACCOUNT_EMAIL}`
        );
      }

      if (!payload.email_verified) {
        throw new Error(`Email not verified`);
      }
    } catch (e) {
      ctx.status = 401;
      return;
    }

    await next();
  };
}
