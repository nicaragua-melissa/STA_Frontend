// Elementos del DOM
const sidebar = document.getElementById('menuLateral');
const content = document.getElementById('content');
const toggleSidebar = document.querySelector('.nav__toggle-sidebar');
const searchInput = document.querySelector('.nav__form-group--input');

// Estado del sidebar
let sidebarHidden = false;
let isMobile = window.innerWidth <= 1000;

// Variables para los gráficos
let denunciasChart, estadosChart, tendenciasChart, areasChart;
let map;

// Datos de ejemplo para las denuncias
const denunciasData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [{
        label: 'Denuncias Recibidas',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: 'rgba(55, 150, 52, 0.2)',
        borderColor: 'rgba(55, 150, 52, 1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true
    }]
};

// Datos de ejemplo para estados de denuncias
const estadosData = {
    labels: ['En Investigación', 'Resuelto', 'Pendiente', 'Archivado'],
    datasets: [{
        data: [30, 45, 15, 10],
        backgroundColor: [
            'rgba(255, 152, 0, 0.8)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(33, 150, 243, 0.8)',
            'rgba(158, 158, 158, 0.8)'
        ],
        borderWidth: 2,
        borderColor: '#fff'
    }]
};

// Datos de ejemplo para tendencias
const tendenciasData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
        label: 'Tráfico de Animales',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(244, 67, 54, 1)',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3
    }, {
        label: 'Caza Ilegal',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgba(255, 152, 0, 1)',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3
    }]
};

// Datos de ejemplo para áreas protegidas
const areasData = {
    labels: ['Bosawás', 'Indio Maíz', 'Mombacho', 'Masaya', 'Otros'],
    datasets: [{
        label: 'Incidentes Reportados',
        data: [12, 19, 8, 15, 6],
        backgroundColor: [
            'rgba(55, 150, 52, 0.8)',
            'rgba(131, 179, 130, 0.8)',
            'rgba(0, 128, 0, 0.8)',
            'rgba(28, 103, 6, 0.8)',
            'rgba(207, 207, 207, 0.8)'
        ],
        borderWidth: 2,
        borderColor: '#fff'
    }]
};

// Función para crear overlay móvil
function createMobileOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeMobileSidebar);
    document.body.appendChild(overlay);
    return overlay;
}

// Función para abrir sidebar móvil
function openMobileSidebar() {
    if (sidebar) {
        sidebar.classList.add('mobile-open');
        const overlay = document.querySelector('.sidebar-overlay') || createMobileOverlay();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar sidebar móvil
function closeMobileSidebar() {
    if (sidebar) {
        sidebar.classList.remove('mobile-open');
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
}

// Función para alternar el sidebar
function toggleSidebarFunction() {
    if (isMobile) {
        // En móvil, alternar entre abierto y cerrado
        if (sidebar.classList.contains('mobile-open')) {
            closeMobileSidebar();
        } else {
            openMobileSidebar();
        }
    } else {
        // En desktop, alternar entre expandido y colapsado
        sidebarHidden = !sidebarHidden;
        
        if (sidebarHidden) {
            sidebar.classList.add('hide');
        } else {
            sidebar.classList.remove('hide');
        }
    }
}

// Event listener para el botón del sidebar
if (toggleSidebar) {
    toggleSidebar.addEventListener('click', toggleSidebarFunction);
}

// Función para inicializar gráficos
function initializeCharts() {
    // Configuración común para todos los gráficos
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        family: 'Open Sans',
                        size: 12
                    },
                    color: '#333',
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#379634',
                borderWidth: 1,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        family: 'Open Sans',
                        size: 12
                    },
                    color: '#666'
                }
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        family: 'Open Sans',
                        size: 12
                    },
                    color: '#666'
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        elements: {
            point: {
                radius: 6,
                hoverRadius: 8
            }
        }
    };

    // Gráfico de denuncias por mes
    const denunciasCtx = document.getElementById('denunciasChart');
    if (denunciasCtx) {
        denunciasChart = new Chart(denunciasCtx, {
            type: 'line',
            data: denunciasData,
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        position: 'top'
                    }
                }
            }
        });
    }

    // Gráfico de estados de denuncias
    const estadosCtx = document.getElementById('estadosChart');
    if (estadosCtx) {
        estadosChart = new Chart(estadosCtx, {
            type: 'doughnut',
            data: estadosData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Open Sans',
                                size: 12
                            },
                            color: '#333',
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#379634',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                cutout: '60%'
            }
        });
    }

    // Gráfico de tendencias
    const tendenciasCtx = document.getElementById('tendenciasChart');
    if (tendenciasCtx) {
        tendenciasChart = new Chart(tendenciasCtx, {
            type: 'line',
            data: tendenciasData,
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        position: 'top'
                    }
                }
            }
        });
    }

    // Gráfico de áreas protegidas
    const areasCtx = document.getElementById('areasChart');
    if (areasCtx) {
        areasChart = new Chart(areasCtx, {
            type: 'bar',
            data: areasData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#379634',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                family: 'Open Sans',
                                size: 12
                            },
                            color: '#666'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Open Sans',
                                size: 12
                            },
                            color: '#666'
                        }
                    }
                }
            }
        });
    }
}

// Función para inicializar el mapa con Leaflet
function initializeMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Crear el mapa centrado en Nicaragua
    map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true,
        tap: true
    }).setView([12.8654, -85.2072], 7);

    // Agregar capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 5
    }).addTo(map);

    // Datos de áreas protegidas en Nicaragua
    const areasProtegidas = [
        {
            nombre: 'Reserva Biológica Indio Maíz',
            lat: 10.8,
            lng: -83.7,
            tipo: 'Reserva Biológica',
            area: '2,639 km²'
        },
        {
            nombre: 'Reserva de la Biosfera Bosawás',
            lat: 14.0,
            lng: -85.0,
            tipo: 'Reserva de la Biosfera',
            area: '20,000 km²'
        },
        {
            nombre: 'Volcán Mombacho',
            lat: 11.85,
            lng: -85.97,
            tipo: 'Reserva Natural',
            area: '1,000 ha'
        },
        {
            nombre: 'Volcán Masaya',
            lat: 11.98,
            lng: -86.16,
            tipo: 'Parque Nacional',
            area: '54 km²'
        },
        {
            nombre: 'Isla de Ometepe',
            lat: 11.5,
            lng: -85.58,
            tipo: 'Reserva Natural',
            area: '276 km²'
        }
    ];

    // Agregar marcadores para cada área protegida
    areasProtegidas.forEach(area => {
        const marker = L.marker([area.lat, area.lng]).addTo(map);
        
        const popupContent = `
            <div style="text-align: center; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: #1c6706; font-size: 14px; font-family: 'Open Sans', sans-serif;">${area.nombre}</h3>
                <p style="margin: 4px 0; font-size: 12px; font-family: 'Open Sans', sans-serif;"><strong>Tipo:</strong> ${area.tipo}</p>
                <p style="margin: 4px 0; font-size: 12px; font-family: 'Open Sans', sans-serif;"><strong>Área:</strong> ${area.area}</p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });

    // Agregar leyenda
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
            <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: 'Open Sans', sans-serif;">
                <h4 style="margin: 0 0 8px 0; color: #1c6706; font-size: 14px;">Áreas Protegidas</h4>
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <div style="width: 12px; height: 12px; background: #1c6706; border-radius: 50%; margin-right: 8px;"></div>
                    <span style="font-size: 12px;">Reserva Biológica</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <div style="width: 12px; height: 12px; background: #379634; border-radius: 50%; margin-right: 8px;"></div>
                    <span style="font-size: 12px;">Reserva de la Biosfera</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <div style="width: 12px; height: 12px; background: #83b382; border-radius: 50%; margin-right: 8px;"></div>
                    <span style="font-size: 12px;">Parque Nacional</span>
                </div>
                <div style="display: flex; align-items: center;">
                    <div style="width: 12px; height: 12px; background: #008000; border-radius: 50%; margin-right: 8px;"></div>
                    <span style="font-size: 12px;">Reserva Natural</span>
                </div>
            </div>
        `;
        return div;
    };
    
    legend.addTo(map);
}

// Función para actualizar contadores
function updateCounters() {
    // Simular datos en tiempo real
    const totalDenuncias = 143;
    const denunciasPendientes = 28;
    const areasMonitoreadas = 15;
    const casosResueltos = 115;

    // Actualizar elementos en el DOM
    const totalElement = document.getElementById('total-denuncias');
    const pendientesElement = document.getElementById('denuncias-pendientes');
    const areasElement = document.getElementById('areas-monitoreadas');
    const resueltosElement = document.getElementById('casos-resueltos');

    if (totalElement) totalElement.textContent = totalDenuncias;
    if (pendientesElement) pendientesElement.textContent = denunciasPendientes;
    if (areasElement) areasElement.textContent = areasMonitoreadas;
    if (resueltosElement) resueltosElement.textContent = casosResueltos;
}

// Función para manejar la búsqueda
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Función para manejar el resize de la ventana
function handleResize() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 1000;
    
    // Si cambió de desktop a móvil o viceversa
    if (wasMobile !== isMobile) {
        if (isMobile) {
            // Cambió a móvil, cerrar sidebar si está abierto
            closeMobileSidebar();
        } else {
            // Cambió a desktop, remover clases móviles
            if (sidebar) {
                sidebar.classList.remove('mobile-open');
            }
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.remove();
            }
            document.body.style.overflow = '';
        }
    }
}

// Función para manejar notificaciones
function handleNotifications() {
    // Simular notificaciones
    const notifications = [
        { type: 'success', message: 'Nueva denuncia registrada' },
        { type: 'warning', message: 'Alerta en área protegida' },
        { type: 'info', message: 'Actualización de sistema' }
    ];
    
    console.log('Notificaciones:', notifications);
}

// Función para manejar mensajes
function handleMessages() {
    // Simular mensajes
    const messages = [
        { from: 'Admin', subject: 'Reporte mensual', time: '2 min' },
        { from: 'Sistema', subject: 'Backup completado', time: '5 min' }
    ];
    
    console.log('Mensajes:', messages);
}

// Función para animar contadores
function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Función para animar los contadores al cargar
function animateCounters() {
    const counters = document.querySelectorAll('.cuadro h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.textContent = '0';
        animateCounter(counter, target);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gráficos
    initializeCharts();
    
    // Inicializar mapa
    initializeMap();
    
    // Actualizar contadores
    updateCounters();
    
    // Animar contadores
    setTimeout(animateCounters, 500);
    
    // Event listener para búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Event listener para resize de ventana
    window.addEventListener('resize', handleResize);
    
    // Inicializar notificaciones y mensajes
    handleNotifications();
    handleMessages();
    
    // Simular actualizaciones en tiempo real
    setInterval(() => {
        updateCounters();
    }, 30000); // Actualizar cada 30 segundos
});

// Función para manejar la navegación del menú
function handleMenuNavigation() {
    const menuLinks = document.querySelectorAll('#menuLateral .menuLateral__side-menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remover clase active de todos los enlaces
            menuLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // En móvil, cerrar el sidebar después de hacer clic
            if (isMobile) {
                closeMobileSidebar();
            }
            
            // Aquí puedes agregar lógica para mostrar diferentes secciones
            const target = this.getAttribute('href');
            console.log('Navegando a:', target);
        });
    });
}

// Inicializar navegación del menú
handleMenuNavigation();

// Función para manejar el perfil de usuario
function handleUserProfile() {
    const profileImg = document.querySelector('.nav__profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            // Aquí puedes agregar lógica para mostrar menú de perfil
            console.log('Perfil de usuario clickeado');
        });
    }
}

// Inicializar manejo de perfil
handleUserProfile();