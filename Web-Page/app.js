
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

// var swiper = new Swiper(".mySwiper", {
//     effect: "cards",
//     grabCursor: true,
//   });


const menu_container = document.querySelector('.menu-container');

let counter = 0;
const moveRight = () => {
    counter++;
    let move = counter * 1270;
    console.log(move);
    menu_container.style.transform = `translateX(-${move}px)`;
}

const moveLeft = () => {
    counter--;
    let move = counter * 1270;
    menu_container.style.transform = `translateX(-${move}px)`;
}

