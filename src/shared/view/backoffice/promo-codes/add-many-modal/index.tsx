import { Button, Modal, Typography, Divider } from "antd";
import { FieldArray, Formik } from "formik";
import React, { ReactNode, useState } from "react";
import * as FormikAntd from "formik-antd";
import {
    AddManyPromocodes,
    AddManyPromocodesVariables,
    PromoCodeInput,
} from "gql/types/operation-result-types";
import { useGenerateCode } from "hooks/use-generate-tempory-code";
import { useUser } from "hooks/use-user";
import QrCode from "qrcode.react";
import { useMutation } from "@apollo/client";
import ADD_MANY_PROMOCODES from "../gql/add-many-promocodes.gql";
import { useMutationOptions } from "hooks/use-mutation-options";

const { Title } = Typography;

interface IForm {
    sale: string | undefined;
    count: string | undefined;
    promoCodes: PromoCodeInput[];
}

interface IProps {
    children: (props: { setVisible: (visible: boolean) => void }) => ReactNode;
}
export const PromoCodesAddManyModal = React.memo((props: IProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    const { generateTemporyCode, generatePromoCode } = useGenerateCode();

    const user = useUser();

    const { execute, loading } = useAddManyPromoCodesMutation({ setVisible });

    return (
        <>
            <Formik<IForm>
                initialValues={{
                    sale: undefined,
                    count: undefined,
                    promoCodes: [],
                }}
                onSubmit={async (values, { resetForm }) => {
                    await execute(values.promoCodes);
                    resetForm();
                }}
            >
                {({ values, setFieldValue, resetForm }) => {
                    // eslint-disable-next-line no-console
                    // console.log(values);
                    return (
                        <Modal
                            visible={visible}
                            onCancel={() => {
                                resetForm();
                                setVisible(false);
                            }}
                            footer={null}
                        >
                            <FormikAntd.Form layout="vertical">
                                <Title level={4}>Добавить несколько</Title>
                                <FormikAntd.FormItem
                                    name="count"
                                    label="Количество"
                                >
                                    <FormikAntd.Input
                                        name="count"
                                        type="number"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                    />
                                </FormikAntd.FormItem>
                                <FormikAntd.FormItem
                                    name="sale"
                                    label="Скидка (%)"
                                >
                                    <FormikAntd.Input
                                        name="sale"
                                        type="number"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                    />
                                </FormikAntd.FormItem>
                                <Button
                                    onClick={() => {
                                        const promoCodes: PromoCodeInput[] = [];
                                        for (
                                            let i = 0;
                                            i < Number(values.count);
                                            i++
                                        ) {
                                            promoCodes.push({
                                                sale: String(values.sale),
                                                name: generatePromoCode(),
                                                QRCodeId: generateTemporyCode(),
                                                adminId: user.username,
                                            });
                                        }
                                        setFieldValue("promoCodes", promoCodes);
                                    }}
                                    style={{
                                        width: "100%",
                                        marginBottom: "16px",
                                    }}
                                >
                                    Сгенерировать
                                </Button>
                                <FieldArray name="promoCodes">
                                    {() => {
                                        return (
                                            values.promoCodes &&
                                            Boolean(values.promoCodes.length) &&
                                            values.promoCodes.map(
                                                (_elem, index) => (
                                                    <>
                                                        <FormikAntd.FormItem
                                                            name={`promoCodes.${index}.name`}
                                                            label={"Имя"}
                                                        >
                                                            <FormikAntd.Input
                                                                name={`promoCodes.${index}.name`}
                                                                disabled
                                                            />
                                                        </FormikAntd.FormItem>
                                                        <FormikAntd.FormItem
                                                            name={`promoCodes.${index}.QRCodeId`}
                                                            label="QR"
                                                        >
                                                            <FormikAntd.Input
                                                                name={`promoCodes.${index}.QRCodeId`}
                                                                type="text"
                                                                autoComplete="off"
                                                                autoCapitalize="off"
                                                                autoCorrect="off"
                                                                disabled={true}
                                                                allowClear
                                                            />
                                                        </FormikAntd.FormItem>
                                                        {_elem.QRCodeId && (
                                                            <div
                                                                style={{
                                                                    textAlign:
                                                                        "center",
                                                                }}
                                                            >
                                                                <QrCode
                                                                    value={
                                                                        _elem.QRCodeId ||
                                                                        ""
                                                                    }
                                                                    level="H"
                                                                />
                                                            </div>
                                                        )}
                                                        <Divider />
                                                    </>
                                                ),
                                            )
                                        );
                                    }}
                                </FieldArray>
                                <FormikAntd.SubmitButton
                                    style={{ width: "100%" }}
                                    loading={loading}
                                >
                                    Сохранить
                                </FormikAntd.SubmitButton>
                            </FormikAntd.Form>
                        </Modal>
                    );
                }}
            </Formik>
            {props.children({ setVisible })}
        </>
    );
});

function useAddManyPromoCodesMutation(params: {
    setVisible: (visible: boolean) => void;
}) {
    const { setVisible } = params;

    const options = useMutationOptions();

    const [mutation, { loading }] = useMutation<
        AddManyPromocodes,
        AddManyPromocodesVariables
    >(ADD_MANY_PROMOCODES, options);

    return {
        execute: async (data: PromoCodeInput[]) => {
            await mutation({
                variables: {
                    data,
                },
                refetchQueries: ["AllPromocodes"],
            });
            setVisible(false);
        },
        loading,
    };
}
