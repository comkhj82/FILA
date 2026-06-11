// MDN Web Docs 가이드에 따른 표준 fetch API 사용법
document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html") // 경로에 주의하세요 (예: '../header.html')
        .then(response => {
            if (!response.ok) throw new Error("헤더를 불러오는데 실패했습니다.");
            return response.text();
        })
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            // 만약 헤더 안에 호버 액션 등 자바스크립트가 필요하다면 여기서 함수를 실행해야 합니다.
        })
        .catch(error => console.error(error));
});
