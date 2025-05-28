
import { Loader2 } from 'lucide-react';

interface InstagramLoginStatusProps {
  status: string;
  isVisible: boolean;
}

const InstagramLoginStatus = ({ status, isVisible }: InstagramLoginStatusProps) => {
  if (!isVisible) return null;

  return (
    <div className="text-center space-y-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <div className="flex items-center justify-center space-x-2">
        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
        <span className="text-sm text-blue-600">{status}</span>
      </div>
    </div>
  );
};

export default InstagramLoginStatus;
