document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // 1. 필요한 DOM 요소 선택
    // =========================================================
    const selectAllCheckbox = document.getElementById('select_all');
    const productCheckboxes = document.querySelectorAll('.product_item input[type="checkbox"]');
    const totalPriceDisplay = document.querySelector('.total_price_container b:last-child'); // '1,000,000원'이 적힌 두 번째 b태그

    // 방어 코드: 팝업창 요소가 현재 페이지에 없으면 스크립트를 중단합니다.
    if (!selectAllCheckbox || !totalPriceDisplay) return;

    // =========================================================
    // 2. 금액 계산 유틸리티 함수
    // =========================================================
    // "99,900원" 같은 텍스트에서 숫자만 빼내어 정수로 변환 (계산용)
    const parsePrice = (priceStr) => {
        return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
    };

    // 계산된 숫자를 다시 "99,900원" 형태로 변환 (출력용)
    const formatPrice = (num) => {
        return num.toLocaleString('ko-KR') + "원";
    };

    // =========================================================
    // 3. 총 주문 금액 합산 함수
    // =========================================================
    function calculateTotalPrice() {
        let total = 0;

        // 모든 상품 체크박스를 순회하면서 '체크된' 상품의 가격만 더합니다.
        productCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                // 체크박스의 부모(.product_item) 안에서 가격이 적힌 strong 태그를 찾습니다.
                const priceElement = checkbox.closest('.product_item').querySelector('strong');
                if (priceElement) {
                    total += parsePrice(priceElement.textContent);
                }
            }
        });

        // 합산된 총액을 화면에 반영합니다.
        totalPriceDisplay.textContent = formatPrice(total);
    }

    // =========================================================
    // 4. 이벤트 리스너: 전체 선택 체크박스 클릭 시
    // =========================================================
    selectAllCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;

        // 하위 모든 상품 체크박스의 상태를 전체 선택 체크박스와 동일하게 맞춥니다.
        productCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });

        // 상태 변경 후 금액 다시 계산
        calculateTotalPrice();
    });

    // =========================================================
    // 5. 이벤트 리스너: 개별 상품 체크박스 클릭 시
    // =========================================================
    productCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // 모든 상품 체크박스가 체크되어 있는지 확인
            const allChecked = Array.from(productCheckboxes).every(cb => cb.checked);

            // 하나라도 체크 해제되면 '전체 선택' 체크박스도 해제, 모두 체크되면 '전체 선택'도 체크
            selectAllCheckbox.checked = allChecked;

            // 상태 변경 후 금액 다시 계산
            calculateTotalPrice();
        });
    });

    // =========================================================
    // 6. 팝업창 초기화 (처음 로딩 시 0원으로 맞추거나 기존 체크 상태 반영)
    // =========================================================
    calculateTotalPrice();
});
