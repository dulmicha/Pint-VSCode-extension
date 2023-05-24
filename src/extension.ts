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

}

export function deactivate() {}
