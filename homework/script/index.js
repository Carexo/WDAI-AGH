import { Zombie } from "./zombie.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("game");
    this.dialog = document.querySelector("dialog");
    this.playAgainButton = document.querySelector("dialog button");
    this.aimCursor = document.querySelector(".aim-cursor");

    const boardScale = 0.75;
    this.canvas.width = 1680 * boardScale;
    this.canvas.height = 1050 * boardScale;
    this.score = 0;

    this.leftOffset = this.canvas.offsetLeft + this.canvas.clientLeft;
    this.topOffset = this.canvas.offsetTop + this.canvas.clientTop;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "80px Arial";
    this.ctx.fillStyle = "white";

    this._zombies = [];
    this.lifes = 3;
    this.gameStatus = "playing";

    this.zombieImage = new Image();
    this.zombieImage.src = "./images/walkingdead.png";
    this.fullHeart = new Image();
    this.fullHeart.src = "./images/full_heart.png";
    this.emptyHeart = new Image();
    this.emptyHeart.src = "./images/empty_heart.png";

    this.audio = new Audio("./sounds/sad-music.mp3");

    this.canvas.addEventListener("click", this.bindCanvasClick());
    this.playAgainButton.addEventListener("click", this.bindPlayAgainButton());
    document.addEventListener("mousemove", this.bindAimCursor());
  }

  get zombies() {
    return this._zombies.sort((a, b) => a.y - b.y);
  }

  bindCanvasClick() {
    return (e) => {
      const x = e.pageX - this.leftOffset;
      const y = e.pageY - this.topOffset;
      let isHit = false;

      this.zombies.reverse().forEach((zombie) => {
        if (
          x >= zombie.x &&
          x <= zombie.x + zombie.width &&
          y >= zombie.y &&
          y <= zombie.y + zombie.height &&
          !isHit
        ) {
          this.score += 20;
          this.removeZombie(zombie);
          isHit = true;
        }
      });

      if (this.score <= 0) {
        return;
      }

      if (!isHit) {
        this.score -= 5;
      }
    };
  }

  bindPlayAgainButton() {
    return () => {
      this.lifes = 3;
      this.score = 0;
      this._zombies = [];
      this.startGame();
      this.dialog.close();

      this.audio.pause();
      this.audio.currentTime = 0;
    };
  }

  bindAimCursor() {
    return (e) => {
      if (e.target === this.canvas) {
        this.aimCursor.style.left = e.pageX + "px";
        this.aimCursor.style.top = e.pageY + "px";
      }
    };
  }

  removeZombie = (zombie) => {
    this._zombies = this._zombies.filter((z) => z !== zombie);
  };

  startGame() {
    this.gameStatus = "playing";
    this.ID = window.requestAnimationFrame(this.draw());
    setInterval(this.generateZombie.bind(this), 1000);
  }

  async endGame() {
    window.cancelAnimationFrame(this.ID);
    this.dialog.showModal();

    await this.audio.play();
  }

  generateZombie() {
    this._zombies.push(new Zombie(this.canvas.width, this.canvas.height));
  }

  draw() {
    let frameCount = 0;

    const step = () => {
      frameCount++;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.zombies.forEach((zombie) => {
        this.drawZombie(
          zombie.animationFrame,
          zombie.x,
          zombie.y,
          zombie.width,
          zombie.height,
        );

        if (frameCount % zombie.animationSpeed === 0) {
          zombie.nextFrame();
        }

        zombie.move();
        if (zombie.x < -zombie.width) {
          this.lifes--;

          if (this.lifes <= 0) {
            this.endGame();
            this.gameStatus = "gameover";
          }

          this.removeZombie(zombie);
        }
      });

      this.drawHearts();
      this.drawScore();

      if (this.gameStatus === "gameover") {
        return;
      }

      this.ID = window.requestAnimationFrame(step);
    };

    return step;
  }

  drawZombie(frameX, canvasX, canvasY, zombieWidth, zombieHeight) {
    this.ctx.drawImage(
      this.zombieImage,
      frameX * Zombie.BASE_ZOMBIE_DIMENSIONS.width,
      0,
      Zombie.BASE_ZOMBIE_DIMENSIONS.width,
      Zombie.BASE_ZOMBIE_DIMENSIONS.height,
      canvasX,
      canvasY,
      zombieWidth,
      zombieHeight,
    );
  }

  drawHearts() {
    for (let i = 0; i < this.lifes; i++) {
      this.ctx.drawImage(this.fullHeart, i * 90 + 50, 50, 80, 80);
    }

    for (let i = this.lifes; i < 3; i++) {
      this.ctx.drawImage(this.emptyHeart, i * 90 + 50, 50, 80, 80);
    }
  }

  drawScore() {
    const formatScore = this.score.toString().padStart(5, "0");
    this.ctx.fillText(formatScore, this.canvas.width - 300, 110);
  }
}

const game = new Game();
game.startGame();
