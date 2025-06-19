// Función para obtener usuario autenticado
function obtenerUsuario() {
  return JSON.parse(localStorage.getItem("usuarioAutenticado"));
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioAutenticado");
  window.location.href = "index.html";
}

// Función para validar acceso según rol
function validarAcceso(rolPermitido) {
  const usuario = obtenerUsuario();
  if (!usuario || usuario.rol !== rolPermitido) {
    alert("Acceso denegado");
    window.location.href = "index.html";
  }
}

// Función para mostrar menú según el rol del usuario
function mostrarMenuSegunRol() {
  const usuario = obtenerUsuario();
  const menuAdmin = document.querySelector(".menu-admin");

  if (menuAdmin) {
    menuAdmin.style.display = usuario && usuario.rol === "administrador" ? "block" : "none";
  }
}

// Validación en todas las páginas
document.addEventListener("DOMContentLoaded", () => {
  const usuario = obtenerUsuario();

  if (!usuario) {
    window.location.href = "/Login/login.html";
    return;
  }

  mostrarMenuSegunRol();
});