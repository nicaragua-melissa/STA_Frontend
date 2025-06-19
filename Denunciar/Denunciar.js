// Permisos de usuario

document.addEventListener("DOMContentLoaded", () => {
  validarAcceso("denunciante");
  mostrarMenuSegunRol();
});

const allDropdown = document.querySelectorAll('#menuLateral .menuLateral__side-dropdown');
const sidebar = document.getElementById('menuLateral');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}
		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})

// COLAPSO DE LA BARRA LATERAL
const toggleSidebar = document.querySelector('nav .nav__toggle-sidebar');
const allSideDivider = document.querySelectorAll('#menuLateral .nav__divider');
console.log(toggleSidebar)

if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})

sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})

sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})

// PROFILE DROPDOWN
const profile = document.querySelector('nav .nav__profile');
const imgProfile = profile.querySelector('.nav__profile-img');
const dropdownProfile = profile.querySelector('.nav__profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})

// MENU
const allMenu = document.querySelectorAll('main .data__content-data .head .menu');
allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})



window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})


// Local Storage
document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const reportData = {
        reportType: document.getElementById("reportType").value,
        personDescription: document.getElementById("personDescription").value,
        incidentDescription: document.getElementById("incidentDescription").value,
        location: document.getElementById("location").value,
        zone: document.getElementById("zone").value,
        date: document.getElementById("date").value,
        speciesAffected: document.getElementById("speciesAffected").value,
        criticalPath: document.getElementById("criticalPath").value
    };

    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(reportData);
    localStorage.setItem("reports", JSON.stringify(reports));

    alert("Denuncia guardada correctamente.");
    document.getElementById("reportForm").reset();
    displayReports();
});

// Función para mostrar las denuncias en la tabla
function displayReports() {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    const reportList = document.getElementById("reportList");
    reportList.innerHTML = "";

    reports.forEach((report, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${report.reportType}</td>
            <td>${report.personDescription}</td>
            <td>${report.location}</td>
            <td>${report.date}</td>
            <td>${report.criticalPath}</td>
            <td><button onclick="editReport(${index})">Editar</button></td>
            <td><button onclick="deleteReport(${index})">Eliminar</button></td>
        `;

        reportList.appendChild(row); 
    });
}

// Función para eliminar un registro
function deleteReport(index) {
    let reports = JSON.parse(localStorage.getItem("reports"));
    reports.splice(index, 1);
    localStorage.setItem("reports", JSON.stringify(reports));
    displayReports();
}

// Función para editar un registro
function editReport(index) {
    let reports = JSON.parse(localStorage.getItem("reports"));
    const report = reports[index];

    document.getElementById("reportType").value = report.reportType;
    document.getElementById("personDescription").value = report.personDescription;
    document.getElementById("incidentDescription").value = report.incidentDescription;
    document.getElementById("location").value = report.location;
    document.getElementById("zone").value = report.zone;
    document.getElementById("date").value = report.date;
    document.getElementById("speciesAffected").value = report.speciesAffected;
    document.getElementById("criticalPath").value = report.criticalPath;

    reports.splice(index, 1);
    localStorage.setItem("reports", JSON.stringify(reports));
    displayReports();
}

// Mostrar denuncias al cargar la página
document.addEventListener("DOMContentLoaded", displayReports);