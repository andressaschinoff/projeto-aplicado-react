const roundedNumber = (price: number | undefined) => {
  if (price === 0) {
    return price.toFixed(2);
  }
  if (!price) {
    return 0;
  }
  return price.toFixed(2);
};

export { roundedNumber };
