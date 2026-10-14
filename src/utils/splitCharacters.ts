export interface CharacterToken {
  id: string;
  char: string;
  displayChar: string;
  isSpace: boolean;
  index: number;
}

export function splitCharacters(text: string, prefixId: string = 'char'): CharacterToken[] {
  return Array.from(text).map((char, index) => ({
    id: `${prefixId}-${index}-${char.charCodeAt(0)}`,
    char,
    displayChar: char === ' ' ? '\u00A0' : char,
    isSpace: char === ' ',
    index,
  }));
}

export interface MeasuredLayout {
  offsets: number[];
  charWidths: number[];
  totalWidth: number;
}

export function measureWordLayout(
  text: string,
  fontSize: number = 26,
  fontFamily: string = '"Instrument Serif", Georgia, serif'
): MeasuredLayout {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    context.font = `${fontSize}px ${fontFamily}`;
  }

  const offsets: number[] = [];
  const charWidths: number[] = [];
  let currentX = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    offsets.push(currentX);

    let charWidth = 16;
    if (context) {
      charWidth = context.measureText(char).width;
    } else {
      charWidth = char === ' ' ? fontSize * 0.35 : fontSize * 0.55;
    }

    if (char === ' ') {
      charWidth = Math.max(charWidth, fontSize * 0.32);
    } else {
      charWidth = Math.max(charWidth, fontSize * 0.42);
    }

    charWidths.push(charWidth);
    currentX += charWidth + 2;
  }

  return {
    offsets,
    charWidths,
    totalWidth: currentX,
  };
}
