import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
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
    router.replace('/(auth)' as any);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {usuario?.nombre?.charAt(0)}{usuario?.apellido?.charAt(0)}
            </Text>
          </View>
        </View>
        <Text style={styles.nombre}>{usuario?.nombre} {usuario?.apellido || ''}</Text>
        <Text style={styles.correo}>{usuario?.correo}</Text>
        <View style={styles.rolBadge}>
          <Text style={styles.rolText}>
            {usuario?.rol === 'candidato' ? '👤 Candidato' : '🏢 Empresa'}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>1</Text>
          <Text style={styles.statLabel}>Postulaciones</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>0</Text>
          <Text style={styles.statLabel}>Entrevistas</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>1</Text>
          <Text style={styles.statLabel}>Chats</Text>
        </View>
      </View>

      {/* Info profesional */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informacion profesional</Text>
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

      {/* Acciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones</Text>
        <TouchableOpacity style={styles.btnAccion} onPress={() => router.push('/(drawer)/postulaciones' as any)}>
          <Text style={styles.btnAccionIcon}>📄</Text>
          <Text style={styles.btnAccionText}>Ver mis postulaciones</Text>
          <Text style={styles.btnAccionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAccion} onPress={() => router.push('/(drawer)/editarperfil' as any)}>
          <Text style={styles.btnAccionIcon}>✏️</Text>
          <Text style={styles.btnAccionText}>Editar perfil</Text>
          <Text style={styles.btnAccionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAccion} onPress={() => router.push('/(drawer)/entrevistas' as any)}>
          <Text style={styles.btnAccionIcon}>📅</Text>
          <Text style={styles.btnAccionText}>Mis entrevistas</Text>
          <Text style={styles.btnAccionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAccion} onPress={() => router.push('/(drawer)/notificaciones' as any)}>
          <Text style={styles.btnAccionIcon}>🔔</Text>
          <Text style={styles.btnAccionText}>Notificaciones</Text>
          <Text style={styles.btnAccionArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Cerrar sesion */}
      <TouchableOpacity style={styles.btnCerrar} onPress={cerrarSesion}>
        <Text style={styles.btnCerrarText}>🚪 Cerrar sesion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#1e3a5f', paddingTop: 30, paddingBottom: 24, alignItems: 'center' },
  avatarContainer: { marginBottom: 12 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#93c5fd' },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  nombre: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  correo: { color: '#93c5fd', fontSize: 13, marginBottom: 10 },
  rolBadge: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  rolText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  stats: { flexDirection: 'row', backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 16, elevation: 2, justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: 'bold', color: '#1e3a5f' },
  statLabel: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  statDivider: { width: 1, backgroundColor: '#e5e7eb' },
  section: { backgroundColor: '#fff', margin: 16, marginTop: 0, borderRadius: 12, padding: 16, elevation: 2 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  infoLabel: { fontSize: 14, color: '#6b7280' },
  infoValue: { fontSize: 14, color: '#1e3a5f', fontWeight: '500', maxWidth: '55%', textAlign: 'right' },
  btnAccion: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', gap: 10 },
  btnAccionIcon: { fontSize: 18 },
  btnAccionText: { fontSize: 15, color: '#1e3a5f', flex: 1 },
  btnAccionArrow: { fontSize: 16, color: '#9ca3af' },
  btnCerrar: { margin: 16, backgroundColor: '#fee2e2', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 40 },
  btnCerrarText: { color: '#dc2626', fontWeight: 'bold', fontSize: 15 },
});