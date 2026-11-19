
import { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Share,
} from "react-native";

import { useRouter } from "expo-router";
import { getData } from "../../src/services/storageService";

// URL base del backend
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Normalizar textos para facilitar las búsquedas
const normalizar = (str: string) =>
  String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Opciones de los filtros
const CONTRATOS = [
  "Todos",
  "Termino indefinido",
  "Termino fijo",
  "Prestacion de servicios",
];

const MODALIDADES = [
  "Todas",
  "presencial",
  "remoto",
  "hibrido",
];

export default function Home() {
  const router = useRouter();

  // Datos de las vacantes y del usuario
  const [vacantes, setVacantes] = useState<any[]>([]);
  const [vacantesFilter, setVacantesFilter] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>(null);

  // Estados de carga
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Búsqueda y filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroContrato, setFiltroContrato] = useState("Todos");
  const [filtroModalidad, setFiltroModalidad] = useState("Todas");

  // Consultar las vacantes al backend
  const cargarVacantes = async () => {
    try {
      const token = await getData("token");

      const res = await fetch(`${API_URL}/api/vacantes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("No se pudieron cargar las vacantes");
      }

      const data = await res.json();

      const lista = Array.isArray(data) ? data : [];

      setVacantes(lista);
      setVacantesFilter(lista);
    } catch (error) {
      console.error("Error cargando vacantes:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Al abrir la pantalla
  useEffect(() => {
    const init = async () => {
      try {
        const u = await getData("usuario");
        setUsuario(u);
        await cargarVacantes();
      } catch (error) {
        console.error("Error inicializando pantalla:", error);
        setLoading(false);
      }
    };

    init();
  }, []);

  // Aplicar búsqueda y filtros
  useEffect(() => {
    let resultado: any[] = vacantes;

    // Búsqueda por título, ubicación o descripción
    if (busqueda.trim()) {
      resultado = resultado.filter(
        (v: any) =>
          normalizar(v.titulo).includes(normalizar(busqueda)) ||
          normalizar(v.ubicacion).includes(normalizar(busqueda)) ||
          normalizar(v.descripcion).includes(normalizar(busqueda))
      );
    }

    // Filtro por tipo de contrato
    if (filtroContrato !== "Todos") {
      resultado = resultado.filter((v: any) =>
        normalizar(v.tipo_contrato).includes(
          normalizar(filtroContrato)
        )
      );
    }

    // Filtro por modalidad
    if (filtroModalidad !== "Todas") {
      resultado = resultado.filter((v: any) =>
        normalizar(v.modalidad || "presencial").includes(
          normalizar(filtroModalidad)
        )
      );
    }

    setVacantesFilter(resultado);
  }, [busqueda, filtroContrato, filtroModalidad, vacantes]);

  // Recargar las vacantes
  const onRefresh = () => {
    setRefreshing(true);
    cargarVacantes();
  };

  // Compartir una vacante
  const compartirVacante = async (item: any) => {
    try {
      await Share.share({
        message: `Oportunidad laboral: ${item.titulo}
${item.ubicacion}
$${Number(item.sueldo || 0).toLocaleString("es-CO")}
${item.tipo_contrato}

Postúlate en TuOportuniApp`,
        title: item.titulo,
      });
    } catch (error) {
      console.error("Error compartiendo:", error);
    }
  };

  // Indicador de carga
  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color="#2563eb"
      />
    );
  }

  return (
    <View style={styles.container}>

      {/* Saludo al usuario */}
      <View style={styles.saludoBox}>
        <Text style={styles.saludo}>
          Hola, {usuario?.nombre}
        </Text>

        <Text style={styles.subtitulo}>
          Encuentra tu oportunidad laboral
        </Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por cargo o ciudad..."
          placeholderTextColor="#9ca3af"
          value={busqueda}
          onChangeText={setBusqueda}
        />

        {busqueda.length > 0 && (
          <TouchableOpacity
            style={styles.btnLimpiar}
            onPress={() => setBusqueda("")}
          >
            <Text style={styles.btnLimpiarText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros por tipo de contrato */}
      <FlatList
        horizontal
        data={CONTRATOS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosLista}
        contentContainerStyle={styles.filtrosBox}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filtroBtn,
              filtroContrato === item &&
                styles.filtroBtnActive,
            ]}
            onPress={() => setFiltroContrato(item)}
          >
            <Text
              style={[
                styles.filtroText,
                filtroContrato === item &&
                  styles.filtroTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Filtros por modalidad SIN ICONOS */}
      <FlatList
        horizontal
        data={MODALIDADES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosLista}
        contentContainerStyle={styles.filtrosBox}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filtroBtn,
              filtroModalidad === item &&
                styles.filtroBtnModalidad,
            ]}
            onPress={() => setFiltroModalidad(item)}
          >
            <Text
              style={[
                styles.filtroText,
                filtroModalidad === item &&
                  styles.filtroTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Cantidad de vacantes */}
      <Text style={styles.resultados}>
        {vacantesFilter.length} vacante
        {vacantesFilter.length !== 1 ? "s" : ""} encontrada
        {vacantesFilter.length !== 1 ? "s" : ""}
      </Text>

      {/* Lista de vacantes */}
      <FlatList
        data={vacantesFilter}
        keyExtractor={(item: any) =>
          String(item.id_vacante)
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}> </Text>

            <Text style={styles.empty}>
              No hay vacantes con ese filtro
            </Text>

            <Text style={styles.emptyHint}>
              Intenta con otra búsqueda
            </Text>
          </View>
        }
        renderItem={({ item }: any) => (
          <View style={styles.card}>

            {/* Encabezado */}
            <View style={styles.cardHeader}>
              <Text style={styles.titulo}>
                {item.titulo}
              </Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {item.estado}
                </Text>
              </View>
            </View>

            {/* Descripción */}
            <Text
              style={styles.descripcion}
              numberOfLines={2}
            >
              {item.descripcion}
            </Text>

            {/* Información de la vacante */}
            <View style={styles.info}>
              <Text style={styles.infoText}>
                {item.ubicacion}
              </Text>

              <Text style={styles.infoText}>
                {item.tipo_contrato}
              </Text>

              {/* Modalidad SIN MUNDITOS */}
              <Text style={styles.infoText}>
                {item.modalidad || "presencial"}
              </Text>

              <Text style={styles.sueldo}>
                ${Number(item.sueldo || 0).toLocaleString("es-CO")}
              </Text>
            </View>

            {/* Botones de acciones */}
            <View style={styles.cardFooter}>

              {/* Botón ver detalle */}
              <TouchableOpacity
                style={styles.btnPostular}
                onPress={() =>
                  router.push({
                    pathname: "/(drawer)/vacante",
                    params: {
                      id: item.id_vacante,
                    },
                  } as any)
                }
              >
                <Text style={styles.btnText}>
                  Ver detalle &gt;
                </Text>
              </TouchableOpacity>

              {/* Botón compartir */}
              <TouchableOpacity
                style={styles.btnCompartir}
                onPress={() => compartirVacante(item)}
              >
                <Text style={styles.btnCompartirText}>
                  ↗
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      />

    </View>
  );
}

// ESTILOS DE LA PANTALLA
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  saludoBox: {
    padding: 16,
    paddingBottom: 8,
  },

  saludo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a5f",
  },

  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  searchBox: {
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#111827",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  btnLimpiar: {
    backgroundColor: "#e5e7eb",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  btnLimpiarText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Filtros
  filtrosLista: {
    flexGrow: 0,
    flexShrink: 0,
  },

  filtrosBox: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },

  filtroBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    height: 36,
    justifyContent: "center",
  },

  filtroBtnActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  filtroBtnModalidad: {
    backgroundColor: "#7c3aed",
    borderColor: "#7c3aed",
  },

  filtroText: {
    fontSize: 13,
    color: "#6b7280",
  },

  filtroTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  resultados: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    paddingBottom: 8,
    fontSize: 13,
    color: "#6b7280",
  },

  // Tarjetas de vacantes
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
    marginBottom: 8,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e3a5f",
    flex: 1,
  },

  badge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#16a34a",
    fontSize: 12,
    fontWeight: "600",
  },

  descripcion: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 10,
  },

  info: {
    gap: 4,
    marginBottom: 12,
  },

  infoText: {
    fontSize: 13,
    color: "#6b7280",
  },

  sueldo: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
  },

  // Botones
  cardFooter: {
    flexDirection: "row",
    gap: 8,
  },

  btnPostular: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  btnCompartir: {
    backgroundColor: "#f3f4f6",
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  btnCompartirText: {
    fontSize: 20,
    color: "#2563eb",
  },

  // Estado vacío
  emptyBox: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  empty: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "600",
  },

  emptyHint: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 4,
  },

});
