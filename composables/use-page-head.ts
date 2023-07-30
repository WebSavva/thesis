import { useHead } from '#imports';

import { useInternalization } from './use-internalization';

export const usePageHead = (pageName: string) => {
  const { dict } = useInternalization();

  const { title, description } = (dict as any)[pageName].meta as {
    title: string;
    description: string;
  };

  const mergedHead = {
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
        content: '/og-image.jpg',
      },
      {
        property: 'og:description',
        content: description,
      },
    ],
  };

  useHead(mergedHead);
};
