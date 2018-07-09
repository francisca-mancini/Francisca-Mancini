export default function getProductPrice(product) {
  const rawPrice = product.priceRange.maxVariantPrice.amount;
  const price = parseInt(rawPrice);

  return price;
}
