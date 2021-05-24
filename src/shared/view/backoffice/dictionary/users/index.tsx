import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import { useUsersHelper } from "./helper";
import { ModalForm } from "../../../../components/modal-form";
import ALL_USERS from "./gql/all-users.gql";
import _ from "lodash";
import { AllUsers } from "gql/types/operation-result-types";

const { confirm } = Modal;

export const DictionaryUsers = React.memo(() => {
    const styleUtils = useStyleUtils();

    const allUsersQuery = useQuery<AllUsers>(ALL_USERS);

    const allUsers = useMemo(() => allUsersQuery.data?.users.allUsers || [], [
        allUsersQuery.data?.users.allUsers,
    ]);

    const {
        loadingMutation,
        formFields,
        sendDeleteUser,
        sendUpdateUser,
        positions,
    } = useUsersHelper();

    const columns = useMemo(
        () => [
            {
                title: "Имя",
                dataIndex: "firstname",
            },
            {
                title: "Фамилия",
                dataIndex: "lastname",
            },
            {
                title: "Логин",
                dataIndex: "username",
            },
            {
                title: "Должность",
                dataIndex: "position",
                render: (position: any) =>
                    positions.find(elem => elem.value === position)?.label,
            },

            {
                title: "",
                dataIndex: "edit",
                render: (_edit: any, record: any) => (
                    <>
                        <ModalForm
                            onSubmit={values => {
                                sendUpdateUser(
                                    record.id,
                                    _.pick(
                                        values,
                                        "firstname",
                                        "username",
                                        "position",
                                        "password",
                                        "lastname",
                                        "permission",
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
                        />
                    </>
                ),
            },
        ],
        [
            formFields,
            positions,
            sendDeleteUser,
            sendUpdateUser,
            styleUtils.cursorPointer,
        ],
    );

    const loading = allUsersQuery.loading || loadingMutation;

    return <Table columns={columns} dataSource={allUsers} loading={loading} />;
});
