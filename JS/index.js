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

/* index.js의 기존 trendingButtons 코드 아래에 추가 */

document.addEventListener("DOMContentLoaded", () => {

    const trendingLists = document.querySelectorAll('.trending_now > ul');

    // =========================================================
    // 1. 마우스 드래그 및 모바일 터치 스와이프 기능
    // =========================================================
    trendingLists.forEach(list => {
        let isDown = false;
        let startX;
        let scrollLeft;

        // 브라우저 기본 이미지 드래그(잔상 생기는 현상) 방지
        const images = list.querySelectorAll('img');
        images.forEach(img => img.addEventListener('dragstart', (e) => e.preventDefault()));

        // --- PC 마우스 이벤트 ---
        list.addEventListener('mousedown', (e) => {
            isDown = true;
            list.style.cursor = 'grabbing'; // 드래그 중 움켜쥔 손바닥 모양
            startX = e.pageX - list.offsetLeft;
            scrollLeft = list.scrollLeft;
        });

        list.addEventListener('mouseleave', () => {
            isDown = false;
            list.style.cursor = 'grab';
        });

        list.addEventListener('mouseup', () => {
            isDown = false;
            list.style.cursor = 'grab';
        });

        list.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - list.offsetLeft;
            const walk = (x - startX) * 1.5; // 스크롤 속도 배율 (숫자를 키우면 휙휙 넘어감)
            list.scrollLeft = scrollLeft - walk;
        });

        // --- 모바일 터치 이벤트 ---
        list.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - list.offsetLeft;
            scrollLeft = list.scrollLeft;
        });

        list.addEventListener('touchend', () => {
            isDown = false;
        });

        list.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - list.offsetLeft;
            const walk = (x - startX) * 1.5;
            list.scrollLeft = scrollLeft - walk;
        });
    });

    // =========================================================
    // 2. 화살표 버튼 클릭 시 스크롤 이동 기능
    // =========================================================
    // 해당 섹션 안의 화살표 버튼들을 모두 찾습니다. (왼쪽, 오른쪽 순서라고 가정)
    const arrowBtns = document.querySelectorAll('.trending_now .arrow_button');

    function scrollActiveList(direction) {
        // 여러 개의 탭 중 현재 화면에 보이는(active) 리스트만 선택해서 움직입니다.
        const activeList = document.querySelector('.trending_now > ul.active');
        if (!activeList) return;

        const scrollAmount = 400; // 한 번 클릭할 때 이동할 픽셀 거리 (상품 1개 너비 정도로 조절하세요)

        if (direction === 'left') {
            activeList.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); // 왼쪽으로 부드럽게 스크롤
        } else {
            activeList.scrollBy({ left: scrollAmount, behavior: 'smooth' });  // 오른쪽으로 부드럽게 스크롤
        }
    }

    // 버튼이 정상적으로 찾아졌다면 첫 번째를 왼쪽, 두 번째를 오른쪽 화살표로 지정합니다.
    if (arrowBtns.length >= 2) {
        arrowBtns[0].addEventListener('click', () => scrollActiveList('left'));
        arrowBtns[1].addEventListener('click', () => scrollActiveList('right'));
    }
});

////////////////////////////////////////////////////////////
////////////////슬라이드 이미지
document.addEventListener("DOMContentLoaded", () => {
    const slideWrapper = document.querySelector('.slide_wrapper');
    const slideContainer = document.querySelector('.slide_container');

    if (!slideWrapper || !slideContainer) return;

    // 1. 끊김 없는 무한 흐름을 위해 내부 아이템 복제하여 이어 붙이기
    const originalItems = Array.from(slideContainer.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        slideContainer.appendChild(clone);
    });

    // 2. 슬라이드 위치 및 속도 설정
    let currentPos = 0;
    const speed = 1.2; // 흘러가는 속도 (더 빠르게 하려면 숫자를 키우세요)

    // 3. 마우스 호버와 상관없이 영원히 돌아가는 무한 슬라이드 함수
    function slideContinuously() {
        currentPos -= speed;

        // 원본 아이템 세트가 완전히 지나가면 감쪽같이 0으로 되돌려 무한 루프 구현
        if (Math.abs(currentPos) >= slideContainer.scrollWidth / 2) {
            currentPos = 0;
        }

        slideContainer.style.transform = `translateX(${currentPos}px)`;

        // 일시정지 조건 없이 브라우저 프레임에 맞춰 무조건 계속 실행
        requestAnimationFrame(slideContinuously);
    }

    // 애니메이션 실행
    slideContinuously();
});

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

