import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';

// Simulamos que estos datos vienen del Registro/Base de Datos
const USUARIO_LOGUEADO = {
  nombre: "Ezequiel",
  posicion: "Delantero",
  club: "Boca Juniors",
  barrio: "Palermo",
  estrellas: 4.8
};

const PARTIDOS_ACTUALES = [
  { id: '1', complejo: 'Cancha El Fortín', hora: '21:00', jugadores: '8/10', precio: '$3000' },
  { id: '2', complejo: 'La Bombonerita', hora: '22:30', jugadores: '5/10', precio: '$2500' },
  { id: '3', complejo: 'Punto Gol', hora: '19:00', jugadores: '10/10', precio: '$3500' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* CABECERA CON PERFIL */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>¡Hola, {USUARIO_LOGUEADO.nombre}! 👋</Text>
          <Text style={styles.statsText}>
            {USUARIO_LOGUEADO.posicion} | ⭐ {USUARIO_LOGUEADO.estrellas}
          </Text>
        </View>
        <TouchableOpacity style={styles.profileBadge} onPress={() => alert('Próximamente: Tu Perfil')}>
          <Text style={styles.badgeText}>{USUARIO_LOGUEADO.nombre[0]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Hincha de: {USUARIO_LOGUEADO.club}</Text>
        <Text style={styles.infoSubtitle}>Zona: {USUARIO_LOGUEADO.barrio}</Text>
      </View>

      <Text style={styles.sectionTitle}>Partidos cerca tuyo</Text>

      <FlatList
        data={PARTIDOS_ACTUALES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.matchCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.matchPlace}>{item.complejo}</Text>
              <Text style={styles.matchDetails}>{item.hora} hs • {item.jugadores} jugadores</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.matchPrice}>{item.precio}</Text>
              <TouchableOpacity 
                style={styles.btnAnotarse} 
                onPress={() => router.push('/rating')}
              >
                <Text style={styles.btnText}>Anotarse</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* BOTÓN FLOTANTE PARA CREAR PARTIDO */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => alert('Crear nuevo partido')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingHorizontal: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 40, 
    marginBottom: 20 
  },
  welcome: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statsText: { color: '#22c55e', fontSize: 14, fontWeight: '600' },
  profileBadge: { 
    backgroundColor: '#1e293b', 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22c55e'
  },
  badgeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  infoCard: { 
    backgroundColor: '#1e293b', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 25 
  },
  infoTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  infoSubtitle: { color: '#94a3b8', fontSize: 14 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  matchCard: { 
    backgroundColor: '#1e293b', 
    padding: 15, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  matchPlace: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  matchDetails: { color: '#94a3b8', fontSize: 13, marginTop: 4 },
  matchPrice: { color: '#22c55e', fontWeight: 'bold', marginBottom: 5 },
  btnAnotarse: { 
    backgroundColor: '#22c55e', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 8 
  },
  btnText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  fab: { 
    position: 'absolute', 
    bottom: 30, 
    right: 30, 
    backgroundColor: '#22c55e', 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  fabIcon: { color: '#fff', fontSize: 30, fontWeight: 'bold' }
});