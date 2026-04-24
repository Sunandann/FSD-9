import React from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../utils/session";

export default function ProtectedRoute({ allowedRoles, children }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  if (Array.isArray(allowedRoles) && !allowedRoles.includes(session.role)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{
          requiredRoles: allowedRoles,
          currentRole: session.role
        }}
      />
    );
  }

  return children;
}
