import * as express from "express";
import { configureStore } from "../../shared/store";

const addStore = (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): void => {
    res.locals.store = configureStore({});
    next();
};

// eslint-disable-next-line import/no-default-export
export default addStore;
