import React, { useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const Auth: React.FC = () => {
  const [user, setUser] = useState<netlifyIdentity.User | null>(null);

  useEffect(() => {
    netlifyIdentity.init();

    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
    });

    // Check if user is already logged in
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const login = () => {
    netlifyIdentity.open('login');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const loginWithGoogle = () => {
    netlifyIdentity.open('login');
    // The actual provider selection will be handled in the Netlify Identity widget
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {user ? (
        <div className="text-center">
          <p className="mb-2">Welcome, {user.user_metadata.full_name || user.email}!</p>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <button 
            onClick={loginWithGoogle}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
            Log in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;