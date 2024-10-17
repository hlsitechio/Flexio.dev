import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-xl mb-8">The page you are looking for doesn't exist or has been moved.</p>
    <Link to="/" className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition-colors">
      Go to Dashboard
    </Link>
  </div>
);

export default NotFound;