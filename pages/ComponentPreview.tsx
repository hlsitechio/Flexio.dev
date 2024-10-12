import React from 'react';
import ComponentWidget from '../components/ComponentWidget';

const ComponentPreview: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Component Preview</h1>
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
        <ComponentWidget onRemove={() => {}} />
      </div>
    </div>
  );
};

export default ComponentPreview;