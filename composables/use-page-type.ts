import { useHead } from '#imports';

import { useInternalization, useBaseUrl } from './globals';

export const usePageType = (type: string) => {
  const { dict } = useInternalization();
  const $baseUrl = useBaseUrl();


  const { title, description } = (dict as any)[type].meta as {
    title: string;
    description: string;
  };

  const derivedHeadAttrs = {
    title,
    meta: [
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:image',
        content: $baseUrl.append('/og-image.jpg'),
      },
      {
        property: 'og:description',
        content: description,
      },
    ],
    htmlAttrs: {
      'data-page-type': type,
    },
  };

  useHead(derivedHeadAttrs);
};
