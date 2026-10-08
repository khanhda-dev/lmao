import React from 'react';
import { PIECE_INFO } from '../data/pieceInfo';

type Props = { item?: { id: string; name: string; description: string } };

// Only emphasis is supported in the checked-in copy; React escapes every text segment.
function emphasizedText(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, index) =>
    index % 2 ? <strong key={index}>{part}</strong> : part);
}

export function PieceInfoCard({ item }: Props) {
  if (!item) return null;
  const info = PIECE_INFO[item.id] || { description: item.description };
  return (
    <aside className="piece-info" aria-live="polite" aria-atomic="true" data-piece-info={item.id}>
      <h3>{item.name}</h3>
      <p>{emphasizedText(info.description)}</p>
      {info.culture && <p>{info.culture}</p>}
      {info.occasion && <div className="piece-info-occasion">
        <span>{info.occasionLabel || 'Dịp mặc phù hợp'}</span>
        <p>{info.occasion}</p>
      </div>}
    </aside>
  );
}
