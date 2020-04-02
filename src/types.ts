export interface Unit {
  friendly: string;
  unit: string;
  comp: string;
  amt: string;
  score: 2.2083333333333;
  common: 1;
}

export interface Link {
  title?: string;
  url?: string;
  text?: string;
}

export interface Result {
  title: string;
  precision: string;
  note: string;
  explanation: string;
  links: Link[];
}

export type UnitList = Unit[];

export type Sort = "closest" | "lowest" | "highest";
