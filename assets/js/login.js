 // Clase Usuario (igual que en app.js)
        class Usuario {
            constructor(nombre, email, googleId = null) {
                this.nombre = nombre;
                this.email = email;
                this.googleId = googleId; // Para login con Google
                this.calificaciones = [];
            }

            agregarCalificacion(jugador, calificacion) {
                this.calificaciones.push({ jugador, calificacion });
            }

            getPromedioCalificaciones() {
                if (this.calificaciones.length === 0) return 'N/A';
                const suma = this.calificaciones.reduce((sum, c) => sum + parseInt(c.calificacion), 0);
                return (suma / this.calificaciones.length).toFixed(1);
            }
        }

        // Formulario manual
        document.getElementById('form-auth').addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('auth-nombre').value;
            const email = document.getElementById('auth-email').value;
            const usuario = new Usuario(nombre, email);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            window.location.href = 'index.html'; // Redirigir a la app principal
        });

        // Callback para Google Sign-In
        function handleGoogleSignIn(response) {
            const payload = JSON.parse(atob(response.credential.split('.')[1])); // Decodificar JWT
            const usuario = new Usuario(payload.name, payload.email, payload.sub); // sub es el Google ID
            localStorage.setItem('usuario', JSON.stringify(usuario));
            window.location.href = 'index.html'; // Redirigir a la app principal
        }