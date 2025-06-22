// ===== VARIABLES GLOBALES BEM =====
const BEM = {
    sidebar: '.sidebar',
    navbarToggle: '#toggleSidebar',
    menuOverlay: '#menuOverlay',
    form: '.critical-route__form',
    input: '#mapSearchInput',
    button: '.critical-route__button',
    map: '#map',
    clearAllBtn: '#clearAllBtn',
    tableBody: '#tableBody'
};

// ===== ESTADO DE LA APLICACIÓN =====
const AppState = {
    sidebarCollapsed: false,
    map: null,
    markers: [],
    coordinates: []
};

// ====== MENÚ LATERAL RESPONSIVO Y OVERLAY ======
const sidebar = document.querySelector(BEM.sidebar);
const toggleSidebar = document.querySelector(BEM.navbarToggle);
const menuOverlay = document.querySelector(BEM.menuOverlay);

function openSidebarMobile() {
    sidebar.classList.add('menu-visible');
    menuOverlay.classList.add('active');
}
function closeSidebarMobile() {
    sidebar.classList.remove('menu-visible');
    menuOverlay.classList.remove('active');
}
toggleSidebar?.addEventListener('click', function () {
    if (window.innerWidth <= 700) {
        if (sidebar.classList.contains('menu-visible')) {
            closeSidebarMobile();
        } else {
            openSidebarMobile();
        }
    }
});
menuOverlay?.addEventListener('click', closeSidebarMobile);
window.addEventListener('resize', function() {
    if (window.innerWidth > 700) {
        closeSidebarMobile();
    }
});


// ===== CLASE PRINCIPAL DE LA APLICACIÓN =====
class UbicarRutaApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupMap();
        this.loadCoordinates();
    }

    // ===== MANEJO DE EVENTOS =====
    bindEvents() {
        // Formulario de búsqueda
        document.querySelector(BEM.form)?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Botón de borrar todas
        document.querySelector(BEM.clearAllBtn)?.addEventListener('click', () => {
            this.clearAllCoordinates();
        });
    }

    // ===== MAPA =====
    setupMap() {
        // Usando Leaflet.js
        AppState.map = L.map('map').setView([12.1365, -86.2514], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(AppState.map);

        // Cargar marcadores guardados
        this.renderMarkers();
    }

    // ===== FORMULARIO DE BÚSQUEDA =====
    handleSearch() {
        const input = document.querySelector(BEM.input);
        if (!input) return;
        const value = input.value.trim();
        if (!value) {
            this.showNotification('Por favor ingresa coordenadas.', 'error');
            return;
        }
        const [lat, lng] = value.split(',').map(Number);
        if (
            isNaN(lat) || isNaN(lng) ||
            lat < -90 || lat > 90 ||
            lng < -180 || lng > 180
        ) {
            this.showNotification('Formato inválido. Usa: latitud,longitud (ej: 12.1365,-86.2514)', 'error');
            return;
        }
        this.addCoordinate(lat, lng);
        input.value = '';
    }

    // ===== COORDENADAS Y TABLA =====
    addCoordinate(lat, lng) {
        const coord = { lat, lng, id: Date.now() };
        AppState.coordinates.push(coord);
        this.saveCoordinates();
        this.renderMarkers();
        this.renderTable();
        if (AppState.map) {
            AppState.map.setView([lat, lng], 15); // Centra y acerca el mapa al nuevo punto
        }
        this.showNotification('¡Coordenada registrada correctamente!', 'success');
    }

    renderMarkers() {
        if (!AppState.map) return;
        // Limpiar marcadores previos
        if (AppState.markers.length) {
            AppState.markers.forEach(marker => AppState.map.removeLayer(marker));
            AppState.markers = [];
        }
        // Agregar nuevos
        AppState.coordinates.forEach(coord => {
            const marker = L.marker([coord.lat, coord.lng]).addTo(AppState.map);
            marker.bindPopup(`Lat: ${coord.lat}<br>Lng: ${coord.lng}`);
            AppState.markers.push(marker);
        });
    }

    renderTable() {
        const tbody = document.querySelector(BEM.tableBody);
        if (!tbody) return;
        tbody.innerHTML = '';
        AppState.coordinates.forEach(coord => {
            const tr = document.createElement('tr');
            tr.className = 'critical-route__table-row';
            tr.innerHTML = `
                <td class="critical-route__table-cell">${coord.lat}</td>
                <td class="critical-route__table-cell">${coord.lng}</td>
                <td class="critical-route__table-cell">
                    <button class="critical-route__button" type="button" onclick="window.app.editCoordinate(${coord.id})">
                        <i class='bx bx-edit-alt'></i> Editar
                    </button>
                </td>
                <td class="critical-route__table-cell">
                    <button class="critical-route__button critical-route__button--delete" type="button" onclick="window.app.deleteCoordinate(${coord.id})">
                        <i class='bx bx-trash'></i> Eliminar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    editCoordinate(id) {
        const coord = AppState.coordinates.find(c => c.id === id);
        if (!coord) return;
        const input = document.querySelector(BEM.input);
        if (input) input.value = `${coord.lat},${coord.lng}`;
        this.deleteCoordinate(id);
    }

    deleteCoordinate(id) {
        AppState.coordinates = AppState.coordinates.filter(c => c.id !== id);
        this.saveCoordinates();
        this.renderMarkers();
        this.renderTable();
        this.showNotification('Coordenada eliminada.', 'success');
    }

    clearAllCoordinates() {
        AppState.coordinates = [];
        this.saveCoordinates();
        this.renderMarkers();
        this.renderTable();
        this.showNotification('Todas las coordenadas han sido eliminadas.', 'success');
    }

    saveCoordinates() {
        localStorage.setItem('ubicarRutaCoords', JSON.stringify(AppState.coordinates));
    }

    loadCoordinates() {
        const coords = JSON.parse(localStorage.getItem('ubicarRutaCoords') || '[]');
        AppState.coordinates = coords;
        this.renderMarkers();
        this.renderTable();
    }

    // ===== NOTIFICACIONES =====
    showNotification(message, type = 'success') {
        let noti = document.getElementById('notificacionGlobal');
        if (!noti) {
            noti = document.createElement('div');
            noti.id = 'notificacionGlobal';
            noti.style.position = 'fixed';
            noti.style.top = '90px';
            noti.style.right = '30px';
            noti.style.zIndex = '3000';
            noti.style.minWidth = '220px';
            noti.style.padding = '1rem 1.5rem';
            noti.style.borderRadius = '12px';
            noti.style.fontWeight = '600';
            noti.style.fontSize = '1rem';
            noti.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)';
            noti.style.transition = 'opacity 0.3s';
            document.body.appendChild(noti);
        }
        noti.textContent = message;
        if (type === 'success') {
            noti.style.background = 'linear-gradient(90deg, var(--forest-green), var(--dark-green))';
            noti.style.color = 'var(--light)';
            noti.style.border = '1.5px solid var(--olivine)';
        } else {
            noti.style.background = 'linear-gradient(90deg, #e57373, #b91c1c)';
            noti.style.color = 'var(--light)';
            noti.style.border = '1.5px solid #e57373';
        }
        noti.style.opacity = '1';
        setTimeout(() => {
            noti.style.opacity = '0';
        }, 2200);
    }
}

// ===== INICIALIZAR APP =====
window.app = new UbicarRutaApp();