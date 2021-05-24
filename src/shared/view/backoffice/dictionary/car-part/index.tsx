import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ModalForm, IFormField } from "../../../../components/modal-form";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import { useQuery } from "@apollo/client";
import { useCarPartHelper } from "./helper";

import ALL_CAR_PARTS from "./gql/all-car-parts.gql";
import { AllCarParts } from "gql/types/operation-result-types";

const { confirm } = Modal;

export const formFields: IFormField[] = [
    {
        title: "Название",
        name: "title",
        type: "textField",
    },
    {
        title: "Цена",
        name: "price",
        type: "numberField",
    },
];

export const DictionaryCarPart = React.memo(() => {
    const { cursorPointer } = useStyleUtils();

    const allCarPartsQuery = useQuery<AllCarParts>(ALL_CAR_PARTS);

    const allCarParts = useMemo(
        () => allCarPartsQuery.data?.carPart.allCarParts || [],
        [allCarPartsQuery.data?.carPart.allCarParts],
    );

    const {
        sendUpdateCarPart,
        sendDeleteCarPart,
        mutationLoading,
    } = useCarPartHelper();

    const columns = useMemo(
        () => [
            {
                title: "Название",
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
                            formFields={formFields}
                            edit={record}
                            onSubmit={values => {
                                sendUpdateCarPart(
                                    values.id,
                                    values.title,
                                    values.price,
                                );
                                values.setVisible(false);
                            }}
                        >
                            {setVisible => (
                                <EditOutlined
                                    style={cursorPointer}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </ModalForm>

                        <DeleteOutlined
                            style={cursorPointer}
                            onClick={() => {
                                confirm({
                                    title: `Подтвердите удаление [${record.title}]`,
                                    onOk: () => {
                                        sendDeleteCarPart(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [cursorPointer, sendDeleteCarPart, sendUpdateCarPart],
    );

    const loading = allCarPartsQuery.loading || mutationLoading;

    return (
        <Table columns={columns} dataSource={allCarParts} loading={loading} />
    );
});
