/*
 * Алгоритм обработки клика по карточке услуги и открытия модального окна
 * ======================================================================
 * Блок-схема: https://drive.google.com/file/d/1your_file_id/view
 * 
 * Алгоритм:
 * 1. Инициализация слушателей событий при загрузке DOM
 * 2. При клике на карточку услуги:
 *    2.1. Получение данных из карточки (название, изображение, расписание, цена)
 *    2.2. Получение описания услуги из предопределенного объекта
 *    2.3. Формирование HTML-контента для модального окна
 *    2.4. Установка минимальной даты для бронирования (завтрашний день)
 *    2.5. Открытие модального окна
 * 3. Обработка закрытия модального окна:
 *    3.1. По клику на крестик
 *    3.2. По клику вне модального окна
 *    3.3. По нажатию клавиши Escape
 * 4. Обработка отправки формы бронирования:
 *    4.1. Сбор данных из формы
 *    4.2. Логирование данных в консоль
 *    4.3. Очистка формы и закрытие модального окна
 */

document.addEventListener('DOMContentLoaded', () => {
    // Основные элементы интерфейса
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

    // Получаем все карточки услуг
    const serviceCards = document.querySelectorAll('.service-card');

    // Описания услуг для модального окна
    const serviceDescriptions = {
        'Расклад на Таро': 'Глубокий анализ вашей ситуации с помощью карт Таро. Расклады на отношения, карьеру, финансы и другие сферы жизни. Длительность сеанса - 1 час.',
        'Подробный разбор натальной карты': 'Детальный анализ вашей натальной карты, включающий описание характера, талантов, жизненных задач и потенциальных возможностей. Длительность консультации - 2 часа.',
        'Отлив заговорённых свечей': 'Изготовление индивидуальных свечей с учетом ваших целей и потребностей. Каждая свеча создается в определенное время с использованием специальных заговоров и природных материалов.'
    };

    // Функция открытия модального окна
    const openModal = (modal) => {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
            console.log('Модальное окно открыто:', modal.id);
        }
    };

    // Функция закрытия модального окна
    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Возвращаем прокрутку страницы
            console.log('Модальное окно закрыто:', modal.id);
        }
    };

    // Обработчик клика по карточке услуги
    const handleServiceCardClick = (serviceCard) => {
        console.log('Клик по карточке услуги:', serviceCard.querySelector('.service-card__title').textContent);
        
        // Собираем данные из карточки
        const serviceData = {
            title: serviceCard.querySelector('.service-card__title').textContent,
            image: serviceCard.querySelector('.service-card__image').src,
            schedule: serviceCard.querySelector('.service-card__schedule').textContent,
            price: serviceCard.querySelector('.service-card__price').textContent
        };

        console.log('Данные услуги:', serviceData);

        // Формируем содержимое модального окна
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

        // Устанавливаем минимальную дату для бронирования (завтра)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const bookingDateInput = document.getElementById('bookingDate');
        if (bookingDateInput) {
            bookingDateInput.min = tomorrow.toISOString().split('T')[0];
        }

        openModal(modals.service);
    };

    // Добавляем слушатели событий для карточек
    serviceCards.forEach(card => {
        // Слушатель клика
        card.addEventListener('click', () => {
            console.log('Событие click на карточке');
            handleServiceCardClick(card);
        });
        
        // Слушатель нажатия клавиши Enter для доступности
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                console.log('Событие keydown (Enter) на карточке');
                handleServiceCardClick(card);
            }
        });
    });

    // Обработка отправки формы бронирования
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
            
            console.log('Отправка формы бронирования:', formData);
            
            forms.booking.reset();
            closeModal(modals.service);
            
            alert('Спасибо за вашу заявку! Мы свяжемся с вами для подтверждения записи.');
        });
    }

    // Слушатели для кнопок закрытия модальных окон
    buttons.closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Клик по кнопке закрытия');
            Object.values(modals).forEach(modal => closeModal(modal));
        });
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        Object.values(modals).forEach(modal => {
            if (e.target === modal) {
                console.log('Клик вне модального окна');
                closeModal(modal);
            }
        });
    });

    // Обработчики для кнопок входа и регистрации
    buttons.login.addEventListener('click', () => {
        console.log('Открытие модального окна входа');
        openModal(modals.login);
    });

    buttons.register.addEventListener('click', () => {
        console.log('Открытие модального окна регистрации');
        openModal(modals.register);
    });

    // Обработка отправки формы входа
    forms.login.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        };
        console.log('Отправка формы входа:', formData);
        closeModal(modals.login);
    });

    // Обработка отправки формы регистрации
    forms.register.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value
        };
        console.log('Отправка формы регистрации:', formData);
        closeModal(modals.register);
    });

    // Закрытие по нажатию Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            console.log('Нажата клавиша Escape');
            Object.values(modals).forEach(modal => closeModal(modal));
        }
    });

    // Формируем массив заголовков услуг и выводим их в консоль только на странице каталога
    if (window.location.pathname.includes('catalog.html')) {
        const serviceTitles = Array.from(document.querySelectorAll('.service-card__title')).map(title => title.textContent);
        console.log('Список доступных услуг:', serviceTitles);
    }

    // Кнопка скролла вверх
    const scrollTopButton = document.querySelector('.scroll-top');

    // Показываем/скрываем кнопку скролла при прокрутке
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    // Обработчик клика по кнопке скролла
    scrollTopButton.addEventListener('click', () => {
        console.log('Скролл вверх страницы');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 