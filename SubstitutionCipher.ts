
export const SubstitutionCipher = {
  // Simple substitution cipher with a predefined key
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  key: 'ZYXWVUTSRQPONMLKJIHGFEDCBA', // Reversed alphabet for simplicity

  encrypt: (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        const index = SubstitutionCipher.alphabet.indexOf(char);
        return index !== -1 ? SubstitutionCipher.key[index] : char;
      })
      .join('');
  },

  decrypt: (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        const index = SubstitutionCipher.key.indexOf(char);
        return index !== -1 ? SubstitutionCipher.alphabet[index] : char;
      })
      .join('');
  }
};
