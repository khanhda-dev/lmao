import assets from '../data/headwearAssets.json';
import rigs from '../data/costumeAssets.json';

const sources = import.meta.glob('../assets/headwear/*.svg', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

export type CustomHeadwear = { id: string; female: boolean; x: number; costumeKey?:keyof typeof rigs };
export function nonLaPlacement(selection:CustomHeadwear){
 const rig=selection.costumeKey?rigs[selection.costumeKey]:undefined;
 const baseline=selection.female?261.079:293.498;
 const faceAnchor=(selection.female?46.9872:60.4683)+(rig?rig.handY-baseline:0);
 return {x:selection.x,y:faceAnchor-24,scale:selection.female?0.82:1};
}

// Bind scarf fabric to the outfit palette; retain the reference's layered folds.
// Hair behind the khăn vành dây and all other hats keep their original paint.
const scarfPaints: Record<string, Record<string, string>> = {
  'khan-dong': {
    '#254C61': 'var(--dress)',
    '#1E3C4F': 'color-mix(in srgb, var(--dress), #000 18%)',
    '#315E76': 'color-mix(in srgb, var(--dress), #fff 12%)',
    '#204356': 'color-mix(in srgb, var(--dress), #000 8%)',
    '#183544': 'color-mix(in srgb, var(--dress), #000 28%)',
    '#23485D': 'color-mix(in srgb, var(--dress), #000 6%)',
  },
  'khan-vanh-day': {
    '#222858': 'var(--dress)',
    '#2E346B': 'color-mix(in srgb, var(--dress), #fff 10%)',
    '#3C4177': 'color-mix(in srgb, var(--dress), #fff 20%)',
    '#242A5B': 'color-mix(in srgb, var(--dress), #000 8%)',
  },
  'khan-xep': {
    '#172224': 'var(--dress)',
    '#233134': 'color-mix(in srgb, var(--dress), #fff 10%)',
    '#2E3C3E': 'color-mix(in srgb, var(--dress), #fff 22%)',
    '#243335': 'color-mix(in srgb, var(--dress), #fff 12%)',
  },
};

function placement({ id, female, x }: CustomHeadwear) {
  if (!(id in assets) || (id === 'khan-dong' && !female) || (id === 'khan-xep' && female)) return;
  const reference = assets[id as keyof typeof assets];
  const scale = reference.referenceGender === 'female' && !female ? 57.394 / 48.546 : 1;
  const y = female ? 46.9872 : 60.4683;
  return { reference, scale, dx: x - scale * reference.anchorX, dy: y - scale * reference.anchorY };
}

export function headwearBounds(selection: CustomHeadwear) {
  if (selection.id === 'non-la') {
    const {y,scale}=nonLaPlacement(selection);
    return { left: selection.x - 94*scale, top: y - 56*scale,
      right: selection.x + 94*scale, bottom: y + 20*scale };
  }
  const p = placement(selection);
  if (!p) return;
  const [left, top, right, bottom] = p.reference.bounds;
  return { left: left*p.scale+p.dx-4, top: top*p.scale+p.dy-4,
    right: right*p.scale+p.dx+4, bottom: bottom*p.scale+p.dy+4 };
}

export function replaceHeadwear(doc: Document, root: Element, selection: CustomHeadwear) {
  const p = placement(selection);
  if (!p) return;
  const artwork = new DOMParser().parseFromString(sources[`../assets/headwear/${selection.id}.svg`], 'image/svg+xml');
  const paints = scarfPaints[selection.id];
  if (paints) artwork.querySelectorAll('[fill], [stroke]').forEach(el => {
    for (const attr of ['fill', 'stroke']) {
      const original = el.getAttribute(attr);
      const color = original && paints[original.toUpperCase()];
      if (color) el.setAttribute(attr, color);
    }
  });
  // Wrapped scarves supply their own rear silhouette around the original face.
  if (selection.female && ['khan-dong', 'khan-vanh-day'].includes(selection.id)) {
    root.querySelector('[id="Head"] > [id="Rectangle 4209"]')?.setAttribute('visibility', 'hidden');
  }
  for (const side of ['rear', 'front']) {
    const original = artwork.querySelector(`[data-headwear-layer="${side}"]`)!;
    const layer = doc.importNode(original, true) as Element;
    layer.setAttribute('data-accessory', selection.id);
    layer.setAttribute('transform', `translate(${p.dx} ${p.dy}) scale(${p.scale})`);
    if (side === 'rear') root.insertBefore(layer, root.firstChild);
    else root.appendChild(layer);
  }
}
