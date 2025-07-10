
export const Base64Cipher = {
  encrypt: (text: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      throw new Error('Failed to encode text to Base64');
    }
  },

  decrypt: (text: string): string => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (error) {
      throw new Error('Failed to decode Base64 text');
    }
  }
};
