import type { SectorObservation } from '@/data';

import { avg } from './avg';
import { round } from './round';
import { sum } from './sum';

export type SummaryByQuarters = Array<{
  quarter: `Q${number}`;
  realValue: number;
  predictedValue: number;
  loss: number;
  quarterlyMeanValue: number;
}>;

export class SectorAnalyzer {
  public static analyze(observations: SectorObservation[]) {
    const firstQuarterDate = new Date('2020-04-01');

    const observations2020 = observations.filter(
      ({ date }) => date >= firstQuarterDate
    );

    const firstQuarter2019Date = new Date('2019-01-01');

    const observationsBefore2019 = observations.filter(
      ({ date }) => date < firstQuarter2019Date
    );

    const totalSums = observations2020.reduce(
      (ac, { loss, predictedValue, realValue }) => {
        ac.loss += loss;
        ac.predictedValue += predictedValue;
        ac.realValue += realValue;

        return ac;
      },
      {
        loss: 0,
        predictedValue: 0,
        realValue: 0,
      }
    );

    const prevYearStartDate = new Date('2019-01-01');
    const prevYearEndDate = new Date('2019-10-01');

    const prevYearRealSum = observations.reduce((ac, { realValue, date }) => {
      return date >= prevYearStartDate && date <= prevYearEndDate
        ? ac + realValue
        : ac;
    }, 0);

    const prevYearShare = +(totalSums.loss / prevYearRealSum).toFixed(4);

    const summaryByQuarters: SummaryByQuarters = [];

    for (let i = 0; i < observations2020.length; i++) {
      const { predictedValue, realValue, loss, date } = observations2020[i];

      const quarterMonth = date.getMonth();

      const quarterRealValuesBefore2019 = observationsBefore2019
        .filter((obs) => {
          return obs.date.getMonth() === quarterMonth;
        })
        .map(({ realValue }) => realValue);

      const quarterlyMeanValue = round(avg(quarterRealValuesBefore2019));

      summaryByQuarters.push({
        quarter: `Q${i + 2}`,
        realValue,
        predictedValue,
        loss,
        quarterlyMeanValue,
      });
    }

    const totalQuarterlyMeanValue = round(
      sum(summaryByQuarters.map(({ quarterlyMeanValue }) => quarterlyMeanValue))
    );

    const totalSummaryByQuarter = {
      quarter: 'total',
      realValue: round(totalSums.realValue),
      predictedValue: round(totalSums.predictedValue),
      loss: round(totalSums.loss),
      quarterlyMeanValue: totalQuarterlyMeanValue,
    };

    return {
      summaryByQuarters,
      totalSummaryByQuarter,
      prevYearShare,
    };
  }
}
