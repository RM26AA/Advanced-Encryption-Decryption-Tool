
export const ROT13Cipher = {
  encrypt: (text: string): string => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          return String.fromCharCode(((code - base + 13) % 26) + base);
        }
        return char;
      })
      .join('');
  },

  decrypt: (text: string): string => {
    // ROT13 is its own inverse
    return ROT13Cipher.encrypt(text);
  }
};
