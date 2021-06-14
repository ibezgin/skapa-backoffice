import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Modal, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
    AllPromocodes,
    AllPromocodesVariables,
    DeletePromocode,
    DeletePromocodeVariables,
} from "gql/types/operation-result-types";
import { useGenerateCode } from "hooks/use-generate-tempory-code";
import { useMutationOptions } from "hooks/use-mutation-options";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { errorHandler } from "service/utils/error-handler";
import ALL_PROMO_CODES from "./gql/all-promocode.gql";
import DELETE_PROMOCODE from "./gql/delete-promocode.gql";
import { PromoCodesModal } from "./modal";
import QrCode from "qrcode.react";
import logo from "../../../assets/logo.jpg";
import html2canvas from "html2canvas";

const { confirm } = Modal;

const pageSize = 30;

let cashedData: any;

export const PromoCodes = React.memo(() => {
    const [deleteId, setDeleteId] = useState<string>("");

    const [paginationState, setPagination] = useState<{
        count: number;
        offset: number;
    }>({ count: pageSize, offset: 0 });

    const allPromocodesQuery = useQuery<AllPromocodes, AllPromocodesVariables>(
        ALL_PROMO_CODES,
        {
            variables: {
                ...paginationState,
            },
            fetchPolicy: "cache-and-network",
            notifyOnNetworkStatusChange: true,
        },
    );

    const { generateTemporyCode } = useGenerateCode();

    const { execute, loading } = useDeletePromocodeMutation();

    const allPromocodes = useMemo(() => {
        return (
            allPromocodesQuery.data?.promoCodes.all?.data.map(elem => ({
                ...elem,
                key: generateTemporyCode(),
                createdAt: moment(Number(elem.createdAt) * 1000).format(
                    "YYYY-MM-DD HH:mm:ss",
                ),
            })) ||
            cashedData?.data ||
            []
        );
    }, [allPromocodesQuery.data?.promoCodes.all?.data, generateTemporyCode]);

    const totalCount = allPromocodesQuery.data?.promoCodes.all?.count;

    const columns: ColumnsType = useMemo(
        () => [
            { dataIndex: "name", title: "Имя" },
            { dataIndex: "sale", title: "Скидка (%)" },
            {
                dataIndex: "createdAt",
                title: "Дата создания (в текущем часовом поясе)",
            },
            { dataIndex: "QRCodeId", title: "Qr" },
            { dataIndex: "adminId", title: "Создатель" },
            {
                dataIndex: "edit",
                title: "",
                render: (_text, record: any) => (
                    <Space size="middle">
                        <PromoCodesModal isEdit data={record}>
                            {setVisible => {
                                return (
                                    <Button
                                        type="link"
                                        onClick={() => setVisible(true)}
                                    >
                                        Изменить
                                    </Button>
                                );
                            }}
                        </PromoCodesModal>
                        <Button
                            type="link"
                            onClick={() => {
                                confirm({
                                    title: `Подтвердите удаление промокода [${record.name}]`,
                                    onOk: () => {
                                        setDeleteId(record.id);
                                        execute(record.id);
                                    },
                                });
                            }}
                            loading={loading && deleteId === record.id}
                            disabled={loading}
                        >
                            Удалить
                        </Button>
                    </Space>
                ),
            },
        ],
        [deleteId, execute, loading],
    );
    useEffect(() => {
        cashedData = undefined;
    }, []);

    if (allPromocodesQuery?.data) {
        cashedData = Object.assign({}, allPromocodesQuery.data?.promoCodes.all);
    }

    const pagination = useMemo(
        () => ({
            pageSize,
            defaultPageSize: pageSize,
            total: totalCount || cashedData?.count,
            current: paginationState.offset / pageSize + 1,
            onChange: (page: number, _pageSize?: number) => {
                setPagination(_pagination => ({
                    ..._pagination,
                    offset: (page - 1) * (_pageSize || 0),
                }));
            },
        }),
        [paginationState.offset, totalCount],
    );

    const downloadButton = useCallback((id: string, name: string) => {
        // Generate download with use canvas and stream
        const _canvas: any = document.getElementById(id);
        html2canvas(_canvas, { allowTaint: true, useCORS: true }).then(
            canvas => {
                document.body.appendChild(canvas);
                // const img = new Image();
                // img.crossOrigin = "anonymous";
                // img.src = canvas.baseURI;

                const pngUrl = canvas
                    ?.toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");

                const downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = `${name}.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            },
        );
    }, []);
    return (
        <>
            <Table
                columns={columns}
                dataSource={allPromocodes}
                loading={allPromocodesQuery.loading}
                pagination={pagination}
                expandable={{
                    expandedRowRender: (record: any) => (
                        <>
                            <Row gutter={[16, 0]}>
                                <Col>
                                    <div
                                        id={record.name}
                                        style={{ position: "relative" }}
                                    >
                                        <QrCode
                                            value={record.QRCodeId}
                                            renderAs="svg"
                                            // id={record.key}
                                            size={290}
                                            level="H"
                                            imageSettings={{
                                                src: logo,
                                                width: 50,
                                                height: 50,
                                                excavate: true,
                                            }}
                                        />
                                        <img
                                            src={logo}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                position: "absolute",
                                                top: "41%",
                                                left: "41%",
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() =>
                                            downloadButton(
                                                record.name,
                                                record.name,
                                            )
                                        }
                                        type="primary"
                                    >
                                        Скачать
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ),
                    rowExpandable: (record: any) => Boolean(record.QRCodeId),
                }}
            />
        </>
    );
});

function useDeletePromocodeMutation() {
    const options = useMutationOptions();

    const [mutation, { loading }] = useMutation<
        DeletePromocode,
        DeletePromocodeVariables
    >(DELETE_PROMOCODE, {
        ...options,
        onError: error => {
            errorHandler(error);
        },
    });

    return {
        execute: async (id: string) => {
            mutation({
                variables: {
                    id,
                },
                refetchQueries: ["AllPromocodes"],
            });
        },
        loading,
    };
}
