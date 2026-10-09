import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import longBaoSource from '../assets/costumes/special-long-bao-nam.svg?raw';
import phuongBaoSource from '../assets/costumes/special-phuong-bao-nu.svg?raw';
import { prepareCostumeSvg } from './costumeSvg';

export type CeremonialHatId = 'mu-cuu-long' | 'mu-phuong';
const courtHat = (element: Element) => {
  const id = element.getAttribute('id') || '';
  return id.startsWith('Court cap ') || id.includes('black song');
};

/** Remove only the crown and its ties, retaining the original face and hair. */
export function withoutCourtHat(source: string) {
  const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
  Array.from(doc.querySelectorAll('g[id]')).filter(courtHat).forEach(element => element.remove());
  return doc.documentElement.outerHTML;
}

function hatSource(id: CeremonialHatId) {
  const doc = new DOMParser().parseFromString(id === 'mu-cuu-long' ? longBaoSource : phuongBaoSource, 'image/svg+xml');
  const hats = Array.from(doc.querySelectorAll('g[id]')).filter(element =>
    id === 'mu-cuu-long' ? courtHat(element) : (element.getAttribute('id') || '').includes('black velvet cap'));
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none">${Array.from(doc.querySelectorAll('defs')).map(element => element.outerHTML).join('')}${hats.map(element => element.outerHTML).join('')}</svg>`;
}

export function CeremonialHatArt({ id, transform }: { id: CeremonialHatId; transform?: string }) {
  const instance = useId().replace(/[^\w-]/g, '');
  const markup = useMemo(() => prepareCostumeSvg(hatSource(id), `crown-${instance}`, false), [id, instance]);
  return <g data-accessory={id} transform={transform} dangerouslySetInnerHTML={{ __html: markup }} />;
}

export function CeremonialHatPreview({ id }: { id: CeremonialHatId }) {
  const drawing = useRef<SVGGElement>(null), [viewport, setViewport] = useState('40 0 220 145');
  useLayoutEffect(() => {
    const bounds = drawing.current?.getBBox();
    if (bounds?.width && bounds.height) setViewport(`${bounds.x - 5} ${bounds.y - 5} ${bounds.width + 10} ${bounds.height + 10}`);
  }, [id]);
  return <svg className="svg-artwork" viewBox={viewport} preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g ref={drawing}><CeremonialHatArt id={id} /></g></svg>;
}
