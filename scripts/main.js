document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const musicToggle = document.querySelector('.music-toggle');
    const musicIcon = document.querySelector('.music-icon');
    
    let isPlaying = false;

    const updateMusicButton = () => {
        if (isPlaying) {
            musicToggle.classList.add('playing');
            musicIcon.textContent = '🔊';
        } else {
            musicToggle.classList.remove('playing');
            musicIcon.textContent = '🎵';
        }
    };

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
        updateMusicButton();
    });

    const startMusic = () => {
        audio.play()
            .then(() => {
                isPlaying = true;
                updateMusicButton();
            })
            .catch(error => {
                console.log('Автовоспроизведение отключено в браузере:', error);
                isPlaying = false;
                updateMusicButton();
            });
    };

    const handleFirstInteraction = () => {
        startMusic();
        document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);

    audio.addEventListener('error', () => {
        console.error('Ошибка воспроизведения аудио');
        isPlaying = false;
        updateMusicButton();
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav__item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        const href = link.getAttribute('href');
        
        if (href === currentPage) {
            item.classList.add('nav__item--active');
        } else {
            item.classList.remove('nav__item--active');
        }
    });

    console.log('Текущая страница:', currentPage);

    // Функция для проверки, был ли показан прелоадер в течение последнего часа
    function wasPreloaderShown() {
        const lastShown = localStorage.getItem('preloaderLastShown');
        if (!lastShown) return false;
        
        const oneHour = 60 * 60 * 1000; // 1 час в миллисекундах
        return Date.now() - parseInt(lastShown) < oneHour;
    }

    // Функция для сохранения времени показа прелоадера
    function savePreloaderShown() {
        localStorage.setItem('preloaderLastShown', Date.now().toString());
    }

    // Функция для управления прелоадером
    function handlePreloader() {
        const preloader = document.querySelector('.preloader');
        
        if (wasPreloaderShown()) {
            // Если прелоадер был показан в течение последнего часа, скрываем его сразу
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        } else {
            // Иначе показываем прелоадер на 2 секунды
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
                savePreloaderShown();
            }, 2000);
        }
    }

    // Запускаем обработку прелоадера после загрузки DOM
    handlePreloader();
});
