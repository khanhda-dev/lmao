import { test,expect,type Page } from '@playwright/test';
import { COSTUME_PUZZLES as LEVELS } from '../../src/game/levels';
import { CHALLENGES } from '../../src/game/challenges';
import { targetOf,STORAGE_KEY } from '../../src/game/progress';
import type { PuzzleLevel,PuzzlePiece } from '../../src/game/types';
import fs from 'node:fs/promises';
import path from 'node:path';

// Serve the real build through Playwright routing so tests also run in isolated
// desktop sandboxes where Chromium cannot connect to a sibling local server.
async function serveBuild(page:Page){
  const root=path.resolve('dist');
  await page.route('http://puzzle.test/**',async route=>{
    const pathname=new URL(route.request().url()).pathname;
    const file=pathname==='/'?path.join(root,'index.html'):path.resolve(root,'.'+pathname);
    if(!file.startsWith(root+path.sep)){await route.abort();return;}
    const types:Record<string,string>={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'};
    try {await route.fulfill({body:await fs.readFile(file),contentType:types[path.extname(file)]||'application/octet-stream'});}
    catch {await route.fulfill({status:404,body:'Not found'});}
  });
}

async function openGame(page:Page){await page.getByRole('tab',{name:'Trang 2',exact:true}).click();}
async function solveImageGrid(page:Page){
  await expect(page.getByTestId('grid-preview')).toBeHidden();
  for(let index=0;index<9;index++){
    const ids=await page.locator('.image-grid-tile').evaluateAll(cells=>cells.map(cell=>Number(cell.getAttribute('data-tile-id'))));
    const source=ids.indexOf(index);if(source===index)continue;
    const a=await page.getByTestId(`grid-cell-${source}`).boundingBox(),b=await page.getByTestId(`grid-cell-${index}`).boundingBox();
    if(!a||!b)throw Error('Missing tile');
    await page.mouse.move(a.x+a.width/2,a.y+a.height/2);await page.mouse.down();
    await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:8});await page.mouse.up();
  }
  await expect(page.getByTestId('grid-progress')).toHaveText('9/9');
}
async function tileIds(page:Page){return page.locator('.image-grid-tile').evaluateAll(cells=>cells.map(cell=>Number(cell.getAttribute('data-tile-id'))));}
async function swapByMouse(page:Page,a:number,b:number,outside=false){
  const from=await page.getByTestId(`grid-cell-${a}`).boundingBox(),to=await page.getByTestId(`grid-cell-${b}`).boundingBox();if(!from||!to)throw Error('missing grid tile');
  await page.mouse.move(from.x+from.width/2,from.y+from.height/2);await page.mouse.down();await page.mouse.move(outside?from.x-100:to.x+to.width/2,to.y+to.height/2,{steps:6});await page.mouse.up();
}
async function drag(page:Page,level:PuzzleLevel,piece:PuzzlePiece,wrong=false){
  await page.getByTestId(`piece-${piece.id}`).evaluate(async element=>{
    await Promise.all(element.getAnimations().map(animation=>animation.finished.catch(()=>{})));
  });
  const board=await page.getByTestId('puzzle-board').boundingBox();
  const box=await page.getByTestId(`piece-${piece.id}`).boundingBox();
  if(!board||!box)throw Error('Missing puzzle');
  const target=wrong?{x:780,y:625}:targetOf(level,piece);
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
  await page.mouse.down();
  await page.mouse.move(board.x+target.x/800*board.width,board.y+target.y/650*board.height,{steps:12});
  await page.mouse.up();
}
test('four distinct games, failure/retry, rewards, persistence and unchanged wardrobe controls',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await serveBuild(page);
  await page.goto('/');
  await expect(page.getByRole('button',{name:'Giao lĩnh',exact:true})).toBeDisabled();
  await openGame(page);
  await expect(page.getByRole('button',{name:/Màn 2: Nhật Bình/})).toBeDisabled();
  const first=LEVELS[0];
  await drag(page,first,first.pieces[0],true);
  await expect(page.getByTestId('piece-progress')).toHaveText('0/4 mảnh');
  await expect(page.getByRole('status').last()).toContainText('Chưa đúng');
  await page.getByRole('button',{name:'Gợi ý',exact:true}).click();
  await expect(page.locator('.puzzle-zone.hint')).toHaveCount(1);
  await expect(page.getByTestId('piece-progress')).toHaveText('0/4 mảnh');
  await drag(page,first,first.pieces[0]);
  await expect(page.getByTestId('piece-progress')).toHaveText('1/4 mảnh');
  await expect(page.getByTestId('piece-sleeves')).toBeDisabled();
  await page.reload();await openGame(page);
  await expect(page.getByTestId('piece-progress')).toHaveText('1/4 mảnh');
  await page.getByRole('button',{name:'Chơi lại màn này'}).click();
  await expect(page.getByTestId('piece-progress')).toHaveText('0/4 mảnh');
  for(const level of CHALLENGES){
    if(level.type==='image-grid')await solveImageGrid(page);
    if(level.type==='assemble')for(const piece of level.costume.pieces){await drag(page,level.costume,piece);await expect(page.getByTestId(`piece-${piece.id}`)).toBeDisabled();}
    if(level.type==='detective'){
      await page.getByTestId('detective-zone-head').click();await page.getByTestId('detective-option-head-glasses').click();
      await expect(page.getByTestId('detective-progress')).toHaveText('0/3');await expect(page.getByTestId('detective-feedback')).toContainText('chưa phù hợp');
      await page.getByTestId('detective-option-head-original').click();await expect(page.getByTestId('detective-zone-head')).toBeDisabled();
      await page.reload();await openGame(page);await expect(page.getByTestId('detective-progress')).toHaveText('1/3');
      await page.getByRole('button',{name:'Chơi lại',exact:true}).click();await expect(page.getByTestId('detective-progress')).toHaveText('0/3');
      await page.getByTestId('detective-zone-head').click();await page.getByTestId('detective-option-head-original').click();
      await page.getByTestId('detective-zone-chest').click();await page.screenshot({path:'test-results/detective-desktop.png',fullPage:true,animations:'disabled'});
      for(const error of level.errors.slice(1)){await page.getByTestId(`detective-zone-${error.id}`).click();await page.getByTestId(`detective-option-${error.correctOption}`).click();}
    }
    if(level.type==='reconstruction'){
      await expect(page.getByRole('button',{name:'Nộp phục dựng'})).toBeDisabled();
      await expect(page.locator('.puzzle-reference')).toHaveCount(0);
      await expect(page.locator('.puzzle-page img[src="/puzzle/con-phuc/full.svg"]')).toHaveCount(0);
      for(const [i,slot] of level.slots.entries()){
        await page.getByTestId(`reconstruction-slot-${slot.id}`).click();
        await page.getByTestId(`reconstruction-choice-${i<2?slot.choices.find(choice=>choice.id!==slot.correctChoice)!.id:slot.correctChoice}`).click();
      }
      await page.getByRole('button',{name:'Nộp phục dựng'}).click();await expect(page.getByTestId('reconstruction-feedback')).toContainText('5/7');
      await expect(page.getByTestId('reconstruction-feedback')).toContainText('Có 2 chi tiết chưa phù hợp');await expect(page.getByRole('dialog')).toBeHidden();
      await page.reload();await openGame(page);await expect(page.getByTestId('reconstruction-feedback')).toContainText('5/7');
      await page.screenshot({path:'test-results/reconstruction-desktop.png',fullPage:true,animations:'disabled'});
      for(const slot of level.slots.slice(0,2)){await page.getByTestId(`reconstruction-slot-${slot.id}`).click();await page.getByTestId(`reconstruction-choice-${slot.correctChoice}`).click();}
      await page.getByRole('button',{name:'Nộp phục dựng'}).click();
    }
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText(level.name);
    if(level!==CHALLENGES.at(-1))await page.getByRole('button',{name:'Màn tiếp theo'}).click();
    else await page.getByRole('button',{name:'Thử ngay trong tủ đồ'}).click();
  }
  await expect(page.getByRole('img',{name:'Cổn Phục (Tế Nam Giao)',exact:true})).toBeVisible();
  await page.reload();await expect(page.getByRole('button',{name:'Giao lĩnh',exact:true})).toBeEnabled();
  await page.getByRole('button',{name:'Phụ kiện',exact:true}).click();await expect(page.getByRole('button',{name:'Khăn vành dây',exact:true})).toBeEnabled();
  await page.getByRole('button',{name:'Khăn vành dây',exact:true}).click();await expect(page.getByRole('button',{name:'Khăn vành dây',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Màu sắc',exact:true}).click();await expect(page.getByRole('button',{name:/Thanh Dạ Lưu Ly/})).toBeEnabled();
  await page.getByRole('button',{name:/Thanh Dạ Lưu Ly/}).click();await expect.poll(()=>page.evaluate(()=>document.documentElement.style.getPropertyValue('--dress'))).toBe('#1E3A5F');
  await page.getByRole('button',{name:'Trang phục',exact:true}).click();await page.getByRole('button',{name:/Đang chọn nữ/}).click();
  for(const name of ['Long Bào Hoàng Đế','Cổn Phục (Tế Nam Giao)'])await expect(page.getByRole('button',{name,exact:true})).toBeEnabled();
  await openGame(page);
  await expect.poll(()=>page.locator('.puzzle-page img').evaluateAll(images=>images.every(image=>(image as HTMLImageElement).complete&&(image as HTMLImageElement).naturalWidth>0))).toBe(true);
  await page.screenshot({path:'test-results/puzzle-desktop.png',fullPage:true,animations:'disabled'});
  expect(errors).toEqual([]);
});
test('mobile touch drag, keyboard alternative and corrupt storage recovery',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();await serveBuild(page);await page.goto('http://puzzle.test/');
  await page.evaluate(key=>localStorage.setItem(key,'{broken'),STORAGE_KEY);await page.reload();await openGame(page);
  const level=LEVELS[0],piece=level.pieces[0];
  await page.getByTestId(`piece-${piece.id}`).scrollIntoViewIfNeeded();
  const board=await page.getByTestId('puzzle-board').boundingBox(),box=await page.getByTestId(`piece-${piece.id}`).boundingBox();
  if(!board||!box)throw Error('missing mobile board');
  const target=targetOf(level,piece),client=await context.newCDPSession(page);
  const x=box.x+box.width/2,y=box.y+box.height/2;
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:board.x+target.x/800*board.width,y:board.y+target.y/650*board.height}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect(page.getByTestId('piece-progress')).toHaveText('1/4 mảnh');
  await page.getByTestId('piece-robe').focus();await page.keyboard.press('Enter');
  await page.getByTestId('target-robe').focus();await page.keyboard.press('Enter');
  await expect(page.getByTestId('piece-progress')).toHaveText('2/4 mảnh');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:'test-results/puzzle-mobile.png',fullPage:true,animations:'disabled'});
  await context.close();
});

test('3×3 grid keeps nine tiles, swaps exactly two, rejects outside drops, limits previews and preserves replay records',async({page})=>{
  await serveBuild(page);await page.goto('/');await page.evaluate(key=>localStorage.setItem(key,JSON.stringify({version:2,completed:['giao-linh'],activeLevel:'nhat-binh'})),STORAGE_KEY);
  await page.reload();await openGame(page);await expect(page.getByTestId('grid-preview')).toBeVisible();await expect(page.getByTestId('grid-preview')).toBeHidden();
  const initial=await tileIds(page);expect(new Set(initial).size).toBe(9);expect(initial).not.toEqual([0,1,2,3,4,5,6,7,8]);await expect(page.locator('.puzzle-reference')).toHaveCount(0);
  const images=await page.locator('.image-grid-tile').evaluateAll(cells=>cells.map(cell=>getComputedStyle(cell).backgroundImage));expect(new Set(images).size).toBe(1);
  await swapByMouse(page,0,1);const swapped=[...initial];[swapped[0],swapped[1]]=[swapped[1],swapped[0]];expect(await tileIds(page)).toEqual(swapped);await expect(page.getByTestId('grid-moves')).toHaveText('1');
  await expect(page.getByTestId('grid-progress')).toHaveText(`${swapped.filter((tile,index)=>tile===index).length}/9`);
  await swapByMouse(page,0,1,true);expect(await tileIds(page)).toEqual(swapped);await expect(page.getByTestId('grid-moves')).toHaveText('1');await expect(page.locator('.image-grid-drag-ghost')).toHaveCount(0);
  await page.getByRole('button',{name:'Xếp lại bảng ảnh'}).click();await expect(page.getByTestId('grid-preview')).toBeHidden();await expect(page.getByTestId('grid-moves')).toHaveText('0');expect(await tileIds(page)).not.toEqual([0,1,2,3,4,5,6,7,8]);
  await page.getByRole('button',{name:'Xem lại mẫu (2)'}).click();await expect(page.getByTestId('grid-preview')).toBeHidden();await page.reload();await openGame(page);
  await expect(page.getByTestId('grid-preview')).toBeHidden();await page.getByRole('button',{name:'Xem lại mẫu (1)'}).click();await expect(page.getByTestId('grid-preview')).toBeHidden();await expect(page.getByRole('button',{name:'Xem lại mẫu (0)'})).toBeDisabled();
  const keyboardBefore=await tileIds(page);await page.getByTestId('grid-cell-0').focus();await page.keyboard.press('Enter');await page.getByTestId('grid-cell-1').focus();await page.keyboard.press('Enter');
  const keyboardAfter=[...keyboardBefore];[keyboardAfter[0],keyboardAfter[1]]=[keyboardAfter[1],keyboardAfter[0]];expect(await tileIds(page)).toEqual(keyboardAfter);
  await page.screenshot({path:'test-results/grid-desktop.png',fullPage:true,animations:'disabled'});await solveImageGrid(page);await expect(page.locator('.image-grid-board.solved')).toBeVisible();await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button',{name:'Đóng chúc mừng'}).click();await page.getByRole('button',{name:'Xếp lại bảng ảnh'}).click();await expect(page.getByTestId('grid-preview')).toBeHidden();
  const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!),STORAGE_KEY);expect(saved.completed).toContain('nhat-binh');expect(saved.best['nhat-binh'].actions).toBeGreaterThan(0);expect(saved.unlockedItems.headwear).toContain('khan-vanh-day');expect(saved.runs['nhat-binh'].moves).toBe(0);
});

test('mobile grid touch swap and later games stay usable without horizontal overflow',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await context.newPage();await serveBuild(page);await page.goto('http://puzzle.test/');
  await page.evaluate(key=>localStorage.setItem(key,JSON.stringify({version:2,completed:['giao-linh'],activeLevel:'nhat-binh'})),STORAGE_KEY);await page.reload();await openGame(page);await expect(page.getByTestId('grid-preview')).toBeHidden();
  await page.getByTestId('image-grid-board').scrollIntoViewIfNeeded();const before=await tileIds(page),a=await page.getByTestId('grid-cell-0').boundingBox(),b=await page.getByTestId('grid-cell-1').boundingBox();if(!a||!b)throw Error('missing mobile grid');
  const client=await context.newCDPSession(page);await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:a.x+a.width/2,y:a.y+a.height/2}]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:b.x+b.width/2,y:b.y+b.height/2}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  const expected=[...before];[expected[0],expected[1]]=[expected[1],expected[0]];expect(await tileIds(page)).toEqual(expected);await expect(page.getByTestId('grid-moves')).toHaveText('1');
  await page.screenshot({path:'test-results/grid-mobile.png',fullPage:true,animations:'disabled'});
  for(const id of ['hoang-bao','con-phuc']){
    await page.evaluate(({key,id})=>localStorage.setItem(key,JSON.stringify({version:2,completed:['giao-linh','nhat-binh','hoang-bao'],activeLevel:id})),{key:STORAGE_KEY,id});await page.reload();await openGame(page);
    if(id==='hoang-bao'){await page.getByTestId('detective-zone-head').tap();await page.getByTestId('detective-option-head-original').tap();await expect(page.getByTestId('detective-progress')).toHaveText('1/3');}
    else{await page.getByTestId('reconstruction-choice-mien-quan').tap();await page.getByTestId('reconstruction-slot-shoes').tap();await page.getByTestId('reconstruction-choice-hai-den').tap();}
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`test-results/${id}-mobile.png`,fullPage:true,animations:'disabled'});
  }
  await context.close();
});

test('assembled garment layers retain the original vectors and coordinate transforms',async({page})=>{
  await serveBuild(page);await page.goto('/');
  for(const level of LEVELS){
    const layers=[...level.pieces.map(p=>({image:p.asset,bounds:p.bounds,z:p.zIndex})),{image:level.baseFront,bounds:[0,0,...level.dimensions],z:5}].sort((a,b)=>a.z-b.z);
    const difference=await page.evaluate(async({level,layers})=>{
      const [w,h]=level.dimensions,original=document.createElement('canvas'),assembled=document.createElement('canvas');
      original.width=assembled.width=w;original.height=assembled.height=h;
      async function draw(canvas:HTMLCanvasElement,url:string,bounds:number[]){
        const image=new Image();image.src=url;await image.decode();
        canvas.getContext('2d')!.drawImage(image,...bounds as [number,number,number,number]);
      }
      await draw(original,level.thumbnail,[0,0,w,h]);await draw(assembled,level.base,[0,0,w,h]);
      for(const layer of layers)await draw(assembled,layer.image,layer.bounds);
      const a=original.getContext('2d')!.getImageData(0,0,w,h).data,b=assembled.getContext('2d')!.getImageData(0,0,w,h).data;
      let painted=0,changed=0;
      for(let i=0;i<a.length;i+=4){if(a[i+3]||b[i+3])painted++;if([0,1,2,3].some(n=>Math.abs(a[i+n]-b[i+n])>10))changed++;}
      return changed/painted;
    },{level,layers});
    expect(difference,`${level.name}: original artwork preserved`).toBeLessThan(0.002);
  }
});

test('teammate wardrobe renderer, default UI, gender, random, zoom and accessories remain intact',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await serveBuild(page);await page.goto('/');
  const model=page.locator('.page.active .model');await expect(model).toHaveAttribute('data-costume','female-nhat-binh');
  await page.screenshot({path:'test-results/wardrobe-khanh-desktop.png',animations:'disabled'});
  await page.getByRole('button',{name:'Màu sắc',exact:true}).click();await page.getByRole('button',{name:/Sen Hồng Đồng Nội/}).click();await expect.poll(()=>page.evaluate(()=>document.documentElement.style.getPropertyValue('--dress'))).toBe('#DE6B83');
  await page.getByRole('button',{name:'Phụ kiện',exact:true}).click();await expect(page.getByRole('button',{name:'Khăn vành dây',exact:true})).toBeDisabled();await page.getByRole('button',{name:'Khăn đóng',exact:true}).click();await page.getByRole('button',{name:'Đàn nguyệt',exact:true}).click();
  await page.getByRole('button',{name:'Phóng to',exact:true}).click();await expect(page.getByRole('dialog',{name:'Phóng to ảnh'})).toBeVisible();await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Trang phục',exact:true}).click();await page.getByRole('button',{name:'Phượng Bào Hoàng Hậu',exact:true}).click();await expect(model).toHaveAttribute('data-costume','special-phuong-bao-nu');
  await page.getByRole('button',{name:/Đang chọn nữ/}).click();await expect(model).toHaveAttribute('data-costume','male-ngu-than-tay-chen');
  await expect(page.getByRole('button',{name:'Long Bào Hoàng Đế',exact:true})).toBeDisabled();await expect(page.getByRole('button',{name:'Cổn Phục (Tế Nam Giao)',exact:true})).toBeDisabled();
  for(let i=0;i<12;i++){await page.getByRole('button',{name:'Ngẫu nhiên',exact:true}).click();await expect(model).not.toHaveAttribute('data-costume',/special-|male-giao-linh/);}
  await openGame(page);await page.getByRole('tab',{name:'Trang 1',exact:true}).click();await expect(model).toBeVisible();expect(errors).toEqual([]);
});
