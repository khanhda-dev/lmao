import { Gift } from 'lucide-react';
import { COLOR_PRESETS, HANDHELD, JEWELRY } from '../data/costumeData';
import AccessoryPreview from './AccessoryPreview';
import SvgArtwork from './SvgArtwork';
import type { UnlockReward } from './types';

export default function RewardArtwork({reward}:{reward:UnlockReward}) {
  if (reward.images?.length) return <span className="puzzle-reward-outfit-pair" aria-hidden="true">
    {reward.images.map(asset=><SvgArtwork key={asset} asset={asset}/>)}
  </span>;
  if (reward.image) return <SvgArtwork asset={reward.image}/>;
  if (reward.kind==='headwear') return <SvgArtwork asset={`/puzzle/items/${reward.id}.svg`}/>;
  if (reward.kind==='colors') {
    const palette=COLOR_PRESETS.find(item=>item.id===reward.id);
    return <span className="puzzle-color-reward" aria-hidden="true">
      {[palette?.lining,palette?.dress,palette?.pants].map((color,index)=><i key={index} style={{background:color}}/>)}
    </span>;
  }
  if (reward.kind==='accessories'&&[...JEWELRY,...HANDHELD].some(item=>item.id===reward.id)) {
    return <AccessoryPreview id={reward.id}/>;
  }
  return <Gift size={26}/>;
}
