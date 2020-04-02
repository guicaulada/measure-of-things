import yargs from "yargs";
import api from "./api";
import { Sort } from "./types";

export default api;

if (require.main === module) {
  const argv = yargs
    .option("unit", {
      alias: "u",
      type: "string",
      description: "Measurement unit (m, mm, ms, ...)",
      required: true,
    })
    .option("amount", {
      alias: "a",
      type: "number",
      description: "Measurement amount (-5, 0, 5, ...)",
      required: true,
    })
    .option("page", {
      alias: "p",
      type: "number",
      description: "Results page (1, 2, 3, ...)",
      default: 1,
    })
    .option("sort", {
      alias: "s",
      type: "string",
      description: "Results sorting [closest, lowest, highest]",
      default: "closest",
    }).argv;
  api.getAvailableUnits(argv.unit, argv.amount).then(units => {
    const u = units.find(u => u.unit === argv.unit);
    if (!u) {
      throw new Error(
        "Invalid unit value! Try: " +
          units
            .map(u => u.unit)
            .join(", ")
            .replace(/,(?=[^,]*$)/, " or"),
      );
    } else {
      api.getResultsPage(u, argv.sort as Sort, argv.page).then(console.log);
    }
  });
}
