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
