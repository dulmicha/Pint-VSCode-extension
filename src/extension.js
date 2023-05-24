"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const SidebarProvider_1 = require("./SidebarProvider");
function activate(context) {
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("pint-sidebar", sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand('pint.insertEmoji', async (emoji) => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const currentPosition = editor.selection.active;
            editor.edit((editBuilder) => {
                editBuilder.insert(currentPosition, emoji);
            });
        }
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map