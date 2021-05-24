import { Router } from "express";
import bodyParser from "body-parser";

export const apiRouter = Router();

apiRouter.use(bodyParser.json({ type: ["*/json", "*/csp-report"] }));

apiRouter.get("/ping", (_req, res) => {
    res.json({ time: +new Date() });
});
