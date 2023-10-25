## Parallax Scrolling

- 레이어별 스크롤 속도를 다르게 하여 입체감을 주는 디자인 기법
- 게임, 애니메이션 등에 주로 사용되던 기법, 인터랙티브 웹이 대두되며 함께 주목받기 시작

## Event Listener

## Window object

- window.document // document
- window.history // 브라우저의 세션 기록을 조작할 때 사용

  - history.back() // 뒤로가기

- window.open() // 새창, 탭을 엶
- window.close() // 현재 창이나 탭을 닫음

- window.scrollX // 수평으로 얼마나 스크롤됐는지 픽셀 단위 반환
- window.scrollY // 수직으로 얼마나 스크롤됐는지 픽셀 단위 반환

## HTMLElement.style

- 해당 HTMLElement에 inline style로 정의된 속성들을 담고있는 객체
- HTML 요소의 인라인 스타일에 접근하고 조작하기 위해 사용

## CSS perspective

- 해당 요소의 z = 0 평면과 사용자 사이의 거리를 정의
- transform 효과를 주고자 하는 부모 요소에 적용
- perspective에 따른 변형 효과
  - perspective가 클수록, (즉 거리가 멀수록) 변형 효과가 적음
  - perspective가 작을수록, (즉 거리가 가까울수록) 변형 효과가 큼

### scroll-behavior

- 브우저가 유저의 페이지 스크롤을 어떻게 동작시킬 지 명시
- value:
  - auto: 브라우저의 기본 스크롤 동작을 따름
  - smooth: 스크롤이 부드럽게 이루어짐  
    (IE에서는 지원하지 않음)

## @media

- 미디어 쿼리를 사용하여 미디어 유형에 따라 다른 스타일을 적용할 수 있음
