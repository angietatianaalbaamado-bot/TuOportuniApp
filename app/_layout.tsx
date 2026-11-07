import { useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import { View, Image, Text, Animated, StyleSheet } from "react-native";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(onFinish);
      }, 1500);
    });
  }, []);

  return (
    <View style={styles.splash}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.splashLogo}
          resizeMode="contain"
        />
        <Text style={styles.splashTitle}>TuOportuniApp</Text>
        <Text style={styles.splashTagline}>
          Conectamos talento con oportunidades
        </Text>
      </Animated.View>
    </View>
  );
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="chat" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#1e3a5f",
    justifyContent: "center",
    alignItems: "center",
  },
  splashLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  splashTagline: {
    fontSize: 14,
    color: "#93c5fd",
    marginTop: 8,
  },
});
