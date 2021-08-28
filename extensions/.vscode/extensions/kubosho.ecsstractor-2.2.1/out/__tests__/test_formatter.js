"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const formatter_1 = require("../formatter");
const formatter = new formatter_1.Formatter();
ava_1.default('remove duplicates class selectors', (t) => {
    const selectors = [
        '.container.container-fluid',
        '.article.content',
        '.article.title',
        '.article.content',
        '.article.title',
    ];
    const actual = formatter.removeDuplicatesSelector(selectors);
    t.is(actual.length, 3);
});
ava_1.default('convert selectors to rulesets', (t) => {
    const selectors = ['.article.content', '.article.title'];
    const actual = formatter.convertSelectorsToRulesets(selectors);
    t.is(actual, '.article.content{} .article.title{}');
});
ava_1.default('format rulesets', (t) => {
    const selectors = [
        '.container.container-fluid{}',
        '.article.content{}',
        '.article.title{}',
    ];
    const actual = formatter.format(selectors.join(' '));
    const expected = `.container.container-fluid {
}
.article.content {
}
.article.title {
}
`;
    t.is(actual, expected);
});
//# sourceMappingURL=test_formatter.js.map