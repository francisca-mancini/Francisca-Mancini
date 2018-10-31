export default function getProductVariantType(product) {
  const options = product.variants.edges[0].node.selectedOptions;
  const type = options[0].value;

  return type;
}
