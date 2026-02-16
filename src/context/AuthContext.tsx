"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserRole = "ATTENDEE" | "HOST" | "PROVIDER" | "ADMIN";
export type Sector = "attendee" | "host" | "provider" | null;

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  hostApproved: boolean;
  providerApproved: boolean;
  uid?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  userProfile: UserProfile | null;
  loading: boolean;
  sector: Sector;
  setSector: (sector: Sector) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user with all permissions
const MOCK_USER: UserProfile = {
  id: "user-demo-001",
  uid: "user-demo-001",
  email: "demo@sneakout.com",
  name: "Demo User",
  role: "ADMIN",
  hostApproved: true,
  providerApproved: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(MOCK_USER);
  const [loading, setLoading] = useState(false);
  const [sector, setSector] = useState<Sector>("attendee");

  const handleSetSector = (newSector: Sector) => {
    setSector(newSector);
    if (newSector) {
      localStorage.setItem("sector", newSector);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("sector");
    setUser(MOCK_USER);
    setSector("attendee");
  };

  return (
    <AuthContext.Provider value={{ user, userProfile: user, loading, sector, setSector: handleSetSector, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
