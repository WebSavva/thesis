import { defineComponent } from 'vue-demi';

import languages from '#build/languages.json';

export default defineComponent({
  name: 'LanguageSwitcher',

  computed: {
    langs() {
      return languages.map((lang) => {
        const basePath = this.$baseUrl.remove(this.$route.path).replace(
          new RegExp(`/${this.$int.lang}`),
          ''
        );

        return {
          id: lang,
          href: this.$baseUrl.append(`/${lang}${basePath}`)
        }
      })
    },
  },
});
