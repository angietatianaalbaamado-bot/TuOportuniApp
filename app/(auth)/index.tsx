import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function AuthIndex() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>TuOportuniApp</Text>

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
