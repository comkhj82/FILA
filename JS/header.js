let header = document.querySelector('header');
let mainMenuLies = document.querySelectorAll('.main_menu > li');
for(let i = 0; i < mainMenuLies.length; i++) {
    mainMenuLies[i].onmouseenter = () => {
        let subMenuContainers = document.querySelectorAll('.sub_menu_container');
        for(let i = 0; i < subMenuContainers.length; i++) {
            subMenuContainers[i].style.display = 'none';
        }
        let subMenuContainer = mainMenuLies[i].querySelector('.sub_menu_container');
        subMenuContainer.style.display = 'flex';
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