import React from 'react';
import AuthComponent from './components/Auth';
import Dashboard from './components/Dashboard';
import { supabase } from './supabaseClient';

export default function App() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="h-full min-h-screen flex flex-col">
      {!session ? <AuthComponent /> : <Dashboard />}
      <footer className="mt-auto p-4 text-center">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}