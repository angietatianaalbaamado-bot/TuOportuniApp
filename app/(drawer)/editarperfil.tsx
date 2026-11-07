import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { getData } from "../../src/services/storageService";
import * as DocumentPicker from "expo-document-picker";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function EditarPerfil() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [profesion, setProfesion] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [hojaVida, setHojaVida] = useState<any>(null);
  const [subiendoPDF, setSubiendoPDF] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = await getData("token");
        const res = await fetch(`${API_URL}/api/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProfesion(data.profesion || "");
        setExperiencia(data.experiencia || "");
        setHabilidades(data.habilidades || "");
        setHojaVida(
          data.hoja_vida_url ? { name: "Hoja de vida cargada" } : null,
        );
      } catch (error) {
        console.error("Error cargando perfil", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const seleccionarPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setHojaVida(result.assets[0]);
        Alert.alert("Archivo seleccionado", result.assets[0].name);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo seleccionar el archivo");
    }
  };

  const guardar = async () => {
    if (!profesion || !experiencia || !habilidades) {
      Alert.alert("Aviso", "Completa todos los campos");
      return;
    }
    setGuardando(true);
    try {
      const token = await getData("token");
      const res = await fetch(`${API_URL}/api/perfil`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profesion, experiencia, habilidades }),
      });
      const data = await res.json();
      if (data.id_perfil) {
        Alert.alert("Exito", "Perfil actualizado correctamente", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Error", "No se pudo guardar el perfil");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setGuardando(false);
    }
  };

  if (loading)
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />
    );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.btnBack}
          >
            <Text style={styles.btnBackText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar perfil</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informacion profesional</Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>💼 Profesion</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Desarrollador de Software"
                placeholderTextColor="#9ca3af"
                value={profesion}
                onChangeText={setProfesion}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>⭐ Experiencia</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Describe tu experiencia laboral..."
                placeholderTextColor="#9ca3af"
                value={experiencia}
                onChangeText={setExperiencia}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>🛠 Habilidades</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Ej: React Native, Node.js, PostgreSQL..."
                placeholderTextColor="#9ca3af"
                value={habilidades}
                onChangeText={setHabilidades}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <Text style={styles.hint}>Separa las habilidades con comas</Text>
            </View>
          </View>

          {/* Hoja de vida */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📄 Hoja de vida</Text>
            <Text style={styles.pdfHint}>
              Sube tu hoja de vida en formato PDF
            </Text>

            {hojaVida && (
              <View style={styles.pdfSeleccionado}>
                <Text style={styles.pdfNombre}>📎 {hojaVida.name}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.btnPDF}
              onPress={seleccionarPDF}
              activeOpacity={0.8}
            >
              <Text style={styles.btnPDFText}>
                {hojaVida ? "🔄 Cambiar PDF" : "📤 Seleccionar PDF"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btnGuardar}
            onPress={guardar}
            disabled={guardando}
            activeOpacity={0.8}
          >
            {guardando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnGuardarText}>Guardar cambios ✅</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    backgroundColor: "#1e3a5f",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  btnBack: { padding: 8 },
  btnBackText: { color: "#93c5fd", fontSize: 16 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  content: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 16,
  },
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
  inputMultiline: { minHeight: 100 },
  hint: { fontSize: 12, color: "#9ca3af", marginTop: 4 },
  pdfHint: { fontSize: 13, color: "#6b7280", marginBottom: 12 },
  pdfSeleccionado: {
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#2563eb",
  },
  pdfNombre: { fontSize: 14, color: "#2563eb", fontWeight: "600" },
  btnPDF: {
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
  },
  btnPDFText: { color: "#2563eb", fontSize: 15, fontWeight: "600" },
  btnGuardar: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    marginBottom: 32,
  },
  btnGuardarText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
