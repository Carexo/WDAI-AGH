import {
  IMAGE_PATH,
  DEFAULT_CONFIGURATIONS,
  NUMBER_OF_IMAGES,
} from "./config.js";

export class Model {
  constructor() {
    this._configurations = [...this.configurationsFromLocalStorage];

    this.selectedConfiguration = this.selectedConfigurationFromLocalStorage;

    this.memoryBoxes = new Set();
    this.board = [[]];
    this.selectedBoxes = {
      first: null,
      second: null,
    };
    this.score = 0;
    this.gameStatus = "stopped";
    this.remainingBoxes = 0;
  }

  get configurations() {
    return [...DEFAULT_CONFIGURATIONS, ...this._configurations];
  }

  get configurationsFromLocalStorage() {
    const configurations =
      JSON.parse(localStorage.getItem("configurations")) || [];
    return configurations.filter(this._isValidConfiguration);
  }

  get selectedConfigurationFromLocalStorage() {
    const configuration = JSON.parse(
      localStorage.getItem("selected_configuration"),
    );

    if (
      this._isValidConfiguration(configuration) &&
      this.configurations.some((config) => config.id === configuration.id)
    ) {
      return configuration;
    } else {
      return this.configurations[0];
    }
  }

  _isValidConfiguration(config) {
    return (
      config &&
      typeof config.id === "string" &&
      typeof config.boardSizeX === "number" &&
      typeof config.boardSizeY === "number"
    );
  }

  bindSelectedConfigurationChange(callback) {
    this.onSelectedConfigurationChange = callback;
  }

  refreshConfigurations() {
    this.onSelectedConfigurationChange(
      this.configurations,
      this.selectedConfiguration.id,
    );
  }

  bindBoardChange(callback) {
    this.onBoardChange = callback;
  }

  bindGameStatusChange(callback) {
    this.onGameStatusChange = callback;
  }

  handleGameStatusChange() {
    this.onGameStatusChange(this.gameStatus);
  }

  refreshBoard() {
    this.onBoardChange(
      this.board,
      this.selectedConfiguration.boardSizeX,
      this.selectedConfiguration.boardSizeY,
      this.score,
    );
  }

  bindFinishGame(callback) {
    this.onFinishGame = callback;
  }

  handleFinishGame() {
    this.onFinishGame(this.score);
  }

  bindScoreChange(callback) {
    this.onScoreChnage = callback;
  }

  handleScoreChange() {
    this.onScoreChnage(this.score);
  }

  newGame(boardSizeX, boardSizeY, images) {
    if ((boardSizeY * boardSizeX) / 2 > NUMBER_OF_IMAGES) {
      throw new Error("Selected board size exceeds the allowed limits.");
    }

    images = images || this.generateRandomImages((boardSizeX * boardSizeY) / 2);

    if ((boardSizeX * boardSizeY) % 2 !== 0) {
      alert("wrong board size");
      return;
    }

    if (images.length < (boardSizeX * boardSizeY) / 2) {
      alert("not enough images");
      return;
    }

    this.gameStatus = "stopped";
    this.score = 0;
    this.memoryBoxes = new Set();
    this.remainingBoxes = (boardSizeY * boardSizeY) / 2;
    this.board = [...Array(boardSizeY)].map(() => Array(boardSizeX));

    images.forEach((image) => {
      this.memoryBoxes.add(image);
    });

    this.selectedBoxes = {
      first: null,
      second: null,
    };

    this.generateBoard(boardSizeX, boardSizeY);
  }

  generateBoard(boardSizeX, boardSizeY) {
    const randomIndexPair = () => {
      return {
        x: Math.floor(Math.random() * boardSizeX),
        y: Math.floor(Math.random() * boardSizeY),
      };
    };

    this.memoryBoxes.forEach((box) => {
      let randomIndexes = randomIndexPair();

      while (this.board[randomIndexes.y][randomIndexes.x]) {
        randomIndexes = randomIndexPair();
      }

      const id = crypto.randomUUID();
      this.board[randomIndexes.y][randomIndexes.x] = {
        imageScr: `${IMAGE_PATH}/image_${box}.jpg`,
        id,
      };

      while (this.board[randomIndexes.y][randomIndexes.x]) {
        randomIndexes = randomIndexPair();
      }

      this.board[randomIndexes.y][randomIndexes.x] = {
        imageScr: `${IMAGE_PATH}/image_${box}.jpg`,
        id,
      };
    });
  }

  generateRandomImages(size) {
    const images = new Set();
    while (images.size < size) {
      images.add(Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1);
    }
    return images;
  }

  clickMemoryBox(memoryBox) {
    if (this.gameStatus === "stopped") {
      this.gameStatus = "started";
      this.handleGameStatusChange();
    }

    if (
      this.checkIfTwoBoxesAreSelected() ||
      this.checkIfBoxIsSelected(memoryBox)
    ) {
      return;
    }

    memoryBox.classList.toggle("flip-container");
    const backSide = memoryBox.querySelector(".back");

    backSide.innerHTML = `<img src="${this.getBoxDataByIndexes(memoryBox).imageScr}" alt="Memory Box" />`;

    if (!this.selectedBoxes.first) {
      this.selectedBoxes.first = memoryBox;
    } else {
      this.selectedBoxes.second = memoryBox;
    }

    this.incrementScore();
    this.checkStatus();
  }

  clickConfiguration(id, isDelete) {
    if (id === this.selectedConfiguration.id) {
      return;
    }

    if (isDelete) {
      if (confirm("Are you sure you want to delete this configuration ?")) {
        this._configurations = this._configurations.filter(
          (config) => config.id !== id,
        );
        localStorage.setItem(
          "configurations",
          JSON.stringify(this._configurations),
        );
        this.refreshConfigurations();
      }
      return;
    }

    const newConfiguration = this.getConfigurationById(id);

    try {
      if (this.gameStatus === "stopped") {
        this.newGame(newConfiguration.boardSizeX, newConfiguration.boardSizeY);

        this._setSelectedConfiguration(newConfiguration);
        this.refreshConfigurations();
        this.refreshBoard();

        this.handleGameStatusChange();
      } else if (this.gameStatus === "started") {
        if (confirm("Are you sure you want to change board configuration ?")) {
          this.newGame(
            newConfiguration.boardSizeX,
            newConfiguration.boardSizeY,
          );

          this._setSelectedConfiguration(newConfiguration);

          this.refreshConfigurations();
          this.refreshBoard();
          this.handleGameStatusChange();
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }

  _validateConfiguration(width, height) {
    return this.configurations.every(
      (config) => config.boardSizeX !== width || config.boardSizeY !== height,
    );
  }

  _setSelectedConfiguration(configuration) {
    this.selectedConfiguration = configuration;
    localStorage.setItem(
      "selected_configuration",
      JSON.stringify(configuration),
    );
  }

  addConfiguration(width, height) {
    if (!this._validateConfiguration(width, height)) {
      throw new Error("Configuration already exists");
    }
    const id = crypto.randomUUID();
    this._configurations.push({
      id,
      boardSizeX: width,
      boardSizeY: height,
    });
    localStorage.setItem(
      "configurations",
      JSON.stringify(this._configurations),
    );
  }

  clickControlButton() {
    try {
      this.newGame(
        this.selectedConfiguration.boardSizeX,
        this.selectedConfiguration.boardSizeY,
      );
      this.refreshBoard();
      this.handleGameStatusChange();
    } catch (error) {
      alert(error.message);
    }
  }

  clickAddConfigurationButton(width, height) {
    this.addConfiguration(width, height);
    this.refreshConfigurations();
  }

  checkStatus() {
    if (!this.selectedBoxes.first || !this.selectedBoxes.second) {
      return;
    }

    setTimeout(() => {
      if (
        this.getBoxDataByIndexes(this.selectedBoxes.first).id ===
        this.getBoxDataByIndexes(this.selectedBoxes.second).id
      ) {
        this.selectedBoxes.first.style.visibility = "hidden";
        this.selectedBoxes.second.style.visibility = "hidden";

        this.decreaseRemainingBoxes();
        if (this.remainingBoxes <= 0) {
          this.handleFinishGame();
        }
      } else {
        this.selectedBoxes.first.classList.remove("flip-container");
        this.selectedBoxes.second.classList.remove("flip-container");
      }

      this.selectedBoxes.first = null;
      this.selectedBoxes.second = null;
    }, 1000);
  }

  checkIfTwoBoxesAreSelected() {
    return this.selectedBoxes.first && this.selectedBoxes.second;
  }

  checkIfBoxIsSelected(box) {
    return (
      this.selectedBoxes.first === box || this.selectedBoxes.second === box
    );
  }

  getConfigurationById(id) {
    return this.configurations.find((config) => config.id === id);
  }

  getBoxDataByIndexes(box) {
    return this.board[box.dataset.y][box.dataset.x];
  }

  incrementScore() {
    if (this.selectedBoxes.first && !this.selectedBoxes.second) {
      this.score++;
      this.handleScoreChange();
    }
  }

  decreaseRemainingBoxes() {
    this.remainingBoxes--;
  }
}
