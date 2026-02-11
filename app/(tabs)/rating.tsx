import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function RatingScreen() {
  const router = useRouter();
  const [goles, setGoles] = useState('0');
  const [puntos, setPuntos] = useState(0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Final del Partido 🏁</Text>
      <Text style={styles.subtitle}>Carga las estadísticas de tu equipo</Text>

      {/* Selector de Jugador (Simulado) */}
      <View style={styles.card}>
        <Text style={styles.label}>Jugador a calificar</Text>
        <Text style={styles.playerName}>Ezequiel (Tú)</Text>
      </View>

      {/* Sección de Goles */}
      <View style={styles.card}>
        <Text style={styles.label}>Goles Marcados</Text>
        <View style={styles.counterRow}>
           <TouchableOpacity onPress={() => setGoles(Math.max(0, parseInt(goles) - 1).toString())} style={styles.btnMini}><Text style={styles.btnText}>-</Text></TouchableOpacity>
           <TextInput 
            style={styles.inputGoles} 
            keyboardType="numeric" 
            value={goles} 
            onChangeText={setGoles}
           />
           <TouchableOpacity onPress={() => setGoles((parseInt(goles) + 1).toString())} style={styles.btnMini}><Text style={styles.btnText}>+</Text></TouchableOpacity>
        </View>
      </View>

      {/* Sección de Estrellas (Rendimiento General) */}
      <View style={styles.card}>
        <Text style={styles.label}>Rendimiento General</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity key={num} onPress={() => setPuntos(num)}>
              <Text style={[styles.star, { color: puntos >= num ? '#fbbf24' : '#4b5563' }]}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.mainButton} 
        onPress={() => {
          alert('¡Estadísticas guardadas!');
          router.replace('/home');
        }}
      >
        <Text style={styles.mainButtonText}>SUBIR PUNTUACIÓN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 50 },
  header: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#94a3b8', fontSize: 16, marginBottom: 20 },
  card: { backgroundColor: '#1e293b', padding: 20, borderRadius: 15, marginBottom: 15 },
  label: { color: '#94a3b8', fontSize: 14, marginBottom: 10, textTransform: 'uppercase' },
  playerName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  counterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  inputGoles: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginHorizontal: 20, textAlign: 'center' },
  btnMini: { backgroundColor: '#334155', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 24 },
  starRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  star: { fontSize: 40, marginHorizontal: 5 },
  mainButton: { backgroundColor: '#22c55e', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  mainButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cancelText: { color: '#94a3b8', textAlign: 'center', marginTop: 20, marginBottom: 40 }
});