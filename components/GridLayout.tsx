import React, { useCallback } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import useDashboardStore, { Widget as WidgetType } from '../store/dashboardStore';
import Widget from './Widget';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  pageId: string;
  widgets: WidgetType[];
}

const GridLayout: React.FC<GridLayoutProps> = ({ pageId, widgets }) => {
  const { updateWidget, removeWidget } = useDashboardStore();

  const handleLayoutChange = useCallback((layout: Layout[]) => {
    layout.forEach((item) => {
      const widget = widgets.find((w) => w.id === item.i);
      if (widget) {
        updateWidget(pageId, {
          ...widget,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        });
      }
    });
  }, [pageId, widgets, updateWidget]);

  const handleRemoveWidget = useCallback((widgetId: string) => {
    removeWidget(pageId, widgetId);
  }, [pageId, removeWidget]);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: widgets.map((widget) => ({ ...widget, i: widget.id })) }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      onLayoutChange={handleLayoutChange}
      isDraggable
      isResizable
    >
      {widgets.map((widget) => (
        <div key={widget.id}>
          <Widget
            widget={widget}
            onRemove={() => handleRemoveWidget(widget.id)}
            onUpdate={(updatedWidget) => updateWidget(pageId, updatedWidget)}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;