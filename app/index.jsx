// app/index.jsx
import { Redirect } from "expo-router";
import { useUser } from "../hooks/useUser";

export default function Index() {
  const { user, loading } = useUser();

  if (loading) return null;

  return user ? (
    <Redirect href="/(dashboard)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
