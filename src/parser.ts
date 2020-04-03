import cheerio from "cheerio";
import { MEASURE_OF_THINGS } from "./api";
import { Link, Result, Sort } from "./types";

function parseTitles($: CheerioStatic): string[] {
  return $(".results-content-row-title")
    .toArray()
    .map(title => $(title).text());
}

function parsePrecisions($: CheerioStatic): string[] {
  return $(".results-content-row-precision")
    .toArray()
    .map(precision => $(precision).text());
}

function parseExplanations($: CheerioStatic): string[] {
  return $(".results-content-row-precision")
    .parent()
    .find("span")
    .toArray()
    .map(explanation => $(explanation).text());
}

function parseNotes($: CheerioStatic): string[] {
  const notes = [] as string[];
  const results = $(".results-content-row-precision")
    .parent()
    .toArray()
    .map(result =>
      $(result)
        .contents()
        .toArray(),
    );

  for (let i = 0; i < results.length; i++) {
    notes[i] = "";
    for (const content of results[i]) {
      if (content.tagName === "br") break;
      if (content.tagName === "div") continue;
      const text = $(content).text();
      if (text && text != "\\n" && text != "") {
        notes[i] += text.replace(/\n/g, "");
      }
    }
  }

  return notes;
}

function parseLinks($: CheerioStatic): Link[] {
  return $(".results-content-row-linkBox a")
    .toArray()
    .map(link => {
      const text = $(link).text();
      const title = $(link).attr("title");

      let url = $(link).attr("href");
      if (url && !url.includes("http")) {
        url = MEASURE_OF_THINGS + `/${url}`;
      }

      return { text, url, title };
    });
}

export function parseResult(result: string): Result[] {
  const $ = cheerio.load(result);
  const titles = parseTitles($);
  const precisions = parsePrecisions($);
  const explanations = parseExplanations($);
  const notes = parseNotes($);
  const links = parseLinks($);

  return titles.map((title, i) => {
    return {
      title,
      precision: precisions[i].trim(),
      note: notes[i].trim(),
      explanation: explanations[i].trim(),
      links: links
        .slice(i, i + 4)
        .sort((l1, l2) => (l1.text! > l2.text! ? 1 : -1)),
    };
  });
}

export function parseSort(sort: Sort): string {
  switch (sort) {
    case "closest":
      return "pr";
    case "lowest":
      return "cnt";
    case "highest":
      return "cntD";
  }
}

export default {
  parseResult,
  parseSort,
};
