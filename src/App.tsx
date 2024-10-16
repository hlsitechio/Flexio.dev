import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { API_URL, API_KEY } from './config/api';
import Auth from './components/Auth';
import PrivacyPolicy from './components/PrivacyPolicy';

const App: React.FC = () => {
  const isProd = import.meta.env.PROD;

  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link></li>
            <li><Link to="/privacy" className="text-blue-500 hover:text-blue-700">Privacy Policy</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1 className="text-3xl font-bold mb-6">Flexio.dev</h1>
              <Auth />
              {!isProd && (
                <>
                  <p className="mt-4">Environment: Development</p>
                  <p>API URL: {API_URL}</p>
                  <p>API Key: {API_KEY}</p>
                </>
              )}
            </>
          } />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>

        <footer className="mt-8 text-center text-gray-500">
          <p>&copy; 2024 Flexio.dev. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;