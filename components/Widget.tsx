import React, { useState } from 'react';
import { X, Edit, Check } from 'lucide-react';
import { Widget as WidgetType } from '../store/dashboardStore';

interface WidgetProps {
  widget: WidgetType;
  onRemove: () => void;
  onUpdate: (updatedWidget: WidgetType) => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(widget.title);
  const [editedContent, setEditedContent] = useState(widget.content);

  const handleSave = () => {
    onUpdate({ ...widget, title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'text':
        return <p className="text-sm">{widget.content}</p>;
      case 'chart':
        return <div className="text-sm">Chart placeholder</div>;
      case 'image':
        return <img src={widget.content} alt={widget.title} className="w-full h-auto" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-lg font-semibold bg-background border border-input rounded px-2 py-1"
          />
        ) : (
          <h3 className="text-lg font-semibold">{widget.title}</h3>
        )}
        <div className="flex space-x-2">
          {isEditing ? (
            <button onClick={handleSave} className="text-primary hover:text-primary/80">
              <Check size={18} />
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-primary hover:text-primary/80">
              <Edit size={18} />
            </button>
          )}
          <button onClick={onRemove} className="text-destructive hover:text-destructive/80">
            <X size={18} />
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full h-24 bg-background border border-input rounded px-2 py-1 text-sm"
        />
      ) : (
        renderWidgetContent()
      )}
    </div>
  );
};

export default Widget;