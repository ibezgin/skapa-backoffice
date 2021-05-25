import { Menu } from "antd";
import { useRoutes } from "../../hooks/use-routes";
import React from "react";
import { Link } from "react-router-dom";

export const BackofficeMenu = React.memo(() => {
    const routes = useRoutes();

    return (
        <Menu theme="dark" mode="inline">
            {routes.map((menuItem, categoryIndex) => (
                <Menu.Item
                    key={`menu-item-${categoryIndex}-${menuItem.path}`}
                    icon={<menuItem.icon />}
                >
                    <Link to={menuItem.path}>{menuItem.name} </Link>
                </Menu.Item>
            ))}
        </Menu>
    );
});
