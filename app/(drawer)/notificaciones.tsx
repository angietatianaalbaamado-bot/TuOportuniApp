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

export default function Notificaciones() {
  const router = useRouter();
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const cargar = async () => {
    try {
      const token = await getData("token");
      const res = await fetch(`${API_URL}/api/notificaciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotificaciones(data);
    } catch (error) {
      console.error("Error cargando notificaciones", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const marcarLeida = async (id: number) => {
    try {
      const token = await getData("token");
      await fetch(`${API_URL}/api/notificaciones/${id}/leida`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      cargar();
    } catch (error) {
      console.error("Error marcando notificacion", error);
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
          <Text style={styles.btnBackText}> Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {notificaciones.filter((n: any) => !n.leida).length}
          </Text>
        </View>
      </View>

      <FlatList
        data={notificaciones}
        keyExtractor={(item: any) => item.id_notificacion.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}></Text>
            <Text style={styles.empty}>No tienes notificaciones</Text>
            <Text style={styles.emptyHint}>
              Te avisaremos cuando haya novedades
            </Text>
          </View>
        }
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={[styles.card, !item.leida && styles.cardNoLeida]}
            onPress={() => marcarLeida(item.id_notificacion)}
            activeOpacity={0.8}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.icono}>{item.leida ? "" : ""}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text
                style={[styles.mensaje, !item.leida && styles.mensajeNoLeido]}
              >
                {item.mensaje}
              </Text>
              <Text style={styles.fecha}>
                {new Date(item.fecha).toLocaleDateString()} {" "}
                {new Date(item.fecha).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              {!item.leida && (
                <Text style={styles.toca}>Toca para marcar como leida</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
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
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", flex: 1 },
  badge: {
    backgroundColor: "#ef4444",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    gap: 12,
    elevation: 1,
  },
  cardNoLeida: {
    backgroundColor: "#eff6ff",
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  cardLeft: { justifyContent: "center" },
  icono: { fontSize: 24 },
  cardContent: { flex: 1 },
  mensaje: { fontSize: 14, color: "#4b5563", lineHeight: 20 },
  mensajeNoLeido: { fontWeight: "bold", color: "#1e3a5f" },
  fecha: { fontSize: 12, color: "#9ca3af", marginTop: 6 },
  toca: { fontSize: 11, color: "#2563eb", marginTop: 4 },
  emptyBox: { alignItems: "center", marginTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  empty: { fontSize: 16, color: "#6b7280", fontWeight: "600" },
  emptyHint: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 4,
    textAlign: "center",
  },
});
