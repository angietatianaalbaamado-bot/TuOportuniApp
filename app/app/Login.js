import React from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import Logo from '../assets/logo.png';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <TextInput placeholder="Correo" style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />
      <Button title="Ingresar" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 150, height: 150, marginBottom: 20 },
  input: { width: '100%', padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 }
});
