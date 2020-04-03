#!/usr/bin/env node
import yargs from "yargs";
import api from "./api";
import { Arguments, Sort } from "./types";

export default api;

export function getArguments(args?: string[]): Arguments {
  return (args ? yargs(args) : yargs)
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
      description: "Results sort [closest, lowest, highest]",
      default: "closest",
    })
    .option("links", {
      alias: "l",
      type: "boolean",
      description: "Add links to output",
      default: false,
    }).argv;
}

export function main(args?: string[], force = false): void {
  if (require.main === module || force) {
    const argv = getArguments(args);
    api.getAvailableUnits(argv!.unit, argv!.amount).then(units => {
      const u = units.find(u => u.unit === argv!.unit);
      if (!u) {
        throw new Error(
          "Invalid unit value! Try: " +
            units
              .map(u => u.unit)
              .join(", ")
              .replace(/,(?=[^,]*$)/, " or"),
        );
      } else {
        api
          .getResultsPage(u, argv!.sort as Sort, argv!.page)
          .then(data =>
            argv!.links
              ? data
              : data.map(d => {
                  delete d.links;
                  return d;
                }),
          )
          .then(data => JSON.stringify(data, null, 4))
          .then(console.log);
      }
    });
  }
}

main();
