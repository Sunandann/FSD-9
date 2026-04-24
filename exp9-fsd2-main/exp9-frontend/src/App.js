import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import AppShell from "./components/AppShell";
import { getSession } from "./utils/session";

function HomeRoute() {
  const session = getSession();

  if (!session) {
    return <Login />;
  }

  return <Navigate to={session.role === "ADMIN" ? "/admin" : "/user"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <AppShell>
                <UserDashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AppShell>
                <AdminDashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={
            <AppShell>
              <Unauthorized />
            </AppShell>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
