
export const AtbashCipher = {
  encrypt: (text: string): string => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/)) {
          return String.fromCharCode(122 - char.charCodeAt(0) + 97);
        } else if (char.match(/[A-Z]/)) {
          return String.fromCharCode(90 - char.charCodeAt(0) + 65);
        }
        return char;
      })
      .join('');
  },

  decrypt: (text: string): string => {
    // Atbash is its own inverse
    return AtbashCipher.encrypt(text);
  }
};
