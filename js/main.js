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
});
