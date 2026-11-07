import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { registroService } from "../../src/services/auth.service";

export default function RegisterScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("candidato");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !apellido || !correo || !contrasena) {
      setError("Completa todos los campos");
      return;
    }
    if (contrasena.length < 6) {
      setError("La contrasena debe tener minimo 6 caracteres");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await registroService(nombre, apellido, correo, contrasena, rol);
      router.replace("/(auth)/login");
    } catch (e: any) {
      setError(e.message || "Error al registrarse");
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
          <Text style={styles.tagline}>Crea tu cuenta y empieza hoy </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formSection}>
          <Text style={styles.titulo}>Crear cuenta</Text>
          <Text style={styles.subtitulo}>
            Completa tus datos para registrarte
          </Text>

          {/* Rol */}
          <Text style={styles.inputLabel}>Soy un:</Text>
          <View style={styles.roles}>
            <TouchableOpacity
              style={[
                styles.roleBtn,
                rol === "candidato" && styles.roleBtnActive,
              ]}
              onPress={() => setRol("candidato")}
              activeOpacity={0.8}
            >
              <Text style={styles.roleIcon}></Text>
              <Text
                style={[
                  styles.roleBtnText,
                  rol === "candidato" && styles.roleBtnTextActive,
                ]}
              >
                Candidato
              </Text>
              <Text
                style={[
                  styles.roleDesc,
                  rol === "candidato" && styles.roleDescActive,
                ]}
              >
                Busco empleo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleBtn,
                rol === "empresa" && styles.roleBtnActive,
              ]}
              onPress={() => setRol("empresa")}
              activeOpacity={0.8}
            >
              <Text style={styles.roleIcon}>🏢</Text>
              <Text
                style={[
                  styles.roleBtnText,
                  rol === "empresa" && styles.roleBtnTextActive,
                ]}
              >
                Empresa
              </Text>
              <Text
                style={[
                  styles.roleDesc,
                  rol === "empresa" && styles.roleDescActive,
                ]}
              >
                Busco talento
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputWrapper, { flex: 1 }]}>
              <Text style={styles.inputLabel}>👤 Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                placeholderTextColor="#9ca3af"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
            <View style={[styles.inputWrapper, { flex: 1 }]}>
              <Text style={styles.inputLabel}>👤 Apellido</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu apellido"
                placeholderTextColor="#9ca3af"
                value={apellido}
                onChangeText={setApellido}
              />
            </View>
          </View>

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
            <Text style={styles.inputLabel}>Contrasena</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1, borderWidth: 0 }]}
                placeholder="Minimo 6 caracteres"
                placeholderTextColor="#9ca3af"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity
                onPress={() => setShowPass(!showPass)}
                style={styles.eyeBtn}
              >
                <Text>{showPass ? "" : ""}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}> {error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Crear cuenta →</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            activeOpacity={0.8}
          >
            <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#1e3a5f" },
  topSection: { alignItems: "center", paddingTop: 50, paddingBottom: 24 },
  logo: { width: 70, height: 70, marginBottom: 10 },
  appName: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  tagline: { fontSize: 13, color: "#93c5fd", marginTop: 6 },
  formSection: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 48,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 4,
  },
  subtitulo: { fontSize: 14, color: "#6b7280", marginBottom: 20 },
  roles: { flexDirection: "row", gap: 12, marginBottom: 20 },
  roleBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  roleBtnActive: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  roleIcon: { fontSize: 24, marginBottom: 4 },
  roleBtnText: { fontSize: 14, fontWeight: "bold", color: "#374151" },
  roleBtnTextActive: { color: "#fff" },
  roleDesc: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  roleDescActive: { color: "#bfdbfe" },
  row: { flexDirection: "row", gap: 12 },
  inputWrapper: { marginBottom: 14 },
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
    padding: 12,
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
  eyeBtn: { padding: 12 },
  errorBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
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
  link: { color: "#6b7280", textAlign: "center", fontSize: 14 },
});
