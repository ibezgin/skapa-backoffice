import { Button, Col, Row } from "antd";
import React from "react";
import { ModalForm } from "../../../../../components/modal-form";
import { useModelsHelper } from "../helper";

export const DictionaryModelsHeader = React.memo(() => {
    const { sendAddModel, validateForm, formFields } = useModelsHelper();

    return (
        <>
            <ModalForm
                formFields={formFields}
                onSubmit={(values, { resetForm }) => {
                    const isValid = validateForm(values);
                    if (isValid) {
                        sendAddModel(values.title, values.brandId);
                        values.setVisible(false);
                        resetForm();
                    }
                }}
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
