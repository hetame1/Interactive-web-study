## canvas

canvas.getContext('2d') 를 이용하여 canvas를 그릴 수 있다

### canvas의 크기를 지정하는 방법

canvas.style.width 하고 canvas.width 를 같은 값으로 지정해줘야 한다

디바이스마다 픽셀의 밀도가 다르기 때문에 window.devicePixelRatio 를 이용하여 픽셀의 밀도를 구한 후에 canvas.width 에 곱해줘야 한다

이렇게 해야 canvas의 크기가 같아진다

```javascript
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

ctx.scale(dpr, dpr);
```

### 사각형

```javascript
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 100);
```

### 원

```javascript
// 그리기 시작함을 알림
ctx.beginPath();

ctx.arc(시작X위치, 시작Y위치, 반지름, 시작각도, 끝각도, (시계,반시계)방향);

// 각도는 Math.PI / 180 = 1도를 의미
// 방향은 생략 가능

ctx.fill(); // 채우기

ctx.stroke(); // 테두리

ctx.closePath(); // 그리기 종료
```

window.requestAnimationFrame() 를 이용하여 애니메이션을 구현할 수 있다

- 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 한다
