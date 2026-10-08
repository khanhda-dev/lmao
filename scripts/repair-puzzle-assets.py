"""Extract unchanged canonical SVG layers; retain ancestor transforms and masks."""
from pathlib import Path
import xml.etree.ElementTree as E
from copy import deepcopy
import json

ROOT=Path(__file__).resolve().parents[1]
NS='http://www.w3.org/2000/svg'
E.register_namespace('',NS)
def load(path): return E.parse(ROOT/path).getroot()
def extract(root, ids, exclude=()):
    def visit(n, selected=False):
        ident=n.get('id','')
        if ident in exclude or (ident.startswith('Mi') and 'quan' in ident): return None
        selected=selected or ident in ids
        if ident.startswith(('Guide','Core/Guide')) and not selected: return None
        out=deepcopy(n)
        if n.tag.endswith('defs'): return out
        out[:]=[r for c in n if (r:=visit(c)) is not None]
        if selected:
            out[:]=[r for c in n if (r:=visit(c,True)) is not None]
            return out
        return out if len(out) or n.tag.endswith('svg') else None
    return visit(root)
def save(root,path):
    p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True)
    E.ElementTree(root).write(p,encoding='unicode',xml_declaration=False)

giao=load('src/assets/costumes/female-giao-linh.svg')
save(giao,'public/puzzle/giao-linh/full.svg')
save(extract(giao,{'Hand/R','Hand/R_2'}),'public/puzzle/giao-linh/base.svg')
# Wrists sit behind the cuffs; the face/neck sit above the crossing collar.
save(extract(giao,{'Neck'}),'public/puzzle/giao-linh/base-front.svg')
parts={
 'sleeves':{'giaolinh_sleeve_L','giaolinh_cuff_L','giaolinh_sleeve_R','giaolinh_cuff_R'},
 'lower':{'Leg/R','Leg/L','pelvis','giaolinh_skirt'},
 'robe':{'giaolinh_inner_V','giaolinh_under_panel_right','giaolinh_top_panel_left','giaolinh_y_trim_shadow','giaolinh_y_trim'},
 'sash':{'giaolinh_sash','giaolinh_tie_ribbon_1','giaolinh_tie_ribbon_2','giaolinh_tie_knot'}}
# Selection cards use local viewBoxes; composition retains the source viewport.
bounds={'sleeves':[-1,88,289,191],'lower':[54,159,179,362],'robe':[97,88,93,97],'sash':[94,170,99,102]}
for name,ids in parts.items():
    r=extract(giao,ids);x,y,w,h=bounds[name];r.set('viewBox',f'{x} {y} {w} {h}');r.set('width',str(w));r.set('height',str(h))
    save(r,f'public/puzzle/giao-linh/{name}.svg')

# Preserve actual skin/head/hands from the ceremonial rig, without debug pixels.
corn=load('src/assets/costumes/special-quan-phuc-nam.svg')
save(extract(corn,{'Neck'}),'public/puzzle/con-phuc/body.svg')
save(extract(corn,{'Hand/R','Hand/R_2'}),'public/puzzle/con-phuc/hands.svg')
# A real starter outfit supplies a continuous underlayer during partial assembly.
# Its head/hand rig is aligned by the exported anchors, not stretched to each slot.
under=extract(load('src/assets/costumes/male-ngu-than-tay-chen.svg'),{'Man/Ngu than'}, {'Head','Neck','Hand/R','Hand/R_2','Core/Guide'})
if not len(under):
    under=load('src/assets/costumes/male-ngu-than-tay-chen.svg')
    for parent in under.iter():
        for child in list(parent):
            if child.get('id','') in {'Neck','Hand/R','Hand/R_2'} or child.get('id','').startswith(('Guide','Core/Guide')): parent.remove(child)
save(under,'public/puzzle/con-phuc/underlayer.svg')

# Canonical complete ankle/shoe layers already used by Page 1, translated to the
# intended costume cuffs. The pair is shared by card previews and composition.
feet=json.loads((ROOT/'src/data/footwearAssets.json').read_text())
for costume in ['special-quan-phuc-nam','special-long-bao-nam']:
    for item in ['guoc-moc','sneaker']:
        r=E.Element('{'+NS+'}svg',{'viewBox':'0 0 360 654','width':'360','height':'654','fill':'none'})
        for side in ['left','right']:
            ref=feet['references'][f'{item}-{side}'];target=feet['targets'][costume][side]
            g=E.SubElement(r,'{'+NS+'}g',{'transform':f"translate({target['x']-ref['anchorX']} {target['cuffY']-ref['cuffY']})"})
            g.extend(deepcopy(list(load(f'src/assets/footwear/{item}-{side}.svg'))))
        save(r,f'public/puzzle/items/{costume}-{item}.svg')
    original=load(f'src/assets/costumes/{costume}.svg')
    ornaments={n.get('id') for n in original.iter() if '_boot_gold_' in n.get('id','')}
    save(extract(original,{'Foot/R','Foot/R_2'}|ornaments),f'public/puzzle/items/{costume}-hai.svg')

# Khăn xếp is precisely the canonical Figma export, including fold geometry.
save(load('src/assets/headwear/khan-xep.svg'),'public/puzzle/items/khan-xep.svg')

# Reconstruction swaps each clothing slot instead of painting over a complete
# starter outfit. Shoes remain a separate slot, including with alternate skirts.
starter=load('src/assets/costumes/male-ngu-than-tay-chen.svg')
starter_ids={n.get('id','') for n in starter.iter()}
for slot,ids in {
    'robe':{i for i in starter_ids if i.startswith('ng_') and not ('sleeve' in i or 'cuff' in i)},
    'sleeves':{i for i in starter_ids if i.startswith('ng_') and ('sleeve' in i or 'cuff' in i)},
    'lower':{'Leg/R','Leg/L','Rectangle 4212'},
}.items():
    save(extract(starter,ids,{'Foot/R','Foot/R_2'}),f'public/puzzle/con-phuc/underlayer-{slot}.svg')

save(extract(giao,{'giaolinh_skirt'}),'public/puzzle/giao-linh/equipped-lower.svg')
nhat=load('src/assets/costumes/female-nhat-binh.svg')
nhat_ids={n.get('id','') for n in nhat.iter()}
for slot,ids in {
    'robe':{i for i in nhat_ids if i.startswith('nb_') and not any(s in i for s in ['sleeve','cuff','skirt','hem'])},
    'sleeves':{i for i in nhat_ids if i.startswith('nb_') and ('sleeve' in i or 'cuff' in i)},
    'lower':{i for i in nhat_ids if i.startswith('nb_') and ('skirt' in i or 'hem' in i)},
}.items():
    save(extract(nhat,ids),f'public/puzzle/nhat-binh/equipped-{slot}.svg')
print('Repaired canonical hands, stable underlayer and shared footwear exports.')
