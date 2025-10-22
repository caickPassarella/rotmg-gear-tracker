import necromancers from "./classes/necromancer.png";
import archers from "./classes/archer.png";
import assassins from "./classes/assassin.png";
import bards from "./classes/bard.png";
import huntresses from "./classes/huntress.png";
import kensei from "./classes/kensei.png";
import knights from "./classes/knight.png";
import mystics from "./classes/mystic.png";
import ninjas from "./classes/ninja.png";
import paladins from "./classes/paladin.png";
import priests from "./classes/priest.png";
import samurai from "./classes/samurai.png";
import sorcerers from "./classes/sorcerer.png";
import summoners from "./classes/summoner.png";
import tricksters from "./classes/trickster.png";
import warriors from "./classes/warrior.png";
import wizards from "./classes/wizard.png";
import rogues from "./classes/rogue.png";
import allRotmgItems from "./allRotmgItems.png";
import gitHub from "./github.png";

import Divine from "./divine.png";
import Legendary from "./legendary.png";
import Rare from "./rare.png";
import Uncommon from "./uncommon.png";
import Common from "./block.svg";

import type { ClassName } from "../types";
import type { IconType } from "react-icons";

export const classImages: Record<ClassName, string> = {
  necromancers,
  archers,
  assassins,
  bards,
  huntresses,
  kensei,
  knights,
  mystics,
  paladins,
  priests,
  samurai,
  ninjas,
  sorcerers,
  summoners,
  tricksters,
  warriors,
  wizards,
  rogues,
  allRotmgItems,
  gitHub,
};

export const raritiesImgs: Record<string, string> = {
  Divine,
  Legendary,
  Rare,
  Uncommon,
  Common,
};
