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
		})
	);

	let command = vscode.commands.registerCommand('pint.debrewAndRun', () => {
		var terminal = vscode.window.activeTerminal;
		var fileName = vscode.window.activeTextEditor?.document.fileName;
		var fileNamePy = fileName?.replace(/\.[^/.]+$/, ".py");
		if (terminal) {
			terminal.show();
			terminal.sendText(`debrewer ${fileName} && python ${fileNamePy}`);
		} 
		else {
			terminal = vscode.window.createTerminal();
			terminal.show();
			terminal.sendText(`debrewer ${fileName} && python ${fileNamePy}`);
		}}
	);

    let disposable = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    disposable.text = "$(play) Debrew and Run";
    disposable.tooltip = "Debrew and Run";
    disposable.command = 'pint.debrewAndRun';
    disposable.show();

    context.subscriptions.push(command, disposable);
}

export function deactivate() {}
