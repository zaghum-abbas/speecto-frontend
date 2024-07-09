const ensureArray = (input) => {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [];
  }
};
export { ensureArray };
