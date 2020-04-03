export interface Unit {
  friendly: string;
  unit: string;
  comp: string;
  amt: string;
  score: number;
  common: number;
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
  links?: Link[];
}

export interface Arguments {
  unit: string;
  amount: number;
  page: number;
  sort: string;
  links: boolean;
}

export type UnitList = Unit[];

export type Sort = "closest" | "lowest" | "highest";
