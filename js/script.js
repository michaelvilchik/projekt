document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        service: document.getElementById('serviceModal'),
        login: document.getElementById('loginModal'),
        register: document.getElementById('registerModal')
    };

    const buttons = {
        login: document.getElementById('loginButton'),
        register: document.getElementById('registerButton'),
        closeBtns: document.querySelectorAll('.modal__close')
    };

    const forms = {
        login: document.getElementById('loginForm'),
        register: document.getElementById('registerForm'),
        booking: document.getElementById('bookingForm')
    };

    const serviceCards = document.querySelectorAll('.service-card');

    const serviceDescriptions = {
        'Расклад на Таро': 'Глубокий анализ вашей ситуации с помощью карт Таро. Расклады на отношения, карьеру, финансы и другие сферы жизни. Длительность сеанса - 1 час.',
        'Подробный разбор натальной карты': 'Детальный анализ вашей натальной карты, включающий описание характера, талантов, жизненных задач и потенциальных возможностей. Длительность консультации - 2 часа.',
        'Отлив заговорённых свечей': 'Изготовление индивидуальных свечей с учетом ваших целей и потребностей. Каждая свеча создается в определенное время с использованием специальных заговоров и природных материалов.'
    };

    const openModal = (modal) => {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    buttons.login.addEventListener('click', () => openModal(modals.login));
    buttons.register.addEventListener('click', () => openModal(modals.register));

    buttons.closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            Object.values(modals).forEach(modal => closeModal(modal));
        });
    });

    window.addEventListener('click', (e) => {
        Object.values(modals).forEach(modal => {
            if (e.target === modal) closeModal(modal);
        });
    });

    const handleServiceCardClick = (serviceCard) => {
        const serviceData = {
            title: serviceCard.querySelector('.service-card__title').textContent,
            image: serviceCard.querySelector('.service-card__image').src,
            schedule: serviceCard.querySelector('.service-card__schedule').textContent,
            price: serviceCard.querySelector('.service-card__price').textContent
        };

        const modalBody = modals.service.querySelector('.modal__body');
        modalBody.innerHTML = `
            <div class="service-details">
                <img class="service-details__image" src="${serviceData.image}" alt="${serviceData.title}">
                <h3 class="service-details__title">${serviceData.title}</h3>
                <p class="service-details__description">${serviceDescriptions[serviceData.title] || 'Описание временно недоступно'}</p>
                <div class="service-details__info">
                    <p class="service-details__schedule">${serviceData.schedule}</p>
                    <p class="service-details__price">${serviceData.price}</p>
                </div>
            </div>
        `;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const bookingDateInput = document.getElementById('bookingDate');
        if (bookingDateInput) {
            bookingDateInput.min = tomorrow.toISOString().split('T')[0];
        }

        openModal(modals.service);
    };

    serviceCards.forEach(card => {
        card.addEventListener('click', () => handleServiceCardClick(card));
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleServiceCardClick(card);
            }
        });
    });

    if (forms.booking) {
        forms.booking.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('bookingName').value,
                phone: document.getElementById('bookingPhone').value,
                date: document.getElementById('bookingDate').value,
                time: document.getElementById('bookingTime').value,
                comments: document.getElementById('bookingComments').value
            };
            
            console.log('Booking details:', formData);
            
            forms.booking.reset();
            closeModal(modals.service);
            
            alert('Спасибо за вашу заявку! Мы свяжемся с вами для подтверждения записи.');
        });
    }

    forms.login.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        };
        closeModal(modals.login);
    });

    forms.register.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value
        };
        closeModal(modals.register);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.values(modals).forEach(modal => closeModal(modal));
        }
    });
}); 