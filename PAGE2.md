# Việt Phục Challenge — page2-puzzle

This branch integrates Page 2 onto `khanh` at `bb0db1a`.
Page 1's renderer, components, SVG assets, costume registries and stylesheet
remain the teammate's versions. `App.tsx` has only the Page 2 mount, reward
selection bridge and unlock guards. The default Nhật Bình outfit, Hoàng Triều
palette and Nón ba tầm remain available from the start.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000 and select **Trang 2**. No API key is required for these
local wardrobe/challenge flows. Run these commands from the directory containing
`package.json`, not the parent folder containing the downloaded ZIP.

## Journey and real wardrobe rewards

| Challenge | Rewards in the current wardrobe |
| --- | --- |
| Giao lĩnh: preserved four-part assembly | `giao-linh`, `truc-lam` palette |
| Nhật Bình: fixed 3×3 drag-and-swap | `khan-vanh-day`, `thanh-da-luu-ly` palette |
| Long Bào: detect three Gen Z alterations | `special-long-bao-nam`, `kim-sa-hoang-toc` palette |
| Cổn Phục: reconstruct seven parts from context | `special-quan-phuc-nam`, `thuy-mac-giay-do` palette |

The image board uses one complete current Nhật Bình SVG. Detective mode renders
through the teammate's unchanged `CostumeModel`, including its real Gen Z and
footwear layers. Ceremonial headwear/jewelry stay part of the complete special
model, as in Page 1; no fake standalone wardrobe entries are added. Reconstruction
uses the previously extracted seven semantic parts from Figma node `141:291`.

Page 1 color, accessory, gender, randomize and zoom controls keep their existing
behavior. Randomize excludes locked rewards; switching from an unlocked female
special to a locked male counterpart safely selects a supported regular outfit.
“Thử ngay trong tủ đồ” selects the actual wardrobe model and opens Trang 1.

## Progress and compatibility

One `PuzzleProgressProvider` and the existing
`viet-phuc-remix:puzzle:v1` localStorage key serve both pages. Completed challenges,
earned items, partial attempts, limited image previews and best results persist.
Reset retains earned items. Old v1 completion and old v2 item names migrate to
the teammate's current IDs. The original miện/đai rewards map to the complete Cổn
Phục model instead of inventing unsupported accessory controls.

Regular styles still allow free Gen Z remixing. Detective correctness describes
the game goal of restoring the original illustration, not a historical rule.
Layering is omitted because SVG paint order does not establish dressing order.

## Validation

```sh
npm run lint
npm test
npm run test:e2e
```

Chrome browser tests cover the four mechanics, failure/retry, persistence,
wardrobe rewards, touch and keyboard, mobile overflow, source SVG composition,
and the teammate's wardrobe controls. Fixture routing serves the real build in
isolated environments. Test traces/screenshots stay out of Git.

To audit preservation of Page 1 assets:

```sh
git diff khanh -- src/components src/assets src/data src/index.css
```

This diff should remain empty for this integration.
