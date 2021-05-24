// import * as React from 'react';
import "reflect-metadata";
// грокаем алгоритмы
import path from "path";
import express from "express";
import cors from "cors";
import chalk from "chalk";
import manifestHelpers from "express-manifest-helpers";
import bodyParser from "body-parser";
import paths from "../../config/paths";
// import { configureStore } from '../shared/store';
import errorHandler from "./middleware/errorHandler";
import serverRenderer from "./middleware/serverRenderer";
import addStore from "./middleware/addStore";
import webhookVerification from "./middleware/webhookVerification";
import { i18nextXhr, refreshTranslations } from "./middleware/i18n";
import { apolloServer } from "./graph";
import { connectDatabase } from "db";
import { passportAuth } from "./middleware/passport";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import connectMongo from "connect-mongo";
// import cookieSession from "cookie-session";
import { apiRouter } from "api";
import cookieParser from "cookie-parser";

require("dotenv").config();

const urljoin = require("url-join");

const app = express();
// const app = express.default();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
// if (process.env.NODE_ENV === 'development') {
app.use(
    paths.publicPath,
    express.static(path.join(paths.clientBuild, paths.publicPath)),
);
// }

app.use(cors({ credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/locales/refresh", webhookVerification, refreshTranslations);

// It's probably a good idea to serve these static assets with Nginx or Apache as well:
app.get("/locales/:locale/:ns.json", i18nextXhr);

app.use(addStore);

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    }),
);

const MongoStore = connectMongo(session);

// database connection
const mongoose = connectDatabase();

// ===== Passport ====
const passport = passportAuth();

const SESSION_SECRECT = "qwerty_auto_service_qwerty";
// app.use(
//     cookieSession({
//         name: "session",
//         keys: [SESSION_SECRECT],
//         maxAge: 24 * 60 * 60 * 100,
//     }),
// );

app.use(cookieParser());

app.use(
    session({
        genid: () => uuidv4(),
        secret: SESSION_SECRECT,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: {
            secure: false,
            maxAge: 60 * 60 * 24 * 7, // 1 week
        },
    }),
);

app.use(passport.initialize());

app.use(passport.session()); // will call the deserializeUser

export const withBaseUrl = (url: string) => urljoin("/", url);

app.use(withBaseUrl("web-api"), apiRouter);

apolloServer.applyMiddleware({ app });

app.use(serverRenderer());

app.use(errorHandler);

app.listen(process.env.PORT || 8080, () => {
    // eslint-disable-next-line no-console
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(
            `App is running: http://localhost:${process.env.PORT || 8080}`,
        ),
    );
});

// eslint-disable-next-line import/no-default-export
export default app;
