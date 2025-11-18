// app/(dashboard)/profile.jsx
import { View, Text, Button, StyleSheet } from "react-native";
import { useUser } from "../../hooks/useUser";
import { router } from "expo-router";

export default function Profile() {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {user && (
        <>
          <Text>ID: {user.$id}</Text>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </>
      )}

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 16, fontWeight: "bold" },
});