import { HTTPResponseMapFunc } from './httpClient';
import HttpError from './HttpError';
import { MarathonClient } from './marathonClient';
import useAuthStore from '@/store/auth';

const byPassAuthUrls = new Set(['/login', '/logout']);
const authErrorStatus = new Set([401, 403]);

class Marathon extends MarathonClient {
  public async _fetch(
    url: string,
    opts?: RequestInit,
    respMapper?: HTTPResponseMapFunc,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    try {
      return await super._fetch(url, opts, respMapper);
    } catch (e) {
      const httpError = e as HttpError;
      if (
        httpError.status &&
        authErrorStatus.has(httpError.status) &&
        !byPassAuthUrls.has(url)
      ) {
        const { setCurrentUser } = useAuthStore();
        setCurrentUser(null);

        document.location.href = '/login/';
        return;
      }
      throw e;
    }
  }
}

const marathon = new Marathon();

export default marathon;
