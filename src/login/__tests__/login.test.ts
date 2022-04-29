import { render, fireEvent, screen } from '@testing-library/vue';
import Login from './../Login.vue';

// const server = setupServer();

// beforeAll(() => server.listen());
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe('登录页面', () => {
  it('登录成功', async () => {
    // const { getBytext } = render(<Login />);
    render(Login);

    expect(screen.getByText('登录')).toBeInTheDocument;

    // const wrapper = mount(Login);
    // expect(wrapper.text()).toContain('登录');

    // wrapper.get('[class="login-btn"]').trigger('click');

    // await flushPromises();

    // expect(window.location.replace).toHaveBeenCalledWith('/');

    // const buySpy = vi.spyOn(market, 'buy');

    // market.buy('apples', 10);
    // market.buy('apples', 20);

    // expect(buySpy).toHaveBeenCalledWith('apples', 10);
    // expect(buySpy).toHaveBeenCalledWith('apples', 20);

    // const replaceSpy = vi.spyOn(window.location, 'replace');

    // expect(replaceSpy).toHaveBeenCalledWith('replace', '/');
  });
});
