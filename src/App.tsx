import { Routes, Route, Navigate } from 'react-router';
import { useEffect } from 'react';
import  secureLocalStorage  from  "react-secure-storage";
import { useAuthStore } from './stores/authStore';
import { Landing } from './pages/Landing';
import { Pricing } from './pages/Pricing';
import { BuddyExplorer } from './pages/BuddyExplorer';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/user/Dashboard';
import { Chat } from './pages/user/Chat';
// import { db } from './lib/db';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
    // const { isLoading, user, error } = db.useAuth();
    const token = secureLocalStorage.getItem('token');
  return isAuthenticated || token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const token = secureLocalStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, [fetchUser]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/buddies" element={<BuddyExplorer />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:buddySlug"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;