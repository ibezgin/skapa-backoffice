import React, { useCallback, useMemo } from "react";
import { Filter } from "components/filter";
import EVERY_DAY from "./gql/every-day.gql";
import {
    ReportTurnover,
    ReportTurnover_reportTurnover_report_data_transactions,
} from "gql/types/operation-result-types";
import {
    LineChart,
    CartesianGrid,
    XAxis,
    Tooltip,
    YAxis,
    Legend,
    ResponsiveContainer,
    Line,
} from "recharts";
import { Table, Spin } from "antd";
import { TableDateTime } from "components/table-date-time";
import { NumberFormatter } from "components/number-formatter";
import { useHistory } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { useHasWindow } from "hooks/use-has-window";
import { useFormat } from "hooks/use-format";

interface IProps {
    transactions: ReportTurnover_reportTurnover_report_data_transactions[];
}
const ExpandableSubTable = React.memo((props: IProps) => {
    const history = useHistory();

    const transactions = useMemo(() => props.transactions || [], [
        props.transactions,
    ]);
    const { addZeroToId } = useFormat();

    const columns = [
        {
            dataIndex: "proposal",
            title: "Номер заявки",
            render: (proposal: any) =>
                addZeroToId(String(proposal.proposal_id) || ""),
        },
        {
            dataIndex: "proposal",
            title: "Дата",
            render: (proposal: any) => (
                <TableDateTime date={1000 * proposal.changeTime} />
            ),
        },
        {
            dataIndex: "amount",
            title: "Сумма",
            render: (amount: any) => {
                return <NumberFormatter numb={amount} />;
            },
        },
        {
            dataIndex: "edit",
            title: "",
            render: (_edit: any, record: any) => (
                <EditOutlined
                    onClick={() => {
                        history.push(`/proposal/form?id=${record.proposal.id}`);
                    }}
                />
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={transactions}
            size="small"
            scroll={{
                x: true,
            }}
            pagination={false}
            loading={false}
        />
    );
});

export const ReportTurnoverComponent = React.memo(() => {
    const hasWindow = useHasWindow();

    const expandedRowRender = useCallback(record => {
        return <ExpandableSubTable transactions={record.transactions} />;
    }, []);

    const expandable = useMemo(() => ({ expandedRowRender }), [
        expandedRowRender,
    ]);

    return (
        <Filter<ReportTurnover>
            filterItems={[]}
            query={EVERY_DAY}
            skip={false}
            withoutButton={true}
            fetchPolicy={"cache-and-network"}
        >
            {({ data, loading }, { pagination }) => {
                const result = data?.reportTurnover.report?.data || [];
                const totalAmount =
                    data?.reportTurnover.report?.totalAmount || 0;

                const columns = [
                    {
                        dataIndex: "date",
                        title: "Дата",
                    },
                    {
                        dataIndex: "dayAmount",
                        title: "Сумма",
                        render: (dayAmount: number) => (
                            <NumberFormatter numb={dayAmount} />
                        ),
                    },
                    {
                        dataIndex: "count",
                        title: "Количество оплаченных заявок за день",
                    },
                ];

                const loadState = hasWindow && loading;

                return (
                    <>
                        <Spin spinning={loadState}>
                            <Table
                                dataSource={result}
                                columns={columns}
                                size="small"
                                expandable={expandable}
                                pagination={pagination}
                                title={() => (
                                    <>
                                        Общая сумма по закрытым заявкам:{" "}
                                        <NumberFormatter numb={totalAmount} />{" "}
                                    </>
                                )}
                            />
                            <ResponsiveContainer
                                height="100%"
                                width="100%"
                                aspect={8.0 / 2.0}
                            >
                                <LineChart
                                    data={result}
                                    margin={{ top: 5, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        name={"Количество оплаченных заявок"}
                                        stroke="#f45b5b"
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="dayAmount"
                                        name={"Общая сумма за день"}
                                        stroke="#1d2480"
                                        activeDot={{ r: 8 }}
                                    />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </Spin>
                    </>
                );
            }}
        </Filter>
    );
});
