import * as vscode from "vscode";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {
    this._extensionUri = _extensionUri;
  }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    this._view.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    this._view.webview.html = this._getHtmlForWebview(webviewView.webview);

    this._view.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case 'insertEmoji':
            // vscode.window.showErrorMessage(message.emoji);
            vscode.commands.executeCommand('pint.insertEmoji', message.emoji);
          }
      },
      undefined,
    );
    
  }

  // public revive(panel: vscode.WebviewView) {
  //   this._view = panel;
  // }

  public revive(webviewView: vscode.WebviewView) {
    this._view = webviewView;
    this._view.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    this._view.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    // const scriptUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "sidebar", "sidebar.js")
    // );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "sidebar", "sidebar.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );
    
    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
        <script>const vscode = acquireVsCodeApi();</script>
			</head>
      <body>
        <h4>Emojis list</h4>
        <div class="grid">
          <div class="item"><button onclick="handleButtonClick('🔢')"}>🔢</button></div>
          <div class="item"><button onclick="handleButtonClick('⏺️')"}>⏺️</button></div>
          <div class="item"><button onclick="handleButtonClick('🔠')"}>🔠</button></div>

          <div class="item"><button onclick="handleButtonClick('🆒')"}>🆒</button></div>
          <div class="item"><button onclick="handleButtonClick('✅')"}>✅</button></div>
          <div class="item"><button onclick="handleButtonClick('❌')"}>❌</button></div>

          <div class="item"><button onclick="handleButtonClick('🌌')"}>🌌</button></div>
          <div class="item"><button onclick="handleButtonClick('✏️')"}>✏️</button></div>
          <div class="emptyitem"></div>

          <div class="item"><button onclick="handleButtonClick('🏛️')"}>🏛️</button></div>
          <div class="item"><button onclick="handleButtonClick('👨‍👦')"}>👨‍👦</button></div>
          <div class="item"><button onclick="handleButtonClick('🤗')"}>🤗</button></div>

          <div class="item"><button onclick="handleButtonClick('🏗️')"}>🏗️</button></div>
          <div class="item"><button onclick="handleButtonClick('🍺')"}>🍺</button></div>
          <div class="item"><button onclick="handleButtonClick('🦞')"}>🦞</button></div>

          <div class="item"><button onclick="handleButtonClick('🐜')"}>🐜</button></div>
          <div class="item"><button onclick="handleButtonClick('⚖️')"}>⚖️</button></div>
          <div class="item"><button onclick="handleButtonClick('🐘')"}>🐘</button></div>

          <div class="item"><button onclick="handleButtonClick('🐍')"}>🐍</button></div>
          <div class="item"><button onclick="handleButtonClick('🌼')"}>🌼</button></div>
          <div class="item"><button onclick="handleButtonClick('🗺️')"}>🗺️</button></div>

          <div class="item"><button onclick="handleButtonClick('🗑️')"}>🗑️</button></div>
          <div class="emptyitem"></div>
          <div class="emptyitem"></div>

          <div class="item"><button onclick="handleButtonClick('🌲')"}>🌲</button></div>
          <div class="item"><button onclick="handleButtonClick('🍃')"}>🍃</button></div>
          <div class="item"><button onclick="handleButtonClick('🍂')"}>🍂</button></div>

          <div class="item"><button onclick="handleButtonClick('🔁')"}>🔁</button></div>
          <div class="emptyitem"></div>
          <div class="emptyitem"></div>

          <div class="item"><button onclick="handleButtonClick('🛑')"}>🛑</button></div>
          <div class="item"><button onclick="handleButtonClick('🚦')"}>🚦</button></div>
          <div class="item"><button onclick="handleButtonClick('🦥')"}>🦥</button></div>

          <div class="item"><button onclick="handleButtonClick('🚢')"}>🚢</button></div>
          <div class="item"><button onclick="handleButtonClick('🏝️')"}>🏝️</button></div>
          <div class="item"><button onclick="handleButtonClick('🤿')"}>🤿</button></div>

          <div class="item"><button onclick="handleButtonClick('🖨️')"}>🖨️</button></div>
        </div>

        <script>
          function handleButtonClick(emoji) {
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

