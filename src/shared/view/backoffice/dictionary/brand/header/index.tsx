import { Button, Col, Row } from "antd";
import React from "react";
import { formFields } from "..";
import { ModalForm } from "../../../../../components/modal-form";
import { useDictionaryBrandHelper } from "../helper";

export const DictionaryBrandHeader = React.memo(() => {
    const { sendAddBrand } = useDictionaryBrandHelper();

    return (
        <>
            <ModalForm
                formFields={formFields}
                onSubmit={values => {
                    sendAddBrand(values.title, values.setVisible);
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
