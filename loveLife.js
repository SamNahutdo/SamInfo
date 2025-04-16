document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const lyrics = document.querySelectorAll('.lyric-line');
    let timeouts = [];
    let isFirstPlay = true;

    const startLyricsAnimation = () => {
        
        timeouts.forEach(clearTimeout);
        timeouts = [];
        
        lyrics.forEach(line => line.classList.remove('visible'));

        const timings = [
            { element: 0, delay: 1000 }, 
            { element: 1, delay: 8000 },   
            { element: 2, delay: 14000 },   
            { element: 3, delay: 21000 }, 
            { element: 4, delay: 28000 },   
            { element: 5, delay: 36000 },   
        ];

        timings.forEach(timing => {
            timeouts.push(setTimeout(() => {
                lyrics[timing.element].classList.add('visible');
            }, timing.delay));
        });
    };

    const handleAudioRestart = () => {
        
        startLyricsAnimation();
        
        if (audio.paused) {
            audio.currentTime = 0;
            audio.play();
        }
    };

    audio.addEventListener('timeupdate', () => {
        
        if (audio.currentTime > audio.duration - 0.5 && !isFirstPlay) {
            handleAudioRestart();
        }
    });

    audio.addEventListener('ended', () => {
        isFirstPlay = false;
        audio.currentTime = 0;
        audio.play();
        handleAudioRestart();
    });

    audio.play().catch(error => {
        console.log('Autoplay prevented - click anywhere to start');
    });
    startLyricsAnimation();
    isFirstPlay = false;

    document.body.addEventListener('click', () => {
        if (audio.paused) {
            handleAudioRestart();
        }
    });
});
