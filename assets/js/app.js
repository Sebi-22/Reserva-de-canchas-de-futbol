// 1. Importaciones necesarias (Usando la versión que elegiste)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
    getFirestore, 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Tu configuración (Mantenemos tus claves)
const firebaseConfig = {
    apiKey: "AIzaSyCEFmEHwAexwAPQlCe_R_zXoUKU1yA7XRU",
    authDomain: "falta-uno-fc329.firebaseapp.com",
    projectId: "falta-uno-fc329",
    storageBucket: "falta-uno-fc329.firebasestorage.app",
    messagingSenderId: "35076766299",
    appId: "1:35076766299:web:8659e9c36def3c0e171d7e",
    measurementId: "G-H1WSWSPG19"
};

// 3. Inicialización
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- LÓGICA DE USUARIO ---

// Función para entrar con Google
window.loginConGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Usuario entró:", result.user.displayName);
    } catch (error) {
        console.error("Error al entrar:", error);
        alert("No se pudo iniciar sesión");
    }
};

// Función para salir
window.cerrarSesion = () => {
    signOut(auth);
};

// Escuchar si el usuario está adentro o afuera
onAuthStateChanged(auth, (user) => {
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');

    if (user) {
        // Usuario logueado
        if(loginPage) loginPage.style.display = 'none';
        if(mainApp) mainApp.style.display = 'block';
        console.log("Bienvenido:", user.displayName);
    } else {
        // Usuario fuera
        if(loginPage) loginPage.style.display = 'block';
        if(mainApp) mainApp.style.display = 'none';
    }
});

// --- LÓGICA DE PARTIDOS ---

// Función para crear un partido en la base de datos
window.crearPartido = async () => {
    const lugar = prompt("¿Dónde es el partido?");
    if (!lugar) return;

    try {
        await addDoc(collection(db, "partidos"), {
            lugar: lugar,
            organizador: auth.currentUser.displayName,
            fecha: new Date().toLocaleString(),
            timestamp: Date.now()
        });
        alert("¡Partido creado!");
    } catch (e) {
        console.error("Error guardando partido: ", e);
    }
};