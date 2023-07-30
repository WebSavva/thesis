import { join } from 'pathe';

import { useRuntimeConfig, defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(() => {
  const {
    app: { baseURL: baseUrl = '/' },
  } = useRuntimeConfig();

  const append = (path: string) => {
    return join(baseUrl, path)
  };

  const baseUrlRegex = new RegExp(`^${baseUrl}`);

  const remove = (path: string) => {
    if (!baseUrl || baseUrl === '/') return path;

    return path.replace(baseUrlRegex, '');
  };

  return {
    provide: {
      baseUrl: {
        append,
        remove,
        value: baseUrl,
      },
    },
  };
});
