// navigation.js
function loadNavigation() {
  const navHTML = `
    <center>
      <div class="logo__component">
        <a href="index.html">SCENE AND SIN</a>
      </div>
    </center>
    
    <center>
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="YES_WE_CAM.html">Yes We Cam</a>
        <a href="mayday.html">MAYDAY</a>
        <a href="counterrhythm.html">CounterRhythm</a>
        <a href="csuicide.html">협동자살</a>
        <a href="miredosi.html">Mi-Re-Do-Si</a>
        <a href="jinxjo.html">징조</a>
        <a href="csuicide2.html">협동자살2</a>
        <a href="wkfairy.html">요정과 바늘술사</a>
		<a href="pressftobuildmemorial.html">여기에 추모비를 세우세요</a>
        <a href="cementcupcake.html">Cement Cupcake</a>
		<a href="flowercracker.html">Flower Cracker</a>
        <a href="wesports.html">생활체육</a>
      </div>
      <span class="navi" onclick="openNav()"><a href="#">works/</a></span>

      <div id="mySidenav2" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav2()">&times;</a>
        <a href="ywc_install.html">Yes We Cam - installation view</a>
        <a href="cr_install.html">CounterRhythm - installation view</a>
        <a href="cc_install.html">Cement Cupcake - installation view</a>
        <a href="mdlf.html">MDLF</a>
        <a href="hland.html">Homeland</a>
        <a href="solidarity.html">Solidarity</a>
      </div>
      <span class="navi" onclick="openNav2()"><a href="#">chests/</a></span>

      <div id="mySidenav3" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav3()">&times;</a>
        <a href="YES_WE_CAM_note.html">Yes We Cam - notes</a>
        <a href="mayday_note.html">MAYDAY - notes</a>
        <a href="counterrhythm_note.html">CounterRhythm - notes</a>
        <a href="csuicide_knot.html">협동자살 - knots</a>
        <a href="miredosi_note.html">Mi-Re-Do-Si - notes</a>
        <a href="jinxjo_note.html">징조 - notes</a>
        <a href="wkfairy_note.html">요정과 바늘술사 - notes</a>
		<a href="pressftobuildmemorial_note.html">여기에 추모비를 세우세요 - notes</a>
        <a href="cementcupcake_note.html">Cement Cupcake - notes</a>
      </div>
      <span class="navi" onclick="openNav3()"><a href="#">texts/</a></span>
      
      <span class="navi"><a href="about.html">about</a></span>
    </center>
  `;

  // aside 태그 내부에 메뉴 삽입
  document.getElementById("common-nav").innerHTML = navHTML;
}

// 사이드바 열고 닫는 함수들 (기존 기능 그대로 유지)
function openNav() { document.getElementById("mySidenav").style.width = "250px"; }
function closeNav() { document.getElementById("mySidenav").style.width = "0"; }
function openNav2() { document.getElementById("mySidenav2").style.width = "250px"; }
function closeNav2() { document.getElementById("mySidenav2").style.width = "0"; }
function openNav3() { document.getElementById("mySidenav3").style.width = "250px"; }
function closeNav3() { document.getElementById("mySidenav3").style.width = "0"; }

// 페이지 로드 시 실행
window.onload = loadNavigation;


// [추가된 기능] 키보드 방향키로 슬라이드 넘기기
document.addEventListener('keydown', function(event) {
    // 현재 페이지에 plusDivs 함수(슬라이드 기능)가 있는지 확인
    if (typeof plusDivs === 'function') {
        if (event.key === 'ArrowLeft') {
            // 왼쪽 방향키를 누르면 이전 사진으로
            plusDivs(-1);
        } else if (event.key === 'ArrowRight') {
            // 오른쪽 방향키를 누르면 다음 사진으로
            plusDivs(1);
        }
    }
});


// [추가 기능 2] PC 마우스 드래그 & 모바일 스와이프로 슬라이드 넘기기 (이미지 위에서만 작동)
let startX = 0;
let endX = 0;
let isDraggingImage = false; // 💡 추가됨: 지금 이미지 위에서 드래그 중인지 확인하는 스위치

// === 모바일 터치 이벤트 ===
document.addEventListener('touchstart', function(event) {
    // 터치한 곳이 'mySlides' 이미지일 때만 스위치를 켬
    if (event.target.classList.contains('mySlides')) {
        isDraggingImage = true;
        startX = event.changedTouches[0].screenX;
    }
}, false);

document.addEventListener('touchend', function(event) {
    // 스위치가 켜져 있을 때(이미지 위에서 시작했을 때)만 작동
    if (isDraggingImage) {
        endX = event.changedTouches[0].screenX;
        handleSwipe();
        isDraggingImage = false; // 작동 후 스위치 다시 끔
    }
}, false);

// === PC 마우스 이벤트 ===
document.addEventListener('mousedown', function(event) {
    // 클릭한 곳이 'mySlides' 이미지일 때만 스위치를 켬
    if (event.target.classList.contains('mySlides')) {
        isDraggingImage = true;
        startX = event.screenX;
    }
}, false);

document.addEventListener('mouseup', function(event) {
    // 스위치가 켜져 있을 때만 작동
    if (isDraggingImage) {
        endX = event.screenX;
        handleSwipe();
        isDraggingImage = false; // 작동 후 스위치 다시 끔
    }
}, false);

// === 방향 계산 및 슬라이드 넘김 실행 ===
function handleSwipe() {
    if (typeof plusDivs === 'function') {
        let swipeDistance = endX - startX;
        
        // 50px 이상 움직였을 때만 작동
        if (swipeDistance < -50) {
            plusDivs(1);  // 왼쪽으로 밀었을 때 (다음 사진)
        } else if (swipeDistance > 50) {
            plusDivs(-1); // 오른쪽으로 밀었을 때 (이전 사진)
        }
    }
}

// PC에서 이미지 드래그 시 발생하는 브라우저 기본 동작(고스트 이미지) 방지
document.addEventListener('dragstart', function(event) {
    if (event.target.classList.contains('mySlides')) {
        event.preventDefault();
    }
});

// [추가 기능 4] 이미지 좌/우측 1/4 영역 터치(클릭) 시 슬라이드 넘기기
document.addEventListener('click', function(event) {
    // 1. 클릭한 곳이 'mySlides' 클래스를 가진 작품 이미지인지 확인
    if (event.target.classList.contains('mySlides')) {
        // 2. 현재 페이지에 슬라이드 기능(plusDivs)이 있는지 확인
        if (typeof plusDivs === 'function') {
            // 3. 클릭한 X 좌표와 이미지의 전체 너비 계산
            var clickX = event.offsetX; 
            var imgWidth = event.target.offsetWidth; 

            // 4. 영역을 1/4(25%) 기준으로 나누어 판별
            if (clickX < imgWidth * 0.25) {
                // 이미지의 왼쪽 1/4 지점 이내를 눌렀을 때 (이전 사진)
                plusDivs(-1);
            } else if (clickX > imgWidth * 0.75) {
                // 이미지의 오른쪽 1/4 지점 이후를 눌렀을 때 (다음 사진)
                plusDivs(1);
            }
            // 가운데 50% 영역을 눌렀을 때는 아무 동작도 하지 않음
        }
    }
});

// ==========================================
// [통합된 슬라이드 기능] (지연 로딩 + 자동 카운터 포함)
// ==========================================
var slideIndex = 1;

// 페이지가 로드될 때 실행 (안전장치 포함)
document.addEventListener("DOMContentLoaded", function() {
    var x = document.getElementsByClassName("mySlides");
    // 이 페이지에 'mySlides' 사진이 있을 때만 첫 번째 사진 띄우기
    if (x.length > 0) { 
        showDivs(slideIndex);
    }
});


// 기존 html 파일에서 옮긴 슬라이드 기능 

function plusDivs(n) {
    showDivs(slideIndex += n);
}
// ... [위쪽의 DOMContentLoaded 및 plusDivs 코드는 그대로 유지] ...

var idleTimer = null; // 💡 추가됨: 사용자가 머무는 시간을 잴 타이머 변수

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    
    if (x.length === 0) return; 

    // 1. 사용자가 버튼을 눌러 사진을 넘기면, 기존에 세어두던 타이머를 즉시 취소합니다.
    clearTimeout(idleTimer);

    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    
    var currentIndex = slideIndex - 1;
    var currentImg = x[currentIndex];
    currentImg.style.display = "block";  
    
    // [1단계] 즉시 스마트 프리로딩 (현재, 앞, 뒤 사진 4장만 즉시 다운로드)
    var preloadOffsets = [0, 1, 2, -1]; 
    for (var j = 0; j < preloadOffsets.length; j++) {
        var targetIndex = (currentIndex + preloadOffsets[j] + x.length) % x.length;
        var targetImg = x[targetIndex];
        
        if (targetImg && targetImg.getAttribute("data-src")) {
            targetImg.src = targetImg.getAttribute("data-src");
            targetImg.removeAttribute("data-src");
        }
    }

    // 사진 번호(카운터) 업데이트
    var counterEl = document.querySelector(".counter");
    if (counterEl) {
        var displayNum = slideIndex < 10 ? "0" + slideIndex : slideIndex;
        counterEl.innerText = displayNum + "/" + x.length;
    }

    // ==========================================
    // [2단계] 유휴 시간(Idle) 전체 로딩
    // 사진을 넘긴 후 '3초(3000ms)' 동안 가만히 있으면, 나머지 모든 사진 다운로드 시작
    // ==========================================
    idleTimer = setTimeout(function() {
        for (var k = 0; k < x.length; k++) {
            if (x[k].getAttribute("data-src")) {
                x[k].src = x[k].getAttribute("data-src");
                x[k].removeAttribute("data-src");
            }
        }
        // 확인용 (필요시 아래 주석을 풀면 브라우저 개발자 도구에 메시지가 뜹니다)
        // console.log("3초 대기 완료: 남은 모든 사진 로딩 시작!");
    }, 3000); // 3초 (원하시면 2000이나 5000으로 수정 가능합니다)
}