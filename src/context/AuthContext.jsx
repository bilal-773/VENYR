import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if Supabase is properly initialized
    if (!supabase) {
      console.error('Supabase client not initialized');
      return;
    }

    // Get initial user
    supabase.auth.getUser()
      .then(({ data, error }) => {
        if (error) {
          // Auth session missing is normal for logged-out users - don't log as error
          if (error.message?.includes('Auth session missing')) {
            setUser(null);
            return;
          }
          console.error('Error getting user:', error);
          return;
        }
        setUser(data?.user || null);
      })
      .catch((error) => {
        // Silently handle session errors - they're expected for logged-out users
        if (!error.message?.includes('Auth session missing')) {
          console.error('Error in getUser:', error);
        }
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

