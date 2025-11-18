// app/(dashboard)/_layout.jsx
import { Stack } from "expo-router";
import UserOnly from "../../components/auth/UserOnly";

export default function DashboardLayout() {
  return (
    <UserOnly>
      <Stack screenOptions={{ headerShown: false }} />
    </UserOnly>
  );
}