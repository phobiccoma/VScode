"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const prettier_1 = require("prettier");
class Formatter {
    removeDuplicatesSelector(selectors) {
        return [...new Set(selectors)];
    }
    convertSelectorsToRulesets(selectors) {
        return selectors.map((selector) => `${selector}{}`).join(' ');
    }
    format(source) {
        return prettier_1.format(source, { parser: 'css' });
    }
}
exports.Formatter = Formatter;
//# sourceMappingURL=formatter.js.map