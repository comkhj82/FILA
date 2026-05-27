
window.onload = () => {
    // ==========================================
    // 1. 메인 섹션 '사이즈 선택' 아코디언 (On/Off 토글)
    // ==========================================
    // const mainSizeAccordion = document.querySelector('#main_section .accordion');
    //
    // if (mainSizeAccordion) {
    //     const head = mainSizeAccordion.querySelector('.head');
    //
    //     head.onclick = function(e) {
    //         // 아코디언 내부의 사이즈 버튼(class="size")들을 클릭했을 때는 창이 닫히지 않도록 방어
    //         if (e.target.classList.contains('size')) return;
    //
    //         // active 클래스를 넣었다 뺐다(토글) 처리합니다.
    //         mainSizeAccordion.classList.toggle('active');
    //     };
    // }
    const mainSizeAccordion = document.querySelector('#main_section .accordion');

    if (mainSizeAccordion) {
        // 부모(mainSizeAccordion) 안에서 자식 요소를 정확하게 찾습니다.
        const head = mainSizeAccordion.querySelector('.head');
        const body = mainSizeAccordion.querySelector('.body');
        const icon = head.querySelector('i'); // 아이콘 태그

        // head 영역을 클릭했을 때 작동
        head.onclick = function(e) {
            // [버그 방지] 내부 사이즈 버튼(class="size")들을 누를 때는 아코디언이 닫히지 않도록 완전히 차단
            if (e.target.closest('.size')) return;

            mainSizeAccordion.classList.toggle('active');


            if (mainSizeAccordion.classList.contains('active')) {
                icon.className = "fa-solid fa-xmark active";
                body.style.display = "grid";
            } else {
                icon.className = "fa-solid fa-caret-down";
                body.style.display = "none";
            }
        };
    }

    // ==========================================
    // 2. 하단 상세 정보 섹션 아코디언
    // ==========================================
    const detailHeads = document.querySelectorAll('#detail_section .accordion > .head');

    detailHeads.forEach(head => {
        head.onclick = function() {
            const body = this.nextElementSibling;

            if (body) {
                body.classList.toggle('active');

                if (body.classList.contains('active')) {
                    body.style.maxHeight = body.scrollHeight + 40 + "px";
                } else {
                    body.style.maxHeight = "0px";
                }
            }
        };
    });
};