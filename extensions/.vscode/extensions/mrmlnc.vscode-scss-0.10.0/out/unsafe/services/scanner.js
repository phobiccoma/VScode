"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const vscode_uri_1 = require("vscode-uri");
const fs_1 = require("../utils/fs");
const parser_1 = require("./parser");
class ScannerService {
    constructor(_storage, _settings) {
        this._storage = _storage;
        this._settings = _settings;
    }
    async scan(files, recursive = true) {
        const iterator = new Set(files);
        for (let filepath of iterator) {
            // Cast to the system file path style
            filepath = path.normalize(filepath);
            const uri = vscode_uri_1.URI.file(filepath).toString();
            const isExistFile = await this._fileExists(filepath);
            if (!isExistFile) {
                this._storage.delete(uri);
                continue;
            }
            const content = await this._readFile(filepath);
            const document = vscode_languageserver_textdocument_1.TextDocument.create(uri, 'scss', 1, content);
            const { symbols } = await parser_1.parseDocument(document, null);
            this._storage.set(uri, Object.assign(Object.assign({}, symbols), { filepath }));
            if (!recursive || !this._settings.scanImportedFiles) {
                continue;
            }
            for (const symbol of symbols.imports) {
                if (symbol.dynamic || symbol.css) {
                    continue;
                }
                iterator.add(symbol.filepath);
            }
        }
    }
    _readFile(filepath) {
        return fs_1.readFile(filepath);
    }
    _fileExists(filepath) {
        return fs_1.fileExists(filepath);
    }
}
exports.default = ScannerService;
