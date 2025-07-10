
import { Progress } from '@/components/ui/progress';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface SecurityMeterProps {
  method: string;
  hasKey: boolean;
}

export const SecurityMeter = ({ method, hasKey }: SecurityMeterProps) => {
  const getSecurityLevel = () => {
    const baseScores = {
      'aes': 10,
      'vigenere': 7,
      'substitution': 5,
      'caesar': 2,
      'rot13': 1,
      'base64': 1,
      'atbash': 3,
      'morse': 1
    };

    let score = baseScores[method as keyof typeof baseScores] || 1;
    
    // Boost score if using a custom key (except for methods that don't use keys)
    if (hasKey && !['rot13', 'base64', 'atbash', 'morse'].includes(method)) {
      score = Math.min(10, score + 2);
    }

    return score;
  };

  const securityLevel = getSecurityLevel();
  const percentage = (securityLevel / 10) * 100;

  const getSecurityColor = () => {
    if (securityLevel >= 8) return 'text-green-600';
    if (securityLevel >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSecurityIcon = () => {
    if (securityLevel >= 8) return <ShieldCheck className="h-4 w-4 text-green-600" />;
    if (securityLevel >= 5) return <ShieldAlert className="h-4 w-4 text-yellow-600" />;
    return <Shield className="h-4 w-4 text-red-600" />;
  };

  const getSecurityLabel = () => {
    if (securityLevel >= 8) return 'High Security';
    if (securityLevel >= 5) return 'Medium Security';
    return 'Low Security';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getSecurityIcon()}
          <span className={`text-sm font-medium ${getSecurityColor()}`}>
            {getSecurityLabel()}
          </span>
        </div>
        <span className={`text-sm ${getSecurityColor()}`}>
          {securityLevel}/10
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 ${
          securityLevel >= 8 ? '[&>div]:bg-green-500' :
          securityLevel >= 5 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'
        }`}
      />
    </div>
  );
};
