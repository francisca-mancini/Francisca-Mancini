export default function productImages(product) {
  const images = [];
  const rawImages = product.images.edges;

  rawImages.forEach(item => {
    images.push(item.node);
  });

  return images;
}
