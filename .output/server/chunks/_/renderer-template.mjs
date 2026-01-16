import { H as HTTPResponse } from "../../index.mjs";
import "node:http";
import "node:stream";
import "node:https";
import "node:http2";
import "node:fs";
import "node:url";
import "node:path";
const rendererTemplate = () => new HTTPResponse('<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="icon" href="/favicon.ico" />\n    <meta name="theme-color" content="#000000" />\n    <meta\n      name="description"\n      content="Web site created using create-tsrouter-app"\n    />\n    <link rel="apple-touch-icon" href="/logo192.png" />\n    <link rel="manifest" href="/manifest.json" />\n    <title>Create TanStack App - my-tanstack-app</title>\n    <script type="module" crossorigin src="/assets/index-CZ8QRTj4.js"><\/script>\n    <link rel="stylesheet" crossorigin href="/assets/index-BXZSW-aO.css">\n  </head>\n  <body>\n    <div id="app"></div>\n  </body>\n</html>\n', { headers: { "content-type": "text/html; charset=utf-8" } });
function renderIndexHTML(event) {
  return rendererTemplate(event.req);
}
export {
  renderIndexHTML as default
};
