import { createMemoryHistory, createBrowserHistory } from "history";

interface IHistoryParams {
    initialEntries?: any[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createUniversalHistory = ({
    initialEntries = [],
}: IHistoryParams = {}) => {
    if (__BROWSER__) {
        const history: unknown =
            window.browserHistory || createBrowserHistory();
        if (process.env.NODE_ENV === "development" && !window.browserHistory) {
            window.browserHistory = history;
        }
        return history;
    }
    return createMemoryHistory({ initialEntries });
};

// eslint-disable-next-line import/no-default-export
export default createUniversalHistory;
