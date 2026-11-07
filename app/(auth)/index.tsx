import { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";

// Ancho mínimo (en píxeles) para mostrar el diseño de dos columnas
const ANCHO_DOS_COLUMNAS = 768;

export default function AuthIndex() {
  // Se lee el ancho de la ventana para elegir entre una o dos columnas
  const { width } = useWindowDimensions();
  const esAncha = width >= ANCHO_DOS_COLUMNAS;

  // Valores de animación: aparición gradual y desplazamiento de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Al abrir la pantalla se ejecutan las dos animaciones al mismo tiempo
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={[styles.container, esAncha && styles.containerAncho]}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a5f" />

      {/* Columna izquierda (arriba en celular): logo, nombre y cifras */}
      <Animated.View
        style={[
          styles.topSection,
          esAncha && styles.topSectionAncha,
          { opacity: fadeAnim },
        ]}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={[styles.logo, esAncha && styles.logoGrande]}
          resizeMode="contain"
        />
        <Text style={styles.appName}>TuOportuniApp</Text>
        <Text style={styles.tagline}>Conectamos talento con oportunidades</Text>

        {/* Cifras de la plataforma */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>500+</Text>
            <Text style={styles.statLabel}>Vacantes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>200+</Text>
            <Text style={styles.statLabel}>Empresas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>1000+</Text>
            <Text style={styles.statLabel}>Candidatos</Text>
          </View>
        </View>
      </Animated.View>

      {/* Columna derecha (abajo en celular): acceso a la cuenta */}
      <Animated.View
        style={[
          styles.bottomSection,
          esAncha && styles.bottomSectionAncha,
          {
            opacity: fadeAnim,
            // En dos columnas entra desde la derecha; en una, desde abajo
            transform: esAncha
              ? [{ translateX: slideAnim }]
              : [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Contenedor que limita el ancho del contenido en pantallas grandes */}
        <View style={esAncha && styles.contenidoAncho}>
          <Text style={styles.titulo}>Encuentra tu próximo empleo </Text>
          <Text style={styles.subtitulo}>
            Miles de vacantes verificadas te esperan. Postúlate fácil, rápido y
            seguro.
          </Text>

          {/* Botón principal: lleva a la pantalla de inicio de sesión */}
          <TouchableOpacity
            style={styles.btnPrimario}
            onPress={() => router.push("/(auth)/login")}
            activeOpacity={0.8}
          >
            <Text style={styles.btnPrimarioText}>Iniciar sesión</Text>
          </TouchableOpacity>

          {/* Botón secundario: lleva al registro */}
          <TouchableOpacity
            style={styles.btnSecundario}
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.8}
          >
            <Text style={styles.btnSecundarioText}> Crear cuenta gratis</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            © 2025 TuOportuniApp · Angie Tatiana Alba Amado
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

// Estilos: los sufijos "Ancho/Ancha/Grande" se aplican solo en pantallas anchas
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e3a5f" },
  containerAncho: { flexDirection: "row" },

  // Sección de marca (logo, nombre y cifras)
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },
  topSectionAncha: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 32 },
  logo: { width: 110, height: 110, marginBottom: 16 },
  logoGrande: { width: 180, height: 180, marginBottom: 24 },
  appName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  tagline: { fontSize: 14, color: "#93c5fd", marginTop: 8, marginBottom: 24 },
  stats: { flexDirection: "row", alignItems: "center", gap: 16 },
  statItem: { alignItems: "center" },
  statNum: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  statLabel: { fontSize: 12, color: "#93c5fd" },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#93c5fd",
    opacity: 0.4,
  },

  // Sección de acceso (tarjeta blanca)
  bottomSection: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    paddingBottom: 48,
  },
  bottomSectionAncha: {
    flex: 1,
    justifyContent: "center",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingBottom: 32,
    paddingHorizontal: 48,
  },
  contenidoAncho: { width: "100%", maxWidth: 420, alignSelf: "center" },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 22,
    marginBottom: 28,
  },
  btnPrimario: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },
  btnPrimarioText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  btnSecundario: {
    backgroundColor: "#eff6ff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  btnSecundarioText: { color: "#2563eb", fontSize: 16, fontWeight: "bold" },
  footer: { textAlign: "center", color: "#9ca3af", fontSize: 12 },
});
