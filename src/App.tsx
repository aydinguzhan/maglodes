import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInAndUp from "./pages/Auth/SignInandUp";
import Dashboard from "./pages/DashBoard/Dashboard";
import { useAuthStore } from "./stores/useAuthStore";

export default function App() {
  const { token, logout } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);

  const isAuthenticated = Boolean(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          Component={() =>
            !isAuthenticated ? (
              <SignInAndUp isSingUp={isSignUp} setIsSingUp={setIsSignUp} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/dashboard"
          Component={() =>
            isAuthenticated ? (
              <Dashboard onLogout={logout} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route
          path="*"
          Component={() => (
            <Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}
