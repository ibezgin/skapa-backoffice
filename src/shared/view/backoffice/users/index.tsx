import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Col, Modal, Row, Table } from "antd";
import React, { useMemo } from "react";
import { useStyleUtils } from "./../../../hooks/use-style-utils";
import { useUsersHelper } from "./helper";
import { ModalForm } from "./../../../components/modal-form";
import ALL_USERS from "./gql/all-users.gql";
import _ from "lodash";
import { AllUsers } from "gql/types/operation-result-types";
import { useUser } from "hooks/use-user";
import { PlusMinus } from "components/plus-minus";

const { confirm } = Modal;

export const Users = React.memo(() => {
    const styleUtils = useStyleUtils();

    const allUsersQuery = useQuery<AllUsers>(ALL_USERS);

    const allUsers = useMemo(() => allUsersQuery.data?.users.allUsers || [], [
        allUsersQuery.data?.users.allUsers,
    ]);

    const userInfo = useUser();

    const {
        loadingMutation,
        formFields,
        sendDeleteUser,
        sendUpdateUser,
    } = useUsersHelper();

    const columns = useMemo(
        () => [
            {
                title: "Имя",
                dataIndex: "firstname",
            },
            {
                title: "Логин",
                dataIndex: "username",
            },
            {
                title: "Админ",
                dataIndex: "isAdmin",
                render: (isAdmin: boolean) => <PlusMinus value={isAdmin} />,
            },
            {
                title: "",
                dataIndex: "edit",
                render: (_edit: any, record: any) => (
                    <>
                        {userInfo.username !== record.username && (
                            <Row>
                                <Col span={6}>
                                    <ModalForm
                                        onSubmit={values => {
                                            sendUpdateUser(
                                                record.id,
                                                _.pick(
                                                    values,
                                                    "firstname",
                                                    "username",
                                                    "password",
                                                    "isAdmin",
                                                ),
                                            );
                                            values.setVisible();
                                        }}
                                        formFields={formFields}
                                        edit={record}
                                    >
                                        {setVisible => (
                                            <EditOutlined
                                                style={styleUtils.cursorPointer}
                                                onClick={() => setVisible(true)}
                                            />
                                        )}
                                    </ModalForm>
                                </Col>{" "}
                                <Col>
                                    <DeleteOutlined
                                        style={styleUtils.cursorPointer}
                                        onClick={() => {
                                            confirm({
                                                title: `Подтвердите удаление [${record.username}]`,
                                                onOk: () => {
                                                    sendDeleteUser(record.id);
                                                },
                                            });
                                        }}
                                    />{" "}
                                </Col>
                            </Row>
                        )}
                    </>
                ),
            },
        ],
        [
            formFields,
            sendDeleteUser,
            sendUpdateUser,
            styleUtils.cursorPointer,
            userInfo.username,
        ],
    );

    const loading = allUsersQuery.loading || loadingMutation;

    return <Table columns={columns} dataSource={allUsers} loading={loading} />;
});
