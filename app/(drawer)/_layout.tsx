import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function CustomDrawer(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 24, paddingTop: 48, backgroundColor: '#1e3a5f', alignItems: 'center', marginBottom: 8 }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: 80, height: 80, marginBottom: 8 }}
          resizeMode="contain"
        />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>TuOportuniApp</Text>
        <Text style={{ color: '#93c5fd', fontSize: 12 }}>Conectamos talento con oportunidades</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#1e3a5f' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          drawerActiveTintColor: '#2563eb',
          drawerInactiveTintColor: '#6b7280',
          drawerStyle: { backgroundColor: '#fff' },
        }}
      >
        <Drawer.Screen name="home" options={{ title: 'Inicio', drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
       <Drawer.Screen name="postulaciones" options={{ title: 'Mis postulaciones', drawerIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />, headerShown: false }} />
        <Drawer.Screen name="profile" options={{ title: 'Mi perfil', drawerIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }} />
        <Drawer.Screen name="vacante" options={{ title: 'Detalle vacante', drawerItemStyle: { display: 'none' }, headerShown: false }} />
       <Drawer.Screen name="chat" options={{ title: 'Mis chats', drawerIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />, headerShown: false }} />
        <Drawer.Screen name="settings" options={{ title: 'Configuracion', drawerIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> }} />
        <Drawer.Screen name="entrevistas" options={{ title: 'Mis entrevistas', drawerIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />, headerShown: false }} />
        <Drawer.Screen name="editarperfil" options={{ title: 'Editar perfil', drawerItemStyle: { display: 'none' }, headerShown: false }} />
        <Drawer.Screen name="notificaciones" options={{ title: 'Notificaciones', drawerIcon: ({ color, size }) => <Ionicons name="notifications" size={size} color={color} />, headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}