import axios from "axios";
import { parseResult, parseSort } from "./parser";
import { Result, Sort, Unit, UnitList } from "./types";

export const MEASURE_OF_THINGS =
  "http://www.bluebulbprojects.com/MeasureOfThings";

export async function getAvailableUnits(
  unit: string,
  amount = 0,
): Promise<UnitList> {
  const { data } = await axios.get<string>(
    MEASURE_OF_THINGS + `/unitSearch.php?x%5B%5D=${unit}&z%5B%5D=${amount}`,
  );
  return JSON.parse(data.trim());
}

export async function getResultsPage(
  unit: Unit,
  sort: Sort = "closest",
  page = 1,
): Promise<Result[]> {
  const parsedSort = parseSort(sort);
  const { data } = await axios.get<string>(
    MEASURE_OF_THINGS +
      `/results.php?comp=${unit.comp}&unit=${unit.unit}&amt=${unit.amt}&sort=${parsedSort}&p=${page}`,
  );
  return parseResult(data.trim());
}

export default {
  getAvailableUnits,
  getResultsPage,
};
