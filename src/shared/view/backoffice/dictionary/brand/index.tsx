import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import All_BRAND from "./gql/all-brands.gql";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDictionaryBrandHelper } from "./helper";
import { IFormField, ModalForm } from "../../../../components/modal-form";
import { AllBrand } from "gql/types/operation-result-types";
import { useTranslation } from "react-i18next";

const { confirm } = Modal;

export const formFields: IFormField[] = [
    { title: "Название", name: "title", type: "textField" },
];
export const DictionaryBrand = React.memo(() => {
    const { t } = useTranslation();

    const brandsQuery = useQuery<AllBrand>(All_BRAND);

    const { sendDeleteBrand, loadingMutation } = useDictionaryBrandHelper();

    const brands = useMemo(() => brandsQuery.data?.brand.allBrands, [
        brandsQuery.data?.brand.allBrands,
    ]);

    const { sendUpdateBrand } = useDictionaryBrandHelper();

    const coursorPointer = useMemo(
        () => ({
            cursor: "pointer",
        }),
        [],
    );
    const columns = useMemo(
        () => [
            {
                title: t("Название"),
                dataIndex: "title",
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
                                sendUpdateBrand(
                                    values.id,
                                    values.title,
                                    values.setVisible,
                                );
                            }}
                        >
                            {setVisible => (
                                <EditOutlined
                                    style={coursorPointer}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </ModalForm>

                        <DeleteOutlined
                            style={coursorPointer}
                            onClick={() => {
                                confirm({
                                    title: `Подтвердите удаление [${record.title}]`,
                                    onOk: () => {
                                        sendDeleteBrand(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [coursorPointer, sendDeleteBrand, sendUpdateBrand, t],
    );

    return (
        <Table
            columns={columns}
            dataSource={brands}
            loading={brandsQuery.loading || loadingMutation}
        />
    );
});
