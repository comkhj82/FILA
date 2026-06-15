document.addEventListener("DOMContentLoaded", () => {
    // 1. 헤더를 불러올 컨테이너 확인
    const headerContainer = document.getElementById("header-container");
    if (!headerContainer) return;

    // 2. 현재 페이지 위치에 따른 header.html 경로 및 Root 경로 계산
    let fetchPath = "HTML/header.html";
    let rootPath = "";

    const pathName = window.location.pathname;
    if (pathName.includes("/product/") || pathName.includes("/user/")) {
        fetchPath = "../header.html";
        rootPath = "../../";
    } else if (pathName.includes("/HTML/")) {
        fetchPath = "header.html";
        rootPath = "../";
    } else {
        // root (index.html)
        fetchPath = "HTML/header.html";
        rootPath = "";
    }

    fetch(fetchPath)
        .then(response => {
            if (!response.ok) throw new Error("헤더를 불러오는데 실패했습니다.");
            return response.text();
        })
        .then(data => {
            // HTML 전체 내용을 header-container에 삽입 (쿠폰 + 헤더)
            headerContainer.innerHTML = data;
            
            // 3. 경로 보정 (이미지 및 링크)
            const images = headerContainer.querySelectorAll('img');
            images.forEach(img => {
                const src = img.getAttribute('src');
                if (src && src.startsWith('../IMAGE/')) {
                     img.src = rootPath + "IMAGE/" + src.split('IMAGE/')[1];
                }
            });
            
            const links = headerContainer.querySelectorAll('a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                // 외부 링크나 앵커가 아닌 경우에만 처리
                if (href && href !== "#" && !href.startsWith("http")) {
                    // 앞에 붙은 / 를 제거하고 rootPath를 붙여 상대 경로로 만듦
                    const cleanHref = href.startsWith("/") ? href.substring(1) : href;
                    
                    if (cleanHref === "" || cleanHref === "index.html") {
                        link.href = rootPath + "index.html";
                    } else {
                        link.href = rootPath + cleanHref;
                    }
                }
            });

            // 4. 헤더 스크립트(JS) 기능 적용
            if (typeof initHeader === 'function') {
                initHeader();
            }
        })
        .catch(error => console.error(error));
});
