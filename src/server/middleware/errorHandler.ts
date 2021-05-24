import path from "path";
import { Response } from "express";

const errorHandler = (error: Error, _req: any, res: Response) =>
    res.status(404).json({
        status: "error",
        message: error.message,
        stack:
            // print a nicer stack trace by splitting line breaks and making them array items
            process.env.NODE_ENV === "development" &&
            (error.stack || "")
                .split("\n")
                .map((line: string) => line.trim())
                .map((line: string) => line.split(path.sep).join("/"))
                .map((line: string) =>
                    line.replace(process.cwd().split(path.sep).join("/"), "."),
                ),
    });

// eslint-disable-next-line import/no-default-export
export default errorHandler;
