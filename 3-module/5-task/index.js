function getMinMax(str) {
  let numbers = str.split(' ').filter(item => !isNaN(parseFloat(item)));
  let min = Math.min(...numbers);
  let max = Math.max(...numbers);

  return { min, max };
}
