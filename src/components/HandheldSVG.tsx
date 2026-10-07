import React, { useId, useMemo } from 'react';
import data from '../data/handheldAssets.json';
import { prepareCostumeSvg } from './costumeSvg';

const sources = import.meta.glob('../assets/handheld/*.svg', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

export type HandheldSelection = { id: string; costumeKey: string };

export function handheldPlacement({ id, costumeKey }: HandheldSelection) {
  if (!(id in data.references) || !(costumeKey in data.targets)) return;
  const reference = data.references[id as keyof typeof data.references];
  const target = data.targets[costumeKey as keyof typeof data.targets][reference.handId as 'Hand/R' | 'Hand/R_2'];
  const dx = target.x - reference.anchor.x;
  const dy = target.y - reference.anchor.y;
  const [left, top, right, bottom] = reference.bounds;
  const gripClip = 'gripClip' in reference ? {
    ...reference.gripClip, x: reference.gripClip.x+dx, y: reference.gripClip.y+dy,
  } : undefined;
  return { dx, dy, handId: reference.handId,
    gripClip,
    left: left+dx-4, top: top+dy-4, right: right+dx+4, bottom: bottom+dy+4 };
}

export function HandheldArt({ selection, layer }: { selection: HandheldSelection; layer: 'rear' | 'front' }) {
  const instance = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const placement = handheldPlacement(selection);
  const markup = useMemo(() => {
    const source = sources[`../assets/handheld/${selection.id}.svg`];
    if (!source) return '';
    const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
    const art = doc.querySelector(`[data-handheld-layer="${layer}"]`)!;
    return prepareCostumeSvg(`<svg xmlns="http://www.w3.org/2000/svg">${art.outerHTML}${doc.querySelector('defs')!.outerHTML}</svg>`,
      `handheld-${instance}`, false);
  }, [selection.id, layer, instance]);
  if (!placement || !markup) return null;
  return <g transform={`translate(${placement.dx} ${placement.dy})`} fill="none"
    data-accessory={selection.id} data-handheld-side={layer} dangerouslySetInnerHTML={{ __html: markup }} />;
}
