import { round } from '@/utils/round';
import { SectorAnalyzer } from '@/utils/sector-analyzer';

import rawGpdSectors from './sectors-gdp.json';
import rawRegions from './regions.json';

export const gpdSectors = Object.fromEntries(
  Object.entries(rawGpdSectors).map(([name, observations]) => {
    return [
      name,
      observations.map((observation) => {
        const { date, predictedValue, realValue } = observation;

        return {
          ...observation,
          date: new Date(date),
          realValue: round(realValue),
          predictedValue: round(predictedValue),
          loss: round(realValue - predictedValue),
        };
      }),
    ];
  })
);

export const sectorNames = Object.keys(
  rawGpdSectors
) as (keyof typeof rawGpdSectors)[];

export const sectorSummaries = Object.fromEntries(
  sectorNames.map((sectorName) => {
    return [sectorName, SectorAnalyzer.analyze(gpdSectors[sectorName])];
  })
);

export type SectorName = (typeof sectorNames)[number];

export type SectorObservation = (typeof gpdSectors)[string][number];

const deriveRegionColorByCostValue = (costs: number) => {
  let color;
  switch (true) {
    case costs < 20:
      color = 'rgb(238, 116, 116)';
      break;
    case costs >= 20 && costs < 30:
      color = 'rgb(241, 82, 82)';
      break;
    case costs >= 30 && costs < 50:
      color = 'rgb(253, 55, 55)';
      break;
    case costs >= 50 && costs < 100:
      color = 'rgb(252, 19, 19)';
      break;
    case costs > 100:
      color = 'rgb(194, 11, 11)';
      break;
  }
  return color;
};

export const regions = rawRegions.map(
  ({ employed, salary, regionName: name, rusCode, img, isoCode, paths }) => {
    const costs = round((employed * salary) / 1e3);

    return {
      costs,
      salary: round(salary),
      employed: round(employed),
      id: `${isoCode}_${rusCode}`,
      color: deriveRegionColorByCostValue(costs),
      name,
      img,
      isoCode,
      rusCode,
      paths,
    };
  }
);

export const regionCostsSum = round(
  regions.reduce((ac, { costs }) => ac + costs, 0)
);

export type RegionObservation = (typeof regions)[number];
