import { definePageMeta } from '#imports';

export const useFadePageTransition = () => {
  definePageMeta({
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  });
};
