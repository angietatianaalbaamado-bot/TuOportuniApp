import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { loginService } from "../../src/services/auth.service";
import { setData } from "../../src/services/storageService";

export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      setError("Completa todos los campos");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await loginService(correo, contrasena);
      await setData("token", data.token);
      await setData("usuario", data.usuario);
      console.log("Usuario guardado en login:", JSON.stringify(data.usuario));
      router.replace("/(drawer)/home" as any);
    } catch (e: any) {
      setError(e.message || "Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header azul */}
        <View style={styles.topSection}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>TuOportuniApp</Text>
          <Text style={styles.tagline}>Bienvenido de vuelta 👋</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formSection}>
          <Text style={styles.titulo}>Iniciar sesion</Text>
          <Text style={styles.subtitulo}>Ingresa tus datos para continuar</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>📧 Correo electronico</Text>
            <TextInput
              style={styles.input}
              placeholder="tucorreo@ejemplo.com"
              placeholderTextColor="#9ca3af"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>🔒 Contrasena</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1, borderWidth: 0 }]}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity
                onPress={() => setShowPass(!showPass)}
                style={styles.eyeBtn}
              >
                <Text>{showPass ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Ingresar →</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.btnRegistro}
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.8}
          >
            <Text style={styles.btnRegistroText}>✨ Crear cuenta gratis</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.link}>← Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#1e3a5f" },
  topSection: { alignItems: "center", paddingTop: 60, paddingBottom: 30 },
  logo: { width: 80, height: 80, marginBottom: 12 },
  appName: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  tagline: { fontSize: 14, color: "#93c5fd", marginTop: 6 },
  formSection: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 28,
    paddingBottom: 48,
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 6,
  },
  subtitulo: { fontSize: 14, color: "#6b7280", marginBottom: 24 },
  inputWrapper: { marginBottom: 16 },
  inputLabel: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
  },
  eyeBtn: { padding: 14 },
  errorBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#dc2626",
  },
  errorText: { color: "#dc2626", fontSize: 13 },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#e5e7eb" },
  dividerText: { color: "#9ca3af", fontSize: 13 },
  btnRegistro: {
    backgroundColor: "#eff6ff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  btnRegistroText: { color: "#2563eb", fontSize: 15, fontWeight: "bold" },
  link: { color: "#6b7280", textAlign: "center", fontSize: 14 },
});
