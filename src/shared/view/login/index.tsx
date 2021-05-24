import { Layout } from "antd";
import { Formik } from "formik";
import React, { useCallback } from "react";
import * as FormikAntd from "formik-antd";
import { SC } from "./styled";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import LOGIN from "../../gql/authentication/login.gql";
import CURRENT_USER from "../../gql/authentication/current-user.gql";
import { useUser } from "../../hooks/use-user";
import { Redirect } from "react-router-dom";
import { errorHandler } from "service/utils/error-handler";
import { Login, LoginVariables } from "gql/types/operation-result-types";
// import { errorHandler } from "../../service/utils/error-handler";

export const LoginPage = React.memo(() => {
    const user: any = useUser();

    const { sendLogin, loading } = useLoginMutation();

    const onSubmit = useCallback(
        (values: any) => {
            sendLogin(values.username, values.password);
        },
        [sendLogin],
    );

    if (user?.username) {
        return <Redirect to="/" />;
    }

    return (
        <Layout style={{ height: "100vh" }}>
            <Layout className="site-layout">
                <SC.LoginForm>
                    <h2 style={{ textAlign: "center" }}>Service.Auto</h2>

                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                        }}
                        onSubmit={onSubmit}
                    >
                        {() => {
                            return (
                                <FormikAntd.Form>
                                    <FormikAntd.Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your username!",
                                            },
                                        ]}
                                    >
                                        <FormikAntd.Input
                                            prefix={
                                                <UserOutlined className="site-form-item-icon" />
                                            }
                                            name="username"
                                            placeholder="Username"
                                        />
                                    </FormikAntd.Form.Item>
                                    <FormikAntd.Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your password!",
                                            },
                                        ]}
                                    >
                                        <FormikAntd.Input
                                            prefix={
                                                <LockOutlined className="site-form-item-icon" />
                                            }
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </FormikAntd.Form.Item>

                                    <FormikAntd.Form.Item name="submit">
                                        <FormikAntd.SubmitButton
                                            type="primary"
                                            htmlType="submit"
                                            className="login-form-button"
                                            loading={loading}
                                        >
                                            Submit
                                        </FormikAntd.SubmitButton>
                                    </FormikAntd.Form.Item>
                                </FormikAntd.Form>
                            );
                        }}
                    </Formik>
                </SC.LoginForm>
            </Layout>
        </Layout>
    );
});

function useLoginMutation() {
    const [mutation, mutationHelper] = useMutation<Login, LoginVariables>(
        LOGIN,
        {
            onError: error => {
                errorHandler(error);
            },
        },
    );

    const updateCacheAfterLogin = (cache, { data }) => {
        cache.writeQuery({
            query: CURRENT_USER,
            data: {
                authentication: {
                    currentUser: data.authentication.login,
                },
            },
        });
    };

    const sendLogin = (username: string, password: string) => {
        mutation({
            variables: {
                username,
                password,
            },
            update: updateCacheAfterLogin,
        });
    };
    return {
        sendLogin,
        loading: mutationHelper.loading,
    };
}
