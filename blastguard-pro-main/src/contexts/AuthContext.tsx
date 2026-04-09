import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole =
  | "geotechnical_engineer"
  | "railway_safety_manager"
  | "project_guide"
  | "developer";

export const ROLE_LABELS: Record<UserRole, string> = {
  geotechnical_engineer: "Geotechnical Engineer",
  railway_safety_manager: "Railway Safety Manager",
  project_guide: "Project Guide / Review Panel",
  developer: "Developer",
};

export const ROLE_PERMISSIONS: Record<UserRole, { input: boolean; output: boolean; analytics: boolean; settings: boolean }> = {
  geotechnical_engineer: { input: true, output: false, analytics: false, settings: false },
  railway_safety_manager: { input: false, output: true, analytics: true, settings: false },
  project_guide: { input: true, output: true, analytics: true, settings: false },
  developer: { input: true, output: true, analytics: true, settings: true },
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  permissions: typeof ROLE_PERMISSIONS[UserRole];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("bisf_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, _password: string) => {
    // Simulate login — in production, call backend
    const stored = localStorage.getItem("bisf_users");
    const users: User[] = stored ? JSON.parse(stored) : [];
    const found = users.find((u) => u.email === email);
    if (!found) throw new Error("Invalid credentials");
    setUser(found);
    localStorage.setItem("bisf_user", JSON.stringify(found));
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string, role: UserRole) => {
    const newUser: User = { id: crypto.randomUUID(), name, email, role };
    const stored = localStorage.getItem("bisf_users");
    const users: User[] = stored ? JSON.parse(stored) : [];
    if (users.find((u) => u.email === email)) throw new Error("Email already registered");
    users.push(newUser);
    localStorage.setItem("bisf_users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("bisf_user", JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("bisf_user");
  }, []);

  const permissions = user ? ROLE_PERMISSIONS[user.role] : ROLE_PERMISSIONS.project_guide;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, permissions }}>
      {children}
    </AuthContext.Provider>
  );
};
