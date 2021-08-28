"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isId = exports.isClassName = exports.isReturnStatement = exports.isJSXElement = exports.isFunctionDeclaration = exports.isExportNamedDeclaration = void 0;
function isExportNamedDeclaration(declaration) {
    return declaration.type === 'ExportNamedDeclaration';
}
exports.isExportNamedDeclaration = isExportNamedDeclaration;
function isFunctionDeclaration(declaration) {
    return declaration?.type === 'FunctionDeclaration';
}
exports.isFunctionDeclaration = isFunctionDeclaration;
function isJSXElement(expression) {
    return expression?.type === 'JSXElement';
}
exports.isJSXElement = isJSXElement;
function isReturnStatement(statement) {
    return statement.type === 'ReturnStatement';
}
exports.isReturnStatement = isReturnStatement;
function isClassName(attr) {
    return attr.name.name === 'className' || attr.name.name === 'class';
}
exports.isClassName = isClassName;
function isId(attr) {
    return attr.name.name === 'id';
}
exports.isId = isId;
//# sourceMappingURL=utils.js.map