import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function Register() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <Text style={{ fontSize: 22 }}>Registro</Text>

      <Button
        title="Crear cuenta"
        onPress={() => router.replace('/(auth)')}
      />
    </View>
  );
}
