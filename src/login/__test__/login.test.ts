import {
  describe,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  it,
  vi,
} from 'vitest';
import { flush, mount, toURL } from '@/testUtils';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Login from './../Login.vue';

const loginHandler = rest.post(
  toURL('/proxy/api/simple/login'),
  (req, res, ctx) => {
    return res(ctx.json('登录成功'));
  },
);

const server = setupServer();

beforeAll(() => {
  server.listen();
  vi.spyOn(location, 'replace');
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('登录页面', () => {
  it('登录成功', async () => {
    server.use(loginHandler);

    const wrapper = mount(Login);
    expect(wrapper.text()).toContain('登录');
    await wrapper.get('[class="login-btn"]').trigger('click');

    await flush();
    expect(window.location.replace).toHaveBeenCalledWith('/');
  });
});
