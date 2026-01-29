import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONFIGURACIÓN (Reemplaza con tus datos de Firebase Console)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT.appspot.com",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ELEMENTOS DEL DOM
const loginPage = document.getElementById('login-page');
const mainApp = document.getElementById('main-app');
const googleBtn = document.getElementById('google-login');

// --- 1. AUTENTICACIÓN ---

// Login con Google
googleBtn.onclick = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error en Login:", error);
    }
};

// Observador de estado (Detecta si el usuario está logueado o no)
onAuthStateChanged(auth, (user) => {
    if (user) {
        showSection(mainApp);
        loadMatches();
    } else {
        showSection(loginPage);
    }
});

function logout() {
    signOut(auth);
}

// Navegación fluida entre pantallas
function showSection(section) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
    section.classList.add('active-section');
}

// --- 2. BASE DE DATOS (CRUD Partidos) ---

async function loadMatches() {
    const q = query(collection(db, "matches"), orderBy("date", "desc"));
    
    // Escuchar cambios en tiempo real
    onSnapshot(q, (snapshot) => {
        const container = document.getElementById('matches-container');
        container.innerHTML = "";
        
        snapshot.forEach((doc) => {
            const match = doc.data();
            container.innerHTML += `
                <div class="player-card animate__animated animate__fadeInUp">
                    <div class="d-flex justify-content-between">
                        <h6 class="mb-0">📍 ${match.location}</h6>
                        <span class="badge bg-success">${match.playersNeeded} lugares</span>
                    </div>
                    <p class="small text-muted mb-0 mt-2">Organiza: ${match.organizer}</p>
                    <button class="btn btn-outline-primary btn-sm mt-3 w-100">Sumarme</button>
                </div>
            `;
        });
    });
}

// Exponer funciones al window para que el HTML las vea
window.logout = logout;