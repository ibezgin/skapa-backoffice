import { Button, Col, Row } from "antd";
import React from "react";
import { formFields } from "..";
import { ModalForm } from "../../../../../components/modal-form";
import { useServiceHelper } from "../helper";

export const DictionaryServiceHeader = React.memo(() => {
    const { sendAddService } = useServiceHelper();
    return (
        <>
            <ModalForm
                onSubmit={(values, { resetForm }) => {
                    sendAddService(values.title, Number(values.price));
                    values.setVisible();
                    resetForm();
                }}
                formFields={formFields}
            >
                {setVisible => (
                    <Row gutter={[16, 0]} justify="end">
                        <Col>
                            <Button
                                type="primary"
                                size="large"
                                style={{ width: "120px" }}
                                onClick={() => {
                                    setVisible(true);
                                }}
                            >
                                Добавить
                            </Button>
                        </Col>
                    </Row>
                )}
            </ModalForm>
        </>
    );
});
