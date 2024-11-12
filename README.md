# Memory Game 🧠

A fun and interactive memory game built with JavaScript, HTML, and CSS using the MVC (Model-View-Controller)
architecture. The objective of the game is to match pairs of identical images on a custom board, with the ability to
save, reload, and delete configurations.

### [Live Demo](https://memory-game-wdai.netlify.app/)

Try out the game online by visiting the live demo link above!

## Features

- **Custom Board Sizes**: Choose a custom board size to tailor the difficulty and layout of the game.
- **Persistent Configurations**: Game configurations are saved directly in the browser, so refreshing or reopening the
  page restores your last configuration.
- **Configuration Management**: Easily create, load, and delete custom game configurations to try different board
  layouts.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Play](#how-to-play)
- [Configuration Management](#configuration-management)
- [Built With](#built-with)
- [License](#license)

## Getting Started

### Prerequisites

To run the game, all you need is a modern web browser that supports HTML5, CSS3, and JavaScript.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/memory-game.git
   ```

2. Open the project folder and run the game by opening index.html in your browser.

How to Play

1. Click on a card to reveal the hidden image.
2. Click on a second card to try and find a matching image.
3. If the two images match, the pair stays revealed. If not, the cards will flip back after a short delay.
4. Continue until all pairs are matched!

Configuration Management

- **Creating a New Configuration**: Select a custom board size before starting the game. Your configuration will be
  saved
  automatically and reloaded when you refresh the browser.
- **Deleting a Configuration**: Navigate to the configuration management section to remove any saved configurations.

Built With

- JavaScript - Game logic and browser storage functionality
- HTML - Structure of the game
- CSS - Styling and animations
