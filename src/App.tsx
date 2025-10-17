// App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInandUp from "./pages/Auth/SignInandUp";
import Dashboard from "./pages/DashBoard/Dashboard";
import utils from "./utils/utils";
import type { User } from "./utils/types";

// function ProtectedRoute({
//   token,
//   children,
// }: {
//   token: string | null;
//   children: JSX.Element ;
// }) {
//   if (!token) return <Navigate to="/auth" replace />;
//   return children;
// }

export default function App() {
  const [isSingUp, setIsSingUp] = useState(false);
  const [user, setUser] = useState<User | object>({});
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleLogin = (newToken: string) => {
    utils.setToken(newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    utils.removeToken();
    setToken(null);
    setUser({});
  };

  useEffect(() => {
    console.log("User State:", user);
    console.log("Token:", token);
  }, [user, token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth sayfası */}
        <Route
          path="/auth"
          element={
            !token ? (
              <SignInandUp
                isSingUp={isSingUp}
                setIsSingUp={setIsSingUp}
                onLogin={handleLogin}
                setUser={setUser}
              />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute token={token}>
            <Dashboard onLogout={handleLogout} />
            // </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/auth"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
