const SESSION_KEYS = {
  username: "username",
  role: "role",
  authToken: "authToken"
};

export function saveSession({ username, role, authToken }) {
  sessionStorage.setItem(SESSION_KEYS.username, username);
  sessionStorage.setItem(SESSION_KEYS.role, role);
  sessionStorage.setItem(SESSION_KEYS.authToken, authToken);
}

export function getSession() {
  const username = sessionStorage.getItem(SESSION_KEYS.username);
  const role = sessionStorage.getItem(SESSION_KEYS.role);
  const authToken = sessionStorage.getItem(SESSION_KEYS.authToken);

  if (!username || !role || !authToken) {
    return null;
  }

  return { username, role, authToken };
}

export function clearSession() {
  sessionStorage.clear();
}

export function deriveRole(roles) {
  if (!Array.isArray(roles)) {
    return null;
  }

  if (roles.includes("ROLE_ADMIN")) {
    return "ADMIN";
  }

  if (roles.includes("ROLE_USER")) {
    return "USER";
  }

  return null;
}
