import type { PropsWithChildren } from "react";

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
};

export type PopOverProp = PropsWithChildren;
