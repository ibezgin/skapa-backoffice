import { Button, Col, Row } from "antd";
import React from "react";
import { PromoCodesAddManyModal } from "../add-many-modal";
import { PromoCodesModal } from "../modal";

export const PromoCodesHeader = React.memo(() => {
    return (
        <>
            <Row gutter={[16, 0]} justify="end">
                <Col>
                    <PromoCodesAddManyModal>
                        {({ setVisible }) => {
                            return (
                                <Button
                                    type="primary"
                                    size="large"
                                    // style={{ width: "120px" }}
                                    onClick={() => setVisible(true)}
                                >
                                    Добавить несколько
                                </Button>
                            );
                        }}
                    </PromoCodesAddManyModal>
                </Col>{" "}
                <Col>
                    <PromoCodesModal isEdit={false}>
                        {setVisible => {
                            return (
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{ width: "120px" }}
                                    onClick={() => setVisible(true)}
                                >
                                    Добавить
                                </Button>
                            );
                        }}
                    </PromoCodesModal>
                </Col>
            </Row>
        </>
    );
});
