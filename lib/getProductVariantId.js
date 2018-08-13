export default function getProductVariantId(product) {
  const id = product.variants.edges[0].node.id;

  return id;
}
