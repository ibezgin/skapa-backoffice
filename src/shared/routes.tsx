import { useRoutes } from "hooks/use-routes";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStyles } from "service/styled-components/global";
import { AppTemplate } from "view/backoffice";
import { LoginPage } from "view/login";

import "antd/dist/antd.css";

export const RoutesList = React.memo(() => {
    const routesList = useRoutes();

    return (
        <>
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>
                <Route exact>
                    <AppTemplate>
                        <Switch>
                            {routesList.map((route, indexRoute) => (
                                <Route
                                    path={route.path}
                                    key={`route-${indexRoute}`}
                                    exact={route.exact}
                                >
                                    <route.component />
                                </Route>
                            ))}
                        </Switch>
                        <GlobalStyles />
                    </AppTemplate>
                </Route>
            </Switch>
        </>
    );
});
