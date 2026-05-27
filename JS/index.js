// let modal_img = document.querySelector('.modal img_section');
// let modal_close = document.querySelector('.modal .close');
// let modal_open = document.querySelector('.modal .open');

// modal_img.onclick = () => {
//     for (let i = 0; i < modal_img.length; i++) {
//     popup.style.display = 'flex';
//     }

// }






const carouselContainer = document.querySelector('.carousel_container');
const carousel = carouselContainer.querySelector('.carousel');
let slides = carousel.getElementsByClassName('slide');
const [leftBtn, rightBtn] = carouselContainer.querySelectorAll('.button_container > button');
const slideWidth = +getComputedStyle(carouselContainer).width.split('px')[0];
const slideMoveMillisecond = 3000;
let carouselMousePosition = {
    startX: 0,
    endX: 0,
}
let autoplay = true;

if(autoplay){
    setInterval(() => {
        move_right();
    }, slideMoveMillisecond * 4);
}

function move_left(){
    leftBtn.onclick = null;
    carouselContainer.onmousedown = null;
    carouselContainer.onmouseup = null;
    let slide = slides[slides.length-1].cloneNode(true);
    carousel.insertAdjacentElement('afterbegin', slide);
    carousel.style.transform = `translateX(${-slideWidth}px)`;

    setTimeout(() => {
        carousel.style.transitionDuration = `${slideMoveMillisecond}ms`;
        carousel.style.transform = `translateX(0px)`;
        slides[slides.length-1].remove();
        setTimeout(() => {
            carousel.style.transitionDuration = '0s';
            leftBtn.onclick = move_left;
            carouselContainer.onmousedown = carousel_mouse_down;
            carouselContainer.onmouseup = carousel_mouse_up;
        }, slideMoveMillisecond);
    }, 10);
}

function move_right(){
    rightBtn.onclick = null;
    carouselContainer.onmousedown = null;
    carouselContainer.onmouseup = null;
    let slide = slides[0].cloneNode(true);
    carousel.insertAdjacentElement('beforeend', slide);
    carousel.style.transitionDuration = `${slideMoveMillisecond}ms`;
    carousel.style.transform = `translateX(${-slideWidth}px)`;
    setTimeout(() => {
        slides[0].remove();
        carousel.style.transform = `translateX(0px)`;
        carousel.style.transitionDuration = '0s';
        rightBtn.onclick = move_right;
        carouselContainer.onmousedown = carousel_mouse_down;
        carouselContainer.onmouseup = carousel_mouse_up;
    }, slideMoveMillisecond);
}

function carousel_mouse_down(e){
    carouselMousePosition.startX = e.clientX;
}

function carousel_mouse_up(e){
    carouselMousePosition.endX = e.clientX;
    // 감도 조절: 사용자가 실수로 미세하게 움직인 경우는 무시 (픽셀 단위)
    const threshold = 50;
    const diffX = carouselMousePosition.startX - carouselMousePosition.endX;
    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            move_right();
        } else {
            move_left();
        }
    }
}

carouselContainer.onmousedown = carousel_mouse_down;
carouselContainer.onmouseup = carousel_mouse_up;
leftBtn.onclick = move_left;
rightBtn.onclick = move_right;
console.log(carouselContainer)











//////////////////////////////////////////////////////////
//Trending Section 목록 클릭
const trendingButtons = document.querySelectorAll('.trending_now li .btn');
let trendingLists = document.querySelectorAll('.trending_now > ul');

function init(){
    for(let i = 0; i < trendingButtons.length; i++){
        // 현재 class 목록에서 active를 제거해줘
        trendingButtons[i].classList.remove('active');
        trendingLists[i].classList.remove('active');
    }
}

for(let i = 0; i < trendingButtons.length; i++){
    trendingButtons[i].onclick = () => {
        init();
        // 원래 가지고 있던 클래스 목록에 active 를 추가해줘
        trendingButtons[i].classList.add('active');
        trendingLists[i].classList.add('active');
    }
}

    //////////////////////////////////////////////////////
///////팝업창
const popup = document.querySelector('.modal_container');
let shopTheLook = document.querySelectorAll('.img_moved img');
let cancel = document.querySelector('.form_section .close_btn');
// let close = document.querySelector('.modal .close');
// let open = document.querySelector('.modal .open');

shopTheLook.forEach(img => {
    img.onclick = () => {
        popup.style.display = 'flex';
    }
})

cancel.onclick = () => {
    popup.style.display = 'none';
}
popup.onclick = (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
}

