export const createSlug = (name) => {
  return (
    name.toLowerCase().replace(/\s+/g, "-") +
    "-" +
    Math.floor(Math.random() * 10000)
  );
};