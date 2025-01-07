import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthComponent() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!session ? (
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
          <h2 className="text-2xl mb-4 text-center">Sign in with ZAPT</h2>
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 mb-4 block text-center">
            Visit ZAPT
          </a>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'apple']}
            theme="dark"
          />
        </div>
      ) : (
        <div>
          {/* The Dashboard component will handle the authenticated state */}
        </div>
      )}
    </div>
  );
}