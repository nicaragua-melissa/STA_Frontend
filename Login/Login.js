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

document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("track");
    const prevButton = document.getElementById("button-prev");
    const nextButton = document.getElementById("button-next");

    const itemWidth = document.querySelector(".carousel-item").offsetWidth;
    let position = 0;

    nextButton.addEventListener("click", () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (position < maxScroll) {
            position += itemWidth + 15; // 15px es el espacio entre imágenes
            track.style.transform = `translateX(-${position}px)`;
        }
    });

    prevButton.addEventListener("click", () => {
        if (position > 0) {
            position -= itemWidth + 15;
            track.style.transform = `translateX(-${position}px)`;
        }
    });
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