import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { getData } from "../../src/services/storageService";

// URL base del backend, definida en las variables de entorno de Expo
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Colores e ícono de la insignia según el estado de la postulación
const estadoConfig: any = {
  pendiente: { bg: "#fef9c3", text: "#854d0e", icon: "" },
  aceptado: { bg: "#dcfce7", text: "#166534", icon: "" },
  rechazado: { bg: "#fee2e2", text: "#991b1b", icon: "" },
  en_revision: { bg: "#dbeafe", text: "#1e40af", icon: "" },
};

export default function Postulaciones() {
  const router = useRouter();

  // Lista de postulaciones y estados de carga
  const [postulaciones, setPostulaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Consulta las postulaciones del usuario autenticado
  const cargar = async () => {
    try {
      const token = await getData("token");
      const res = await fetch(
        `${API_URL}/api/postulaciones/mis-postulaciones`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();

      // Si el backend responde con un error, "data" no es una lista:
      // se evita guardarlo para que el resto de la pantalla no falle
      setPostulaciones(Array.isArray(data) ? data : []);
    } catch {
      Alert.alert("Error", "No se pudieron cargar tus postulaciones");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Carga inicial al abrir la pantalla
  useEffect(() => {
    cargar();
  }, []);

  // Recarga la lista al tirar de la pantalla hacia abajo
  const onRefresh = () => {
    setRefreshing(true);
    cargar();
  };

  // Mientras se cargan los datos se muestra un indicador
  if (loading)
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />
    );

  return (
    <View style={styles.container}>
      {/* Encabezado con botón para volver y total de postulaciones */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
          <Text style={styles.btnBackText}>← Volver</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Mis postulaciones</Text>
          <Text style={styles.headerSub}>
            {postulaciones.length} postulacion
            {postulaciones.length !== 1 ? "es" : ""}
          </Text>
        </View>
      </View>

      {/* Resumen: cantidad de postulaciones por estado */}
      <View style={styles.resumen}>
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNum}>
            {postulaciones.filter((p: any) => p.estado === "pendiente").length}
          </Text>
          <Text style={styles.resumenLabel}>Pendientes</Text>
        </View>
        <View style={styles.resumenDivider} />
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNum}>
            {postulaciones.filter((p: any) => p.estado === "aceptado").length}
          </Text>
          <Text style={styles.resumenLabel}>Aceptadas</Text>
        </View>
        <View style={styles.resumenDivider} />
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNum}>
            {postulaciones.filter((p: any) => p.estado === "rechazado").length}
          </Text>
          <Text style={styles.resumenLabel}>Rechazadas</Text>
        </View>
      </View>

      {/* Lista de postulaciones */}
      <FlatList
        data={postulaciones}
        keyExtractor={(item: any) => item.id_postulacion.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 16 }}
        // Vista que se muestra cuando el usuario aún no se ha postulado
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.empty}>No tienes postulaciones aun</Text>
            <Text style={styles.emptyHint}>
              Explora las vacantes y postulate
            </Text>
            <TouchableOpacity
              style={styles.btnExplorar}
              onPress={() => router.push("/(drawer)/home" as any)}
            >
              <Text style={styles.btnExplorarText}>Explorar vacantes →</Text>
            </TouchableOpacity>
          </View>
        }
        // Tarjeta de cada postulación
        renderItem={({ item }: any) => {
          // Si el estado no está en la tabla, se trata como pendiente
          const config = estadoConfig[item.estado] || estadoConfig.pendiente;
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <View style={[styles.badge, { backgroundColor: config.bg }]}>
                  <Text style={[styles.badgeText, { color: config.text }]}>
                    {config.icon} {item.estado}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>📍 {item.ubicacion}</Text>
                <Text style={styles.infoText}>
                  ${Number(item.sueldo).toLocaleString()}
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.fecha}>
                  Postulado el{" "}
                  {new Date(item.fecha_postulacion).toLocaleDateString()}
                </Text>
                {/* Abre el detalle de la vacante a la que se postuló */}
                <TouchableOpacity
                  style={styles.btnVer}
                  onPress={() =>
                    router.push({
                      pathname: "/(drawer)/vacante",
                      params: { id: String(item.id_vacante) },
                    } as any)
                  }
                >
                  <Text style={styles.btnVerText}>Ver vacante →</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

// Estilos de la pantalla
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
  headerSub: { color: "#93c5fd", fontSize: 12 },
  resumen: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    justifyContent: "space-around",
  },
  resumenItem: { alignItems: "center" },
  resumenNum: { fontSize: 24, fontWeight: "bold", color: "#1e3a5f" },
  resumenLabel: { fontSize: 12, color: "#6b7280", marginTop: 4 },
  resumenDivider: { width: 1, backgroundColor: "#e5e7eb" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 8,
  },
  titulo: { fontSize: 16, fontWeight: "bold", color: "#1e3a5f", flex: 1 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: "600" },
  infoRow: { flexDirection: "row", gap: 16, marginBottom: 12 },
  infoText: { fontSize: 13, color: "#6b7280" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 10,
  },
  fecha: { fontSize: 12, color: "#9ca3af" },
  btnVer: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnVerText: { color: "#2563eb", fontSize: 13, fontWeight: "600" },
  emptyBox: { alignItems: "center", marginTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  empty: { fontSize: 16, color: "#6b7280", fontWeight: "600" },
  emptyHint: { fontSize: 13, color: "#9ca3af", marginTop: 4, marginBottom: 20 },
  btnExplorar: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnExplorarText: { color: "#fff", fontWeight: "bold" },
});
