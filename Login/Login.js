//Acceso de usuarios
const usuarios = [
  {
    usuario: "Elizabeth26",
    contraseña: "TCP2025",
    rol: "denunciante"
  },
  {
    usuario: "Marena",
    contraseña: "Admin2025",
    rol: "administrador"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.querySelector('input[name="uname"]').value;
      const clave = document.querySelector('input[name="psw"]').value;

      // Buscar usuario en la lista
      const usuarioEncontrado = usuarios.find(
        user => user.usuario === nombre && user.contraseña === clave
      );

      if (usuarioEncontrado) {
        localStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioEncontrado));

        // Redirigir según el rol
        if (usuarioEncontrado.rol === "administrador") {
          window.location.href = "/dashboard.html";
        } else {
          window.location.href = "../Inicio/Inicio.html";
        }
      } else {
        alert("Usuario o contraseña incorrecta");
      }
    });
  }
});


// Obtener el modal
var modal = document.getElementById('modalIniciarSesion');

window.addEventListener('click', function(event) {
  // Si el clic no ocurrió dentro del modal
  if (event.target == modal) {
    // Cerrar el modal (puedes usar tu lógica para cerrarlo)
    modal.style.display = "none"; // o modal.classList.add('oculto');
  }
});

window.onclick = function(event) {
    modal.close()
}