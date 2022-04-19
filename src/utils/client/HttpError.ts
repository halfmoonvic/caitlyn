export default class HttpError extends Error {
  private readonly url: string;
  private readonly request: RequestInit;
  private readonly response?: Response;
  private readonly innerError?: Error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public responseBody?: any;

  constructor(
    message: string,
    url: string,
    request: RequestInit,
    response?: Response,
    innerError?: Error,
  ) {
    super(message);

    this.name = 'HttpError';
    this.url = url;
    this.request = request;
    this.response = response;
    this.innerError = innerError;
  }

  get status() {
    return this.response?.status;
  }

  get headers() {
    return this.response?.headers;
  }

  public toJSON() {
    return {
      url: this.url,
      message: this.message,
      request: this.request,
      response: this.response,
      responseBody: this.responseBody,
      innerError: this.innerError,
    };
  }
}
