import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ComponentWidgetProps {
  onRemove: () => void;
}

const ComponentWidget: React.FC<ComponentWidgetProps> = ({ onRemove }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setError(null);
  };

  const renderPreview = () => {
    try {
      // Instead of evaluating the code, we'll render it as text
      return (
        <div className="border rounded-md p-2 bg-background">
          <pre className="whitespace-pre-wrap">{code}</pre>
        </div>
      );
    } catch (error) {
      console.error('Error rendering preview:', error);
      setError('Error rendering preview: ' + (error instanceof Error ? error.message : String(error)));
      return null;
    }
  };

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Component Widget</h3>
        <button onClick={onRemove} className="text-muted-foreground hover:text-destructive">
          <X size={20} />
        </button>
      </div>
      <textarea
        className="w-full h-32 p-2 border rounded-md bg-background text-foreground mb-2"
        value={code}
        onChange={handleCodeChange}
        placeholder="Enter your React component code here..."
      />
      {error && (
        <p className="text-destructive mb-2">{error}</p>
      )}
      {code && renderPreview()}
    </div>
  );
};

export default ComponentWidget;