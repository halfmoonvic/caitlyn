import HTTPClient from './httpClient';
import User from '@/model/user';

export class MarathonClient extends HTTPClient {
  constructor() {
    super('./proxy/marathon', {
      headers: {
        Pragma: 'no-cache',
      },
    });
  }

  public login(userName: string, password: string) {
    const body = {
      username: userName,
      password,
    };
    return this._postJson('/login', body);
  }

  public getUser(userName?: string): Promise<User> {
    let url = '/user';
    if (userName) {
      url = `${url}/${userName}`;
    }
    return this._get(url);
  }
}
