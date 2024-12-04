// Ticker functionality
const tickerContent = document.querySelector('.ticker');
const holds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Create double the content to enable seamless scrolling
const tickerHolds = [...holds, ...holds].map(num => 
    `<img src="images/holds/hold-${num}.png" alt="hold ${num}">`
).join('');

tickerContent.innerHTML = tickerHolds;

// Add/remove holds for infinite scroll effect
setInterval(() => {
    tickerContent.appendChild(tickerContent.firstChild);
}, 900);

// Append to end of ticker
tickerContent.appendChild(tickerContent.firstChild);