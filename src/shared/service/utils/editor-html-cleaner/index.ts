// const cleanHtml = require("clean-html").clean;

import { clean as cleanHtml } from "clean-html";

const options = {
    "remove-attributes": [
        "align",
        "bgcolor",
        "border",
        "cellpadding",
        "cellspacing",
        "color",
        "height",
        "target",
        "valign",
        "width",
        "style",
    ],
};

export const editorHtmlCleaner = (value: string) => {
    let rules = "";
    cleanHtml(value, options, (html: any) => {
        rules = html;
    });

    return rules;
};
