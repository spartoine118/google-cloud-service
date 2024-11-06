import axios, { InternalAxiosRequestConfig } from 'axios';
import { DataModel } from '../interfaces';
import { DocumentAdapter } from './document-adapter.interface';

interface ExternalDocumentAuthenticateParams {
  email: string;
  secret: string;
}

export class ExternalDocumentClient implements DocumentAdapter {
  private readonly http = axios.create();

  private authenticationToken = '';

  constructor(private readonly config: ExternalDocumentConfig) {
    this.http.interceptors.request.use((request) =>
      this.authenticationInterceptor(request)
    );
  }

  async authenticate({
    email,
    secret,
  }: ExternalDocumentAuthenticateParams): Promise<void> {
    const { data } = await this.http.post<{ token: string }>(
      `${this.config.apiUri}/authenticate`,
      { email, secret }
    );

    this.authenticationToken = data.token;
  }

  async getData(id: string): Promise<Pick<DataModel, 'type'>> {
    const { data } = await this.http.post<{ type: string }>(
      `${this.config.apiUri}/get-data/${id}`
    );

    return data;
  }

  private authenticationInterceptor(
    request: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const authorization = this.authenticationToken
      ? { Authorization: `Bearer ${this.authenticationToken}` }
      : {};

    const headers = {
      ...request.headers,
      ...authorization,
    };

    const req = { ...request, headers } as InternalAxiosRequestConfig;

    return req;
  }
}

interface ExternalDocumentConfig {
  apiUri: string;
}
