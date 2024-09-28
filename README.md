# kyrtap-website

A simple retro-style webpage featuring dialog boxes, a taskbar, and dynamic clock updates, inspired by early Windows UI. This project uses HTML, CSS, and JavaScript to create a basic interactive layout with a "Hello World" message.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## Demo

You can view a live demo of this project [here](https://kyrtap.de).

# Features

- **Retro UI Design**: Inspired by old-school Windows UI elements.
- **Draggable Dialog Boxes**: Multiply and appear at random positions on the screen when clicked.
- **Taskbar**: A functional taskbar with a start button that links to your GitHub profile.
- **Dynamic Clock**: Displays the current time, updated every second.
- **Interactive Buttons**: Clickable buttons with visual feedback.

## Installation

To get this project up and running on your local machine:

1. Clone the repository:
    ```bash
    git clone https://github.com/kyrtap/kyrtap-website.git
    ```

2. Navigate to the project directory:
    ```bash
    cd kyrtap-website
    ```

3. Open the `index.html` file in your browser:
    - You can simply open `index.html` directly in your browser to view the project locally.

## Usage

Once the page is loaded, you can interact with the following:

1. **Window Spawning**: Click on the "OK" button to spawn new windows that will randomly appear on the screen.
2. **Start Button**: Click on the "Start" button in the taskbar to visit the project's GitHub page.
3. **Clock**: The time in the bottom-right corner of the taskbar is dynamically updated.

## Project Structure

```bash
├── index.html      # Main HTML file
├── styles.css      # CSS file for styling
├── scripts.js      # JavaScript file for interactivity
└── README.md       # Project documentation (this file)
```

### index.html

The main HTML file links to the `styles.css` and `scripts.js` files for styling and functionality.

### styles.css

Contains all the styles for the project, including the retro window design, taskbar, and buttons.

### scripts.js

Handles JavaScript functionality:
- Spawning new windows.
- Centering the initial window.
- Updating the clock every second.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request
