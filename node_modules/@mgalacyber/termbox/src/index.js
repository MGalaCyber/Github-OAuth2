"use strict";

function _interopDefault (ex) { return (ex && (typeof ex === "object") && "default" in ex) ? ex["default"] : ex; }
var stringWidth = _interopDefault(require("string-width"));

async function termBox(messages) {
    let tips = [];
    let maxLen = 0;
    let defaultSpace = 4;
    let spaceWidth = stringWidth(" ");

    if (Array.isArray(messages)) {
        tips = Array.from(messages);

    } else {
        tips = [messages];
    }

    tips = [" ", ...tips, " "];
    tips = tips.map((msg) => ({ val: msg, len: stringWidth(msg) }));
    maxLen = tips.reduce((maxLen, tip) => {
        maxLen = Math.max(maxLen, tip.len);
        return maxLen;
    }, maxLen);
    maxLen += spaceWidth * 2 * defaultSpace;
    tips = tips.map(({ val, len }) => {
        let i = 0;
        let j = 0;
        while (len + i * 2 * spaceWidth < maxLen) {
            i++;
        }
        j = i;
        while (j > 0 && len + i * spaceWidth + j * spaceWidth > maxLen) {
            j--;
        }
        return " ".repeat(i) + val + " ".repeat(j);
    });

    let line = `\x1b[1m\x1b[33m─`.repeat(maxLen);

    console.log(`\x1b[1m\x1b[33m┌` + line + `\x1b[1m\x1b[33m┐`);
    for (let msg of tips) {
        console.log(`\x1b[1m\x1b[33m│` + msg + `\x1b[1m\x1b[33m│`);
    }
    console.log(`\x1b[1m\x1b[33m└` + line + `\x1b[1m\x1b[33m┘`);
};

module.exports = termBox;