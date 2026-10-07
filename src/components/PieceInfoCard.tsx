import React from 'react';
import { PIECE_INFO } from '../data/pieceInfo';

type Props = { item?: { id: string; name: string; description: string } };

export function PieceInfoCard({ item }: Props) {
  if (!item) return null;
  const info = PIECE_INFO[item.id] || { description: item.description };
  return (
    <aside className="piece-info" aria-live="polite" aria-atomic="true" data-piece-info={item.id}>
      <h3>{item.name}</h3>
      <p>{info.description}</p>
      {info.occasion && <div className="piece-info-occasion">
        <span>Dịp mặc phù hợp</span>
        <p>{info.occasion}</p>
      </div>}
    </aside>
  );
}
