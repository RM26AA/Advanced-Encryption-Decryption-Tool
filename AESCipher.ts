
import CryptoJS from 'crypto-js';

export const AESCipher = {
  encrypt: (text: string, key: string = 'default-key'): string => {
    try {
      const encrypted = CryptoJS.AES.encrypt(text, key).toString();
      return encrypted;
    } catch (error) {
      throw new Error('Failed to encrypt with AES');
    }
  },

  decrypt: (text: string, key: string = 'default-key'): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) {
        throw new Error('Invalid key or corrupted data');
      }
      return decrypted;
    } catch (error) {
      throw new Error('Failed to decrypt with AES');
    }
  }
};
