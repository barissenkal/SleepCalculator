if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/SleepCalculator/sw.js', { scope: '/SleepCalculator/' })})}