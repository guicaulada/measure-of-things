import fs from "fs";
import * as parser from "../parser";

const resultsHTML = fs
  .readFileSync(require.resolve("../__mocks__/results.html"))
  .toString();

const resultsJSON = fs
  .readFileSync(require.resolve("../__mocks__/results.json"))
  .toString();

describe("Parser", () => {
  it("Test parseSort function with closest sort", async () => {
    const response = await parser.parseSort("closest");
    expect(response).toEqual("pr");
  });

  it("Test parseSort function with lowest sort", async () => {
    const response = await parser.parseSort("lowest");
    expect(response).toEqual("cnt");
  });

  it("Test parseSort function with highest sort", async () => {
    const response = await parser.parseSort("highest");
    expect(response).toEqual("cntD");
  });

  it("Test parseResult function with mocked results", async () => {
    const response = await parser.parseResult(resultsHTML);
    expect(response).toEqual(JSON.parse(resultsJSON));
  });
});
