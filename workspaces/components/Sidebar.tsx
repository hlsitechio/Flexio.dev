import React from 'react';
// Ensure 'WidgetType' is correctly imported as a type
import type { WidgetType } from '../types/widget'; 

const ExampleComponent: React.FC<{ widget: WidgetType }> = ({ widget }) => {
  return (
    <div>
      <h3>Widget ID: {widget.id}</h3>
      <p>Position: ({widget.x}, {widget.y})</p>
      <p>Size: {widget.w}x{widget.h}</p>
    </div>
  );
};

export default ExampleComponent;
