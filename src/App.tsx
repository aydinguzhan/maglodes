// App.tsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInandUp from "./pages/Auth/SignInandUp";
import Dashboard from "./pages/DashBoard/Dashboard";
import { useAuthStore } from "./stores/useAuthStore";

export default function App() {
  const { token, user, logout } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Giriş / Kayıt Sayfası */}
        <Route
          path="/auth"
          element={
            !token ? (
              <SignInandUp isSingUp={isSignUp} setIsSingUp={setIsSignUp} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard onLogout={logout} />
            ) : (
              <Navigate to="/auth" replace />
            )
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
