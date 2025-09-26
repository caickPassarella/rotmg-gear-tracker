import type { classNameType } from "./types";

export const fetchRotmgGear = async (className: classNameType) => {
  const data = await fetch(`http://localhost:3000/top/${className}`);
  return data.json();
};
