import React from 'react';
import { splitCharacters } from '../../utils/splitCharacters';

interface Props {
  text: string;
  className?: string;
  charClassName?: string;
  prefixId?: string;
}

export const SectionTitle: React.FC<Props> = ({
  text,
  className = '',
  charClassName = '',
  prefixId = 'char',
}) => {
  const tokens = splitCharacters(text, prefixId);

  return (
    <span className={`inline-flex items-baseline ${className}`} aria-label={text}>
      {tokens.map((token) => (
        <span
          key={token.id}
          data-char-index={token.index}
          className={`hud-char ${charClassName}`}
          aria-hidden="true"
        >
          {token.displayChar}
        </span>
      ))}
    </span>
  );
};
