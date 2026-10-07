import { replaceFootwear, type CustomFootwear } from './FootwearSVG';
import { replaceHeadwear, type CustomHeadwear } from './HeadwearSVG';

// Only trusted, checked-in Figma SVGs are passed here; no user-supplied markup.
// Keep geometry, masks, opacity and layer order untouched. Only regular garments
// receive semantic paint bindings; ceremonial outfits bypass recoloring entirely.
export function prepareCostumeSvg(source: string, prefix: string, recolor: boolean,
  footwear?: CustomFootwear, headwear?: CustomHeadwear) {
  const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
  const root = doc.documentElement;
  if (root.localName !== 'svg' || doc.querySelector('parsererror')) {
    throw new Error('Invalid bundled costume SVG');
  }
  if (recolor) {
    const skin = new Set(['#FDBA90', '#ED9D63', '#F8DAC3']);
    const paint = (el: Element, attr: string, value: string) => {
      const previous = el.getAttribute(attr);
      // Never add a fill to stroke-only artwork (SVG's inherited fill is none).
      if (previous && previous !== 'none' && !previous.startsWith('url(')) {
        el.setAttribute(attr, value);
      }
    };
    const visit = (el: Element, ancestry: string[]) => {
      const id = el.getAttribute('id') || '';
      const names = [...ancestry, id];
      const guide = names.some(n => /^(Guide|Core\/Guide)/.test(n));
      const foot = names.some(n => /^Foot\//.test(n));
      const shoe = names.some(n => /^Rectangle 4220(?:_|$)/.test(n)) ||
        (foot && names.some(n => /^Rectangle 4215(?:_|$)/.test(n) && n !== id));
      // These two female exports place the visible lower trouser legs inside
      // Guide groups. Bind their fabric paint without recoloring guide marks.
      const visiblePantLeg = el.localName === 'path' && /^Rectangle 4218(?:_\d+)?$/.test(id) &&
        names.some(n => /^Leg\//.test(n)) && !foot;
      if ((!guide || visiblePantLeg) && !['mask', 'clipPath', 'defs'].some(n => el.closest(n))) {
        if (foot && shoe) {
          for (const attr of ['fill', 'stroke']) {
            const color = el.getAttribute(attr);
            if (color && !skin.has(color.toUpperCase())) {
              paint(el, attr, color.toUpperCase() === '#131313' ? 'var(--sole)' : 'var(--shoe)');
            }
          }
        } else if (!foot && (names.some(n => /^(Leg\/|pelvis$)/.test(n)) ||
          (id === 'Rectangle 4212' && ancestry.some(n => n === 'Belly')))) {
          for (const attr of ['fill', 'stroke']) {
            const color = el.getAttribute(attr);
            if (color && !skin.has(color.toUpperCase())) paint(el, attr, 'var(--pants)');
          }
        }
        if (/^(giaolinh|gl|nb|vl|ng|tac)_/.test(id)) {
          if (/_skirt$/.test(id)) {
            paint(el, 'fill', 'var(--pants)');
            paint(el, 'stroke', 'color-mix(in srgb, var(--pants), #000 12%)');
          } else if (/_(inner_V|y_trim|sash|tie_.*|bib_inner|inner_collar|collar_inner|collar_lining|hem_band|cuff_[LR]|cuff_lining_[LR])$/.test(id)) {
            paint(el, 'fill', 'var(--lining)');
            paint(el, 'stroke', 'var(--lining)');
          } else if (/_(sleeve_[LR]|robe|under_panel_right|top_panel_left|stand_collar)$/.test(id)) {
            paint(el, 'fill', 'var(--dress)');
            paint(el, 'stroke', 'color-mix(in srgb, var(--dress), #000 18%)');
          } else if (/_(closure|robe_center_seam|collar_line|collar_top_line|y_trim_shadow)$/.test(id)) {
            paint(el, 'stroke', 'color-mix(in srgb, var(--dress), #000 28%)');
          } else if (/_collar_ring$/.test(id)) {
            paint(el, 'fill', 'color-mix(in srgb, var(--dress), #000 15%)');
          } else if (/_bib_border$/.test(id)) {
            paint(el, 'fill', 'color-mix(in srgb, var(--dress), #fff 18%)');
          }
        }
      }
      for (const child of el.children) visit(child, names);
    };
    visit(root, []);
  }
  if (footwear) replaceFootwear(doc, root, footwear);
  if (headwear) replaceHeadwear(doc, root, headwear);
  // Stage and lightbox coexist: every mask, clip and pattern needs its own ID.
  const ids = new Map<string, string>();
  root.querySelectorAll('[id]').forEach((el, i) => {
    ids.set(el.id, `${prefix}-${i}`);
  });
  root.querySelectorAll('*').forEach(el => {
    for (const attr of Array.from(el.attributes)) {
      if (attr.name === 'id') el.setAttribute('id', ids.get(attr.value)!);
      else if (attr.value.includes('url(#')) {
        el.setAttribute(attr.name, attr.value.replace(/url\(#([^)]*)\)/g, (_, id) => `url(#${ids.get(id) || id})`));
      } else if ((attr.name === 'href' || attr.name === 'xlink:href') && attr.value.startsWith('#')) {
        el.setAttribute(attr.name, `#${ids.get(attr.value.slice(1)) || attr.value.slice(1)}`);
      }
    }
  });
  return root.innerHTML;
}
