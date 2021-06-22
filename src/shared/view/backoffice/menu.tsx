import { Menu } from "antd";
import { useRoutes } from "../../hooks/use-routes";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const BackofficeMenu = React.memo(() => {
    const routes = useRoutes();

    const router = useLocation();

    const selectedKeys = useMemo(() => {
        const { pathname } = router;

        return [pathname];
    }, [router]);

    return (
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
            {routes.map(menuItem => (
                <Menu.Item key={menuItem.path} icon={<menuItem.icon />}>
                    <Link to={menuItem.path}>{menuItem.name} </Link>
                </Menu.Item>
            ))}
        </Menu>
    );
});
