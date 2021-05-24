import { Layout } from "antd";
import { ReactNode, useState } from "react";
import { BackofficeMenu } from "./menu";
import React from "react";
import { HeaderWrapper } from "../../components/header";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
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
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src={logo} width={60} />
                </div>
                <BackofficeMenu />
            </Sider>
            {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                },
            )}
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
