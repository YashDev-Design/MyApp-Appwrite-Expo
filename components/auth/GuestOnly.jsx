// components/auth/GuestOnly.jsx
import { ReactNode } from "react";
import { Redirect } from "expo-router";
import { useUser } from "../../hooks/useUser";

export default function GuestOnly({ children }) {
  const { user, loading } = useUser();

  if (loading) return null;        // or a loading spinner
  if (user) return <Redirect href="/(dashboard)" />;

  return children;
}