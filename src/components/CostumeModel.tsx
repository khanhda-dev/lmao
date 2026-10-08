import React, { useId, useMemo } from 'react';
import assets from '../data/costumeAssets.json';
import { SPECIAL_GARMENTS } from '../data/costumeData';
import { prepareCostumeSvg } from './costumeSvg';
import { FemaleExistingAccessories, MaleExistingAccessories, RearExistingAccessories } from './ExistingAccessories';
import { HeadwearArt, HairpinArt } from './TraditionalAccessories';
import { HandheldArt, handheldPlacement } from './HandheldSVG';
import { footwearBottom, type CustomFootwear } from './FootwearSVG';
import { headwearBounds } from './HeadwearSVG';

const sources = import.meta.glob('../assets/costumes/*.svg', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

type Props = {
  gender: 'male' | 'female'; garmentId: string; garmentName: string;
  specialId: string | null; isLightbox?: boolean; headwearId?: string;
  handheldId: string; jewelry: string[]; genZ: string[]; footwearId: string;
};

export function CostumeModel({ gender, garmentId, garmentName, specialId, isLightbox = false,
  headwearId, handheldId, jewelry, genZ, footwearId }: Props) {
  const key = (specialId || `${gender}-${garmentId}`) as keyof typeof assets;
  const asset = assets[key];
  const original = sources[`../assets/costumes/${key}.svg`];
  const customHeadwear = !specialId && headwearId ? { id: headwearId, x: asset.headX, female: gender === 'female',costumeKey:key } : undefined;
  const hatBounds = customHeadwear ? headwearBounds(customHeadwear) : undefined;
  const handheldSelection = { id: handheldId, costumeKey: key };
  const itemBounds = !specialId ? handheldPlacement(handheldSelection) : undefined;
  const instance = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const customFootwear: CustomFootwear | undefined = footwearId === 'guoc-moc' || footwearId === 'sneaker'
    ? { id: footwearId, costumeKey: key } : undefined;
  const { markup, hatStraps } = useMemo(() => {
    const rendered = prepareCostumeSvg(original, `costume-${instance}`, !specialId, customFootwear, customHeadwear);
    if (specialId || !handheldPlacement({ id: handheldId, costumeKey: key }) ||
      !['non-ba-tam', 'non-dau'].includes(headwearId || '')) return { markup: rendered, hatStraps: '' };
    // Holding the instrument/fan raises the sleeve over the grip. Keep the
    // original hat straps above that sleeve so they remain continuous at the shoulder.
    const doc = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${rendered}</svg>`, 'image/svg+xml');
    const front = doc.querySelector('[data-headwear-layer="front"]');
    const hatStraps = front?.outerHTML || '';
    front?.remove();
    return { markup: doc.documentElement.innerHTML, hatStraps };
  }, [original, instance, specialId, footwearId, key, headwearId, gender, handheldId]);
  const hand = useMemo(() => {
    if (specialId) return '';
    const doc = new DOMParser().parseFromString(original, 'image/svg+xml');
    const placement = handheldPlacement({ id: handheldId, costumeKey: key });
    if (!placement) return '';
    const { handId, gripClip } = placement;
    const grip = doc.querySelector(`[id="${handId}"]`);
    // Preserve the sleeve over the wrist, as in the supplied fan/instrument pose.
    const sleeveSide = handheldId === 'dan-nguyet' ? 'L' : handheldId === 'quat' ? 'R' : undefined;
    const sleeve = sleeveSide ? Array.from(doc.querySelectorAll('[id]')).filter(el =>
      new RegExp(`^(giaolinh|gl|nb|vl|ng|tac)_(sleeve_${sleeveSide}|cuff_${sleeveSide}|cuff_lining_${sleeveSide})$`).test(el.id)).map(el => el.outerHTML).join('') : '';
    if (!grip) return '';
    const hand = gripClip ? `<defs><clipPath id="held-palm"><rect x="${gripClip.x}" y="${gripClip.y}" width="${gripClip.width}" height="${gripClip.height}" /></clipPath></defs><g clip-path="url(#held-palm)">${grip.outerHTML}</g>` : grip.outerHTML;
    return prepareCostumeSvg(`<svg xmlns="http://www.w3.org/2000/svg">${hand}${sleeve}</svg>`, `grip-${instance}`, true);
  }, [original, instance, specialId, handheldId, key]);
  const collar = useMemo(() => {
    if (specialId || gender !== 'male' || !['ao-tac', 'ngu-than-tay-chen'].includes(garmentId)) return '';
    const doc = new DOMParser().parseFromString(original, 'image/svg+xml');
    const layers = Array.from(doc.querySelectorAll('[id]')).filter(el =>
      /^(tac_stand_collar|tac_collar_line|ng_stand_collar|ng_collar_lining)$/.test(el.id));
    return prepareCostumeSvg(`<svg xmlns="http://www.w3.org/2000/svg">${layers.map(el => el.outerHTML).join('')}</svg>`, `collar-${instance}`, true);
  }, [original, instance, specialId, gender, garmentId]);
  const female = gender === 'female';
  const headphonesAtNeck = !!specialId || !!headwearId;
  const visibleJewelry = specialId ? [] : jewelry;
  const hasHairpin = !specialId && female && jewelry.includes('tram-cai');
  const isQuanVien = specialId === 'special-quan-phuc-nam';
  // The Quan Vien export is 360 × 654, but its visible figure ends at
  // x=314 and the shoe sole at y=592.007. Fit the figure, not the empty canvas.
  const drawingWidth = isQuanVien ? 314 : asset.width;
  const drawingHeight = isQuanVien ? 592.007 : asset.height;
  const hasHandheld = !!itemBounds;
  const left = Math.min(-10, hatBounds?.left ?? (!specialId && headwearId ? asset.headX - 110 : 0), itemBounds?.left ?? 0);
  const right = Math.max(drawingWidth + 10, hatBounds?.right ?? (!specialId && headwearId ? asset.headX + 110 : 0),
    itemBounds?.right ?? 0);
  // This export has extra empty space on the right. Center the figure's axis
  // while retaining enough room for every original costume detail.
  const centeredHalfWidth = Math.max(asset.headX - left, right - asset.headX);
  const viewLeft = isQuanVien ? asset.headX - centeredHalfWidth : left;
  const viewRight = isQuanVien ? asset.headX + centeredHalfWidth : right;
  const top = Math.min(-10, hatBounds?.top ?? (!specialId && headwearId ? -36 : -10),
    hasHairpin ? -16 : 0,
    itemBounds?.top ?? 0);
  const bottom = Math.max(drawingHeight, customFootwear ? footwearBottom(customFootwear) : 0, itemBounds?.bottom ?? 0) + 10;
  const offset = asset.headX - (female ? 143.047 : 114);
  // Ceremonial exports use the same body rig, shifted down to accommodate crowns.
  const accessoryOffsetY = specialId ? asset.handY - (female ? 261.079 : 293.498) : 0;
  const label = specialId ? SPECIAL_GARMENTS.find(g => g.id === specialId)?.name || asset.name : `Người mẫu ${female ? 'nữ' : 'nam'} mặc ${garmentName}`;
  return <div className="model model-figma" id={isLightbox ? 'lb-model' : 'stage-model'} data-costume={key}>
    <svg viewBox={`${viewLeft} ${top} ${viewRight-viewLeft} ${bottom-top}`} fill="none" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      {hasHairpin && <HairpinArt x={asset.headX} />}
      {hasHandheld && <HandheldArt selection={handheldSelection} layer="rear" />}
      <g transform={`translate(${offset} ${accessoryOffsetY})`}>
        <RearExistingAccessories female={female} selectedGenZ={genZ} selectedJewelry={visibleJewelry} headphonesAtNeck={headphonesAtNeck} />
      </g>
      <g data-original-costume={asset.nodeId} dangerouslySetInnerHTML={{ __html: markup }} />
      {!specialId && <>
        <HeadwearArt id={headwearId} x={asset.headX} female={female} costumeKey={key}/>
        {hasHandheld && <>
          <HandheldArt selection={handheldSelection} layer="front" />
          <g fill="none" data-hand-grip="true" dangerouslySetInnerHTML={{ __html: hand }} />
          {hatStraps && <g fill="none" data-raised-hat-straps="true" dangerouslySetInnerHTML={{ __html: hatStraps }} />}
        </>}
      </>}
        {/* Gen Z equipment is available on every costume; traditional additions stay on regular outfits. */}
        <g transform={`translate(${offset} ${accessoryOffsetY})`} data-existing-accessories="true">
          {female ? <FemaleExistingAccessories selectedGenZ={genZ} selectedJewelry={visibleJewelry} headphonesAtNeck={headphonesAtNeck} /> :
            <MaleExistingAccessories selectedGenZ={genZ} selectedJewelry={visibleJewelry}
              headphonesAtNeck={headphonesAtNeck}
              collarOverlay={collar ? <g transform={`translate(${-offset} 0)`} fill="none" data-raised-collar="true"
                dangerouslySetInnerHTML={{ __html: collar }} /> : undefined} />}
        </g>
    </svg>
  </div>;
}
