import _ from "lodash";
import React from "react";
import { Avatar, Button } from "antd";
import { useUser } from "../../../hooks/use-user";
import { Redirect } from "react-router-dom";
import { NetworkStatus, useMutation } from "@apollo/client";
import LOGOUT from "../../../gql/authentication/logout.gql";
import CURRENT_USER from "../../../gql/authentication/current-user.gql";
import { Logout } from "gql/types/operation-result-types";
import { LogoutOutlined } from "@ant-design/icons";

export const UserInfo = React.memo(() => {
    const user: any = useUser();

    const { sendLogout, loading } = useLogoutMutation();

    if (!user?.username && user.networkStatus === NetworkStatus.ready) {
        return <Redirect to="/login" />;
    }
    return (
        <>
            <div>
                <Avatar style={{ backgroundColor: "#F96406" }} size={48}>
                    {_.toUpper(user?.username || "")}
                </Avatar>

                <Button
                    onClick={() => sendLogout()}
                    icon={<LogoutOutlined />}
                    type="link"
                    loading={loading}
                    // {...props}
                >
                    {"Выйти"}
                </Button>
            </div>
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
