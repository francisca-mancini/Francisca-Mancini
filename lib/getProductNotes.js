export default function getProductNotes(product) {
  const desc = product.description;
  const regex = [
    /\[note1](.*?)\[\/note1]/g,
    /\[note2](.*?)\[\/note2]/g,
    /\[note3](.*?)\[\/note3]/g
  ];
  const labels = ['Top', 'Heart', 'Base'];
  const notes = [];

  for (let i = 0; i < regex.length; i++) {
    const note = `note${i + 1}`;
    const cleanDesc = desc.match(regex[i]);
    const removeFirstTag = cleanDesc[0].replace(`[${note}]`, '');
    const removeSecondTag = removeFirstTag.replace(`[/${note}]`, '');
    notes.push({ label: labels[i], note: removeSecondTag });
  }

  console.log(notes);

  return notes;
}
