import { Layout } from "antd";
import { ReactNode, useState } from "react";
import { BackofficeMenu } from "./menu";
import React from "react";
import { HeaderWrapper } from "../../components/header";
import { SC } from "./styled";
import logo from "../../assets/logo.png";

const { Sider, Content } = Layout;

interface IProps {
    children?: ReactNode;
}

export const AppTemplate = React.memo((props: IProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={() => setCollapsed(value => !value)}
            >
                <div className="logo">
                    {!collapsed ? "SPAPA.PROMOCODE" : "SKAPA"}
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
