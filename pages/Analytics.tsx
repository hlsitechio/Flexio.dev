import React from 'react';
import { BarChart, PieChart, LineChart } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <BarChart className="mr-2" /> Bar Chart
          </h2>
          <p>Bar chart visualization goes here</p>
        </div>
        <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <PieChart className="mr-2" /> Pie Chart
          </h2>
          <p>Pie chart visualization goes here</p>
        </div>
        <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <LineChart className="mr-2" /> Line Chart
          </h2>
          <p>Line chart visualization goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;