import type { ClassName } from "./types";

export const fetchRotmgGear = async (className: ClassName) => {
  const data = await fetch(`http://localhost:3000/top/${className}`);
  return data.json();
};
