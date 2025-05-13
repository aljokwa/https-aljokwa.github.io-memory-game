# Memory Game

A simple, responsive memory card matching game built with vanilla JavaScript, HTML, and CSS.

![Memory Game Screenshot](https://via.placeholder.com/800x450.png?text=Memory+Game)

## Features

- Interactive card-flipping animations
- Game statistics tracking (moves and time)
- Responsive design that works on mobile and desktop
- Start, stop, and restart game controls
- Victory screen with game statistics

## How to Play

1. Click the "Start" button to begin the game
2. Click on any card to flip it and reveal the symbol
3. Click on another card to find a matching symbol
4. If the cards match, they stay flipped, if not, they flip back
5. Match all pairs to win the game
6. Try to complete the game in the fewest moves and shortest time

## Installation

No installation required! Simply clone this repository and open `index.html` in your web browser.

```bash
git clone https://github.com/yourusername/memory-game.git
cd memory-game
```

Then open `index.html` in your preferred browser.

## Project Structure

```
memory-game/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── scripts/            # JavaScript files
│   └── game.js         # Game logic
├── assets/             # Game assets
│   └── images/
│       └── card-back.svg
├── LICENSE             # MIT License
└── README.md           # This file
```

## Customization

### Changing Card Symbols

The game currently uses emoji as card symbols. To change them, modify the `cardValues` array in `scripts/game.js`:

```javascript
const cardValues = [
    { value: '🐶', name: 'dog' },
    { value: '🐱', name: 'cat' },
    // Add or replace with your own symbols/emoji
];
```

### Adding More Cards

To increase game difficulty, add more pairs to the `cardValues` array and adjust the CSS grid layout in `styles.css` as needed.

## Browser Compatibility

The game works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Inspired by classic memory card games
- Built with vanilla JavaScript - no frameworks or libraries
