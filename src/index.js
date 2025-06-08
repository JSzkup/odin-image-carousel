import "./styles.css";

// save a global timer to reset the auto scroll
let autoScrollTimer;


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
        // TODO might change this to just make the first image active/all .carousel-image elements display none
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

function showImage(index, direction) {
    const images = carouselImageList();

    // index of currently displayed image
    const currentImage = images.findIndex((img) => img.classList.contains("active"));

    // Hide all images
    images.forEach((img) => {
        img.style.display = "none";
        img.classList.remove("active");
    });

    if (index > -1) {
        // Show the image at the given index
        images[index].style.display = "block";

    } else if (direction === "left") {
        // Show the previous image, module to wrap around
        const newImageIndex = ((currentImage - 1) + images.length) % images.length;
        images[newImageIndex].classList.add("active");
        images[newImageIndex].style.display = "block";

    } else {
        const newImageIndex = (currentImage + 1) % images.length;
        images[newImageIndex].classList.add("active");
        images[newImageIndex].style.display = "block";
    }


}

function previousImageInCarousel() {
    const button = document.querySelector("#previous-image-button");

    button.addEventListener("click", () => {
        showImage(-1, "left");

        clearTimeout(autoScrollTimer);
        autoScrollTimer = setTimeout(autoScrollCarousel, 5000);
    });
}

function nextImageInCarousel() {
    const button = document.querySelector("#next-image-button");

    button.addEventListener("click", () => {
        showImage(-1, "right");

        clearTimeout(autoScrollTimer);
        autoScrollTimer = setTimeout(autoScrollCarousel, 5000);
    });
}

function autoScrollCarousel() {
    showImage(-1, "right");

    clearTimeout(autoScrollTimer);
    autoScrollTimer = setTimeout(autoScrollCarousel, 5000); // Change image every 5 seconds
}

function createNavDots() {
    const dotAmount = carouselImageList().length;
    const navbarContainer = document.querySelector("#image-carousel-navbar");

    const images = carouselImageList();
    const currentImageIndex = images.findIndex((img) => img.classList.contains("active"));


    for (let i = 0; i < dotAmount; i++) {
        const dotNavButton = document.createElement("button");
        dotNavButton.classList.add("nav-dot");

        // Set the initial active dot
        if (i === currentImageIndex) {
            dotNavButton.classList.add("active");
        }

        navbarContainer.appendChild(dotNavButton);

        dotNavButton.addEventListener("click", () => {
            showImage(i, "");

            clearTimeout(autoScrollTimer);
            autoScrollTimer = setTimeout(autoScrollCarousel, 5000);
        });
    };

}


function main(){
    addImagesToCarousel();
    previousImageInCarousel();
    nextImageInCarousel();
    createNavDots();

    // add autoscroll late so image doesnt't change immediately
    autoScrollTimer = setTimeout(autoScrollCarousel, 5000);
}

main();
