import path from "path";
import paths from "./config/paths";

// eslint-disable-next-line import/no-default-export
export default {
    options: {
        src: "build/transpiled/**/*.js",
        debug: true,
        func: {
            list: ["i18next.t", "i18n.t", "t"],
            extensions: [".js"],
        },
        trans: {
            extensions: [".js"],
        },
        lngs: ["ru_RU", "en_US"],
        ns: ["translation"],
        fallbackLng: "ru_RU",
        defaultLng: "ru_RU",
        defaultNs: "translation",
        resource: {
            loadPath: path.join(paths.locales, "/{{lng}}/{{ns}}.json"),
            savePath: path.join(paths.locales, "/{{lng}}/{{ns}}.missing.json"),
        },
    },
};
