import { Providers } from '../enums';
import { DocumentAdapter } from './document-adapter.interface';
import { ExternalDocumentClient } from './external-document.adapter';

export function getDocumentProvider(provider: Providers): DocumentAdapter {
  switch (provider) {
    case Providers.PROVIDER_1:
      return new ExternalDocumentClient({
        apiUri: process.env.EXTERNAL_API ?? '',
      });
  }
  throw Error('Document Provider does not exist');
}
