export default function getProductGradient(product) {
  if (!product) return;
  const desc = product.description;
  const regex = [
    /\[gradient1](.*?)\[\/gradient1]/g,
    /\[gradient2](.*?)\[\/gradient2]/g
  ];
  const gradient = [];
  const defaultGradient = ['#6b2854', '#80aee8'];

  for (let i = 0; i < regex.length; i++) {
    const gradientTag = `[gradient${i + 1}]`;
    const gradientClosingTag = `[/gradient${i + 1}]`;
    const match = desc.match(regex[i]);

    if (match !== null) {
      const removeFistTag = match[0].replace(gradientTag, '');
      const removeSecondTag = removeFistTag.replace(gradientClosingTag, '');

      gradient.push(removeSecondTag);
    } else {
      gradient.push(defaultGradient[i]);
    }
  }

  return {
    color1: gradient[0],
    color2: gradient[1]
  };
}
