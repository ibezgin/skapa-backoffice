import { usePermission } from "hooks/use-permission";
import { useRoutes } from "hooks/use-routes";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStyles } from "service/styled-components/global";
import { AppTemplate } from "view/backoffice";
import { LoginPage } from "view/login";

import "antd/dist/antd.css";

export const RoutesList = React.memo(() => {
    const routesList = useRoutes();
    const { hasPermission } = usePermission();
    const resultRoutes: any[] = [];

    const routes: string[] = [];

    for (const category of routesList) {
        for (const menuItem of category.children) {
            resultRoutes.push(menuItem);
        }
        routes.push(category.path);
    }

    return (
        <>
            <Switch>
                <Route path={["/", ...routes]} exact>
                    <AppTemplate>
                        <Switch>
                            {resultRoutes.map(
                                (route, indexRoute) =>
                                    hasPermission(route.access) && (
                                        <Route
                                            path={route.path}
                                            key={`route-${indexRoute}`}
                                            exact={route.exact}
                                        >
                                            <route.component />
                                        </Route>
                                    ),
                            )}
                        </Switch>
                        <GlobalStyles />
                    </AppTemplate>
                </Route>
                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>
            </Switch>
        </>
    );
});
