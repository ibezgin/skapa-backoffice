import chalk from "chalk";

export const logMessage = (message: any, level = "info") => {
    const color =
        level === "error"
            ? "red"
            : level === "warning"
            ? "yellow"
            : level === "info"
            ? "blue"
            : "white";
    // eslint-disable-next-line no-console
    console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

export const compilerPromise = (name: string, compiler: any) => {
    return new Promise<void>((resolve, reject) => {
        compiler.hooks.compile.tap(name, () => {
            logMessage(`[${name}] Compiling `);
        });
        compiler.hooks.done.tap(name, (stats: any) => {
            if (!stats.hasErrors()) {
                return resolve();
            }
            return reject(`Failed to compile ${name}`);
        });
    });
};

export const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const clientOnly = () => process.argv.includes("--client-only");

// eslint-disable-next-line import/no-default-export
export default {
    clientOnly,
    compilerPromise,
    logMessage,
    sleep,
};
