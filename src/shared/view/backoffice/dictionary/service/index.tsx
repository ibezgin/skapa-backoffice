import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import ALL_SERVICES from "./gql/all-services.gql";
import { useServiceHelper } from "./helper";
import { IFormField, ModalForm } from "../../../../components/modal-form";
import { AllServices } from "gql/types/operation-result-types";

const { confirm } = Modal;

export const formFields = [
    {
        title: "Услуга",
        name: "title",
        type: "textField",
    },
    {
        title: "Цена",
        name: "price",
        type: "numberField",
    },
] as IFormField[];

export const DictionaryService = React.memo(() => {
    const styleUtils = useStyleUtils();

    const allServiceQuery = useQuery<AllServices>(ALL_SERVICES);

    const allServices = useMemo(
        () => allServiceQuery.data?.service.allServices || [],
        [allServiceQuery.data?.service.allServices],
    );

    const {
        sendDeleteService,
        loadingMutation,
        sendUpdateService,
    } = useServiceHelper();

    const columns = useMemo(
        () => [
            {
                title: "Услуга",
                dataIndex: "title",
            },
            {
                title: "Цена",
                dataIndex: "price",
            },
            {
                title: "",
                dataIndex: "edit",
                render: (_edit: any, record: any) => (
                    <>
                        <ModalForm
                            onSubmit={values => {
                                sendUpdateService(
                                    record.id,
                                    values.title,
                                    Number(values.price),
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
                                    title: `Подтвердите удаление [${record.title}]`,
                                    onOk: () => {
                                        sendDeleteService(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [sendDeleteService, sendUpdateService, styleUtils.cursorPointer],
    );

    const loading = allServiceQuery.loading || loadingMutation;

    return (
        <Table columns={columns} dataSource={allServices} loading={loading} />
    );
});
