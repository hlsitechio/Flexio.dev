import React from 'react';

// Define and export the WidgetType separately
export type WidgetType = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

// Define props for the Widget component
interface WidgetProps {
  title: string;
  content: string;
}

const Widget: React.FC<WidgetProps> = ({ title, content }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Widget;
