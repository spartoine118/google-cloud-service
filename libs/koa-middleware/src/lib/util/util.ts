import { ZodError, ZodIssue } from 'zod';

export type ValidationError = Omit<ZodIssue, 'path'> & {
  path: string | number;
};

export function parseZodError(error: ZodError): ValidationError[] {
  const result = error.issues.map(({ path, ...properties }) => {
    const [key] = path;

    return {
      ...properties,
      path: key,
    };
  });

  return result;
}
