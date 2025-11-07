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

type Rarities = [
  "Uncommon" | "Common" | "Rare" | "Legendary" | "Divine",
  number
][];

export type Enchantments = [string, number][];

export type PopOverProp = {
  children: ReactNode;
  src: string;
  name: string;
  rarities: Rarities;
  enchantments: Enchantments;
};
