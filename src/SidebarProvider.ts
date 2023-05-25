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
        <style>
          h4 {text-align: center;}
          p {text-align: center;}
          div {text-align: center;}
        </style>
			</head>
      <body>
        <h4>Imports</h4>
        <div class="grid">
          <div class="item"><button title="import" class="button_circle" onclick="handleButtonClick('🚢')"}>🚢</button></div>
          <div class="item"><button title="from" lass="button_circle" onclick="handleButtonClick('🏝️')"}>🏝️</button></div>
          <div class="item"><button title="as" class="button_circle" onclick="handleButtonClick('🤿')"}>🤿</button></div>
        </div>

        <h4>Types</h4>
        <div class="grid">
          <div class="item"><button title="integer" class="button_circle" onclick="handleButtonClick('🔢')"}>🔢</button></div>
          <div class="item"><button title="float" class="button_circle" onclick="handleButtonClick('⏺️')"}>⏺️</button></div>
          <div class="item"><button title="string" class="button_circle" onclick="handleButtonClick('🔠')"}>🔠</button></div>
          <div class="item"><button title="boolean" class="button_circle" onclick="handleButtonClick('🆒')"}>🆒</button></div>
        </div>

        <h4>Values</h4>
        <div class="grid">
          <div class="item"><button title="true" class="button_circle" onclick="handleButtonClick('✅')"}>✅</button></div>
          <div class="item"><button title="false" class="button_circle" onclick="handleButtonClick('❌')"}>❌</button></div>

          <div class="item"><button title="void" class="button_circle" onclick="handleButtonClick('🌌')"}>🌌</button></div>
        </div>

        <h4>Data Structures</h4>
        <div class="grid">
          <div class="item"><button title="list" class="button_circle" onclick="handleButtonClick('🐍')"}>🐍</button></div>
          <div class="item"><button title="tuple" class="button_circle" onclick="handleButtonClick('🌼')"}>🌼</button></div>
          <div class="item"><button title="map / dictionary" class="button_circle" onclick="handleButtonClick('🗺️')"}>🗺️</button></div>

          <div class="item"><button title="set" class="button_circle" onclick="handleButtonClick('🗑️')"}>🗑️</button></div>
          <div class="emptyitem"></div>
          <div class="emptyitem"></div>
        </div>

        <h4>Operators</h4>
        <div class="grid">
          <div class="item"><button title="less" class="button_circle" onclick="handleButtonClick('🐜')"}>🐜</button></div>
          <div class="item"><button title="equal" class="button_circle" onclick="handleButtonClick('⚖️')"}>⚖️</button></div>
          <div class="item"><button title="greater" class="button_circle" onclick="handleButtonClick('🐘')"}>🐘</button></div>

          <div class="item"><button title="or" class="button_circle" onclick="handleButtonClick('🙂')"}>🙂</button></div>
          <div class="item"><button title="and" class="button_circle" onclick="handleButtonClick('🙃')"}>🙃</button></div>
          <div class="item"><button title="not" class="button_circle" onclick="handleButtonClick('😡')"}>😡</button></div>
        </div>

        <h4>Conditionals</h4>
        <div class="grid">
          <div class="item"><button title="conditional block" class="button_circle" onclick="handleButtonClick('🌲')"}>🌲</button></div>
          <div class="item"><button title="conditional" class="button_circle" onclick="handleButtonClick('🍃')"}>🍃</button></div>
          <div class="item"><button title="alternative" class="button_circle" onclick="handleButtonClick('🍂')"}>🍂</button></div>
        </div>

        <h4>Loops</h4>
        <div class="grid">
        <div class="item"><button title="loop" class="button_circle" onclick="handleButtonClick('🔁')"}>🔁</button></div>
          <div class="emptyitem"></div>
          <div class="emptyitem"></div>
        </div>

        <h4>Flow Control</h4>
        <div class="grid">
          <div class="item"><button title="break" class="button_circle" onclick="handleButtonClick('🛑')"}>🛑</button></div>
          <div class="item"><button title="continue" class="button_circle" onclick="handleButtonClick('🚦')"}>🚦</button></div>
          <div class="item"><button title="pass" class="button_circle" onclick="handleButtonClick('🦥')"}>🦥</button></div>
        </div>

        <h4>Functions</h4>
        <div class="grid">
          <div class="item"><button title="function" class="button_circle" onclick="handleButtonClick('🍺')"}>🍺</button></div>
          <div class="item"><button title="return" class="button_circle" onclick="handleButtonClick('🦞')"}>🦞</button></div>
        </div>

        <h4>Classes</h4>
        <div class="grid">
          <div class="item"><button title="class" class="button_circle" onclick="handleButtonClick('🏛️')"}>🏛️</button></div>
          <div class="item"><button title="parent" class="button_circle" onclick="handleButtonClick('👨‍👦')"}>👨‍👦</button></div>
          <div class="item"><button title="self" class="button_circle" onclick="handleButtonClick('🤗')"}>🤗</button></div>

          <div class="item"><button title="constructor" class="button_circle" onclick="handleButtonClick('🏗️')"}>🏗️</button></div>
          <div class="emptyitem"></div>
          <div class="emptyitem"></div>
        </div>

        <h4>Others</h4>
        <div class="grid">
          <div class="item"><button title="formating string" class="button_circle" onclick="handleButtonClick('✏️')"}>✏️</button></div>
          <div class="item"><button title="print" class="button_circle" onclick="handleButtonClick('🖨️')"}>🖨️</button></div>
          <div class="emptyitem"></div>
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

