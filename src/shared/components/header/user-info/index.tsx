import _ from "lodash";
import React, { useState } from "react";
import { Typography, Avatar, Dropdown, Menu } from "antd";
import { UserInfoArrowIcon } from "../../user-info-arrow-icon";
import { SC } from "../styled";
import { useUser } from "../../../hooks/use-user";
import { Redirect } from "react-router-dom";
import { NetworkStatus, useMutation } from "@apollo/client";
import LOGOUT from "../../../gql/authentication/logout.gql";
import CURRENT_USER from "../../../gql/authentication/current-user.gql";
import { Logout } from "gql/types/operation-result-types";
import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
import { LanguageListModal } from "./language-list-modal";
const { Text } = Typography;

export const UserInfo = React.memo(() => {
    const user: any = useUser();

    const [visibleLanguageModal, setVisibleLanguageModal] = useState<boolean>(
        false,
    );

    const locale: string = useSelector((state: any) => state.app.locale);

    const { sendLogout } = useLogoutMutation();

    // eslint-disable-next-line no-console
    console.log(locale);
    const menu = (
        <Menu
            style={{
                minWidth: 200,
            }}
        >
            {/* <Menu.Item
                onClick={() => {
                    setVisibleLanguageModal(true);
                }}
            >
                <div>
                    <SC.UserInfoTitle>{t("Язык")}</SC.UserInfoTitle>
                    <SC.UserInfoValue>{locale}</SC.UserInfoValue>
                </div>
            </Menu.Item> */}
            <Menu.Item
                onClick={() => {
                    sendLogout();
                }}
            >
                <SC.UserInfoLogout>{"Выйти из аккаунта"}</SC.UserInfoLogout>
            </Menu.Item>
        </Menu>
    );

    if (!user?.username && user.networkStatus === NetworkStatus.ready) {
        return <Redirect to="/login" />;
    }
    return (
        <>
            <Dropdown overlay={menu} placement="bottomRight">
                <div>
                    <Avatar style={{ backgroundColor: "#F96406" }} size={48}>
                        {_.toUpper(user?.username || "")}
                    </Avatar>
                    <Text>{user?.username}</Text>
                    <UserInfoArrowIcon />
                </div>
            </Dropdown>
            <LanguageListModal
                visible={visibleLanguageModal}
                setVisible={setVisibleLanguageModal}
            />
        </>
    );
});

function useLogoutMutation() {
    const [mutation, mutationHelper] = useMutation<Logout>(LOGOUT);

    const updateCacheAfterLogin = cache => {
        cache.writeQuery({
            query: CURRENT_USER as any,
            data: {
                authentication: {
                    currentUser: null,
                },
            },
        });
    };

    const sendLogout = () => {
        mutation({
            update: updateCacheAfterLogin,
        });
    };
    return {
        sendLogout,
        loading: mutationHelper.loading,
    };
}
