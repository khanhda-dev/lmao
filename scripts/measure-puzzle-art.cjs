const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('@playwright/test');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage();
 const root=path.resolve('public/puzzle');
 const paths=fs.readdirSync(root,{recursive:true}).filter(p=>p.endsWith('.svg'));
 const output={};
 for(const name of paths){
  const svg=fs.readFileSync(path.join(root,name),'utf8');
  const result=await page.evaluate(svg=>{
   document.body.innerHTML=svg;
   const root=document.querySelector('svg');
   root.querySelectorAll('[id]').forEach(n=>{if(/^(Guide|Core\/Guide)/.test(n.id))n.remove();});
   const b=root.getBBox();const v=root.viewBox.baseVal;
   return {bounds:[b.x,b.y,b.width,b.height],viewport:[v.x,v.y,v.width,v.height]};
  },svg);
  output['/puzzle/'+name.replaceAll('\\','/')]=result;
 }
 fs.writeFileSync('src/game/artworkBounds.json',JSON.stringify(output,null,2)+'\n');
 await browser.close();console.log(`Measured ${paths.length} SVGs in native source coordinates.`);
})();
