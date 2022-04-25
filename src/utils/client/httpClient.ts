/* eslint-disable @typescript-eslint/no-explicit-any */
import merge from 'lodash/merge';
import HttpError from './HttpError';

// https://github.com/node-fetch/node-fetch/issues/481
const BASE_ADDR = import.meta.env.VITE_TEST_HOST
  ? import.meta.env.VITE_TEST_HOST
  : '';

const DEFAULT_FETCH_OPTS = {
  method: 'GET',
};

export const HTTP_TIMEOUT = (window as any).config?.requestTimeout || 60000;

export type HTTPResponseMapFunc = (
  resp: Response,
  reqInput: string,
  reqInit: RequestInit,
) => any;

export async function defaultResponseMapFunc(
  resp: Response,
  reqInput: string,
  reqInit: RequestInit,
): Promise<any> {
  const contentType = resp.headers.get('Content-Type');

  if (!resp.ok) {
    const msg = `HTTP response status error (${resp.status}) while sending ${reqInit.method} request to ${reqInput}`;
    const error = new HttpError(msg, reqInput, reqInit, resp);
    error.responseBody = await (contentType &&
    contentType.toLowerCase().indexOf('json') >= 0
      ? resp.json()
      : resp.text()
    ).catch(e => {
      console.error(e);
      return null;
    });
    throw error;
  }

  return contentType && contentType.toLowerCase().indexOf('json') >= 0
    ? resp.json()
    : resp.text();
}

export default class HTTPClient {
  private readonly baseAddr: string;
  private readonly fetchOpts: RequestInit;

  constructor(baseAddr: string, fetchOpts?: RequestInit) {
    this.baseAddr = BASE_ADDR + baseAddr;
    this.fetchOpts = { ...DEFAULT_FETCH_OPTS, ...fetchOpts };
  }

  public __fetch(input: string, init: RequestInit): Promise<Response> {
    if (init.signal) {
      return fetch(input, init);
    }
    const controller = new AbortController();
    init.signal = controller.signal;

    const handler = setTimeout(() => {
      controller.abort();
    }, HTTP_TIMEOUT);

    return new Promise((resolve, reject) => {
      fetch(input, init)
        .then(res => {
          resolve(res);
          if (handler) {
            clearTimeout(handler);
          }
        })
        .catch(reject);
    });
  }

  public async _fetch(
    url: string,
    opts?: RequestInit,
    respMapper?: HTTPResponseMapFunc,
  ): Promise<any> {
    const [input, init] = this.buildRequest(url, opts);

    try {
      const resp = await this.__fetch(input, init);
      respMapper = respMapper || defaultResponseMapFunc;
      return respMapper(resp, input, init);
    } catch (e) {
      console.error(
        `Error occurred while sending ${init.method} request to ${input}`,
        e,
      );
      throw e;
    }
  }

  public _fetchJson(
    url: string,
    method: string,
    body: any,
    respMapper?: HTTPResponseMapFunc,
  ): Promise<any> {
    const opts = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify(body),
    };
    return this._fetch(url, opts, respMapper);
  }

  public _get(url: string, respMapper?: HTTPResponseMapFunc): Promise<any> {
    return this._fetch(url, undefined, respMapper);
  }

  public _postJson(
    url: string,
    body?: any,
    respMapper?: HTTPResponseMapFunc,
  ): Promise<any> {
    return this._fetchJson(url, 'POST', body, respMapper);
  }

  public _putJson(
    url: string,
    body?: any,
    respMapper?: HTTPResponseMapFunc,
  ): Promise<any> {
    return this._fetchJson(url, 'PUT', body, respMapper);
  }

  public _patchJson(
    url: string,
    body?: any,
    respMapper?: HTTPResponseMapFunc,
  ): Promise<any> {
    return this._fetchJson(url, 'PATCH', body, respMapper);
  }

  public _deleteJson(
    url: string,
    body?: any,
    respMapper?: HTTPResponseMapFunc,
  ): Promise<any> {
    return this._fetchJson(url, 'DELETE', body, respMapper);
  }

  protected buildRequest(
    url: string,
    opts?: RequestInit,
  ): [string, RequestInit] {
    let input = `${this.baseAddr}${url}`;
    opts = merge({}, this.fetchOpts, opts);

    if (opts.method?.toLowerCase() === 'get') {
      input = `${input}${
        url.indexOf('?') < 0 ? '?' : '&'
      }_=${new Date().getTime()}`;
    }

    return [input, opts];
  }
}
