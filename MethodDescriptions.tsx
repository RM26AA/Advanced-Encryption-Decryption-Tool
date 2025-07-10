
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, Key, Zap } from 'lucide-react';

export const MethodDescriptions = () => {
  const methods = [
    {
      name: 'AES (Advanced Encryption Standard)',
      security: 'High',
      speed: 'Fast',
      keyRequired: 'Yes',
      description: 'Military-grade symmetric encryption used worldwide. Extremely secure with proper key management.',
      useCases: 'Sensitive data, financial transactions, secure communications',
      strength: 10
    },
    {
      name: 'Vigenère Cipher',
      security: 'Medium-High',
      speed: 'Fast',
      keyRequired: 'Yes',
      description: 'Polyalphabetic substitution cipher using a repeating keyword. Much stronger than simple substitution.',
      useCases: 'Historical encryption, educational purposes, moderate security needs',
      strength: 7
    },
    {
      name: 'Simple Substitution',
      security: 'Low-Medium',
      speed: 'Fast',
      keyRequired: 'No',
      description: 'Each letter is replaced with another letter. Vulnerable to frequency analysis.',
      useCases: 'Puzzles, basic obfuscation, educational demonstrations',
      strength: 5
    },
    {
      name: 'Atbash Cipher',
      security: 'Low',
      speed: 'Very Fast',
      keyRequired: 'No',
      description: 'Ancient Hebrew cipher where A=Z, B=Y, etc. Simple letter reversal pattern.',
      useCases: 'Historical interest, very basic obfuscation, puzzles',
      strength: 3
    },
    {
      name: 'Caesar Cipher',
      security: 'Very Low',
      speed: 'Very Fast',
      keyRequired: 'Optional',
      description: 'Shifts each letter by a fixed number. Easily broken with frequency analysis.',
      useCases: 'Educational purposes, simple puzzles, ROT13 variant',
      strength: 2
    },
    {
      name: 'ROT13',
      security: 'Very Low',
      speed: 'Very Fast',
      keyRequired: 'No',
      description: 'Special case of Caesar cipher with shift of 13. Self-inverse operation.',
      useCases: 'Text obfuscation, hiding spoilers, simple encoding',
      strength: 1
    },
    {
      name: 'Base64 Encoding',
      security: 'None',
      speed: 'Very Fast',
      keyRequired: 'No',
      description: 'Not encryption! Just encoding for data transmission. Easily decoded.',
      useCases: 'Data transmission, email attachments, URL encoding',
      strength: 1
    },
    {
      name: 'Morse Code',
      security: 'None',
      speed: 'Fast',
      keyRequired: 'No',
      description: 'Converts text to dots and dashes. Not secure, just a different representation.',
      useCases: 'Telegraph communication, radio, educational purposes',
      strength: 1
    }
  ];

  const getSecurityBadge = (security: string, strength: number) => {
    if (strength >= 8) return <Badge className="bg-green-100 text-green-800 border-green-300">{security}</Badge>;
    if (strength >= 5) return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{security}</Badge>;
    return <Badge className="bg-red-100 text-red-800 border-red-300">{security}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Encryption Methods Overview
          </CardTitle>
          <CardDescription>
            Compare different encryption and encoding methods available in this tool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-center">Security</TableHead>
                  <TableHead className="text-center">Speed</TableHead>
                  <TableHead className="text-center">Key Required</TableHead>
                  <TableHead className="text-center">Strength</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {methods.map((method) => (
                  <TableRow key={method.name}>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell className="text-center">
                      {getSecurityBadge(method.security, method.strength)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Zap className="h-3 w-3" />
                        {method.speed}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Key className="h-3 w-3" />
                        {method.keyRequired}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <div className="flex">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-4 mx-0.5 rounded-sm ${
                                i < method.strength
                                  ? method.strength >= 8
                                    ? 'bg-green-500'
                                    : method.strength >= 5
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <Card key={method.name} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{method.name}</CardTitle>
              <div className="flex items-center gap-2">
                {getSecurityBadge(method.security, method.strength)}
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {method.speed}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {method.description}
              </p>
              <div>
                <h4 className="text-sm font-medium mb-1">Best Used For:</h4>
                <p className="text-sm text-muted-foreground">{method.useCases}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
