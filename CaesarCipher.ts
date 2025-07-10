
export const CaesarCipher = {
  encrypt: (text: string, shift: number = 3): string => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join('');
  },

  decrypt: (text: string, shift: number = 3): string => {
    return CaesarCipher.encrypt(text, 26 - shift);
  }
};
