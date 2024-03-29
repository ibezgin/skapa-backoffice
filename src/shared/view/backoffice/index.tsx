import { Layout } from "antd";
import { ReactNode, useState } from "react";
import { BackofficeMenu } from "./menu";
import React from "react";
import { HeaderWrapper } from "../../components/header";
import { SC } from "./styled";

const { Sider, Content } = Layout;

interface IProps {
    children?: ReactNode;
}

export const AppTemplate = React.memo((props: IProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={() => setCollapsed(value => !value)}
            >
                <div className="logo">
                    {!collapsed ? "SKAPA.PROMOCODE" : "SKAPA"}
                </div>
                <BackofficeMenu />
            </Sider>
            <Layout className="site-layout">
                <HeaderWrapper />
                <Content
                    style={{
                        overflow: "auto",
                    }}
                    className="site-layout-background"
                >
                    <SC.Content>{props.children}</SC.Content>
                </Content>
            </Layout>
        </Layout>
    );
});
