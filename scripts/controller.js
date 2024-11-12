export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.newGame(
      this.model.selectedConfiguration.boardSizeX,
      this.model.selectedConfiguration.boardSizeY,
    );

    this.onBoardChange(
      this.model.board,
      this.model.selectedConfiguration.boardSizeX,
      this.model.selectedConfiguration.boardSizeY,
      this.model.score,
    );

    this.onGameStatusChange(this.model.gameStatus);

    this.view.bindClickConfigurations(this.handleClickConfiguration);
    this.view.bindClickControlButton(this.handleClickControlButton);
    this.view.bindClickNewConfigurationButton();
    this.view.bindClickCloseDialogButton();
    this.view.bindClickConfigurationDialog();
    this.view.bindClickAddConfigurationButton(
      this.handleClickAddConfigurationButton,
    );
    this.model.bindGameStatusChange(this.onGameStatusChange);
    this.model.bindFinishGame(this.handleFinishGame);
    this.model.bindScoreChange(this.onScoreChange);

    this.model.bindSelectedConfigurationChange(
      this.onSelectedConfigurationChange,
    );
    this.model.bindBoardChange(this.onBoardChange);

    this.onSelectedConfigurationChange(
      this.model.configurations,
      this.model.selectedConfiguration.id,
    );
  }

  handleClickMemoryBox = (memoryBox) => {
    this.model.clickMemoryBox(memoryBox);
  };

  handleClickConfiguration = (configurationId, isDelete) => {
    this.model.clickConfiguration(configurationId, isDelete);
  };

  handleClickControlButton = () => {
    this.model.clickControlButton();
  };

  handleFinishGame = (score) => {
    this.view.displayFinalMessage(score);
  };

  handleClickAddConfigurationButton = (width, height) => {
    this.model.clickAddConfigurationButton(width, height);
  };

  onBoardChange = (board, boardSizeX, boardSizeY, score) => {
    this.view.displayBoard(board, boardSizeX, boardSizeY);
    this.view.updateScore(score);
    this.view.bindClickMemoryBoxes(this.handleClickMemoryBox);
  };

  onScoreChange = (score) => {
    this.view.updateScore(score);
  };

  onSelectedConfigurationChange = (configuration, selectedConfigurationId) => {
    this.view.displayConfigurations(configuration, selectedConfigurationId);
  };

  onGameStatusChange = (gameStatus) => {
    if (gameStatus === "started") {
      this.view.showControlButton();
    } else if (gameStatus === "stopped") {
      this.view.showMessage();
    }
  };
}
