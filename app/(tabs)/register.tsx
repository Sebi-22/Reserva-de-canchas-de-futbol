import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    club: '',
    posicion: '',
    barrio: ''
  });

  const handleRegister = () => {
    if (form.nombre && form.club && form.posicion) {
      // Pasamos TODO el objeto form como parámetros
      router.replace({
        pathname: '/home',
        params: { ...form }
      });
    } else {
      alert("Completá nombre, club y posición para seguir.");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nueva Ficha 📋</Text>
        <Text style={styles.subtitle}>Configurá tu perfil de jugador</Text>

        <View style={styles.inputGroup}>
          <TextInput placeholder="Nombre" placeholderTextColor="#94a3b8" style={styles.input} 
            onChangeText={(t) => setForm({...form, nombre: t})} />
          <TextInput placeholder="Apellido" placeholderTextColor="#94a3b8" style={styles.input} 
            onChangeText={(t) => setForm({...form, apellido: t})} />
          <TextInput placeholder="Edad" placeholderTextColor="#94a3b8" style={styles.input} keyboardType="numeric" 
            onChangeText={(t) => setForm({...form, edad: t})} />
          <TextInput placeholder="Club (Hincha de...)" placeholderTextColor="#94a3b8" style={styles.input} 
            onChangeText={(t) => setForm({...form, club: t})} />
          <TextInput placeholder="Posición" placeholderTextColor="#94a3b8" style={styles.input} 
            onChangeText={(t) => setForm({...form, posicion: t})} />
          <TextInput placeholder="Barrio" placeholderTextColor="#94a3b8" style={styles.input} 
            onChangeText={(t) => setForm({...form, barrio: t})} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTRARSE</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#0f172a', padding: 25, paddingTop: 60, flexGrow: 1 },
  title: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  subtitle: { color: '#94a3b8', fontSize: 16, marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  input: { backgroundColor: '#1e293b', color: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#334155' },
  button: { backgroundColor: '#22c55e', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});