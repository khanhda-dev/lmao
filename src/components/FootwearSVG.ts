import data from '../data/footwearAssets.json';

const sources = import.meta.glob('../assets/footwear/*.svg', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

export type CustomFootwear = {
  id: 'guoc-moc' | 'sneaker';
  costumeKey: keyof typeof data.targets;
};

export function footwearBottom({ id, costumeKey }: CustomFootwear) {
  const target = data.targets[costumeKey];
  return Math.max(...(['right', 'left'] as const).map(side => {
    const reference = data.references[`${id}-${side}`];
    return target[side].cuffY + reference.bottom - reference.cuffY;
  }));
}

// Preserve the supplied shoe geometry, paint and direction. Translate each
// complete ankle/shoe layer to the original trouser cuff; never move the leg.
export function replaceFootwear(doc: Document, root: Element, { id, costumeKey }: CustomFootwear) {
  for (const side of ['right', 'left'] as const) {
    const footId = side === 'right' ? 'Foot/R' : 'Foot/R_2';
    const foot = root.querySelector(`[id="${footId}"]`);
    if (!foot) throw new Error(`Missing ${footId} in ${costumeKey}`);
    const reference = data.references[`${id}-${side}`];
    const target = data.targets[costumeKey][side];
    for (const original of Array.from(foot.children)) original.setAttribute('visibility', 'hidden');
    const artwork = new DOMParser().parseFromString(sources[`../assets/footwear/${id}-${side}.svg`], 'image/svg+xml');
    const layer = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
    layer.setAttribute('data-footwear', `${id}-${side}`);
    layer.setAttribute('transform', `translate(${target.x - reference.anchorX} ${target.cuffY - reference.cuffY})`);
    for (const child of Array.from(artwork.documentElement.children)) layer.appendChild(doc.importNode(child, true));
    foot.appendChild(layer);
  }
  // These ornaments sit outside the original foot groups in two ceremonial SVGs.
  // Hide them only when the user explicitly replaces the original footwear.
  root.querySelectorAll('[id]').forEach(el => {
    if (/_boot_gold_[LR]$/.test(el.id)) el.setAttribute('visibility', 'hidden');
  });
}
