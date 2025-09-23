export const fetchRotmgGear = async () => {
  const data = await fetch("http://localhost:3000/top/necromancers");
  return data.json();
};
