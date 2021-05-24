import fs from "fs";
import path from "path";
import * as express from "express";

interface ITranslationCache {
    [locale: string]: {
        [ns: string]: {
            values: any;
            updatedAt: number;
        };
    };
}

const translationCache: ITranslationCache = {};

const localesDir = `${__dirname}/locales`;

const isCached = (locale: string, ns: string) =>
    translationCache[locale] && translationCache[locale][ns] ? true : false;

const isOutdated = (locale: string, ns: string) =>
    translationCache[locale] &&
    translationCache[locale][ns] &&
    translationCache[locale][ns].updatedAt <
        new Date(
            fs.statSync(
                path.resolve(`${localesDir}/${locale}/${ns}.json`),
            ).mtime,
        ).getTime()
        ? true
        : false;

const loadAndCache = (locale: string, ns: string) => {
    translationCache[locale] = {
        [ns]: {
            values: fs.readFileSync(`${localesDir}/${locale}/${ns}.json`, {
                encoding: "utf-8",
            }),
            updatedAt: new Date(
                fs.statSync(
                    path.resolve(`${localesDir}/${locale}/${ns}.json`),
                ).mtime,
            ).getTime(),
        },
    };
};

const getTranslation = (locale: string, ns: string) =>
    translationCache[locale][ns];

// This middleware serves translation files requested via /locales/:locale/:ns
export const i18nextXhr = (req: express.Request, res: express.Response) => {
    const { locale, ns } = req.params;

    try {
        if (isCached(locale, ns) === false || isOutdated(locale, ns) === true) {
            loadAndCache(locale, ns);
        }

        const { values, updatedAt } = getTranslation(locale, ns);

        return res
            .header("Last-Modified", new Date(updatedAt).toUTCString())
            .send(values);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
        return res.send(null);
    }
};

// Middleware to download updated translation files either manually or via webhook
export const refreshTranslations = async (_req: any, res: any) => {
    const { download, writeFiles, cleanup } = require("../lib/i18n/lokalise");

    const data = await download();
    await writeFiles(data, `${__dirname}/locales`);
    cleanup();
    res.sendStatus(200);
};

// eslint-disable-next-line import/no-default-export
export default i18nextXhr;
