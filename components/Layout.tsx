import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import SignInButton from './SignInButton';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card shadow-md z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
                <h1 className="ml-2 text-xl font-semibold">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <SignInButton />
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;