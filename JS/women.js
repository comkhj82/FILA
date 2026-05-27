let paginationItems = document.querySelectorAll('.pagination .num li');

function init(){
    for(let i = 0; i < paginationItems.length; i++){
        paginationItems[i].classList.remove('active');
    }
}

for(let i = 0; i < paginationItems.length; i++){
    paginationItems[i].onclick = (e) => {
        // a 태그 클릭 시 페이지가 위로 튕기거나(href="#") 새로고침되는 현상 방지
        e.preventDefault();

        init();

        paginationItems[i].classList.add('active');
    }
}