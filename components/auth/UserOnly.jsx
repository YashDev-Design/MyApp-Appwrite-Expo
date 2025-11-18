// components/auth/UserOnly.jsx
import { Redirect } from "expo-router";
import { useUser } from "../../hooks/useUser";

export default function UserOnly({ children }) {
  const { user, loading } = useUser();

  if (loading) return null;
  if (!user) return <Redirect href="/(auth)/login" />;

  return children;
}