document.addEventListener('DOMContentLoaded', () => {
    // Favicon cycling
    const holdImages = [
        'images/holds/hold-1.png',
        'images/holds/hold-2.png',
        'images/holds/hold-3.png',
        'images/holds/hold-4.png',
        'images/holds/hold-5.png',
        'images/holds/hold-6.png',
        'images/holds/hold-7.png',
        'images/holds/hold-9.png',
        'images/holds/hold-10.png'
    ];
    
    let currentFaviconIndex = 0;
    setInterval(() => {
        const favicon = document.querySelector('link[rel="icon"]');
        favicon.href = holdImages[currentFaviconIndex];
        currentFaviconIndex = (currentFaviconIndex + 1) % holdImages.length;
    }, 1000);

    // Add stars
    const sky = document.getElementById('sky');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = x + '%';
        star.style.top = y + '%';
        sky.appendChild(star);
    }

    // Position holds and add labels
    const holds = document.querySelectorAll('.hold');
    const holdSizePercent = 8;
    const minDistancePercent = holdSizePercent + 2;
    const positions = [];
    const betaLabels = [
        'Start', 'Start', 'Finish',  // Core labels
        'Right Foot', 'Left Foot', 'Right Hand', 'Left Hand'  // Movement labels
    ];

    // Create array of indices and shuffle it
    const holdIndices = Array.from(holds).map((_, i) => i);
    for (let i = holdIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [holdIndices[i], holdIndices[j]] = [holdIndices[j], holdIndices[i]];
    }

    holds.forEach((hold, index) => {
        let x, y, overlapping;
        do {
            overlapping = false;
            x = Math.random() * (100 - holdSizePercent);
            y = Math.random() * (100 - holdSizePercent);

            for (const pos of positions) {
                const distance = Math.sqrt(
                    Math.pow(x - pos.x, 2) + 
                    Math.pow(y - pos.y, 2)
                );
                if (distance < minDistancePercent) {
                    overlapping = true;
                    break;
                }
            }
        } while (overlapping);

        positions.push({ x, y });
        hold.style.left = x + '%';
        hold.style.top = y + '%';

        // Add label
        const label = hold.querySelector('.hold-label');
        if (label) {
            // First 3 indices in shuffled array get Start/Start/Finish
            if (holdIndices.indexOf(index) < 3) {
                label.textContent = betaLabels[holdIndices.indexOf(index)];
            } else {
                // Remaining holds get random movement labels
                const randomIndex = Math.floor(Math.random() * 4) + 3;
                label.textContent = betaLabels[randomIndex];
            }
        }
    });
});