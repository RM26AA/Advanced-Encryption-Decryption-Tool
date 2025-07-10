
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Lock, Unlock, RefreshCw, Key, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CaesarCipher } from './ciphers/CaesarCipher';
import { Base64Cipher } from './ciphers/Base64Cipher';
import { ROT13Cipher } from './ciphers/ROT13Cipher';
import { SubstitutionCipher } from './ciphers/SubstitutionCipher';
import { AESCipher } from './ciphers/AESCipher';
import { VigenereCipher } from './ciphers/VigenereCipher';
import { AtbashCipher } from './ciphers/AtbashCipher';
import { MorseCodeCipher } from './ciphers/MorseCodeCipher';
import { SecurityMeter } from './SecurityMeter';
import { MethodDescriptions } from './MethodDescriptions';

export type CipherMethod = 'caesar' | 'base64' | 'rot13' | 'substitution' | 'aes' | 'vigenere' | 'atbash' | 'morse';

const cipherMethods = [
  { value: 'aes' as const, label: 'AES (Advanced Encryption Standard)' },
  { value: 'vigenere' as const, label: 'Vigenère Cipher' },
  { value: 'caesar' as const, label: 'Caesar Cipher' },
  { value: 'substitution' as const, label: 'Simple Substitution' },
  { value: 'atbash' as const, label: 'Atbash Cipher' },
  { value: 'base64' as const, label: 'Base64 Encoding' },
  { value: 'morse' as const, label: 'Morse Code' },
  { value: 'rot13' as const, label: 'ROT13' }
];

export const EncryptionTool = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<CipherMethod>('aes');
  const [activeTab, setActiveTab] = useState('encrypt');
  const [useCustomKey, setUseCustomKey] = useState(false);
  const [customKey, setCustomKey] = useState('');
  const { toast } = useToast();

  const getCipherInstance = () => {
    switch (selectedMethod) {
      case 'caesar':
        return CaesarCipher;
      case 'base64':
        return Base64Cipher;
      case 'rot13':
        return ROT13Cipher;
      case 'substitution':
        return SubstitutionCipher;
      case 'aes':
        return AESCipher;
      case 'vigenere':
        return VigenereCipher;
      case 'atbash':
        return AtbashCipher;
      case 'morse':
        return MorseCodeCipher;
      default:
        return AESCipher;
    }
  };

  const methodSupportsKey = (method: CipherMethod) => {
    return !['rot13', 'base64', 'atbash', 'morse', 'substitution'].includes(method);
  };

  const handleEncrypt = () => {
    if (!inputText.trim()) {
      toast({
        title: "No input text",
        description: "Please enter some text to encrypt.",
        variant: "destructive"
      });
      return;
    }

    try {
      const cipher = getCipherInstance();
      let encrypted: string;
      
      if (methodSupportsKey(selectedMethod) && useCustomKey && customKey) {
        encrypted = cipher.encrypt(inputText, customKey);
      } else {
        encrypted = cipher.encrypt(inputText);
      }
      
      setOutputText(encrypted);
      toast({
        title: "Text encrypted successfully!",
        description: `Used ${cipherMethods.find(m => m.value === selectedMethod)?.label}`
      });
    } catch (error) {
      toast({
        title: "Encryption failed",
        description: error instanceof Error ? error.message : "An error occurred during encryption.",
        variant: "destructive"
      });
    }
  };

  const handleDecrypt = () => {
    if (!inputText.trim()) {
      toast({
        title: "No input text",
        description: "Please enter some text to decrypt.",
        variant: "destructive"
      });
      return;
    }

    try {
      const cipher = getCipherInstance();
      let decrypted: string;
      
      if (methodSupportsKey(selectedMethod) && useCustomKey && customKey) {
        decrypted = cipher.decrypt(inputText, customKey);
      } else {
        decrypted = cipher.decrypt(inputText);
      }
      
      setOutputText(decrypted);
      toast({
        title: "Text decrypted successfully!",
        description: `Used ${cipherMethods.find(m => m.value === selectedMethod)?.label}`
      });
    } catch (error) {
      toast({
        title: "Decryption failed",
        description: error instanceof Error ? error.message : "The text might not be encrypted with the selected method or key.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied to clipboard!",
        description: "The result has been copied to your clipboard."
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const swapTexts = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    toast({
      title: "Texts swapped",
      description: "Input and output have been swapped."
    });
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setCustomKey('');
    toast({
      title: "Cleared",
      description: "All text fields have been cleared."
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Advanced Encryption & Decryption Tool
        </h1>
        <p className="text-muted-foreground text-lg">
          Secure your messages with military-grade and classical encryption methods
        </p>
      </div>

      <Tabs defaultValue="tool" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tool">Encryption Tool</TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Method Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <MethodDescriptions />
        </TabsContent>

        <TabsContent value="tool" className="space-y-6">
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-600" />
                Cipher Configuration
              </CardTitle>
              <CardDescription>
                Choose your encryption method and configure security options
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="method">Encryption Method</Label>
                    <Select value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as CipherMethod)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select encryption method" />
                      </SelectTrigger>
                      <SelectContent>
                        {cipherMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {methodSupportsKey(selectedMethod) && (
                    <div className="space-y-3 p-4 border rounded-lg bg-blue-50/50">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="useCustomKey" 
                          checked={useCustomKey}
                          onCheckedChange={(checked) => setUseCustomKey(checked as boolean)}
                        />
                        <Label htmlFor="useCustomKey" className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          Use Custom Secret Key
                        </Label>
                      </div>
                      {useCustomKey && (
                        <div className="space-y-2">
                          <Label htmlFor="customKey">Secret Key</Label>
                          <Input
                            id="customKey"
                            type="password"
                            placeholder="Enter your secret key..."
                            value={customKey}
                            onChange={(e) => setCustomKey(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Keep this key safe! You'll need it to decrypt your message.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Security Level</Label>
                    <div className="mt-2">
                      <SecurityMeter 
                        method={selectedMethod} 
                        hasKey={useCustomKey && customKey.length > 0} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <Button variant="outline" onClick={swapTexts} className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Swap
                    </Button>
                    <Button variant="outline" onClick={clearAll}>
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encrypt" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Encrypt
              </TabsTrigger>
              <TabsTrigger value="decrypt" className="flex items-center gap-2">
                <Unlock className="h-4 w-4" />
                Decrypt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="encrypt" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Encrypt Your Message</CardTitle>
                  <CardDescription>
                    Enter your plain text message to encrypt it using the selected method.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="plaintext">Plain Text</Label>
                    <Textarea
                      id="plaintext"
                      placeholder="Enter your message here..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <Button onClick={handleEncrypt} className="w-full bg-purple-600 hover:bg-purple-700">
                    <Lock className="h-4 w-4 mr-2" />
                    Encrypt Message
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="decrypt" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Decrypt Your Message</CardTitle>
                  <CardDescription>
                    Enter your encrypted message to decrypt it using the selected method.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ciphertext">Encrypted Text</Label>
                    <Textarea
                      id="ciphertext"
                      placeholder="Paste your encrypted message here..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <Button onClick={handleDecrypt} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Unlock className="h-4 w-4 mr-2" />
                    Decrypt Message
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {outputText && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-green-800">Result</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-green-700 border-green-300 hover:bg-green-100"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={outputText}
                  readOnly
                  rows={4}
                  className="resize-none bg-white border-green-200 text-green-900"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
