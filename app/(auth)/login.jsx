// app/(auth)/login.jsx
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useUser } from "../../hooks/useUser";
import { router } from "expo-router";

export default function Login() {
  const { login, error } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const ok = await login(email, password);
    if (ok) {
      router.replace("/(dashboard)");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => router.push("/(auth)/register")}>
        Don’t have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 16, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  error: { color: "red", marginBottom: 10 },
  link: { marginTop: 16, textAlign: "center" },
});