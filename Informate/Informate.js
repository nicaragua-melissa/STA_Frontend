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



/*Carrusel*/
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("track");
    const prevButton = document.getElementById("button-prev");
    const nextButton = document.getElementById("button-next");
    const items = document.querySelectorAll(".carousel-item");

    let currentIndex = 0;
    let autoSlideInterval;

    function updateCarousel() {
        const offset = currentIndex * 100; // Cambia 100 si el ancho de los elementos es diferente
        track.style.transform = `translateX(-${offset}%)`;

        // Actualiza el estado de los botones
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= items.length - 1;
    }

    function nextSlide() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volver al inicio
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1; // Ir al final
        }
        updateCarousel();
    }

    function startAutoSlide() {
        stopAutoSlide(); // Limpiar cualquier intervalo existente
        autoSlideInterval = setInterval(nextSlide, 3000); // Cambiar cada 3 segundos
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Event listeners para los botones
    nextButton.addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevButton.addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Pausar el auto-slide cuando el mouse está sobre el carrusel
    track.addEventListener("mouseenter", stopAutoSlide);
    track.addEventListener("mouseleave", startAutoSlide);

    // Inicializar el carrusel
    updateCarousel();
    startAutoSlide();
});