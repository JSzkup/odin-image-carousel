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
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = `Image ${index + 1}`;
        img.classList.add("carousel-image");
        
        // Hide all images except the first one
        // TODO might change this to just make the first image active
        if (index !== 0) {
            img.style.display = "none";
        } else {
            img.classList.add("active");
        }

        carousel.appendChild(img);
    });
}

function carouselImageList() {
    // returns a list of images in the carousel container

    const carousel = document.querySelector("#image-carousel-container");
    const images = carousel.querySelectorAll("img");

    return Array.from(images);
}

function ShowImage(index, direction) {
    const images = carouselImageList();

    // Hide all images
    images.forEach((img) => {
        img.style.display = "none";
        img.classList.remove("active");
    });

    if (index > -1) {
        images[index].style.display = "block";
    } else if (direction === "left") {
        // images[images.length - 1].style.display = "block";
        // images[images.length - 1].classList.add("active");
    } else {
        // images[images.length + 1].style.display = "block";
        // images[images.length + 1].classList.add("active");
    }


}

function previousImageInCarousel() {
    const button = document.querySelector("#previous-image-button");

    button.addEventListener("click", () => {
        ShowImage(-1, "left");
    });
}

function nextImageInCarousel() {
    const button = document.querySelector("#next-image-button");

    button.addEventListener("click", () => {
        ShowImage(-1, "right");
    });
}

function autoScrollCarousel() {}

function createNavDots() {
    const dotAmount = carouselImageList().length;
    // TODO set active to current image

    for (let i = 0; i < dotAmount; i++) {
        const dot = document.createElement("button");
        dot.classList.add("nav-dot");
        // TODO add to DOM
    }
}


function main(){
    addImagesToCarousel();
    previousImageInCarousel();
    nextImageInCarousel();
}

main();
