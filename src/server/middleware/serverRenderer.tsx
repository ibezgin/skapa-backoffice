import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import { Store } from "redux";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import IntlProvider from "../../shared/i18n/IntlProvider";
import App from "../../shared/App";
import Html from "../components/HTML";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RequestContext } from "request-context/index";
import { SchemaLink } from "apollo-link-schema";
import { schema } from "graph/index";
const helmetContext = {};
const routerContext = {};

const serverRenderer: any = () => (
    req: express.Request & { store: Store },
    res: express.Response,
) => {
    const requestContext = new RequestContext(req, res);

    const client = new ApolloClient({
        ssrMode: true,
        link: new SchemaLink({
            schema,
            context: requestContext,
        }) as any,
        cache: new InMemoryCache(),
        credentials: "same-origin",
    });
    const content = renderToString(
        <ApolloProvider client={client}>
            <Provider store={res.locals.store}>
                <Router location={req.url} context={routerContext}>
                    <IntlProvider>
                        <HelmetProvider context={helmetContext}>
                            <App />
                        </HelmetProvider>
                    </IntlProvider>
                </Router>
            </Provider>
        </ApolloProvider>,
    );

    const state = JSON.stringify(res.locals.store.getState());

    return res.send(
        "<!doctype html>" +
            renderToString(
                <Html
                    css={[
                        res.locals.assetPath("bundle.css"),
                        res.locals.assetPath("vendor.css"),
                    ]}
                    helmetContext={helmetContext}
                    scripts={[
                        res.locals.assetPath("bundle.js"),
                        res.locals.assetPath("vendor.js"),
                    ]}
                    state={state}
                >
                    {content}
                </Html>,
            ),
    );
};

// eslint-disable-next-line import/no-default-export
export default serverRenderer;
