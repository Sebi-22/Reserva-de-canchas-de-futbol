import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Iconos que ya vienen en Expo

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#22c55e',
      tabBarInactiveTintColor: '#94a3b8',
      tabBarStyle: {
        backgroundColor: '#1e293b',
        borderTopColor: '#334155',
        height: 60,
        paddingBottom: 10,
      },
      headerShown: false, // Ocultamos el título de arriba para que sea más limpia
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name="football" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rating"
        options={{
          title: 'Puntuar',
          tabBarIcon: ({ color }) => <Ionicons name="star" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
      {/* Ocultamos las pantallas que no queremos en el Navbar */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="register" options={{ href: null }} />
    </Tabs>
  );
}