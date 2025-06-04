import "./styles.css";

function importImages() {
    // Use require.context to import all images matching the pattern from the ./img directory.
    const imageContext = require.context('./img', false, /^\.\/Carnival-\d+\.png$/);

    // Get all the matched file keys (e.g., ['./Carnival-1.png', './Carnival-2.png'])
    const imageKeys = imageContext.keys().sort((a, b) => {
    const numA = parseInt(a.match(/Carnival-(\d+)\.png$/)[1], 10);
    const numB = parseInt(b.match(/Carnival-(\d+)\.png$/)[1], 10);
    return numA - numB;
    });

    // Map the keys to the actual resolved module paths provided by Webpack.
    const images = imageKeys.map(key => imageContext(key));

    return images;
}

function addImagesToCarousel() {
    const carousel = document.querySelector("#image-carousel-container")
    const images = importImages();

    images.forEach((imageSrc, index) => {
        const img = document.createElement("img")
        img.src = imageSrc
        img.alt = `Image ${index + 1}`
        img.classList.add("carousel-image")
        carousel.appendChild(img)
    });
}

function previousImageInCarousel() {

}

function nextImageInCarousel() {

}

addImagesToCarousel();