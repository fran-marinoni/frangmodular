const ADMIN_USER = "admingenmodular";
const ADMIN_PASS = "admingenmodular";
const AUTH_KEY = "admin_session";

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ authenticated: true, timestamp: Date.now() }));
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  try {
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
    return parsed?.authenticated === true;
  } catch {
    return false;
  }
}
