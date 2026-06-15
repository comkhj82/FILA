function initHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    // --- 쿠폰 닫기 로직 ---
    const coupon = document.querySelector('.coupon_info_container');
    const closeBtn = coupon?.querySelector('button');

    if (closeBtn) {
        closeBtn.onclick = () => {
            document.body.classList.add('coupon-closed');
        };
    }

    // --- 메인 메뉴 호버 로직 ---
    let mainMenuLies = document.querySelectorAll('.main_menu > li');
    for(let i = 0; i < mainMenuLies.length; i++) {
        mainMenuLies[i].onmouseenter = () => {
            let subMenuContainers = document.querySelectorAll('.sub_menu_container');
            for(let j = 0; j < subMenuContainers.length; j++) {
                subMenuContainers[j].style.display = 'none';
            }
            let subMenuContainer = mainMenuLies[i].querySelector('.sub_menu_container');
            if (subMenuContainer) subMenuContainer.style.display = 'flex';
        }
    }
    // 마우스가 header 영역 밖을 나가면
    header.onmouseleave = () => {
        // 모든 sub menu container들을 가져와서 display를 숨긴다
        let subMenuContainers = document.querySelectorAll('.sub_menu_container');
        for(let i = 0; i < subMenuContainers.length; i++) {
            subMenuContainers[i].style.display = 'none';
        }
    }
}
// 만약 페이지에 이미 header가 있는 경우(직접 삽입된 경우)를 위해 실행
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('header')) {
        initHeader();
    }
});