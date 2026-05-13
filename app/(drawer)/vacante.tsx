import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getData } from '../../src/services/storageService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DetalleVacante() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  console.log('ID vacante recibido:', id, typeof id);
  const [vacante, setVacante] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [postulando, setPostulando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = await getData('token');
        const res = await fetch(`${API_URL}/api/vacantes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setVacante(data);
      } catch (error) {
        console.error('Error cargando vacante', error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  const postularse = async () => {
    setPostulando(true);
    try {
      const token = await getData('token');
      const res = await fetch(`${API_URL}/api/postulaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_vacante: id }),
      });
      const data = await res.json();
      if (data.id_postulacion) {
        Alert.alert('Exito', 'Te has postulado correctamente a esta vacante.');
      } else {
        Alert.alert('Aviso', data.mensaje || 'No se pudo postular');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar la postulacion');
    } finally {
      setPostulando(false);
    }
  };

  const iniciarChat = async () => {
    try {
      if (!vacante.id_empresa) {
        Alert.alert('Error', 'Esta vacante no tiene empresa asignada');
        return;
      }
      const token = await getData('token');
      const res = await fetch(`${API_URL}/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_empresa: vacante.id_empresa }),
      });
      const data = await res.json();
      if (data.id_chat) {
        router.push({ pathname: '/chat', params: { id_chat: String(data.id_chat), nombre_empresa: 'Empresa' } } as any);
      } else {
        Alert.alert('Error', JSON.stringify(data));
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar el chat');
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />;
  if (!vacante) return <Text style={{ textAlign: 'center', marginTop: 40 }}>Vacante no encontrada</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
          <Text style={styles.btnBackText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle de vacante</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.titulo}>{vacante.titulo}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{vacante.estado}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View>
              <Text style={styles.infoLabel}>Ubicacion</Text>
              <Text style={styles.infoValue}>{vacante.ubicacion}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📋</Text>
            <View>
              <Text style={styles.infoLabel}>Tipo de contrato</Text>
              <Text style={styles.infoValue}>{vacante.tipo_contrato}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>💰</Text>
            <View>
              <Text style={styles.infoLabel}>Salario</Text>
              <Text style={styles.sueldo}>${Number(vacante.sueldo).toLocaleString()}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <View>
              <Text style={styles.infoLabel}>Publicada</Text>
              <Text style={styles.infoValue}>{new Date(vacante.fecha_publicacion).toLocaleDateString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Descripcion</Text>
          <Text style={styles.texto}>{vacante.descripcion}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Requisitos</Text>
          <Text style={styles.texto}>{vacante.requisitos}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnPostular} onPress={postularse} disabled={postulando}>
          {postulando
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnPostularText}>Postularme ahora 🚀</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnChat} onPress={iniciarChat}>
          <Text style={styles.btnChatText}>💬 Chatear con la empresa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#1e3a5f', paddingTop: 50, paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  btnBack: { padding: 8 },
  btnBackText: { color: '#93c5fd', fontSize: 16 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1 },
  card: { backgroundColor: '#fff', margin: 16, marginBottom: 0, borderRadius: 12, padding: 16, elevation: 2 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 8 },
  badge: { backgroundColor: '#dcfce7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start' },
  badgeText: { color: '#16a34a', fontWeight: '600', fontSize: 13 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  infoIcon: { fontSize: 24 },
  infoLabel: { fontSize: 12, color: '#6b7280' },
  infoValue: { fontSize: 15, color: '#1e3a5f', fontWeight: '500' },
  sueldo: { fontSize: 16, color: '#2563eb', fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 10 },
  texto: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  footer: { padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', gap: 8 },
  btnPostular: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnPostularText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  btnChat: { backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#2563eb' },
  btnChatText: { color: '#2563eb', fontSize: 16, fontWeight: 'bold' },
});