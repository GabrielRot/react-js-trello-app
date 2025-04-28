export const mapOrder = (array, order, key) => {
  array.sort((a, b) => array.indexOf(a[key]) - order.indexOf(b[key]));

  return array;
} 