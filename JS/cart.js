document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. 하트 아이콘 토글 로직
    // ==========================================
    const heartContainers = document.querySelectorAll('.heart');
    heartContainers.forEach(container => {
        container.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fa-solid fa-heart"></i>';
            } else {
                this.innerHTML = '<i class="fa-regular fa-heart"></i>';
            }
        });
    });

    // ==========================================
    // 쇼핑몰 장바구니 필수 DOM 요소 및 함수
    // ==========================================
    const chooseAllCheckbox = document.getElementById('choose_all');
    const selectDeleteBtn = document.querySelector('.select_section button');
    const cartSection = document.querySelector('.cart_section');

    // 숫자와 금액을 변환하는 안전한 함수
    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
    };
    const formatPrice = (num) => num.toLocaleString('ko-KR');

    // ==========================================
    // 총액, 세금 업데이트 및 전체선택 체크박스 상태 관리
    // ==========================================
    function updateTotals() {
        let totalQuantity = 0;
        let totalPrice = 0;

        const productSections = document.querySelectorAll('.product_section');

        // 1. 전체 선택 체크박스 관리
        if (chooseAllCheckbox) {
            if (productSections.length === 0) {
                chooseAllCheckbox.checked = false;
                chooseAllCheckbox.disabled = true;
            } else {
                chooseAllCheckbox.disabled = false;
                const allCheckboxes = document.querySelectorAll('.product_section > input[type="checkbox"]');
                const allChecked = Array.from(allCheckboxes).every(c => c.checked);
                chooseAllCheckbox.checked = allChecked;
            }
        }

        // 2. 단가 및 수량 합산 (스마트 추적)
        productSections.forEach(section => {
            const spanEl = section.querySelector('.count_section span');
            const quantity = spanEl ? parseInt(spanEl.textContent, 10) : 1;

            let unitPrice = 0;
            const firstUlLis = section.querySelectorAll('.product_info ul:first-of-type li');

            // 몇 번째 줄이든 상관없이 '원'이라는 단어가 있고 숫자가 포함되어 있으면 단가로 인식
            firstUlLis.forEach(li => {
                if(li.textContent.includes('원')) {
                    const parsed = parsePrice(li.textContent);
                    if (parsed > 0) unitPrice = parsed;
                }
            });

            totalQuantity += quantity;
            totalPrice += (unitPrice * quantity);
        });

        const totalTax = Math.round(totalPrice / 11);

        // 3. 결제 정보 창 텍스트 기반 스마트 업데이트
        const orderDetails = document.querySelectorAll('.order_detail');

        // 보통 첫 번째 줄이 'N 제품' 같이 수량을 나타내므로 강제 업데이트
        if(orderDetails.length > 0) {
            const totalCountEl = orderDetails[0].querySelector('.count');
            if(totalCountEl) totalCountEl.textContent = totalQuantity;
        }

        // 이름표(텍스트)를 읽어서 해당하는 곳에 정확히 돈을 꽂아넣음
        orderDetails.forEach(detail => {
            const text = detail.textContent;
            const countEl = detail.querySelector('.count');
            if(!countEl) return;

            if (text.includes('제품 합계')) {
                countEl.textContent = formatPrice(totalPrice);
            } else if (text.includes('총 결제 금액')) {
                countEl.textContent = formatPrice(totalPrice);
            } else if (text.includes('세금') || text.includes('VAT')) {
                countEl.textContent = formatPrice(totalTax);
            }
        });
    }

    // ==========================================
    // 개별 상품 소계 및 마이너스 버튼 상태 관리
    // ==========================================
    function updateSubTotal(section, count) {
        let unitPrice = 0;
        const firstUlLis = section.querySelectorAll('.product_info ul:first-of-type li');
        firstUlLis.forEach(li => {
            if(li.textContent.includes('원')) {
                const parsed = parsePrice(li.textContent);
                if(parsed > 0) unitPrice = parsed;
            }
        });

        const secondUlLis = section.querySelectorAll('.product_info ul:nth-of-type(2) li');
        if(secondUlLis.length >= 2) {
            secondUlLis[1].textContent = formatPrice(unitPrice * count) + "원";
        }

        const minusBtn = section.querySelector('.fa-minus');
        if(minusBtn) {
            if(count <= 1) {
                minusBtn.style.color = '#ccc';
                minusBtn.style.cursor = 'not-allowed';
            } else {
                minusBtn.style.color = '#111';
                minusBtn.style.cursor = 'pointer';
            }
        }
    }

    // ==========================================
    // 전체 선택 / 해제 및 선택 삭제 이벤트
    // ==========================================
    if (chooseAllCheckbox && cartSection) {
        chooseAllCheckbox.addEventListener('change', (e) => {
            const productCheckboxes = document.querySelectorAll('.product_section > input[type="checkbox"]');
            productCheckboxes.forEach(cb => cb.checked = e.target.checked);
        });

        cartSection.addEventListener('change', (e) => {
            if(e.target.type === 'checkbox' && e.target.id !== 'choose_all') {
                updateTotals();
            }
        });
    }

    if (selectDeleteBtn) {
        selectDeleteBtn.addEventListener('click', () => {
            const checkedBoxes = document.querySelectorAll('.product_section > input[type="checkbox"]:checked');
            if(checkedBoxes.length === 0) {
                alert("삭제할 상품을 선택해주세요.");
                return;
            }
            if(confirm("선택한 상품을 장바구니에서 삭제하시겠습니까?")) {
                checkedBoxes.forEach(cb => {
                    const section = cb.closest('.product_section');
                    if(section) section.remove();
                });
                updateTotals();
            }
        });
    }

    // ==========================================
    // 삭제 / 수량 증가 / 수량 감소 (클릭 이벤트)
    // ==========================================
    if (cartSection) {
        cartSection.addEventListener('click', (e) => {

            if(e.target.tagName === 'BUTTON' && e.target.textContent.trim() === '삭제') {
                if(confirm("정말 삭제하시겠습니까?")) {
                    const section = e.target.closest('.product_section');
                    if(section) section.remove();
                    updateTotals();
                }
            }

            const plusBtn = e.target.closest('.fa-plus');
            if(plusBtn) {
                const section = plusBtn.closest('.product_section');
                const span = section ? section.querySelector('.count_section span') : null;
                if(span) {
                    let count = parseInt(span.textContent, 10);
                    count++;
                    span.textContent = count;
                    updateSubTotal(section, count);
                    updateTotals();
                }
            }

            const minusBtn = e.target.closest('.fa-minus');
            if(minusBtn) {
                const section = minusBtn.closest('.product_section');
                const span = section ? section.querySelector('.count_section span') : null;
                if(span) {
                    let count = parseInt(span.textContent, 10);
                    if(count > 1) {
                        count--;
                        span.textContent = count;
                        updateSubTotal(section, count);
                        updateTotals();
                    }
                }
            }
        });
    }

    // ==========================================
    // 초기 세팅 실행
    // ==========================================
    try {
        document.querySelectorAll('.product_section').forEach(section => {
            const span = section.querySelector('.count_section span');
            if(span) {
                updateSubTotal(section, parseInt(span.textContent, 10));
            }
        });
        updateTotals();
    } catch (error) {
        console.error("초기 세팅 중 오류 발생:", error);
    }
});
