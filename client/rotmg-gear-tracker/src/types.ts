import type { ReactNode } from "react";

export const allClasses = [
  "wizards",
  "mystics",
  "necromancers",
  "sorcerers",
  "summoners",
  "priests",
  "bards",
  "huntresses",
  "archers",
  "warriors",
  "paladins",
  "knights",
  "rogues",
  "assassins",
  "tricksters",
  "samurai",
  "ninjas",
  "kensei",
];

export type ClassName = (typeof allClasses)[number];

export type Item = {
  name: string;
  count: number;
  type: string;
  src: string;
  img: string;
  percentage: string;
  rarities: Rarities;
  enchantments: Enchantments;
};

type Rarities = {
  Common: number;
  Divine: number;
  Legendary: number;
  Rare: number;
};

export type Enchantments = [string, number][];

export type PopOverProp = {
  children: ReactNode;
  src: string;
  name: string;
  rarities: Rarities;
  enchantments: Enchantments;
};
