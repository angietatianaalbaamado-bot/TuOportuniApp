
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { getData, removeData } from '../../src/services/storageService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Profile() {
  const [usuario, setUsuario] = useState<any>(null);
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const u = await getData('usuario');
      setUsuario(u);
      const token = await getData('token');
      try {
        const res = await fetch(`${API_URL}/api/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPerfil(data);
      } catch (error) {
        console.error('Error cargando perfil', error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const cerrarSesion = async () => {
    await removeData('token');
    await removeData('usuario');
    router.replace('/(auth)');
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {usuario?.nombre?.charAt(0)}{usuario?.apellido?.charAt(0) || usuario?.nombre?.charAt(1)}
          </Text>
        </View>
        <Text style={styles.nombre}>{usuario?.nombre} {usuario?.apellido || ''}</Text>
        <View style={styles.rolBadge}>
          <Text style={styles.rolText}>
            {usuario?.rol === 'candidato' ? '👤 Candidato' : '🏢 Empresa'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informacion personal</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📧 Correo</Text>
          <Text style={styles.infoValue}>{usuario?.correo || 'No disponible'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>💼 Profesion</Text>
          <Text style={styles.infoValue}>{perfil?.profesion || 'Sin especificar'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>⭐ Experiencia</Text>
          <Text style={styles.infoValue}>{perfil?.experiencia || 'Sin especificar'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🛠 Habilidades</Text>
          <Text style={styles.infoValue}>{perfil?.habilidades || 'Sin especificar'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones</Text>
        <TouchableOpacity style={styles.btnAccion} onPress={() => router.push('/(tabs)/postulaciones')}>
          <Text style={styles.btnAccionText}>📄 Ver mis postulaciones</Text>
          <Text style={styles.btnAccionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAccion}>
          <Text style={styles.btnAccionText}>✏️ Editar perfil</Text>
          <Text style={styles.btnAccionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAccion}>
          <Text style={styles.btnAccionText}>📅 Mis entrevistas</Text>
          <Text style={styles.btnAccionArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnCerrar} onPress={cerrarSesion}>
        <Text style={styles.btnCerrarText}>🚪 Cerrar sesion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#1e3a5f', padding: 32, alignItems: 'center', paddingTop: 60 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  nombre: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  rolBadge: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  rolText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  section: { backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 16, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  infoLabel: { fontSize: 14, color: '#6b7280', flex: 1 },
  infoValue: { fontSize: 14, color: '#1e3a5f', fontWeight: '500', flex: 1, textAlign: 'right' },
  btnAccion: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  btnAccionText: { fontSize: 15, color: '#1e3a5f' },
  btnAccionArrow: { fontSize: 16, color: '#6b7280' },
  btnCerrar: { margin: 16, backgroundColor: '#fee2e2', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 40 },
  btnCerrarText: { color: '#dc2626', fontWeight: 'bold', fontSize: 15 },
});