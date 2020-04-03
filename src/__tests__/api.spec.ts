import * as api from "../api";
import { UnitList } from "../types";

let axiosResult = null as unknown;
jest.mock("axios", () => ({
  get: jest.fn().mockImplementation(() => ({
    data: axiosResult as UnitList,
  })),
}));

const unitsMock = [
  {
    friendly: "meters",
    unit: "m",
    comp: "length",
    amt: "5",
    score: 2,
    common: 1,
  },
] as UnitList;

describe("Api", () => {
  it("Test getAvailableUnits function with amount", async () => {
    axiosResult = JSON.stringify(unitsMock);
    const response = await api.getAvailableUnits("meter", 5);
    expect(response).toEqual(unitsMock);
  });

  it("Test getAvailableUnits function without amount", async () => {
    axiosResult = JSON.stringify(unitsMock);
    const response = await api.getAvailableUnits("meter");
    expect(response).toEqual(unitsMock);
  });

  it("Test getAvailableUnits function with unit", async () => {
    axiosResult = "";
    const response = await api.getResultsPage(unitsMock[0]);
    expect(response).toEqual([]);
  });

  it("Test getAvailableUnits function with unit and sort", async () => {
    axiosResult = "";
    const response = await api.getResultsPage(unitsMock[0], "highest");
    expect(response).toEqual([]);
  });

  it("Test getAvailableUnits function with unit, sort and page", async () => {
    axiosResult = "";
    const response = await api.getResultsPage(unitsMock[0], "highest", 2);
    expect(response).toEqual([]);
  });
});
