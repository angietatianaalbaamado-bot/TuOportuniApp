import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { removeData } from "../../src/services/storageService";

export default function Settings() {
  const router = useRouter();
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [sonido, setSonido] = useState(true);

  const cerrarSesion = async () => {
    Alert.alert("Cerrar sesion", "¿Estas seguro que deseas cerrar sesion?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesion",
        style: "destructive",
        onPress: async () => {
          await removeData("token");
          await removeData("usuario");
          router.replace("/(auth)" as any);
        },
      },
    ]);
  };

  const eliminarCuenta = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Estas seguro? Esta accion no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () =>
            Alert.alert(
              "Proximamente",
              "Esta funcion estara disponible pronto",
            ),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuracion</Text>
        <Text style={styles.headerSub}>Personaliza tu experiencia</Text>
      </View>

      {/* Notificaciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Notificaciones</Text>
        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Notificaciones push</Text>
            <Text style={styles.itemDesc}>
              Recibe alertas de nuevas vacantes
            </Text>
          </View>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: "#d1d5db", true: "#bfdbfe" }}
            thumbColor={notificaciones ? "#2563eb" : "#9ca3af"}
          />
        </View>
        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Sonido</Text>
            <Text style={styles.itemDesc}>Sonido en notificaciones</Text>
          </View>
          <Switch
            value={sonido}
            onValueChange={setSonido}
            trackColor={{ false: "#d1d5db", true: "#bfdbfe" }}
            thumbColor={sonido ? "#2563eb" : "#9ca3af"}
          />
        </View>
      </View>

      {/* Apariencia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Apariencia</Text>
        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Modo oscuro</Text>
            <Text style={styles.itemDesc}>Cambiar tema de la app</Text>
          </View>
          <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            trackColor={{ false: "#d1d5db", true: "#bfdbfe" }}
            thumbColor={modoOscuro ? "#2563eb" : "#9ca3af"}
          />
        </View>
      </View>

      {/* Acerca de */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Acerca de</Text>
        <TouchableOpacity style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Version</Text>
            <Text style={styles.itemDesc}>1.0.0</Text>
          </View>
          <Text style={styles.arrow}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => Alert.alert("Terminos", "Proximamente disponible")}
        >
          <View>
            <Text style={styles.itemTitle}>Terminos y condiciones</Text>
            <Text style={styles.itemDesc}>Lee nuestros terminos</Text>
          </View>
          <Text style={styles.arrow}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => Alert.alert("Privacidad", "Proximamente disponible")}
        >
          <View>
            <Text style={styles.itemTitle}>Politica de privacidad</Text>
            <Text style={styles.itemDesc}>Como usamos tus datos</Text>
          </View>
          <Text style={styles.arrow}></Text>
        </TouchableOpacity>
        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>Desarrolladora</Text>
            <Text style={styles.itemDesc}>Angie Tatiana Alba Amado SENA</Text>
          </View>
        </View>
      </View>

      {/* Cuenta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Cuenta</Text>
        <TouchableOpacity style={styles.item} onPress={cerrarSesion}>
          <Text style={styles.itemTitleDanger}> Cerrar sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={eliminarCuenta}>
          <Text style={styles.itemTitleDanger}> Eliminar cuenta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
         2025 TuOportuniApp  Todos los derechos reservados
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    backgroundColor: "#1e3a5f",
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  headerSub: { color: "#93c5fd", fontSize: 14, marginTop: 4 },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6b7280",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  itemTitle: { fontSize: 15, color: "#1e3a5f", fontWeight: "500" },
  itemDesc: { fontSize: 12, color: "#9ca3af", marginTop: 2 },
  itemTitleDanger: { fontSize: 15, color: "#dc2626", fontWeight: "500" },
  arrow: { fontSize: 16, color: "#9ca3af" },
  footer: { textAlign: "center", color: "#9ca3af", fontSize: 12, padding: 24 },
});
