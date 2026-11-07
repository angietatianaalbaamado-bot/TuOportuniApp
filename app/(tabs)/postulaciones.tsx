import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getData } from "../../src/services/storageService";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const estadoColor: any = {
  pendiente: { bg: "#fef9c3", text: "#854d0e" },
  aceptado: { bg: "#dcfce7", text: "#166534" },
  rechazado: { bg: "#fee2e2", text: "#991b1b" },
};

export default function Postulaciones() {
  const router = useRouter();
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      setPostulaciones(data);
    } catch (error) {
      console.error("Error cargando postulaciones", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    cargar();
  };

  if (loading)
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
          <Text style={styles.btnBackText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis postulaciones</Text>
      </View>

      <FlatList
        data={postulaciones}
        keyExtractor={(item: any) => item.id_postulacion.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.empty}>No tienes postulaciones aún</Text>
            <Text style={styles.emptyHint}>
              Explora las vacantes y postúlate
            </Text>
          </View>
        }
        renderItem={({ item }: any) => {
          const colors = estadoColor[item.estado] || estadoColor.pendiente;
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <View style={[styles.badge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.badgeText, { color: colors.text }]}>
                    {item.estado}
                  </Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>📍 {item.ubicacion}</Text>
                <Text style={styles.infoText}>
                  💰 ${Number(item.sueldo).toLocaleString()}
                </Text>
                <Text style={styles.infoText}>
                  📅 {new Date(item.fecha_postulacion).toLocaleDateString()}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
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
    alignItems: "center",
    marginBottom: 10,
  },
  titulo: { fontSize: 16, fontWeight: "bold", color: "#1e3a5f", flex: 1 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: "600" },
  info: { gap: 6 },
  infoText: { fontSize: 13, color: "#6b7280" },
  emptyBox: { alignItems: "center", marginTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  empty: { fontSize: 16, color: "#6b7280", fontWeight: "600" },
  emptyHint: { fontSize: 13, color: "#9ca3af", marginTop: 4 },
});
