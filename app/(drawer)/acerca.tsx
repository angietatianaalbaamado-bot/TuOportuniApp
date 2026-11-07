import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";

export default function Acerca() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>TuOportuniApp</Text>
        <Text style={styles.version}>Versión 1.0.0</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Proyecto Académico SENA</Text>
        </View>
      </View>

      {/* Descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 Sobre la App</Text>
        <Text style={styles.texto}>
          TuOportuniApp es una plataforma móvil desarrollada para optimizar y
          modernizar los procesos de búsqueda de empleo y selección de personal
          en Colombia.
        </Text>
        <Text style={styles.texto}>
          Conectamos directamente a candidatos y empresas, permitiendo gestionar
          vacantes, postulaciones, entrevistas y comunicación en tiempo real
          desde un solo lugar.
        </Text>
      </View>

      {/* Tecnologías */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛠 Tecnologías</Text>
        <View style={styles.techs}>
          {[
            "React Native",
            "Expo",
            "TypeScript",
            "Node.js",
            "Express",
            "PostgreSQL",
            "JWT",
            "Bcrypt",
          ].map((tech) => (
            <View key={tech} style={styles.techBadge}>
              <Text style={styles.techText}>{tech}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Funcionalidades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Funcionalidades</Text>
        {[
          "👤 Registro e inicio de sesión",
          "🔍 Búsqueda de vacantes con filtros",
          "📄 Postulación a ofertas laborales",
          "💬 Chat directo con empresas",
          "📅 Agenda de entrevistas",
          "🔔 Notificaciones en tiempo real",
          "✏️ Edición de perfil profesional",
          "📎 Carga de hoja de vida PDF",
        ].map((item) => (
          <Text key={item} style={styles.feature}>
            {item}
          </Text>
        ))}
      </View>

      {/* Autora */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Autora</Text>
        <View style={styles.autora}>
          <View style={styles.autorAvatar}>
            <Text style={styles.autorAvatarText}>AA</Text>
          </View>
          <View>
            <Text style={styles.autorNombre}>Angie Tatiana Alba Amado</Text>
            <Text style={styles.autorCargo}>
              Tecnóloga en Análisis y Desarrollo de Software
            </Text>
            <Text style={styles.autorSena}>SENA - Colombia 🇨🇴</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnGitHub}
          onPress={() =>
            Linking.openURL("https://github.com/angietatianaalbaamado-bot")
          }
        >
          <Text style={styles.btnGitHubText}> Ver en GitHub</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 TuOportuniApp</Text>
        <Text style={styles.footerText}>
          Proyecto de carácter académico y educativo
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    backgroundColor: "#1e3a5f",
    padding: 32,
    alignItems: "center",
    paddingTop: 60,
  },
  logo: { width: 100, height: 100, marginBottom: 12 },
  appName: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  version: { fontSize: 14, color: "#93c5fd", marginBottom: 12 },
  badge: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 12,
  },
  texto: { fontSize: 14, color: "#4b5563", lineHeight: 22, marginBottom: 8 },
  techs: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  techBadge: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  techText: { color: "#2563eb", fontSize: 13, fontWeight: "600" },
  feature: {
    fontSize: 14,
    color: "#4b5563",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  autora: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  autorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
  autorAvatarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  autorNombre: { fontSize: 15, fontWeight: "bold", color: "#1e3a5f" },
  autorCargo: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  autorSena: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  btnGitHub: {
    backgroundColor: "#1e3a5f",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnGitHubText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  footer: { padding: 24, alignItems: "center" },
  footerText: { color: "#9ca3af", fontSize: 12, marginBottom: 4 },
});
