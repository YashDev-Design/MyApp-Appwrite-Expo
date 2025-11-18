// app/(auth)/register.jsx
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useUser } from "../../hooks/useUser";
import { router } from "expo-router";

export default function Register() {
  const { register, error } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const ok = await register(email, password, name);
    if (ok) {
      alert("Account created. Please log in.");
      router.replace("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
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

      <Button title="Register" onPress={handleRegister} />

      <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
        Already have an account? Login
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