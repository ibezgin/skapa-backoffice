import { Menu } from "antd";
import { useRoutes } from "../../hooks/use-routes";
import React from "react";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import { usePermission } from "hooks/use-permission";

export const BackofficeMenu = React.memo(() => {
    const routes = useRoutes();
    const { hasPermission } = usePermission();
    return (
        <Menu theme="dark" mode="inline">
            {routes.map(
                (category, categoryIndex) =>
                    hasPermission(category.access, true) && (
                        <SubMenu
                            key={`menu-category-${categoryIndex}`}
                            icon={<category.icon />}
                            title={category.name}
                        >
                            {category.children.map(
                                (menuItem, menuItemIndex) =>
                                    hasPermission(menuItem.access) && (
                                        <Menu.Item
                                            key={`menu-item-${categoryIndex}-${menuItemIndex}`}
                                            icon={<menuItem.icon />}
                                        >
                                            <Link
                                                to={menuItem.path}
                                                key={`menu-item-link-${categoryIndex}-${menuItemIndex}`}
                                            >
                                                {menuItem.name}{" "}
                                            </Link>
                                        </Menu.Item>
                                    ),
                            )}
                        </SubMenu>
                    ),
            )}
        </Menu>
    );
});
