import * as index from "../index";

console.log = jest.fn();

const mockArgs = ["-a", "5", "-u", "m"];
const mockArgv = {
  amount: 5,
  links: false,
  page: 1,
  sort: "closest",
  unit: "m",
};

let failAvailableUnits = false;
jest.mock("../api", () => ({
  getAvailableUnits: jest.fn().mockImplementation(async () => {
    if (failAvailableUnits) return [{ unit: "unit" }];
    else return [{ unit: "m" }];
  }),
  getResultsPage: jest.fn().mockResolvedValue([]),
}));

describe("Index", () => {
  it("Test getArguments function", () => {
    const response = index.getArguments(mockArgs);
    expect(response).toEqual(expect.objectContaining(mockArgv));
  });

  it("Test main function with valid unit without links", () => {
    try {
      const response = index.main(mockArgs, true);
      expect(response).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });

  it("Test main function with valid unit with links", () => {
    try {
      const response = index.main(mockArgs.concat("-l"), true);
      expect(response).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });

  it("Test main function with invalid unit", () => {
    try {
      failAvailableUnits = true;
      const response = index.main(mockArgs, true);
      expect(response).toBeFalsy();
    } catch (err) {
      expect(err).toBeFalsy();
    }
  });
});
