export default class Sector {
  constructor() {
    this.namesQuery = `${process.env.API_ORIGIN}/api/econ_sectors/all_names/`;
    this.sectorQuery = `${process.env.API_ORIGIN}/api/econ_sectors/`;
  }

  async getSectorsObject() {
    const response = await fetch(this.namesQuery);
    const sectorNames = await response.json();

    //initializing objects
    this.sectors = {};
    sectorNames.forEach((name) => (this.sectors[name] = null));

    return sectorNames[0];
  }

  async getSectorData(sectorName) {
    try {
      const sectorResponse = await fetch(this.sectorQuery + sectorName);
      const sectorData = await sectorResponse.json();

      this.sectors[sectorName] = sectorData;
      return sectorData;
    } catch (error) {
      this.sectors[sectorName] = null;
      throw error;
    }
  }
}
