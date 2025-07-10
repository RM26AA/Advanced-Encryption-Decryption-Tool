
export const MorseCodeCipher = {
  morseMap: {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  },

  encrypt: (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(char => MorseCodeCipher.morseMap[char as keyof typeof MorseCodeCipher.morseMap] || char)
      .join(' ');
  },

  decrypt: (text: string): string => {
    const reverseMap = Object.fromEntries(
      Object.entries(MorseCodeCipher.morseMap).map(([key, value]) => [value, key])
    );
    return text
      .split(' ')
      .map(morse => reverseMap[morse] || morse)
      .join('');
  }
};
