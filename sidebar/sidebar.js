import * as vscode from 'vscode';

export function handleButtonClick() {
    vscode.window.showInformationMessage('Hello World from Sidebar!');
    const emoji = '👋';
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const currentPosition = editor.selection.active;
        editor.edit((editBuilder) => {
            editBuilder.insert(currentPosition, emoji);
        });
    }
}