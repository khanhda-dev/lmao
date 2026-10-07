# Footwear from the user's SVG

The four SVG assets are taken directly from the supplied 582 × 531 SVG containing two female models: sneaker on the left, wooden clogs on the right. Each asset contains its original straight ankle, shoe group and clip definition. Geometry, drawing order, colors and opacity are preserved; clip identifiers are namespaced to prevent collisions. No recoloring is applied to these assets.

`src/data/footwearAssets.json` records the source ankle center and trouser cuff, plus the corresponding attachment points in all 13 costume SVGs. `FootwearSVG.ts` translates each shoe/ankle layer into the original foot group underneath the trouser and robe layers. The original leg stays in place. The viewport includes the new soles so the larger footwear cannot be cropped.

Selecting a ceremonial costume initially restores its original footwear. Choosing sneaker or wooden clogs afterwards replaces only its footwear, retaining the costume's original palette and details. Choosing Hài thêu restores the original shoes.
