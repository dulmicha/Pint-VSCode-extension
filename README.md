# Pint VSCode extension
Visual Studio Code extension to help programming in [Pint](https://github.com/arekpaterak/pint).

## User interface
Beautiful and responsive interface accessible through sidebar helps to choose emojis whilst working on your Pint 🍺 code. On the bottom bar there is also custom button for transpilation and code execution - to enable it, please extend sidebar. Any output is visible in console.

## Commands
Commands are available at Command Palette (`Ctrl+Shift+P`) and status bar button.

List of commands:

| Command name       | Command description                   | Availability             |
|--------------------|---------------------------------------|--------------------------|
| Debrew             | Transpile currently opened file       | Command Palette          |
| Debrew and run     | As above + execute transpiled file    | Command Palette + button |
| Focus on Pint view | Extend Pint extension's sidebar | Command Palette          |

## Usage
### Prerequisities
To work properly, Pint VSCode Extension requires debrewer and python to be accessible through command line (added to environment variables), by, respectively, `debrewer` and `python`. 

Hint:
To make debrewer executable, you can use e.g. [PyInstaller](https://github.com/pyinstaller/pyinstaller) - `pyinstaller --onefile debrewer.py`.

### Installation
Due to user-provided SVG images, we could't publish extension on VSCode Marketplace. Nonetheless, you can still use it by installation of package `pint-extension.vsix` from this repository. It requires only 2 commands!

1. On 🍏/🐧:
   
   `curl -LJO "https://raw.githubusercontent.com/dulmicha/Pint-VSCode-extension/main/pint-extension.vsix"`
   
   ---

   On 🪟:
   
   `Invoke-WebRequest -Uri "https://raw.githubusercontent.com/dulmicha/Pint-VSCode-extension/main/pint-extension.vsix" -OutFile "pint-extension.vsix"`

   or

   `curl -LJO "https://raw.githubusercontent.com/dulmicha/Pint-VSCode-extension/main/pint-extension.vsix" -o pint-extension.vsix`
2. `code --install-extension pint-extension.vsix` 

You can code in Pint like a pro now! 🍺
