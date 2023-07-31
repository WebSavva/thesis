import { defineNuxtConfig } from 'nuxt/config';
import { createResolver } from '@nuxt/kit';

import dictionary from './data/dictionary.json';
import head from './configs/default-head';

const resolver = createResolver(import.meta.url);

const bpPath = resolver.resolve('./assets/styles/breakpoints.styl');

export default defineNuxtConfig({
  app: {
    head,
  },

  imports: {
    autoImport: false,
  },

  components: false,

  css: ['~/assets/styles/index.styl'],

  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          imports: [bpPath],
        },
        styl: {
          imports: [bpPath],
        },
      },
    },
  },

  modules: [
    'unplugin-icons/nuxt'
  ],

  internalization: {
    dictionary,
  },
});
