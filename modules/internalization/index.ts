import { readdir, readFile } from 'fs/promises';

import {
  defineNuxtModule,
  addPluginTemplate,
  createResolver,
  addTemplate,
} from '@nuxt/kit';
import { NuxtPage } from 'nuxt/schema';
import defu from 'defu';
import handlebars from 'handlebars';

export interface ModuleOptions {
  dictionary: Record<string, Record<string, any>>;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'internalization',
    name: 'internalization',
  },

  defaults: {
    dictionary: {
      en: {
        title: '',
      },
      ru: {
        title: '',
      },
    },
  },

  async setup({ dictionary }, nuxt) {
    const langs = Object.keys(dictionary);

    function internationalzePages(pages: NuxtPage[], level = 0) {
      const originalPages = [...pages];

      pages.length = 0;

      originalPages.forEach((page, i) => {
        langs.forEach((lang) => {
          const intMeta = {
            lang,
            dict: dictionary[lang],
          };

          const translatedPath: string = `/${lang}${page.path}`;

          const translatedPage = defu(
            {
              name: `${page.name || ''}-${lang}`,
              meta: intMeta,
              path: translatedPath,
            },
            page
          ) as NuxtPage;

          if (translatedPage.children?.length) {
            translatedPage.children = translatedPage.children.map(
              (childPage) => {
                return {
                  ...childPage,
                  name: `${childPage.name || ''}-${lang}`,
                };
              }
            );
          }

          pages.push(translatedPage);

          if (page.path === '/' && lang === 'en') {
            const defaultIndexPage = defu({
              name: 'index',
              meta: intMeta
            }, page);

            pages.push(defaultIndexPage);
          }
        });
      });
    }

    nuxt.hook('pages:extend', internationalzePages);

    const resolver = createResolver(import.meta.url);

    addTemplate({
      filename: 'dictionary.json',
      getContents: () => JSON.stringify(dictionary, null, 2),
      write: true,
    });

    addTemplate({
      filename: 'languages.json',
      getContents: () => JSON.stringify(langs, null, 2),
      write: true,
    });

    addPluginTemplate(resolver.resolve('./runtime/plugin.ts'));

    const staticIntPagesDir = resolver.resolve(
      nuxt.options.rootDir,
      './static-int-pages'
    );

    const staticIntPages = await readdir(staticIntPagesDir);

    const compiledStaticIntPagesDir = 'compile-static-int-pages';

    await Promise.all(
      staticIntPages.map(async (fileName) => {
        const fullPagePath = resolver.resolve(staticIntPagesDir, fileName);

        const fileContent = await readFile(fullPagePath, 'utf-8');

        const template = handlebars.compile(fileContent, {
          noEscape: true,
        });

        const dictName = fileName.split('.')[0];

        return langs.map((lang) => {
          // compiling template

          addTemplate({
            filename: `${compiledStaticIntPagesDir}/${lang}/${fileName}`,
            write: true,
            getContents: () => template({
              ...dictionary[lang][dictName],
              $lang: lang,
            }),
          });
        });
      })
    );

    nuxt.hook('app:templates', (nuxtApp) => {
      nuxtApp.middleware = nuxtApp.middleware.filter(( { name }) => name !== 'validate');
    });

    nuxt.hook('nitro:config', (nitroConfig) => {
      const fullCompiledStaticIntPagesDir = resolver.resolve(
        nuxt.options.buildDir,
        compiledStaticIntPagesDir
      );

      // @ts-ignore
      nitroConfig.publicAssets?.push({
        dir: fullCompiledStaticIntPagesDir,
      });
    });
  },
});
