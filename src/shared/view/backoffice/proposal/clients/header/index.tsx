import { Button, Col, Row } from "antd";
import _ from "lodash";
import React from "react";
import { formFields } from "../helper";
import { ModalForm } from "../../../../../components/modal-form";
import { useClientsHelper } from "../helper";
import moment from "moment";

export const ProposalClientsHeader = React.memo(() => {
    const { sendAddClient, mutationLoading } = useClientsHelper();

    return (
        <>
            <ModalForm
                onSubmit={(values, { resetForm }) => {
                    sendAddClient({
                        ..._.pick(values, ["firstName", "lastName", "phone"]),
                        createTime: moment().format("X"),
                    });
                    values.setVisible();
                    resetForm();
                }}
                formFields={formFields}
                loading={mutationLoading}
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
