document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const musicToggle = document.querySelector('.music-toggle');
    const musicIcon = document.querySelector('.music-icon');
    
    let isPlaying = false;

    // Функция для обновления состояния кнопки
    const updateMusicButton = () => {
        if (isPlaying) {
            musicToggle.classList.add('playing');
            musicIcon.textContent = '🔊';
        } else {
            musicToggle.classList.remove('playing');
            musicIcon.textContent = '🎵';
        }
    };

    // Обработчик клика по кнопке
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
        updateMusicButton();
    });

    // Автоматическое воспроизведение при загрузке страницы
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

    // Запускаем музыку при первом взаимодействии с страницей
    const handleFirstInteraction = () => {
        startMusic();
        document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);

    // Обработка ошибок воспроизведения
    audio.addEventListener('error', () => {
        console.error('Ошибка воспроизведения аудио');
        isPlaying = false;
        updateMusicButton();
    });
});
