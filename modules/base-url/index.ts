import { defineNuxtModule, createResolver, addPlugin } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'base-url',
  },

  setup() {
    const resolver = createResolver(import.meta.url);

    const pluginPath = resolver.resolve('./runtime/plugin.ts');

    addPlugin(pluginPath);
  },
});
