// utils.js
export function getFinalPrice(product) {
  const finalPrice = product.price * (1 - product.discountPercentage / 100);
  return Math.round(finalPrice * 100) / 100;
}
