"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode_1 = require("vscode");
const commands_1 = require("./commands");
async function activate(context) {
    const disposable = vscode_1.commands.registerCommand('extension.ecsstractor.run', async () => {
        await commands_1.runCSSExtractor();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map