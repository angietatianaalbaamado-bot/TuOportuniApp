import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { getData } from "../../src/services/storageService";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter();
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);

  const cargarVacantes = async () => {
    try {
      const token = await getData("token");
      const res = await fetch(`${API_URL}/api/vacantes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setVacantes(data);
    } catch (error) {
      console.error("Error cargando vacantes", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const u = await getData("usuario");
      setUsuario(u);
      cargarVacantes();
    };
    init();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    cargarVacantes();
  };

  if (loading)
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />
    );

  return (
    <View style={styles.container}>
      {/* Header con logo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.appName}>TuOportuniApp</Text>
          <Text style={styles.tagline}>Encuentra tu oportunidad laboral</Text>
        </View>
      </View>

      {/* Saludo */}
      <View style={styles.saludoBox}>
        <Text style={styles.saludo}>Hola, {usuario?.nombre} </Text>
        <Text style={styles.subtitulo}>
          Estas son las vacantes disponibles para ti
        </Text>
      </View>

      {/* Lista de vacantes */}
      <FlatList
        data={vacantes}
        keyExtractor={(item: any) => item.id_vacante.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}></Text>
            <Text style={styles.empty}>No hay vacantes disponibles</Text>
            <Text style={styles.emptyHint}>
              Desliza hacia abajo para actualizar
            </Text>
          </View>
        }
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.estado}</Text>
              </View>
            </View>
            <Text style={styles.descripcion} numberOfLines={2}>
              {item.descripcion}
            </Text>
            <View style={styles.info}>
              <Text style={styles.infoText}> {item.ubicacion}</Text>
              <Text style={styles.infoText}> {item.tipo_contrato}</Text>
              <Text style={styles.sueldo}>
                ${Number(item.sueldo).toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnPostular}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/vacante",
                  params: { id: item.id_vacante },
                })
              }
            >
              <Text style={styles.btnText}>Ver detalle →</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 48,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  logo: { width: 50, height: 50 },
  appName: { fontSize: 20, fontWeight: "bold", color: "#1e3a5f" },
  tagline: { fontSize: 12, color: "#6b7280" },
  saludoBox: { padding: 16, paddingBottom: 8 },
  saludo: { fontSize: 20, fontWeight: "bold", color: "#1e3a5f" },
  subtitulo: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titulo: { fontSize: 17, fontWeight: "bold", color: "#1e3a5f", flex: 1 },
  badge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: "#16a34a", fontSize: 12, fontWeight: "600" },
  descripcion: { fontSize: 13, color: "#6b7280", marginBottom: 10 },
  info: { gap: 4, marginBottom: 12 },
  infoText: { fontSize: 13, color: "#6b7280" },
  sueldo: { fontSize: 14, color: "#2563eb", fontWeight: "600" },
  btnPostular: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  emptyBox: { alignItems: "center", marginTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  empty: { fontSize: 16, color: "#6b7280", fontWeight: "600" },
  emptyHint: { fontSize: 13, color: "#9ca3af", marginTop: 4 },
});
