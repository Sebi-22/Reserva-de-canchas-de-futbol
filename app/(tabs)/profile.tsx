import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProfileScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{params.nombre ? params.nombre[0] : '?'}</Text>
      </View>
      
      <Text style={styles.name}>{params.nombre} {params.apellido}</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>ESTADÍSTICAS</Text>
        <Text style={styles.info}>⚽ Club: {params.club}</Text>
        <Text style={styles.info}>🏃 Posición: {params.posicion}</Text>
        <Text style={styles.info}>📍 Barrio: {params.barrio}</Text>
        <Text style={styles.info}>🎂 Edad: {params.edad} años</Text>
      </View>

      <TouchableOpacity style={styles.logout} onPress={() => router.replace('/')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', padding: 25, paddingTop: 80 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#22c55e', justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 10 },
  avatarText: { color: '#fff', fontSize: 50, fontWeight: 'bold' },
  name: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  card: { width: '100%', backgroundColor: '#1e293b', padding: 25, borderRadius: 20, borderWidth: 1, borderColor: '#334155' },
  label: { color: '#22c55e', fontSize: 12, fontWeight: 'bold', marginBottom: 15, letterSpacing: 2 },
  info: { color: '#f8fafc', fontSize: 18, marginBottom: 12 },
  logout: { marginTop: 50 },
  logoutText: { color: '#ef4444', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }
});