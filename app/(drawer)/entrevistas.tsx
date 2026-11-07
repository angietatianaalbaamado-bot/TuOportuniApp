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

export default function Entrevistas() {
  const router = useRouter();
  const [entrevistas, setEntrevistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const cargar = async () => {
    try {
      const token = await getData("token");
      const res = await fetch(`${API_URL}/api/entrevistas/mis-entrevistas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEntrevistas(data);
    } catch (error) {
      console.error("Error cargando entrevistas", error);
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
        <Text style={styles.headerTitle}>Mis entrevistas</Text>
      </View>

      <FlatList
        data={entrevistas}
        keyExtractor={(item: any) => item.id_entrevista.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}></Text>
            <Text style={styles.empty}>No tienes entrevistas programadas</Text>
            <Text style={styles.emptyHint}>
              Postulate a vacantes para obtener entrevistas
            </Text>
          </View>
        }
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <View
                style={[
                  styles.badge,
                  item.tipo === "virtual"
                    ? styles.badgeVirtual
                    : styles.badgePresencial,
                ]}
              >
                <Text style={styles.badgeText}>{item.tipo}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}></Text>
              <Text style={styles.infoText}>
                {new Date(item.fecha).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}></Text>
              <Text style={styles.infoText}>{item.hora}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}></Text>
              <Text style={styles.infoText}>
                {item.ubicacion || "Sin ubicacion"}
              </Text>
            </View>

            {item.enlace ? (
              <View style={styles.enlaceBox}>
                <Text style={styles.enlaceLabel}>🔗 Enlace de reunion:</Text>
                <Text style={styles.enlace}>{item.enlace}</Text>
              </View>
            ) : null}
          </View>
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
    marginBottom: 12,
  },
  titulo: { fontSize: 16, fontWeight: "bold", color: "#1e3a5f", flex: 1 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeVirtual: { backgroundColor: "#dbeafe" },
  badgePresencial: { backgroundColor: "#dcfce7" },
  badgeText: { fontSize: 12, fontWeight: "600", color: "#1e3a5f" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  infoIcon: { fontSize: 16 },
  infoText: { fontSize: 14, color: "#4b5563" },
  enlaceBox: {
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  enlaceLabel: { fontSize: 13, color: "#6b7280", marginBottom: 4 },
  enlace: { fontSize: 13, color: "#2563eb" },
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
