import { Button, Col, Row } from "antd";
import _ from "lodash";
import React from "react";
import { ModalForm } from "../../../../../components/modal-form";
import { useCarsHelper } from "../helper";

export const ProposalCarsHeader = React.memo(() => {
    const {
        sendAddCar,
        mutationLoading,
        formFields,
        setBrandState,
    } = useCarsHelper();

    return (
        <>
            <ModalForm
                onSubmit={(values, { resetForm }) => {
                    sendAddCar(
                        _.pick(values, [
                            "brandId",
                            "modelId",
                            "clientId",
                            "gosNumber",
                            "color",
                        ]),
                    );
                    values.setVisible();
                    resetForm();
                }}
                formFields={formFields}
                loading={mutationLoading}
            >
                {(setVisible, values) => {
                    setBrandState(values?.brandId);
                    return (
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
                    );
                }}
            </ModalForm>
        </>
    );
});
