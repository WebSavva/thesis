import { regions } from '@/data';

import { useInternalization } from './use-internalization';

const BLACKLISTED_REGIONS = [91];

export const useRegions = () => {
  const { lang } = useInternalization();

  let normalizedRegions = regions.map((region) => ({
    ...region,
    name: region.name[lang],
  }));

  if (lang === 'ru') return normalizedRegions;

  return normalizedRegions.filter(
    ({ rusCode }) => !BLACKLISTED_REGIONS.includes(rusCode)
  );
};
