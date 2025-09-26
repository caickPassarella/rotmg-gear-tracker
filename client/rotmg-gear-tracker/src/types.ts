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
  src: string;
  img: string;
  percentage: string;
};
