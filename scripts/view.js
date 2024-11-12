export class View {
  constructor() {
    this.boardContainer = document.getElementById("game-board");
    this.scoreContainer = document.getElementById("score");
    this.configurationsContainer = document.getElementById("configurations");
    this.controlButton = document.getElementById("control-button");
    this.newConfigurationButton = document.getElementById("new-configuration");
    this.addConfigurationButton = document.getElementById("add-configuration");
    this.configurationDialog = document.getElementById("configuration-dialog");
    this.closeDialogButton = document.getElementById("close-dialog");
    this.widthInput = document.getElementById("width");
    this.heightInput = document.getElementById("height");

    this.messageContainer = document.getElementById("message");
  }

  get _widthText() {
    return parseInt(this.widthInput.value);
  }

  get _heightText() {
    return parseInt(this.heightInput.value);
  }

  _validateInputs() {
    if (
      !this._widthText ||
      !this._heightText ||
      this._widthText <= 1 ||
      this._heightText <= 1
    ) {
      return { valid: false, message: "Invalid inputs" };
    }

    if ((this._widthText * this._heightText) % 2 !== 0) {
      return { valid: false, message: "The number of boxes must be even" };
    }

    if ((this._widthText * this._heightText) / 2 > 100) {
      return {
        valid: false,
        message: "The number of boxes must be less than or equal to 200",
      };
    }

    return { valid: true };
  }

  _resetInputs() {
    this.heightInput.value = "";
    this.widthInput.value = "";
  }

  displayBoard(board, boardSizeX, boardSizeY) {
    this.boardContainer.innerHTML = "";
    this.boardContainer.style.gridTemplateColumns = `repeat(${boardSizeX}, minmax(0, 100px))`;
    this.boardContainer.style.gridTemplateRows = `repeat(${boardSizeY}, 1fr)`;

    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        const memorizeBoxHtml = `
        <div class="memory-box" data-y="${y}" data-x="${x}">
            <div class="wrapper">
                <div class="front">
                </div>
                <div class="back">
                </div>
            </div>
        </div>
        
`;
        this.boardContainer.insertAdjacentHTML("beforeend", memorizeBoxHtml);
      });
    });
  }

  displayConfigurations(configurations, selectedConfigurationId) {
    this.configurationsContainer.innerHTML = "";
    configurations.forEach((config) => {
      const configurationHtml = `
        <button class="configuration ${config.id === selectedConfigurationId ? "selected" : ""}" data-id="${config.id}">
            <span>Board Size: ${config.boardSizeX} x ${config.boardSizeY}</span>
            ${
              config?.default
                ? ""
                : `<span class="delete-configuration">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </span>`
            }
        </button>
      `;

      this.configurationsContainer.insertAdjacentHTML(
        "beforeend",
        configurationHtml,
      );
    });
  }

  displayFinalMessage(score) {
    this.boardContainer.insertAdjacentHTML(
      "beforeend",
      `<p class="final-message">You've finished the game with score <strong>${score}</strong></p>`,
    );
  }

  bindClickMemoryBoxes(handler) {
    const memoryBoxes = document.querySelectorAll(".memory-box");

    memoryBoxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        handler(e.currentTarget);
      });
    });
  }

  bindClickConfigurations(handler) {
    this.configurationsContainer.addEventListener("click", (event) => {
      const configurationTarget = event.target.closest(".configuration");
      const removeConfigurationTarget = event.target.closest(
        ".delete-configuration",
      );

      if (!configurationTarget) {
        return;
      }

      const id = configurationTarget.dataset.id;

      if (removeConfigurationTarget) {
        handler(id, true);
        return;
      }

      handler(id);
    });
  }

  bindClickControlButton(handler) {
    this.controlButton.addEventListener("click", handler);
  }

  bindClickAddConfigurationButton(handler) {
    this.addConfigurationButton.addEventListener("click", (event) => {
      event.preventDefault();

      const validationResult = this._validateInputs();
      if (!validationResult.valid) {
        alert(validationResult.message);
      } else {
        try {
          handler(this._widthText, this._heightText);
          this.closeDialog();
          this._resetInputs();
        } catch (error) {
          alert(error.message);
        }
      }
    });
  }

  bindClickNewConfigurationButton() {
    this.newConfigurationButton.addEventListener("click", () => {
      this.showDialog();
    });
  }

  bindClickConfigurationDialog() {
    this.configurationDialog.addEventListener("click", (event) => {
      if (event.target === this.configurationDialog) {
        this.closeDialog();
      }
    });
  }

  bindClickCloseDialogButton() {
    this.closeDialogButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.closeDialog();
    });
  }

  updateScore(score) {
    this.scoreContainer.innerHTML = score;
  }

  showMessage() {
    this.messageContainer.classList.remove("hidden");
    this.controlButton.classList.add("hidden");
  }

  showControlButton() {
    this.messageContainer.classList.add("hidden");
    this.controlButton.classList.remove("hidden");
  }

  showDialog() {
    this.configurationDialog.showModal();
  }

  closeDialog() {
    this.configurationDialog.close();
  }
}
