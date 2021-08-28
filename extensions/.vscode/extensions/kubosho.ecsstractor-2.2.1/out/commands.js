"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCSSExtractor = void 0;
const Nullable_1 = require("option-t/lib/Nullable/Nullable");
const Undefinable_1 = require("option-t/lib/Undefinable/Undefinable");
const vscode_1 = require("vscode");
const extractor_1 = require("./extractor");
const formatter_1 = require("./formatter");
const supportFileType_1 = require("./supportFileType");
const supportedFormats = Object.entries(supportFileType_1.SupportFileType).map(([_id, value]) => value);
async function runCSSExtractor() {
    const editor = vscode_1.window.activeTextEditor;
    const extractor = extractor_1.createExtractor();
    const formatter = new formatter_1.Formatter();
    if (Undefinable_1.isUndefined(editor) || Nullable_1.isNull(extractor) || Nullable_1.isNull(formatter)) {
        return;
    }
    const { document } = editor;
    const content = document.getText();
    const { languageId } = document;
    const isSupportedLanguage = supportedFormats.filter((format) => format === languageId).length > 0;
    if (!isSupportedLanguage) {
        vscode_1.window.showErrorMessage('eCSStractor: not supported format.');
        return;
    }
    extractor.setFileType(languageId);
    const selectors = [
        ...extractor.extractId(content),
        ...extractor.extractClassName(content),
    ];
    const source = formatter.convertSelectorsToRulesets(formatter.removeDuplicatesSelector(selectors));
    vscode_1.window.showTextDocument(await vscode_1.workspace.openTextDocument({
        content: formatter.format(source),
        language: 'css',
    }));
}
exports.runCSSExtractor = runCSSExtractor;
//# sourceMappingURL=commands.js.map