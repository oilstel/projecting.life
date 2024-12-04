let currentlyPlaying = null;  // Keep track of currently playing video

document.querySelectorAll('figure').forEach(figure => {
    const overlay = figure.querySelector('.overlay-and-video img');
    const video = figure.querySelector('.overlay-and-video video');
    const button = figure.querySelector('#start-climb');
    const controls = figure.querySelector('.controls');
    const slider = figure.querySelector('.slider');

    // Add click handler for the start climb button
    button.addEventListener('click', function() {
        if (currentlyPlaying && currentlyPlaying !== video) {
            currentlyPlaying.pause();  // Pause any other playing video
            const prevFigure = currentlyPlaying.closest('figure');
            prevFigure.querySelector('.controls').style.display = 'none';
            prevFigure.querySelector('.overlay').style.display = 'block';
            prevFigure.querySelector('#start-climb').textContent = 'start climb';
        }

        if (video.paused) {
            video.play();
            controls.style.display = 'block';
            overlay.style.opacity = 0.5;
            button.textContent = 'pause climb';
            currentlyPlaying = video;
        } else {
            video.pause();
            // controls.style.display = 'none';
            button.textContent = 'start climb';
            currentlyPlaying = null;
        }
    });

    // Existing slider functionality
    slider.addEventListener('input', function(event) {
        overlay.style.opacity = event.target.value / 100;
    });

    if (overlay.style.display === 'none') {
        slider.style.display = 'none';
    }
});