import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEFmEHwAexwAPQlCe_R_zXoUKU1yA7XRU",
    authDomain: "falta-uno-fc329.firebaseapp.com",
    projectId: "falta-uno-fc329",
    storageBucket: "falta-uno-fc329.firebasestorage.app",
    messagingSenderId: "35076766299",
    appId: "1:35076766299:web:8659e9c36def3c0e171d7e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- FUNCIONES GLOBALES (Expuestas a window para evitar ReferenceError) ---

window.toggleAuth = (isRegister) => {
    document.getElementById('login-actions').style.display = isRegister ? 'none' : 'block';
    document.getElementById('register-actions').style.display = isRegister ? 'block' : 'none';
    document.getElementById('extra-fields').style.display = isRegister ? 'block' : 'none';
};

window.emailRegister = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    const confirmPass = document.getElementById('reg-confirm-pass')?.value; // Usando el id de tu confirmación
    
    const name = document.getElementById('reg-name').value;
    const nickname = document.getElementById('reg-nickname-main').value;
    const phone = document.getElementById('reg-phone').value;

    if (!email || !pass || !name || !nickname || !phone) return alert("Completa los campos con (*)");
    
    // Validación de contraseñas iguales
    if (confirmPass && pass !== confirmPass) return alert("Las contraseñas no coinciden");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        await setDoc(doc(db, "usuarios", userCredential.user.uid), {
            nombreReal: name, nickname, telefono: phone,
            pais: document.getElementById('reg-country').value,
            ciudad: document.getElementById('reg-city').value,
            posicion: "Sin definir", nivel: "5", photo: "https://via.placeholder.com/150"
        });
    } catch (e) { alert("Error: " + e.message); }
};

window.emailLogin = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    try { await signInWithEmailAndPassword(auth, email, pass); } catch (e) { alert("Datos incorrectos"); }
};

window.loginConGoogle = async () => {
    try { await signInWithPopup(auth, provider); } catch (e) { alert("Error de dominio: verifica la consola de Firebase"); }
};

window.cerrarSesion = () => signOut(auth);

// --- ESTADO Y PARTIDOS ---

onAuthStateChanged(auth, async (user) => {
    const loginPage = document.getElementById('login-page');
    const mainApp = document.getElementById('main-app');
    if (user) {
        const docSnap = await getDoc(doc(db, "usuarios", user.uid));
        if (docSnap.exists()) {
            loginPage.style.display = 'none';
            mainApp.style.display = 'block';
            // Render user info...
            escucharPartidos();
        } else {
            loginPage.style.display = 'flex';
            window.toggleAuth(true); 
        }
    } else {
        loginPage.style.display = 'flex';
        mainApp.style.display = 'none';
    }
});

function escucharPartidos() {
    const q = query(collection(db, "partidos"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snap) => {
        const list = document.getElementById('matches-list');
        list.innerHTML = "";
        snap.forEach(d => {
            const m = d.data();
            list.innerHTML += `<div class="player-card"><h5>📍 ${m.lugar}</h5><p>Faltan: ${m.faltan}</p></div>`;
        });
    }, (error) => { console.error("Error de permisos:", error); });
}