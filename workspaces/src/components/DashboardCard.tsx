import React from 'react';
import * as Icons from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: keyof typeof Icons;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  const Icon = Icons[icon] as React.ElementType;
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-primary">
          <Icon size={24} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};
export default DashboardCard;