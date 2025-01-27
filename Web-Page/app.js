
const slider = document.getElementById('slider');

window.onload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("scroll", (event) => {

    ScrollPosition = window.scrollY;
    changeSlider(ScrollPosition);
});

function changeSlider(position) {

    if (position < 600) {
        slider.style.width = "60px";
        slider.style.transform = "translateX(-150px)";
    }
    else if (position < 1200) {
        slider.style.width = "60px";
        slider.style.transform = "translateX(-73px)";
    }
    else if (position < 1900) {
        slider.style.width = "80px";
        slider.style.transform = "translateX(16px)";
    }
    else if (position < 2498) {
        slider.style.width = "108px";
        slider.style.transform = "translateX(128px)";
    }
}

const menu_container = document.querySelector('.move-container');

const slide = document.querySelectorAll('.slider-container');

const oneSlide = document.querySelector('.slider-container');

console.log(oneSlide.clientWidth);

let counter = 0;


const  moveRight = () => {

    if (counter < slide.length - 1) {
        counter++;
        let move = counter * oneSlide.clientWidth;
        menu_container.style.transform = `translateX(-${move}px)`;
    }
    else {
        counter = 0;
        menu_container.style.transform = `translateX(0px)`;
    }
}

const moveLeft = () => {
    if (counter > 0) {
        counter--;
        let move = counter * oneSlide.clientWidth;
        menu_container.style.transform = `translateX(-${move}px)`;
    }
}


document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        moveRight();
    } else if (event.key === 'ArrowLeft') {
        moveLeft();
    }
});

