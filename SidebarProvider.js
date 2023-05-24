"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarProvider = void 0;
const vscode = require("vscode");
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'insertEmoji':
                    // vscode.window.showErrorMessage(message.emoji);
                    vscode.commands.executeCommand('pint.insertEmoji', message.emoji);
                    this.revive(webviewView);
            }
        }, undefined);
    }
    // public revive(panel: vscode.WebviewView) {
    //   this._view = panel;
    // }
    revive(webviewView) {
        this._view = webviewView;
        this._view.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        this._view.webview.html = this._getHtmlForWebview(this._view.webview);
        this._view.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case 'insertEmoji':
                    // vscode.window.showErrorMessage(message.emoji);
                    vscode.commands.executeCommand('pint.insertEmoji', message.emoji);
                    this.revive(webviewView);
            }
        });
    }
    _getHtmlForWebview(webview) {
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "sidebar", "sidebar.js"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "sidebar", "sidebar.css"));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        // Use a nonce to only allow a specific script to be run.
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
			</head>
          <body>
            <div class="grid">
              <div class="item"><button id="btn1" onclick="handleButtonClick('1🍺')"}>🍺</button></div>
              <div class="item"><button id="btn2" onclick="handleButtonClick('2🍺')"}>🍺</button></div>
              <div class="item"><button id="btn3" onclick="handleButtonClick('3🍺')"}>🍺</button></div>
              <div class="item"><button id="btn4" onclick="handleButtonClick('4🍺)"}>🍺</button></div>
              <div class="item"><button id="btn5" onclick="handleButtonClick('5')"}>🍺</button></div>
              <div class="item"><button id="btn6" onclick="handleButtonClick('6')"}>🍺</button></div>
              <div class="item"><button id="btn7" onclick="handleButtonClick('7')"}>🍺</button></div>
              <div class="item"><button id="btn8" onclick="handleButtonClick('8')"}>🍺</button></div>
              <div class="item"><button id="btn9" onclick="handleButtonClick('9')"}>🍺</button></div>
            </div>

            <script>
            function handleButtonClick(emoji) {
                const vscode = acquireVsCodeApi();
                vscode.postMessage({
                    command: "insertEmoji",
                    emoji: emoji
                });
                }
            </script>
			</body>
			</html>`;
    }
}
exports.SidebarProvider = SidebarProvider;
//# sourceMappingURL=SidebarProvider.js.map