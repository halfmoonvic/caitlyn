import { flushPromises } from '@vue/test-utils';

export function _toURL(url: string, baseURL: string): string {
  if (!url) {
    return url;
  }

  return new URL(url, baseURL).toString();
}

export function toURL(url: string) {
  return _toURL(url, (import.meta.env.VITE_TEST_HOST as string) || '');
}

export const flush = async () => {
  await flushPromises(); // per vue-test-utils
  await flushPromises(); // per msw issue #1163
  await new Promise(resolve => window.setTimeout(resolve, 100)); // for "good measure"/safety
};

// re-export everything
export * from '@vue/test-utils';
