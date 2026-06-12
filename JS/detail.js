
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

    // ==========================================
    // 3. 모바일 제품 이미지 캐러셀 상태바 업데이트
    // ==========================================
    const imageContainer = document.querySelector('#detail_section .image_container');
    const dots = document.querySelectorAll('#detail_section .carousel_status .dot');

    if (imageContainer && dots.length > 0) {
        imageContainer.onscroll = function() {
            // 현재 스크롤 위치를 기반으로 인덱스 계산
            const scrollLeft = imageContainer.scrollLeft;
            const width = imageContainer.clientWidth;
            const index = Math.round(scrollLeft / width);

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // 만능 드래그 & 스와이프 함수
    // =========================================================
    function makeDraggable(container) {
        if (!container) return; // 요소가 없으면 에러 방지

        let isDown = false;
        let startX;
        let scrollLeft;

        // --- PC 마우스 이벤트 ---
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // 스크롤 속도 배율
            container.scrollLeft = scrollLeft - walk;
        });

        // --- 모바일 터치 이벤트 ---
        container.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('touchend', () => {
            isDown = false;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    }

    // =========================================================
    // 원하는 요소에 드래그 함수 적용하기
    // =========================================================
    const swipeWrappers = document.querySelectorAll('.swipe_wrapper');
    swipeWrappers.forEach(wrapper => {
        makeDraggable(wrapper);
    });

    // (선택) 이전에 만드신 photo_video가 있다면 함께 적용 가능
    const photoVideoSection = document.querySelector('.photo_video');


    makeDraggable(photoVideoSection);
});
