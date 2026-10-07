# Original Figma costume artwork

These SVGs are exported from the user's [ao_dai Figma file](https://www.figma.com/design/Fy1QwbfwPhFJExz9CGpYII/ao_dai?node-id=1-9). Keep the vector geometry, opacity, masks and drawing order intact. The normal costumes receive color bindings at runtime in `src/components/costumeSvg.ts`; the four special costumes retain their exported colors.

| Asset | Figma node |
| --- | --- |
| female-giao-linh | 36:430 |
| female-nhat-binh | 57:708 |
| female-vien-linh | 62:430 |
| female-ao-tac | 63:430 |
| female-ngu-than-tay-chen | 71:291 |
| male-giao-linh | 74:291 |
| male-vien-linh | 74:457 |
| male-ao-tac | 74:623 |
| male-ngu-than-tay-chen | 74:787 |
| special-long-bao-nam | 95:430 |
| special-phuong-bao-nu | 118:291 |
| special-quan-phuc-nam | 141:291 |
| special-bach-y-nu | 177:430 |

Export SVG with IDs enabled and `useAbsoluteBounds: false`: these Figma frames have small layout bounds while the drawings extend beyond them. Exporting only the layout rectangle crops the figures. Keep the SVG root's `fill="none"` so stroke-only necklaces and decorations do not acquire an unintended black fill.

The white costume includes 18 original paths forming three lotus clusters that are siblings of the costume frame in Figma (182:309–314, 177:590–595, 182:291–296). These are appended after the figure at their original export coordinates. When refreshing this asset, include those paths without exporting the dark page background.

`src/data/costumeAssets.json` records rendered dimensions and head/hand attachment points in each SVG's coordinate system. `CostumeModel` uses a single proportional viewport for the stage and enlargement, and namespaces mask/clip IDs for each rendered instance. Supplemental hats, hairpin and handheld items are in `TraditionalAccessories.tsx`; existing modern accessory artwork is retained in `ExistingAccessories.tsx`.

Validation: TypeScript check and production build; browser checks of all 13 costumes against the exported geometry and all four special palettes; simultaneous stage/enlargement reference integrity; all nine supplemental accessory options; normal costume color preset; layouts at 390, 768 and 1440 pixels. No new dependencies are required by this change.
