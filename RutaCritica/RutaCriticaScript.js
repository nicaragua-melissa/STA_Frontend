// ========== MENU LATERAL EXPANDIBLE Y RESPONSIVO ==========
const sidebar = document.getElementById('menuLateral');
const toggleSidebar = document.getElementById('toggleSidebar');
const menuOverlay = document.getElementById('menuOverlay');

function openSidebarMobile() {
    sidebar.classList.add('menu-visible');
    menuOverlay.classList.add('active');
}
function closeSidebarMobile() {
    sidebar.classList.remove('menu-visible');
    menuOverlay.classList.remove('active');
}
toggleSidebar.addEventListener('click', function () {
    if (window.innerWidth <= 700) {
        if (sidebar.classList.contains('menu-visible')) {
            closeSidebarMobile();
        } else {
            openSidebarMobile();
        }
    }
});
menuOverlay.addEventListener('click', closeSidebarMobile);
window.addEventListener('resize', function() {
    if (window.innerWidth > 700) {
        closeSidebarMobile();
    }
});

// ========== NOTIFICACIONES ==========
function mostrarNotificacion(mensaje, tipo = 'success') {
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
    noti.textContent = mensaje;
    if (tipo === 'success') {
        noti.style.background = 'var(--forest-green)';
        noti.style.color = 'var(--light)';
        noti.style.border = '1.5px solid var(--olivine)';
    } else {
        noti.style.background = '#e57373';
        noti.style.color = 'var(--light)';
        noti.style.border = '1.5px solid #c62828';
    }
    noti.style.opacity = '1';
    setTimeout(() => {
        noti.style.opacity = '0';
    }, 1200);
}

// ========== FORMULARIO Y TABLA  ==========
const municipios = {
    "Nueva Segovia": ["Santa María", "Macuelizo", "Dipilto", "Ocotal", "Mozonte", "San Fernando", "Ciudad Antigua", "El Jícaro", "Jalapa", "Murra", "Quilalí", "Wiwilí de Nueva Segovia"],
    "Madriz": ["Somoto", "Totogalpa", "Telpaneca", "San Juan del Río Coco", "Yalagüina", "Palacagüina", "San Lucas", "Las Sabanas", "San José de Cusmapa"],
    "Estelí": ["Pueblo Nuevo", "Condega", "San Juan de Limay", "Estelí", "La Trinidad", "San Nicolás"],
    "Chinandega": ["El Viejo", "Puerto Morazán", "Somotillo", "Santo Tomás del Norte", "Cinco Pinos", "San Pedro del Norte", "San Francisco del Norte", "Villanueva", "Chinandega", "El Realejo", "Corinto", "Chichigalpa", "Posoltega"],
    "León": ["León", "Quezalguaque", "Telica", "Larreynaga", "El Sauce", "Achuapa", "Santa Rosa del Peñón", "El Jicaral", "La Paz Centro", "Nagarote"],
    "Managua": ["San Francisco Libre", "Tipitapa", "Mateare", "Villa El Carmen", "San Rafael del Sur", "Managua", "Ticuantepe", "El Crucero", "Ciudad Sandino"],
    "Masaya": ["La Concepción", "Nindirí", "Masaya", "Tisma", "Masatepe", "Nandasmo", "Catarina", "Niquinohomo", "San Juan de Oriente"],
    "Carazo": ["San Marcos", "Diriamba", "Dolores", "Jinotepe", "El Rosario", "La Paz de Carazo", "Santa Teresa", "La Conquista"],
    "Granada": ["Granada", "Diriá", "Diriomo", "Nandaime"],
    "Rivas": ["Tola", "Belén", "Potosí", "Buenos Aires", "Rivas", "San Jorge", "San Juan del Sur", "Cárdenas", "Moyogalpa", "Altagracia"],
    "Boaco": ["San José de los Remates", "Teustepe", "Santa Lucía", "Boaco", "Camoapa", "San Lorenzo"],
    "Chontales": ["Comalapa", "Juigalpa", "La Libertad", "Santo Domingo", "San Pedro de Lóvago", "Santo Tomás", "Acoyapa", "Villa Sandino", "San Francisco de Cuapa", "El Coral"],
    "Jinotega": ["Wiwilí de Jinotega", "El Cuá", "San José de Bocay", "San Sebastián de Yalí", "La Concordia", "San Rafael del Norte", "Santa María de Pantasmal", "Jinotega"],
    "Matagalpa": ["San Isidro", "Sébaco", "Ciudad Darío", "Terrabona", "San Dionisio", "Esquipulas", "Muy Muy", "Matagalpa", "San Ramón", "El Tuma - La Dalia", "Rancho Grande", "Matiguás", "Río Blanco"],
    "Río San Juan": ["Morrito", "El Almendro", "San Miguelito", "San Carlos", "El Castillo", "San Juan de Nicaragua"],
    "REGIÓN AUTÓNOMA DE LA COSTA CARIBE NORTE": ["Puerto Cabezas", "Bonanza", "Siuna", "Rosita", "Waspán", "Prinzapolka", "Waslala", "Mulukukú"],
    "REGIÓN AUTÓNOMA DE LA COSTA CARIBE SUR": ["Paiwas", "La Cruz de Río Grande", "Laguna de Perlas", "Kukrahill", "El Rama", "Muelle de los Bueyes", "Nueva Guinea", "Bluefields", "Corn Island", "El Ayote", "Desembocadura de Río Grande", "El Tortuguero"]
};

function actualizarListaMunicipios() {
    const departamentoSeleccionado = document.getElementById('departamento').value;
    const selectMunicipio = document.getElementById('municipio');
    const municipioError = document.getElementById('municipioError');
    selectMunicipio.innerHTML = '<option value="">Seleccione un municipio</option>';
    if (departamentoSeleccionado && municipios[departamentoSeleccionado]) {
        municipios[departamentoSeleccionado].forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio;
            option.textContent = municipio;
            selectMunicipio.appendChild(option);
        });
    }
    ocultarError(document.getElementById('departamento'), document.getElementById('departamentoError'));
    ocultarError(selectMunicipio, municipioError);
}

document.getElementById('departamento').addEventListener('change', actualizarListaMunicipios);
document.getElementById('municipio').addEventListener('change', function() {
    ocultarError(document.getElementById('municipio'), document.getElementById('municipioError'));
});
actualizarListaMunicipios();

function mostrarError(input, errorDiv, mensaje) {
    input.classList.add('critical-route__input--error');
    errorDiv.textContent = mensaje;
    errorDiv.classList.add('critical-route__error', 'show');
    errorDiv.style.background = 'rgba(220,53,69,0.08)';
    errorDiv.style.borderRadius = '8px';
    errorDiv.style.padding = '6px 12px';
    errorDiv.style.marginTop = '4px';
    errorDiv.style.fontWeight = '600';
    errorDiv.style.color = '#e57373';
    errorDiv.style.boxShadow = '0 2px 8px rgba(220,53,69,0.07)';
}
function ocultarError(input, errorDiv) {
    input.classList.remove('critical-route__input--error');
    errorDiv.textContent = '';
    errorDiv.classList.remove('show');
    errorDiv.style.background = '';
    errorDiv.style.boxShadow = '';
}

function validarFormulario() {
    const departamento = document.getElementById('departamento');
    const municipio = document.getElementById('municipio');
    const nivelRuta = document.getElementById('nivel_ruta');
    const codigoRuta = document.getElementById('codigo_ruta');
    const descripcion = document.getElementById('descripcion');

    const departamentoError = document.getElementById('departamentoError');
    const municipioError = document.getElementById('municipioError');
    const nivelRutaError = document.getElementById('nivelRutaError');
    const codigoRutaError = document.getElementById('codigoRutaError');
    const descripcionError = document.getElementById('descripcionError');

    let isValid = true;

    if (!departamento.value) {
        mostrarError(departamento, departamentoError, 'Por favor, selecciona un departamento.');
        isValid = false;
    } else {
        ocultarError(departamento, departamentoError);
    }
    if (!municipio.value) {
        mostrarError(municipio, municipioError, 'Por favor, selecciona un municipio.');
        isValid = false;
    } else {
        ocultarError(municipio, municipioError);
    }
    if (!nivelRuta.value) {
        mostrarError(nivelRuta, nivelRutaError, 'Por favor, selecciona el nivel de ruta.');
        isValid = false;
    } else {
        ocultarError(nivelRuta, nivelRutaError);
    }
    if (!codigoRuta.value) {
        mostrarError(codigoRuta, codigoRutaError, 'Por favor, ingresa el código de ruta.');
        isValid = false;
    } else {
        ocultarError(codigoRuta, codigoRutaError);
    }
    if (!descripcion.value) {
        mostrarError(descripcion, descripcionError, 'Por favor, ingresa la descripción.');
        isValid = false;
    } else {
        ocultarError(descripcion, descripcionError);
    }
    return isValid;
}

// Registrar nueva ruta
const registerBtn = document.getElementById('registerButton');
registerBtn.addEventListener('click', function() {
    if (validarFormulario()) {
        const nuevoRegistro = {
            departamento: document.getElementById('departamento').value,
            municipio: document.getElementById('municipio').value,
            nivel_ruta: document.getElementById('nivel_ruta').value,
            codigo_ruta: document.getElementById('codigo_ruta').value,
            descripcion: document.getElementById('descripcion').value
        };
        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.push(nuevoRegistro);
        localStorage.setItem('registros', JSON.stringify(registros));
        document.querySelector('.critical-route__form').reset();
        mostrarRegistros();
        mostrarNotificacion('¡Ruta registrada exitosamente!', 'success');
        setTimeout(() => {
            window.location.href = '../RutaCritica/UbicarRuta/UbicarRutaIndex.html';
        }, 1200);
    } else {
        mostrarNotificacion('Por favor, corrige los errores del formulario.', 'error');
    }
});

function mostrarRegistros() {
    const tableBody = document.getElementById('tableBody');
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    tableBody.innerHTML = '';
    registros.forEach((registro, index) => {
        const row = document.createElement('tr');
        row.className = 'critical-route__table-row';
        Object.values(registro).forEach(value => {
            const td = document.createElement('td');
            td.className = 'critical-route__table-cell';
            td.textContent = value;
            row.appendChild(td);
        });
        // Editar
        const editTd = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'critical-route__button';
        editButton.style.background = 'var(--olivine)';
        editButton.style.color = 'var(--dark)';
        editButton.onclick = () => editarRegistro(index);
        editTd.appendChild(editButton);
        editTd.className = 'critical-route__table-cell';
        row.appendChild(editTd);
        // Eliminar
        const deleteTd = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'critical-route__button critical-route__button--delete';
        deleteButton.onclick = () => eliminarRegistro(index);
        deleteTd.appendChild(deleteButton);
        deleteTd.className = 'critical-route__table-cell';
        row.appendChild(deleteTd);
        tableBody.appendChild(row);
    });
}

function editarRegistro(index) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const registro = registros[index];
    document.getElementById('departamento').value = registro.departamento;
    actualizarListaMunicipios();
    document.getElementById('municipio').value = registro.municipio;
    document.getElementById('nivel_ruta').value = registro.nivel_ruta;
    document.getElementById('codigo_ruta').value = registro.codigo_ruta;
    document.getElementById('descripcion').value = registro.descripcion;
    eliminarRegistro(index);
}

function eliminarRegistro(index) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.splice(index, 1);
    localStorage.setItem('registros', JSON.stringify(registros));
    mostrarRegistros();
}

// Mostrar registros al cargar la página
mostrarRegistros();