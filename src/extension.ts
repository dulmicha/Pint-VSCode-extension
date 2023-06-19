import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider(
		"pint-sidebar",
		sidebarProvider
	  )
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('pint.insertEmoji', async (emoji: string) => {
		  const editor = vscode.window.activeTextEditor;
		  if (editor) {
			const currentPosition = editor.selection.active;
			editor.edit((editBuilder) => {
			  editBuilder.insert(currentPosition, emoji);
			});
		  }
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('pint.debrew', () => {
			var terminal = vscode.window.activeTerminal;
			var fileName = vscode.window.activeTextEditor?.document.fileName;
			if (!terminal) {
				terminal = vscode.window.createTerminal();
			}
			terminal.show();
			terminal.sendText(`debrewer ${fileName}`);
			}
		)
	);

	let command = vscode.commands.registerCommand('pint.debrewAndRun', () => {
		// execute pint.debrew command
		vscode.commands.executeCommand('pint.debrew');

		// check if execution is successful - check if file.py exists
		var fileName = vscode.window.activeTextEditor?.document.fileName;
		var fileNamePy = fileName?.replace(/\.[^/.]+$/, ".py");
		var fs = require('fs');
		var path = require('path');
		var filePath = path.join(fileNamePy);
		
		var currentFileLines = vscode.window.activeTextEditor?.document.lineCount;
		if (currentFileLines === undefined) {
			currentFileLines = 100;
		}

		var checkExist = setTimeout(function() {
			if (fs.existsSync(filePath)) {
				clearInterval(checkExist);
				// execute python file
				var terminal = vscode.window.activeTerminal;
				if (!terminal) {
					terminal = vscode.window.createTerminal();
				}
				terminal.show();
				terminal.sendText(`python ${fileNamePy}`);
			}
		}, currentFileLines * 20);
	});

    let disposable = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    disposable.text = "$(play) Debrew and Run";
    disposable.tooltip = "Debrew and Run";
    disposable.command = 'pint.debrewAndRun';
    disposable.show();

    context.subscriptions.push(command, disposable);
}

export function deactivate() {}
