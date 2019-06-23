const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`, {
    url: "http://riot.test/"
});

const { window } = dom;
const { document } = window;

global.window = window;
global.document = document;