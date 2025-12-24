import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

const API_URL = 'http://192.168.1.18:4000'; // tu IP

export default function AuthIndex() {
  const [status, setStatus] = useState('Comprobando backend...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/health`);
        const data = await res.json();

        if (data.ok) {
          setStatus('Backend OK');
        } else {
          setStatus('Backend con problemas');
        }
      } catch (error) {
        setStatus('Error al conectar con el backend');
      }
    };

    checkHealth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>TuOportuniApp</Text>

      <Text style={{ marginVertical: 10 }}>{status}</Text>

      <Button
        title="Iniciar sesión"
        onPress={() => router.push('/login')}
      />

      <Button
        title="Registrarse"
        onPress={() => router.push('/register')}
      />
    </View>
  );
}
