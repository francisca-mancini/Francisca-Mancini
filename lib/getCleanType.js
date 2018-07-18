export default function getCleanType(type) {
  const map = {
    fragrance: 'Fragrances',
    layering: 'Layering',
    discovery: 'Discovery'
  };

  return map[type];
}
