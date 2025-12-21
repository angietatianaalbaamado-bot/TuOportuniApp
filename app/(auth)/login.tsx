import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "../../src/hooks/useAuth";
import Input from "../../src/components/common/Input";
import Button from "../../src/components/common/Button";

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password: string) => password.length >= 6;

export default function LoginScreen() {
  const router = useRouter();
  const { login, user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError("Correo inválido");
      return;
    }
    if (!validatePassword(password)) {
      setError("La contraseña debe tener mínimo 6 caracteres");
      return;
    }

    setError("");
    try {
      await login(email, password);
      router.replace("/(tabs)/home");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TuOportuniApp</Text>

      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="Correo electrónico"
        error={error.includes("Correo") ? error : ""}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
        error={error.includes("contraseña") ? error : ""}
      />

      {error && !error.includes("Correo") && !error.includes("contraseña") && (
        <Text style={styles.error}>{error}</Text>
      )}

      <Button title={loading ? "Cargando..." : "Ingresar"} onPress={handleSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
});
