import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
    AllPromocodes,
    AllPromocodesVariables,
} from "gql/types/operation-result-types";
import React, { useMemo, useState } from "react";
import ALL_PROMO_CODES from "./gql/all-promocode.gql";

const pageSize = 30;

export const PromoCodes = React.memo(() => {
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
        },
    );

    // eslint-disable-next-line no-console
    console.log(allPromocodesQuery.data?.promoCodes.all);

    const allPromocodes = useMemo(
        () => allPromocodesQuery.data?.promoCodes.all?.data || [],
        [allPromocodesQuery.data?.promoCodes.all],
    );

    const totalCount = allPromocodesQuery.data?.promoCodes.all?.count;

    const columns: ColumnsType = useMemo(
        () => [
            { dataIndex: "name", title: "Имя" },
            { dataIndex: "sale", title: "Скидка (%)" },
            {
                dataIndex: "createdAt",
                title: "Дата создания (в текущем часовом поясе)",
            },
            { dataIndex: "qr", title: "Qr" },
            { dataIndex: "adminId", title: "Создатель" },
            { dataIndex: "edit", title: "" },
        ],
        [],
    );

    const pagination = {
        pageSize,
        defaultPageSize: pageSize,
        total: totalCount,
        current: paginationState.offset / pageSize + 1,
        onChange: (page: number, _pageSize?: number) => {
            setPagination(_pagination => ({
                ..._pagination,
                offset: (page - 1) * (_pageSize || 0),
            }));
        },
    };
    return (
        <>
            <Table
                columns={columns}
                dataSource={allPromocodes}
                loading={allPromocodesQuery.loading}
                pagination={pagination}
            />
        </>
    );
});
