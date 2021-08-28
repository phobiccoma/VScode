"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const fs_1 = require("fs");
const util_1 = require("util");
const extractor_1 = require("../extractor");
const supportFileType_1 = require("../supportFileType");
const readFile = util_1.promisify(fs_1.readFile);
ava_1.default('HTML: extract class selectors', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/html/list.html`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Html);
    const actual = extractor.extractClassName(content);
    t.is(actual.length, 6);
    t.is(actual[0], '.list');
    t.is(actual[1], '.list-item');
});
ava_1.default('HTML: extract multiple class selectors', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/html/multiple-classes.html`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Html);
    const actual = extractor.extractClassName(content);
    t.is(actual.length, 3);
    t.is(actual[0], '.container.container-fluid.article');
    t.is(actual[1], '.article.content');
    t.is(actual[2], '.article.title');
});
ava_1.default('HTML: extract id selectors', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/html/id.html`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Html);
    const actual = extractor.extractId(content);
    t.is(actual.length, 3);
    t.is(actual[0], '#global-header');
    t.is(actual[1], '#global-footer');
    t.is(actual[2], '#site-title');
});
ava_1.default('JSX: extract class selectors', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/jsx/list.jsx`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Jsx);
    const actual = extractor.extractClassName(content);
    t.is(actual.length, 6);
    t.is(actual[0], '.list');
    t.is(actual[1], '.list-item');
});
ava_1.default('JSX: default export case', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/jsx/default-export.jsx`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Jsx);
    const actual = extractor.extractClassName(content);
    t.is(actual.length, 6);
    t.is(actual[0], '.list');
    t.is(actual[1], '.list-item');
});
ava_1.default('JSX: export variable case', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/jsx/export-with-variable.jsx`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Jsx);
    const actual = extractor.extractClassName(content);
    t.is(actual.length, 6);
    t.is(actual[0], '.list');
    t.is(actual[1], '.list-item');
});
ava_1.default('JSX: extract multiple class selectors', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/jsx/multiple-classes.jsx`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Jsx);
    const actual = extractor.extractClassName(content);
    t.is(actual.length, 3);
    t.is(actual[0], '.container.container-fluid.article');
    t.is(actual[1], '.article.content');
    t.is(actual[2], '.article.title');
});
ava_1.default('JSX: extract id selectors', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/jsx/id.jsx`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Jsx);
    const actual = extractor.extractId(content);
    t.is(actual.length, 3);
    t.is(actual[0], '#global-header');
    t.is(actual[1], '#site-title');
    t.is(actual[2], '#global-footer');
});
ava_1.default('JSX: with hooks', async (t) => {
    const content = await readFile(`${process.cwd()}/testcases/jsx/with-hooks.jsx`, 'utf8');
    const extractor = extractor_1.createExtractor();
    extractor.setFileType(supportFileType_1.SupportFileType.Jsx);
    {
        const actual = [
            ...extractor.extractId(content),
            ...extractor.extractClassName(content),
        ];
        t.is(actual.length, 2);
        t.is(actual[0], '#container');
        t.is(actual[1], '.container');
    }
});
//# sourceMappingURL=test_extractor.js.map