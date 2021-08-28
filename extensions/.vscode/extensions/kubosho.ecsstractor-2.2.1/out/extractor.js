"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExtractor = void 0;
const domhandler_1 = require("domhandler");
const esprima = require("esprima");
const htmlparser2_1 = require("htmlparser2");
const Maybe_1 = require("option-t/lib/Maybe/Maybe");
const supportFileType_1 = require("./supportFileType");
const utils_1 = require("./utils");
class ExtractorImpl {
    _classNames;
    _ids;
    _filetype;
    constructor() {
        this._classNames = [];
        this._ids = [];
        this._filetype = null;
    }
    extractClassName(contents) {
        if (this._filetype === null) {
            return [];
        }
        if (this._filetype === supportFileType_1.SupportFileType.Html) {
            const root = htmlparser2_1.parseDocument(contents);
            this._extractClassNameFromHtml(root.children);
        }
        else {
            const { body } = esprima.parseModule(contents, { jsx: true });
            const source = getJSXElements([
                ...getFunctionDeclarations(body.filter(utils_1.isExportNamedDeclaration)),
                ...body.filter(utils_1.isFunctionDeclaration),
            ]);
            source.forEach((src) => {
                if (utils_1.isJSXElement(src)) {
                    this._extractClassNameFromJsx([src]);
                }
            });
        }
        return this._classNames;
    }
    extractId(contents) {
        if (this._filetype === null) {
            return [];
        }
        if (this._filetype === supportFileType_1.SupportFileType.Html) {
            const root = htmlparser2_1.parseDocument(contents);
            this._extractIdFromHtml(root.children);
        }
        else {
            const { body } = esprima.parseModule(contents, { jsx: true });
            const source = getJSXElements([
                ...getFunctionDeclarations(body.filter(utils_1.isExportNamedDeclaration)),
                ...body.filter(utils_1.isFunctionDeclaration),
            ]);
            source.forEach((src) => {
                if (utils_1.isJSXElement(src)) {
                    this._extractIdFromJsx([src]);
                }
            });
        }
        return this._ids;
    }
    setFileType(fileType) {
        this._filetype = fileType;
    }
    _extractClassNameFromHtml(children) {
        const elements = children.flatMap((child) => (domhandler_1.isTag(child) ? [child] : []));
        if (elements.length === 0) {
            return;
        }
        const classNames = getClassNames(elements);
        this._classNames = this._classNames.concat(classNames);
        this._extractClassNameFromHtml(elements.flatMap((element) => element.children));
    }
    _extractClassNameFromJsx(elements) {
        getPartialPropertyOfElements(elements).forEach(({ children, openingElement: { attributes } }) => {
            attributes
                .filter(utils_1.isClassName)
                .map(({ value }) => `${value.value}`.replace(/ /g, '.'))
                .forEach((className) => this._classNames.push(`.${className}`));
            this._extractClassNameFromJsx(children);
        });
    }
    _extractIdFromHtml(children) {
        const elements = children.flatMap((child) => (domhandler_1.isTag(child) ? [child] : []));
        if (elements.length === 0) {
            return;
        }
        const ids = getIds(elements);
        this._ids = this._ids.concat(ids);
        this._extractIdFromHtml(elements.flatMap((element) => element.children));
    }
    _extractIdFromJsx(elements) {
        getPartialPropertyOfElements(elements).forEach(({ children, openingElement: { attributes } }) => {
            attributes
                .filter(utils_1.isId)
                .forEach((attr) => this._ids.push(`#${attr.value.value}`));
            this._extractIdFromJsx(children);
        });
    }
}
function createExtractor() {
    return new ExtractorImpl();
}
exports.createExtractor = createExtractor;
function getFunctionDeclarations(sources) {
    return sources
        .map(({ declaration }) => declaration)
        .filter(utils_1.isFunctionDeclaration);
}
function getJSXElements(source) {
    return source
        .map(({ body: blockStatement }) => blockStatement)
        .flatMap(({ body }) => body)
        .filter(utils_1.isReturnStatement)
        .map((returnStatement) => returnStatement.argument)
        .filter(Maybe_1.isNotNullAndUndefined);
}
function getPartialPropertyOfElements(elements) {
    return elements
        .filter((element) => utils_1.isJSXElement(element))
        .map(({ children, openingElement }) => {
        return { children, openingElement };
    });
}
function getClassNames(elements) {
    const classNames = elements
        .map((child) => child.attribs.class)
        .filter((className) => !!className)
        .map((className) => `.${className.replace(/ /g, '.')}`);
    return classNames;
}
function getIds(elements) {
    const ids = elements
        .map((child) => child.attribs.id)
        .filter((id) => !!id)
        .map((id) => `#${id}`);
    return ids;
}
//# sourceMappingURL=extractor.js.map