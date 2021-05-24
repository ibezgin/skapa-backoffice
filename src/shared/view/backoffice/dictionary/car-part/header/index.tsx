import { Row, Col, Button } from "antd";
import React from "react";
import { ModalForm } from "../../../../../components/modal-form";
import { formFields } from "..";
import { useCarPartHelper } from "../helper";

export const DictionaryCarPartHeader = React.memo(() => {
    const { sendAddCarPart, mutationLoading } = useCarPartHelper();

    return (
        <>
            <ModalForm
                formFields={formFields}
                onSubmit={(values, { resetForm }) => {
                    sendAddCarPart(values.title, values.price);
                    values.setVisible(false);
                    resetForm();
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
                                loading={mutationLoading}
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
