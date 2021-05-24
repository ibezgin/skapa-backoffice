import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { configureStore } from "../shared/store";
import App from "../shared/App";
import IntlProvider from "../shared/i18n/IntlProvider";
import createHistory from "../shared/store/history";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const history = createHistory();

// Create/use the store
// history MUST be passed here if you want syncing between server on initial route
const store =
    window.store ||
    configureStore({
        initialState: window.__PRELOADED_STATE__,
    });

const client = new ApolloClient({
    uri: `${window.location.protocol}//${window.location.host}/graphql`,
    cache: new InMemoryCache(),
    ssrForceFetchDelay: 100,
    credentials: "same-origin",
});

hydrate(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router history={history as any}>
                <IntlProvider>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </IntlProvider>
            </Router>
        </Provider>
    </ApolloProvider>,
    document.getElementById("app"),
);

if (process.env.NODE_ENV === "development") {
    if (module.hot) {
        module.hot.accept();
    }

    if (!window.store) {
        window.store = store;
    }
}
