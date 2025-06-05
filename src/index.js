import "./styles.css";

function importImages() {
    // Import images from the img folder to be worked with

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
    // Adds images into the carousel container

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

function carouselImageList() {
    // returns a list of images in the carousel container

    const carousel = document.querySelector("#image-carousel-container")
    const images = carousel.querySelectorAll("img")

    return Array.from(images)
}

function currentImageInCarousel(imageMovement, nextImage) {
    const images = carouselImageList()

    // TODO image movement adds or subtracts 1 from the current image index
    // TODO nextImage moves to a specific image index


    return currentImage
}

function previousImageInCarousel() {

}

function nextImageInCarousel() {

}

function autoScrollCarousel() {}

addImagesToCarousel();