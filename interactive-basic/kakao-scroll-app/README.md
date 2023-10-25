맨 밑 바닥을 알고 싶으면
window.scroll = document.documentElement.clientHeight;
맽 위에 위치 + 브라우저 높이 = 맨 밑 바닥

## HTML Video

- 동영상을 임베드 하는 것을 지원
- <source> 는 내용이 없고 닫는 태그도 없는 void element
- <video> 는 내용이 없는 태그이지만 닫는 태그가 있음

- controls: 이 속성이 있다면 소리 소절, 탐색, 정지/시작 컨트롤러 제공
- muted: 오디오의 기본 설정. 설정하면 오디오가 나오지 않음
- loop: 이 값이 설정되면 재생이 끝나고 처음으로 돌아감
- autoplay: 비디오가 자동재생됨

- currentTime: 현재 재생 시간
- duration: 비디오의 총 재생 시간
