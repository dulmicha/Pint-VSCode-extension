# Pint VSCode extension
Visual Studio Code extension to help programming in [Pint](https://github.com/arekpaterak/pint).

## User interface
Beautiful and responsive interface accessible through sidebar helps to choose emojis whilst working on your Pint code. On the bottom bar there is also custom button for transpilation and code execution - to enable it, please extend sidebar. Any output is visible in console.

## Commands
Commands are available at Command Palette (`Ctrl+Shift+P`) and status bar button.

List of commands:

| Command name       | Command description                   | Availability             |
|--------------------|---------------------------------------|--------------------------|
| Debrew             | Transpile currently opened file       | Command Palette          |
| Debrew and run     | As above + execute transpiled file    | Command Palette + button |
| Focus on Pint view | Make Pint extension's sidebar visible | Command Palette          |

## Usage
### Prerequisities
To work properly, Pint VSCode Extension requires debrewer and python to be accessible through command line (added to environment variables), by, respectively, `debrewer` and `python`.

### Installation
Due to user-provided SVG images, we could't publish extension on VSCode Marketplace. Nonetheless, you can still use it by installation of package `pint-extension.vsix` from this repository. You can do it by simply downloading it and typing `code --install-extension pint-extension.vsix` in terminal while being in folder where te package is. You can code in Pint like a pro now! 🍺
