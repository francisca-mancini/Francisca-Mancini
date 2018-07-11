export default function getProductGradient(product) {
  const desc = product.description;
  const regex = [
    /\[gradient1](.*?)\[\/gradient1]/g,
    /\[gradient2](.*?)\[\/gradient2]/g
  ];
  const gradient = [];

  for (let i = 0; i < regex.length; i++) {
    const gradientTag = `[gradient${i + 1}]`;
    const gradientClosingTag = `[/gradient${i + 1}]`;
    const match = desc.match(regex[i]);
    const removeFistTag = match[0].replace(gradientTag, '');
    const removeSecondTag = removeFistTag.replace(gradientClosingTag, '');

    gradient.push(removeSecondTag);
  }

  return {
    color1: gradient[0],
    color2: gradient[1]
  };
}
