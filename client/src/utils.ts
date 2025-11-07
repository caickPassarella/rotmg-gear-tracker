import type { ClassName } from "./types";

export const fetchRotmgGear = async (className: ClassName) => {
  const data = await fetch(`${import.meta.env.VITE_API_URL}top/${className}`);
  return data.json();
};
