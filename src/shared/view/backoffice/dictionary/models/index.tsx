import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import { useQuery } from "@apollo/client";
import { useModelsHelper } from "./helper";
import _ from "lodash";
import { ModalForm } from "../../../../components/modal-form";
import ALL_MODELS from "./gql/all-models.gql";
import { AllModels } from "gql/types/operation-result-types";

const { confirm } = Modal;

export const DictionaryModels = React.memo(() => {
    const styleUtils = useStyleUtils();

    const allModelsQuery = useQuery<AllModels>(ALL_MODELS);

    const allModels = useMemo(
        () => allModelsQuery.data?.models.allModels || [],
        [allModelsQuery.data?.models.allModels],
    );

    const {
        sendDeleteModel,
        helperLoading,
        sendUpdateModel,
        formFields,
        allBrand,
    } = useModelsHelper();

    const columns = useMemo(
        () => [
            {
                title: "Модель",
                dataIndex: "title",
            },
            {
                title: "Марка",
                dataIndex: "brandId",
                render: (brandId: string) =>
                    allBrand?.find(elem => elem.id === brandId)?.title,
            },
            {
                title: "",
                dataIndex: "edit",
                render: (_edit: any, record: any) => (
                    <>
                        <ModalForm
                            edit={_.pick(record, ["id", "title", "brandId"])}
                            formFields={formFields}
                            onSubmit={values => {
                                sendUpdateModel({
                                    id: record.id,
                                    ..._.pick(values, ["title", "brandId"]),
                                });
                                values.setVisible(false);
                            }}
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
                                        sendDeleteModel(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [
            allBrand,
            formFields,
            sendDeleteModel,
            sendUpdateModel,
            styleUtils.cursorPointer,
        ],
    );

    const loading = helperLoading || allModelsQuery.loading;

    return (
        <>
            <Table columns={columns} dataSource={allModels} loading={loading} />
        </>
    );
});
