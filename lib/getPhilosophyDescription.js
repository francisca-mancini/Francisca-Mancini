export default function getProductDescription(article) {
  const desc = article.contentHtml;
  const regex = /\[(.*?)\[\//g;
  const cleanDesc = desc.match(regex);
  const descArray = [];

  cleanDesc.forEach(el => {
    if (el.startsWith('[paragraph]')) {
      const el1 = el.replace('[paragraph]', '');
      const el2 = el1.replace('[/', '');

      descArray.push({
        type: 'paragraph',
        string: el2
      });
    } else if (el.startsWith('[quote]')) {
      const el1 = el.replace('[quote]', '');
      const el2 = el1.replace('[/', '');

      descArray.push({
        type: 'quote',
        string: el2
      });
    } else if (el.startsWith('[date]')) {
      const el1 = el.replace('[date]', '');
      const el2 = el1.replace('[/', '');
      const el3 = el2.replace('[', '');

      descArray.push({
        type: 'date',
        string: el3
      });
    } else if (el.startsWith('[title]')) {
      const el1 = el.replace('[title]', '');
      const el2 = el1.replace('[/', '');

      descArray.push({
        type: 'title',
        string: el2
      });
    } else if (el.startsWith('[space]')) {
      descArray.push({
        type: 'space'
      });
    }
  });

  return descArray;
}
