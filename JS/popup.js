document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // 1. 필요한 DOM 요소 선택 (ID가 다르더라도 작동하게 클래스 기반으로 선택)
    // =========================================================
    const selectAllCheckbox = document.querySelector('.select_all_container input[type="checkbox"]');
    const productCheckboxes = document.querySelectorAll('.product_item input[type="checkbox"]');
    const totalPriceDisplay = document.querySelector('.total_price_container b:last-child');

    // 방어 코드: 팝업창 요소가 현재 페이지에 없으면 스크립트를 중단합니다.
    if (!productCheckboxes.length || !totalPriceDisplay) return;

    // =========================================================
    // 2. 금액 계산 유틸리티 함수
    // =========================================================
    const parsePrice = (priceStr) => {
        return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
    };

    const formatPrice = (num) => {
        return num.toLocaleString('ko-KR') + "원";
    };

    // =========================================================
    // 3. 총 주문 금액 합산 함수
    // =========================================================
    function calculateTotalPrice() {
        let total = 0;

        productCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const priceElement = checkbox.closest('.product_item').querySelector('strong');
                if (priceElement) {
                    total += parsePrice(priceElement.textContent);
                }
            }
        });

        totalPriceDisplay.textContent = formatPrice(total);
    }

    // =========================================================
    // 4. 이벤트 리스너: 전체 선택 체크박스 클릭 시
    // =========================================================
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            productCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            calculateTotalPrice();
        });
    }

    // =========================================================
    // 5. 이벤트 리스너: 개별 상품 체크박스 클릭 시
    // =========================================================
    productCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (selectAllCheckbox) {
                const allChecked = Array.from(productCheckboxes).every(cb => cb.checked);
                selectAllCheckbox.checked = allChecked;
            }
            calculateTotalPrice();
        });
    });

    // =========================================================
    // 6. 팝업창 초기화
    // =========================================================
    calculateTotalPrice();
});
