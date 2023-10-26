import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import Spark from "./js/Spark.js";
import Tail from "./js/Tail.js";
import { hypotenuse, randomNumBetween } from "./js/utils.js";

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.tails = [];
    this.particles = [];
    this.sparcks = [];
  }

  // 초기화
  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;

    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = `${this.canvasWidth}px`;
    this.canvas.style.height = `${this.canvasHeight}px`;

    this.createParticles();
  }

  // 꼬리 생성
  createTail() {
    // x좌표 화면 크기의 20% ~ 80% 사이에서 랜덤으로 생성
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    // y좌표는 화면 하단에서 생성
    // vy 속도는 화면 높이의 1% ~ 1.5% 사이에서 랜덤으로 생성
    const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
    const colorDeg = randomNumBetween(0, 360);

    // 꼬리 생성
    this.tails.push(new Tail(x, vy, colorDeg));
  }

  createParticles(x, y, colorDeg) {
    // 파티클 갯수
    const PARTICLE_NUM = 400;

    // 파티클 생성
    for (let i = 0; i < PARTICLE_NUM; i++) {
      // 화면 크기에 맞게 반지름을 설정
      const r =
        randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
      // 앵글은 0 ~ 360도 사이에서 랜덤으로 생성
      // Math.PI / 180 을 곱해 라디안으로 변환
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      // x좌표는 파티클이 생성된 x좌표를 기준으로 반지름과 앵글을 이용해 계산
      const vx = Math.cos(angle) * r;
      // y좌표는 파티클이 생성된 y좌표를 기준으로 반지름과 앵글을 이용해 계산
      const vy = Math.sin(angle) * r;

      /* 위에 내용은 파티클이 동그랗게 퍼지는 것처럼 보이게 하기 위한 계산 */

      const opacity = randomNumBetween(0.6, 0.9);
      const _colorDeg = randomNumBetween(-20, 20) + colorDeg;
      this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg));
    }
  }

  render() {
    // 1초에 60번 화면을 새로 그리기 위해 requestAnimationFrame을 사용
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if (delta < this.interval) return;

      // 화면을 새로 그리기 전에 이전 화면을 지워줌
      this.ctx.fillStyle = this.bgColor + "40";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 파티클이 생성된 만큼 화면을 하얗게 만들어줌
      this.ctx.fillStyle = `rgba(255, 255, 255, ${
        this.particles.length / 50000
      })    `;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 꼬리 생성 갯수를 조절하기 위한 랜덤값
      if (Math.random() < 0.03) this.createTail();

      // 꼬리 생성
      this.tails.forEach((tail, index) => {
        tail.update();
        tail.draw();

        // 꼬리에 스파클을 생성
        for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
          const vx = randomNumBetween(-5, 5) * 0.05;
          const vy = randomNumBetween(-5, 5) * 0.05;
          const opacity = Math.min(-tail.vy, 0.5);
          this.sparcks.push(
            new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg)
          );
        }

        // 꼬리의 속도가 -0.7보다 작아지면 꼬리를 삭제하고 파티클을 생성
        if (tail.vy > -0.7) {
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.colorDeg);
        }
      });

      // 파티클 생성
      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // 스파클이 많이 생기는 것을 방지하기 위해 랜덤값을 주어 조절
        if (Math.random() < 0.05) {
          this.sparcks.push(new Spark(particle.x, particle.y, 0, 0, 0.3, 45));
        }

        // 파티클의 투명도가 0보다 작아지면 파티클을 삭제
        if (particle.opacity <= 0) this.particles.splice(index, 1);
      });

      // 스파클 생성
      this.sparcks.forEach((spark, index) => {
        spark.update();
        spark.draw();

        if (spark.opacity <= 0) this.sparcks.splice(index, 1);
      });

      then = now - (delta % this.interval);
    };

    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
});
