if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(event => {
            console.log('Service worker: registered.');
        })
        .catch(error => {
            console.log('Service worker registration error: ', error.message)
        })
}

window.addEventListener('load', () => {
    let catIndex = 0;
    const cats = ['cat1.jpg', 'cat2.jpg', 'cat3.jpg', 'cat4.jpg', 'cat5.jpg', 'cat6.jpg', 'cat7.jpg', 'cat8.jpg', 'cat9.jpg', 'cat10.jpg'];
    const nextButton = document.getElementById('nextButton');
    const catImg = document.querySelector('.catImg');

    nextButton.addEventListener('click', () => {
        catIndex = (catIndex + 1) % cats.length;
        catImg.src = 'img/' + cats[catIndex];
    })
})
