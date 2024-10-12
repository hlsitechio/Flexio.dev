import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const SignInButton: React.FC = () => {
  const { user, signIn, signOut } = useAuth();

  return (
    <div>
      {user ? (
        <div className="flex items-center space-x-2">
          <img src={user.picture} alt="User" className="w-8 h-8 rounded-full" />
          <span>{user.name}</span>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={signIn}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default SignInButton;