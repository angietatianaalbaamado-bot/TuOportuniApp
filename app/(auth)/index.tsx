import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Animated } from 'react-native';
import { router } from 'expo-router';

export default function AuthIndex() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a5f" />

      {/* Fondo superior con animación */}
      <Animated.View style={[styles.topSection, { opacity: fadeAnim }]}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>TuOportuniApp</Text>
        <Text style={styles.tagline}>Conectamos talento con oportunidades</Text>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>500+</Text>
            <Text style={styles.statLabel}>Vacantes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>200+</Text>
            <Text style={styles.statLabel}>Empresas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>1000+</Text>
            <Text style={styles.statLabel}>Candidatos</Text>
          </View>
        </View>
      </Animated.View>

      {/* Sección inferior con animación */}
      <Animated.View style={[styles.bottomSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.titulo}>Encuentra tu próximo empleo 💼</Text>
        <Text style={styles.subtitulo}>
          Miles de vacantes verificadas te esperan. Postúlate fácil, rápido y seguro.
        </Text>

        <TouchableOpacity
          style={styles.btnPrimario}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimarioText}>🔑 Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecundario}
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnSecundarioText}>✨ Crear cuenta gratis</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          © 2025 TuOportuniApp · Angie Tatiana Alba Amado
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e3a5f' },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  logo: { width: 110, height: 110, marginBottom: 16 },
  appName: { fontSize: 34, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
  tagline: { fontSize: 14, color: '#93c5fd', marginTop: 8, marginBottom: 24 },
  stats: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 12, color: '#93c5fd' },
  statDivider: { width: 1, height: 30, backgroundColor: '#93c5fd', opacity: 0.4 },
  bottomSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    paddingBottom: 48,
  },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 10 },
  subtitulo: { fontSize: 14, color: '#6b7280', lineHeight: 22, marginBottom: 28 },
  btnPrimario: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  btnPrimarioText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  btnSecundario: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  btnSecundarioText: { color: '#2563eb', fontSize: 16, fontWeight: 'bold' },
  footer: { textAlign: 'center', color: '#9ca3af', fontSize: 12 },
});