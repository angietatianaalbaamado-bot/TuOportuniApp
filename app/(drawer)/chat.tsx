import { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getData } from '../../src/services/storageService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Chat() {
  const { id_chat, nombre_empresa } = useLocalSearchParams();
  const router = useRouter();
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const flatListRef = useRef<FlatList>(null);

  const cargarMensajes = async () => {
    try {
      const token = await getData('token');
      const res = await fetch(`${API_URL}/api/chats/${id_chat}/mensajes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMensajes(data);
    } catch (error) {
      console.error('Error cargando mensajes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const u = await getData('usuario');
      console.log('Usuario cargado:', u); // <-- para verificar que tenga "rol"
      setUsuario(u);
      cargarMensajes();
    };
    init();
    const intervalo = setInterval(cargarMensajes, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

    if (!usuario?.rol) {
      Alert.alert('Error', 'No se encontró el rol del usuario. Intenta iniciar sesión de nuevo.');
      return;
    }

    setEnviando(true);
    try {
      const token = await getData('token');
      const payload = { contenido: mensaje, emisor: usuario?.rol };
      console.log('Enviando payload:', payload); // <-- revisa esto en consola de Expo

      const res = await fetch(`${API_URL}/api/chats/${id_chat}/mensajes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Error del servidor:', errorData);
        Alert.alert('Error', errorData.mensaje || 'No se pudo enviar el mensaje');
        return;
      }

      setMensaje('');
      cargarMensajes();
    } catch (error) {
      console.error('Error enviando mensaje', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={80}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
          <Text style={styles.btnBackText}>← Volver</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{nombre_empresa || 'Chat'}</Text>
          <Text style={styles.headerSub}>Conversacion activa</Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={mensajes}
        keyExtractor={(item: any) => item.id_mensaje.toString()}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.empty}>No hay mensajes aun</Text>
            <Text style={styles.emptyHint}>Se el primero en escribir</Text>
          </View>
        }
        renderItem={({ item }: any) => {
          const esMio = item.emisor === usuario?.rol;
          return (
            <View style={[styles.burbuja, esMio ? styles.burbujaPropia : styles.burbujaAjena]}>
              <Text style={[styles.burbujaTexto, esMio ? styles.textoPropio : styles.textoAjeno]}>
                {item.contenido}
              </Text>
              <Text style={styles.hora}>
                {new Date(item.fecha_envio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          );
        }}
      />

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={mensaje}
          onChangeText={setMensaje}
          multiline
        />
        <TouchableOpacity style={styles.btnEnviar} onPress={enviarMensaje} disabled={enviando}>
          <Text style={styles.btnEnviarText}>{enviando ? '...' : '➤'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#1e3a5f', paddingTop: 50, paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  btnBack: { padding: 8 },
  btnBackText: { color: '#93c5fd', fontSize: 16 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerSub: { color: '#93c5fd', fontSize: 12 },
  burbuja: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 4 },
  burbujaPropia: { backgroundColor: '#2563eb', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  burbujaAjena: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 4, elevation: 1 },
  burbujaTexto: { fontSize: 15 },
  textoPropio: { color: '#fff' },
  textoAjeno: { color: '#1e3a5f' },
  hora: { fontSize: 10, color: '#93c5fd', marginTop: 4, textAlign: 'right' },
  inputBox: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', gap: 8, alignItems: 'flex-end' },
  input: { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, maxHeight: 100 },
  btnEnviar: { backgroundColor: '#2563eb', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  btnEnviarText: { color: '#fff', fontSize: 18 },
  emptyBox: { alignItems: 'center', marginTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  empty: { fontSize: 16, color: '#6b7280', fontWeight: '600' },
  emptyHint: { fontSize: 13, color: '#9ca3af', marginTop: 4 },
});
