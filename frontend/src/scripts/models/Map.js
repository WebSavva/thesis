import { roundNumber } from "../customPackages/helperFunctions";

export default class Map {
  constructor() {
    this.query = process.env.API_ORIGIN + `/api/econ_regions/all/`;
  }

  async getRegions() {
    try {
      const response = await fetch(this.query);

      const regionsData = await response.json();

      this.regionsObject = this.getFormattedRegions(regionsData);
    } catch (error) {
      throw error;
    }
  }

  getFormattedRegions(rawRegions) {
    const regionsObject = {};
    const { regions } = rawRegions;
    let sumLosses = 0;

    regions.forEach((region) => {
      region.lockdownCost = roundNumber(
        (region.employed * region.salary) / 1e9,
        2
      );
      region.salary = roundNumber(region.salary / 1e3, 2);
      region.employed = roundNumber(region.employed / 1e3, 2);
      region.colorMap = this.getRegionColor(region.lockdownCost);
      region.ident = `${region.isoCode}` + "_" + `${region.rusCode}`;
      regionsObject[region.ident] = region;
      sumLosses += region.lockdownCost;
    });
    regionsObject.overallInfo = {
      sumLosses: roundNumber(sumLosses, 2),
      viewport: rawRegions.viewPort,
    };
    return regionsObject;
  }

  getRegionColor(costs) {
    let color;
    switch (true) {
      case costs < 20:
        color = "rgb(238, 116, 116)";
        break;
      case costs >= 20 && costs < 30:
        color = "rgb(241, 82, 82)";
        break;
      case costs >= 30 && costs < 50:
        color = "rgb(253, 55, 55)";
        break;
      case costs >= 50 && costs < 100:
        color = "rgb(252, 19, 19)";
        break;
      case costs > 100:
        color = "rgb(194, 11, 11)";
        break;
    }
    return color;
  }
}
