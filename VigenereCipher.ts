
export const VigenereCipher = {
  encrypt: (text: string, key: string = 'KEY'): string => {
    if (!key) key = 'KEY';
    const keyUpper = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const keyChar = keyUpper[keyIndex % keyUpper.length];
        const keyCode = keyChar.charCodeAt(0) - 65;
        const encryptedCode = (charCode + keyCode) % 26;
        const encryptedChar = String.fromCharCode(encryptedCode + 65);
        result += isUpperCase ? encryptedChar : encryptedChar.toLowerCase();
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  },

  decrypt: (text: string, key: string = 'KEY'): string => {
    if (!key) key = 'KEY';
    const keyUpper = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const keyChar = keyUpper[keyIndex % keyUpper.length];
        const keyCode = keyChar.charCodeAt(0) - 65;
        const decryptedCode = (charCode - keyCode + 26) % 26;
        const decryptedChar = String.fromCharCode(decryptedCode + 65);
        result += isUpperCase ? decryptedChar : decryptedChar.toLowerCase();
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  }
};
