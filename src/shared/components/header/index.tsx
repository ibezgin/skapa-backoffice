import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router";
import { useRoutes } from "../../hooks/use-routes";
import { SC } from "./styled";
import { UserInfo } from "./user-info";
const { Header } = Layout;

export const HeaderWrapper = React.memo(() => {
    const routes = useRoutes();
    const headerRoutes: any = [];
    for (const category of routes) {
        for (const menuItem of category.children) {
            if (menuItem.header) {
                headerRoutes.push(menuItem);
            }
        }
    }

    return (
        <>
            <Header id="app-header" className="site-layout-background">
                <SC.Header>
                    <Switch>
                        {headerRoutes.map((route, indexRoute) => (
                            <Route
                                path={route.path}
                                key={`route-${indexRoute}`}
                                exact={route.exact}
                            >
                                <div></div>
                                <route.header />
                                <div></div>
                            </Route>
                        ))}
                        <Route
                            path={"/"}
                            exact={false}
                            component={() => (
                                <>
                                    <div></div>
                                    <div></div>
                                </>
                            )}
                        />
                    </Switch>
                    <div>
                        <SC.UserInfo>
                            {" "}
                            <UserInfo />{" "}
                        </SC.UserInfo>
                    </div>
                </SC.Header>
            </Header>
        </>
    );
});
