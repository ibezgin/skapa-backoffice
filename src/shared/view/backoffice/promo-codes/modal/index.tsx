import { Button, Modal, Typography } from "antd";
import { Formik } from "formik";
import React, { ReactNode, useState } from "react";
import * as FormikAntd from "formik-antd";
import QrCode from "qrcode.react";
import { useGenerateCode } from "hooks/use-generate-tempory-code";

const { Title } = Typography;

interface IProps {
    isEdit: boolean;
    children: (setVisible: (state: boolean) => void) => ReactNode;
}

export const PromoCodesModal = React.memo((props: IProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    const { generateTemporyCode, generatePromoCode } = useGenerateCode();

    return (
        <Formik
            initialValues={{ name: "", sale: "", qr: "" }}
            enableReinitialize={true}
            onSubmit={() => {
                // some code
            }}
        >
            {({ values, setFieldValue, resetForm }) => {
                return (
                    <>
                        <Modal
                            visible={visible}
                            onCancel={() => {
                                setVisible(false);
                                resetForm();
                            }}
                            footer={null}
                        >
                            <FormikAntd.Form layout="vertical">
                                <Title level={4}>
                                    {!props.isEdit
                                        ? "Добавить"
                                        : "Редактировать"}
                                </Title>
                                <FormikAntd.FormItem name="name" label="Имя">
                                    <FormikAntd.Input
                                        name="name"
                                        type="text"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                    />
                                </FormikAntd.FormItem>
                                <Button
                                    style={{
                                        width: "100%",
                                        marginBottom: "16px",
                                    }}
                                    onClick={() => {
                                        const code = generatePromoCode();
                                        setFieldValue("name", code);
                                    }}
                                >
                                    Сгенерировать промо-код
                                </Button>
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
                                        min={1}
                                        max={99}
                                    />
                                </FormikAntd.FormItem>

                                <FormikAntd.FormItem name="qr" label="QR">
                                    <FormikAntd.Input
                                        name="qr"
                                        type="text"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        disabled={true}
                                        allowClear
                                    />
                                </FormikAntd.FormItem>
                                {values.qr && (
                                    <div style={{ textAlign: "center" }}>
                                        <QrCode value={values.qr || ""} />
                                    </div>
                                )}
                                <Button
                                    style={{
                                        width: "100%",
                                        marginBottom: "16px",
                                        marginTop: "16px",
                                    }}
                                    onClick={() => {
                                        const code = generateTemporyCode();
                                        setFieldValue("qr", code);
                                    }}
                                >
                                    Сгенерировать QR код
                                </Button>
                                <FormikAntd.SubmitButton
                                    loading={false}
                                    block={true}
                                >
                                    Сохранить
                                </FormikAntd.SubmitButton>
                            </FormikAntd.Form>
                        </Modal>
                        {props.children(setVisible)}
                    </>
                );
            }}
        </Formik>
    );
});
