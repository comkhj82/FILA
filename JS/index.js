// let modal_img = document.querySelector('.modal img_section');
// let modal_close = document.querySelector('.modal .close');
// let modal_open = document.querySelector('.modal .open');

// modal_img.onclick = () => {
//     for (let i = 0; i < modal_img.length; i++) {
//     popup.style.display = 'flex';
//     }

// }
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-container");

    // 1. 다른 폴더/파일에 있는 header.html 원격 로드
    fetch("FILA/FILA/HTML/header.html") // 경로가 다르면 '../header.html' 등으로 수정 필요
        .then(response => response.text())
        .then(data => {
            // 가져온 HTML 문자열을 container 내부에 파싱하여 주입
            headerContainer.innerHTML = data;

            // HTML이 화면에 그려진 "직후"에 호버 이벤트를 바인딩해야 합니다.
            initHeaderHover();
        })
        .catch(error => console.error("헤더를 불러오는 중 오류 발생:", error));
});

// 2. 메뉴 호버 이벤트 제어 함수
function initHeaderHover() {
    const mainMenuItems = document.querySelectorAll(".main_menu > li");

    mainMenuItems.forEach(item => {
        const subMenu = item.querySelector(".sub_menu_container");
        
        // 서브 메뉴가 존재하는 카테고리만 이벤트 등록
        if (subMenu) {
            // 마우스가 올라갔을 때
            item.addEventListener("mouseenter", () => {
                subMenu.classList.add("active");
                // 만약 전체 배경이 내려오는 슬라이드 효과를 원한다면 slideDown 처리 가능
            });

            // 마우스가 벗어났을 때
            item.addEventListener("mouseleave", () => {
                subMenu.classList.remove("active");
            });
        }
    });
}

//////////////////////////////////////////////////////////
//Trending Section 목록 클릭
const trendingItems = document.querySelectorAll('.trending_now li .btn');
function init(){
        for(let j = 0; j < trendingItems.length; j++){
            // 현재 class 목록에서 active를 제거해줘
            trendingItems[j].classList.remove('active');
           

        }
    }

    for(let i = 0; i < trendingItems.length; i++){
        trendingItems[i].onclick = () => {
            init();
            // 원래 가지고 있던 클래스 목록에 active 를 추가해줘
            trendingItems[i].classList.add('active');
           
        }
    }