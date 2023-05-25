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
			if (terminal) {
				terminal.show();
				terminal.sendText(`debrewer ${fileName}`);
			} 
			else {
				terminal = vscode.window.createTerminal();
				terminal.show();
				terminal.sendText(`debrewer ${fileName}`);
			}
		}
	));

	context.subscriptions.push(
		vscode.commands.registerCommand('pint.debrewAndRun', () => {
			vscode.commands.executeCommand('pint.debrew');
			var terminal = vscode.window.activeTerminal;
			var fileName = vscode.window.activeTextEditor?.document.fileName;
			// replace current extension with .py
			var fileName = fileName?.replace(/\.[^/.]+$/, ".py");

			// check if that file exists
			var fs = require('fs');
			if (fs.existsSync(fileName)) {
				if (terminal) {
					terminal.show();
					terminal.sendText(`python ${fileName}`);
				} 
				else {
					terminal = vscode.window.createTerminal();
					terminal.show();
					terminal.sendText(`python ${fileName}`);
				}
			}
		}
	));	






}

export function deactivate() {}
