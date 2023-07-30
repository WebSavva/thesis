import { defineNuxtPlugin } from 'nuxt/app';

export type Dict = typeof import('#build/dictionary.json');

export type Lang = keyof Dict;

export type BaseDict = Dict[Lang];

export default defineNuxtPlugin(({ vueApp }) => {
  const { lang, dict } = vueApp.$nuxt._route.meta as {
    lang: Lang;
    dict: BaseDict;
  };

  return {
    provide: {
      int: {
        lang,
        dict,

        hrefWithLang: (href: string, withBaseUrl = true) => {
          const translatedPath = `/${lang}${href}`;
          if (!withBaseUrl) return translatedPath;

          return vueApp.$nuxt.$baseUrl.append(translatedPath);
        },
      },
    },
  };
});
