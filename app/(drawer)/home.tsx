import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl, TextInput, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { getData } from '../../src/services/storageService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const normalizar = (str: string) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function Home() {
  const router = useRouter();
  const [vacantes, setVacantes] = useState([]);
  const [vacantesFilter, setVacantesFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroContrato, setFiltroContrato] = useState('Todos');
  const [filtroModalidad, setFiltroModalidad] = useState('Todas');

  const contratos = ['Todos', 'Termino indefinido', 'Termino fijo', 'Prestacion de servicios'];
  const modalidades = ['Todas', 'presencial', 'remoto', 'hibrido'];

  const cargarVacantes = async () => {
    try {
      const token = await getData('token');
      const res = await fetch(`${API_URL}/api/vacantes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setVacantes(data);
      setVacantesFilter(data);
    } catch (error) {
      console.error('Error cargando vacantes', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const u = await getData('usuario');
      setUsuario(u);
      cargarVacantes();
    };
    init();
  }, []);

  useEffect(() => {
    let resultado: any[] = vacantes;
    if (busqueda) {
      resultado = resultado.filter((v: any) =>
        normalizar(v.titulo || '').includes(normalizar(busqueda)) ||
        normalizar(v.ubicacion || '').includes(normalizar(busqueda)) ||
        normalizar(v.descripcion || '').includes(normalizar(busqueda))
      );
    }
    if (filtroContrato !== 'Todos') {
      resultado = resultado.filter((v: any) =>
        normalizar(v.tipo_contrato || '').includes(normalizar(filtroContrato))
      );
    }
    if (filtroModalidad !== 'Todas') {
      resultado = resultado.filter((v: any) =>
        normalizar(v.modalidad || 'presencial').includes(normalizar(filtroModalidad))
      );
    }
    setVacantesFilter(resultado);
  }, [busqueda, filtroContrato, filtroModalidad, vacantes]);

  const onRefresh = () => {
    setRefreshing(true);
    cargarVacantes();
  };

  const compartirVacante = async (item: any) => {
    try {
      await Share.share({
        message: `🚀 Oportunidad laboral: ${item.titulo}\n📍 ${item.ubicacion}\n💰 $${Number(item.sueldo).toLocaleString()}\n📋 ${item.tipo_contrato}\n\nPostulate en TuOportuniApp`,
        title: item.titulo,
      });
    } catch (error) {
      console.error('Error compartiendo', error);
    }
  };

  const modalidadIcon: any = { presencial: '🏢', remoto: '🏠', hibrido: '🔄' };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />;

  return (
    <View style={styles.container}>
      <View style={styles.saludoBox}>
        <Text style={styles.saludo}>Hola, {usuario?.nombre} 👋</Text>
        <Text style={styles.subtitulo}>Encuentra tu oportunidad laboral</Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Buscar por cargo o ciudad..."
          placeholderTextColor="#9ca3af"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {busqueda.length > 0 && (
          <TouchableOpacity style={styles.btnLimpiar} onPress={() => setBusqueda('')}>
            <Text style={styles.btnLimpiarText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filtro tipo contrato */}
      <FlatList
        horizontal
        data={contratos}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtrosBox}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filtroBtn, filtroContrato === item && styles.filtroBtnActive]}
            onPress={() => setFiltroContrato(item)}
          >
            <Text style={[styles.filtroText, filtroContrato === item && styles.filtroTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Filtro modalidad */}
      <FlatList
        horizontal
        data={modalidades}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtrosBox}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filtroBtn, filtroModalidad === item && styles.filtroBtnModalidad]}
            onPress={() => setFiltroModalidad(item)}
          >
            <Text style={[styles.filtroText, filtroModalidad === item && styles.filtroTextActive]}>
              {modalidadIcon[item] || '🌐'} {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.resultados}>
        {vacantesFilter.length} vacante{vacantesFilter.length !== 1 ? 's' : ''} encontrada{vacantesFilter.length !== 1 ? 's' : ''}
      </Text>

      <FlatList
        data={vacantesFilter}
        keyExtractor={(item: any) => item.id_vacante.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.empty}>No hay vacantes con ese filtro</Text>
            <Text style={styles.emptyHint}>Intenta con otra busqueda</Text>
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
            <Text style={styles.descripcion} numberOfLines={2}>{item.descripcion}</Text>
            <View style={styles.info}>
              <Text style={styles.infoText}>📍 {item.ubicacion}</Text>
              <Text style={styles.infoText}>📋 {item.tipo_contrato}</Text>
              <Text style={styles.infoText}>{modalidadIcon[item.modalidad] || '🏢'} {item.modalidad || 'presencial'}</Text>
              <Text style={styles.sueldo}>💰 ${Number(item.sueldo).toLocaleString()}</Text>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity
                style={styles.btnPostular}
                onPress={() => router.push({ pathname: '/(drawer)/vacante', params: { id: item.id_vacante } } as any)}
              >
                <Text style={styles.btnText}>Ver detalle →</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnCompartir}
                onPress={() => compartirVacante(item)}
              >
                <Text style={styles.btnCompartirText}>↗</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  saludoBox: { padding: 16, paddingBottom: 8 },
  saludo: { fontSize: 20, fontWeight: 'bold', color: '#1e3a5f' },
  subtitulo: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  searchBox: { paddingHorizontal: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 8 },
  searchInput: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 15, color: '#111827', elevation: 2, borderWidth: 1, borderColor: '#e5e7eb' },
  btnLimpiar: { backgroundColor: '#e5e7eb', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  btnLimpiarText: { color: '#6b7280', fontSize: 14, fontWeight: 'bold' },
  filtrosBox: { paddingHorizontal: 16, paddingBottom: 8, gap: 8 },
  filtroBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', height: 36, justifyContent: 'center' },
  filtroBtnActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  filtroBtnModalidad: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  filtroText: { fontSize: 13, color: '#6b7280' },
  filtroTextActive: { color: '#fff', fontWeight: 'bold' },
  resultados: { paddingHorizontal: 16, paddingBottom: 8, fontSize: 13, color: '#6b7280' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  titulo: { fontSize: 17, fontWeight: 'bold', color: '#1e3a5f', flex: 1 },
  badge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#16a34a', fontSize: 12, fontWeight: '600' },
  descripcion: { fontSize: 13, color: '#6b7280', marginBottom: 10 },
  info: { gap: 4, marginBottom: 12 },
  infoText: { fontSize: 13, color: '#6b7280' },
  sueldo: { fontSize: 14, color: '#2563eb', fontWeight: '600' },
  cardFooter: { flexDirection: 'row', gap: 8 },
  btnPostular: { flex: 1, backgroundColor: '#2563eb', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  btnCompartir: { backgroundColor: '#f3f4f6', width: 44, height: 44, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb' },
  btnCompartirText: { fontSize: 20, color: '#2563eb' },
  emptyBox: { alignItems: 'center', marginTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  empty: { fontSize: 16, color: '#6b7280', fontWeight: '600' },
  emptyHint: { fontSize: 13, color: '#9ca3af', marginTop: 4 },
});