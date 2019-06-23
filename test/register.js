import jsdom from "jsdom";
import register from '@riotjs/ssr/register'

const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>`, {
    url: "http://riot.test/"
});

const { window } = dom;
const { document } = window;

global.window = window;
global.document = document;

register();