import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Datos recibidos o por defecto
  const nombre = params.nombre || "Jugador";
  const club = params.club || "Sin Club";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>¡Hola, {nombre}! ⚽</Text>
          <Text style={styles.statsText}>{params.posicion || "Visitante"} | ⭐ 5.0</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileBadge} 
          onPress={() => router.push({ pathname: '/profile', params: params })}
        >
          <Text style={styles.badgeText}>{nombre[0]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Hincha de: {club}</Text>
        <Text style={styles.infoSubtitle}>Barrio: {params.barrio || "Desconocido"}</Text>
      </View>

      <Text style={styles.sectionTitle}>Partidos de hoy</Text>
      <FlatList
        data={[{id: '1', lugar: 'Cancha 5', hora: '20:00'}]}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.matchCard}>
            <Text style={{color: '#fff', fontSize: 18}}>{item.lugar} - {item.hora}hs</Text>
            <TouchableOpacity style={styles.btn} onPress={() => router.push('/rating')}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Puntuar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, marginBottom: 20 },
  welcome: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  statsText: { color: '#22c55e', fontSize: 16 },
  profileBadge: { backgroundColor: '#1e293b', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#22c55e' },
  badgeText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  infoCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 15, marginBottom: 20 },
  infoTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  infoSubtitle: { color: '#94a3b8', fontSize: 14, marginTop: 5 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  matchCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between' },
  btn: { backgroundColor: '#22c55e', padding: 10, borderRadius: 8 }
});