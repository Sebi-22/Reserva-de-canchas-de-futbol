import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  
  // Estados para cada dato pedido
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [club, setClub] = useState('');
  const [posicion, setPosicion] = useState('');
  const [barrio, setBarrio] = useState('');

  const handleRegister = () => {
    if (nombre && apellido && club) {
      alert(`¡Bienvenido ${nombre}! Registro exitoso.`);
      router.replace('/home'); // Lo manda al Home después de registrarse
    } else {
      alert("Por favor, completá los campos principales");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ficha del Jugador 📝</Text>
        <Text style={styles.subtitle}>Completá tu perfil para empezar a jugar</Text>

        <View style={styles.inputGroup}>
          <TextInput placeholder="Nombre" placeholderTextColor="#94a3b8" style={styles.input} onChangeText={setNombre} />
          <TextInput placeholder="Apellido" placeholderTextColor="#94a3b8" style={styles.input} onChangeText={setApellido} />
          <TextInput placeholder="Edad" placeholderTextColor="#94a3b8" style={styles.input} keyboardType="numeric" onChangeText={setEdad} />
          <TextInput placeholder="Club del cual sos hincha" placeholderTextColor="#94a3b8" style={styles.input} onChangeText={setClub} />
          <TextInput placeholder="Posición (Ej: Delantero, DFC)" placeholderTextColor="#94a3b8" style={styles.input} onChangeText={setPosicion} />
          <TextInput placeholder="Barrio" placeholderTextColor="#94a3b8" style={styles.input} onChangeText={setBarrio} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CREAR CUENTA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>Volver al Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#0f172a', padding: 25, paddingTop: 60, flexGrow: 1 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#94a3b8', fontSize: 16, marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  input: { backgroundColor: '#1e293b', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: '#22c55e', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  linkText: { color: '#94a3b8', textAlign: 'center', marginTop: 20, fontSize: 14 }
});