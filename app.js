class Usuario {
    constructor(correo, nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.correo = correo;
    }
}

class Juego {
    constructor() {
        this.usuarios = []; 
        this.usuarioActual = null;
    }

    registrar(correo, nombre, contraseña) {
        if (this.usuarios.some(usuario => usuario.nombre === nombre)) {
            alert("Usuario ya registrado.");
            return false;
        } else if (this.usuarios.some(usuario => usuario.correo === correo)) {
            alert("Correo ya registrado.");
            return false;
        }

        const nuevoUsuario = new Usuario(correo, nombre, contraseña);
        this.usuarios.push(nuevoUsuario);
        alert("Registro exitoso. Por favor, inicia sesión.");
        return true;
    }

    iniciarSesion(nombre, contraseña) {
        const usuario = this.usuarios.find(
            usuario => usuario.nombre === nombre && usuario.contraseña === contraseña
        );
        if (usuario) {
            this.usuarioActual = usuario;
            return true;
        }
        alert("Usuario o contraseña incorrectos.");
        return false;
    }

    cerrarSesion() {
        this.usuarioActual = null;
    }

    jugar(eleccion) {
        const opciones = ["piedra", "papel", "tijeras"];
        const eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)];
        let resultado;
        if (eleccion === eleccionComputadora) {
            resultado = `Empate! Ambos eligieron ${eleccion}.`;
        } else if (
            (eleccion === "piedra" && eleccionComputadora === "tijeras") ||
            (eleccion === "papel" && eleccionComputadora === "piedra") ||
            (eleccion === "tijeras" && eleccionComputadora === "papel")
        ) {
            resultado = `Ganaste! Tu elegiste ${eleccion} y la computadora eligió ${eleccionComputadora}.`;
        } else {
            resultado = `Perdiste! Tu elegiste ${eleccion} y la computadora eligió ${eleccionComputadora}.`;
        }

        return { resultado, eleccion, eleccionComputadora };
    }
}

// Controlador de la Aplicación
class App {
    constructor() {
        this.juego = new Juego();
    }

    toggleForms() {
        document.getElementById("login-form").classList.toggle("active");
        document.getElementById("register-form").classList.toggle("active");
    }

    register() {
        const correo = document.getElementById("register-correo").value;
        const nombre = document.getElementById("register-username").value;
        const contraseña = document.getElementById("register-password").value;

        if (nombre && contraseña && correo) {
            if (this.juego.registrar(correo, nombre, contraseña)) {
                this.toggleForms();
            }
        } else {
            alert("Por favor, complete todos los campos.");
        }
    }

    login() {
        const nombre = document.getElementById("login-username").value;
        const contraseña = document.getElementById("login-password").value;
        if (this.juego.iniciarSesion(nombre, contraseña)) {
            document.getElementById("form-container").classList.add("hidden");
            document.getElementById("game-container").classList.remove("hidden");
        }
    }

    logout() {
        this.juego.cerrarSesion();
        document.getElementById("form-container").classList.remove("hidden");
        document.getElementById("game-container").classList.add("hidden");
    }

    play(eleccion) {
        const { resultado, eleccion: userChoice, eleccionComputadora: compChoice } = this.juego.jugar(eleccion);
        const battleAnimation = document.getElementById("battle-animation");
        const resultElement = document.getElementById("result");

        battleAnimation.innerHTML = `${userChoice} vs ${compChoice}`;
        battleAnimation.classList.remove("hidden");

        setTimeout(() => {
            resultElement.innerHTML = resultado;
            battleAnimation.classList.add("hidden");
        }, 1000);
    }
}

const app = new App();
