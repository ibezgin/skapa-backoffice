import React, { useCallback, useMemo } from "react";
import { Filter } from "components/filter";
import EVERY_DAY from "./gql/every-day.gql";
import {
    ReportEveryDay,
    AllUsers,
    AllClients,
    AllModels,
    AllBrand,
    AllCars,
    ReportEveryDay_reportEveryDay_report_proposals,
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
import { useQuery } from "@apollo/client";
import { Specialization } from "service/enums/specialization";
import { TableDateTime } from "components/table-date-time";
import { StatusColorTag } from "components/status-color-tag";
import { TableClientInfo } from "components/table-client-info";
import ALL_USERS from "../../dictionary/users/gql/all-users.gql";
import ALL_CLIENTS from "../../proposal/clients/gql/all-clients.gql";
import ALL_MODELS from "../../dictionary/models/gql/all-models.gql";
import All_BRAND from "../../dictionary/brand/gql/all-brands.gql";
import ALL_CARS from "../../proposal/cars/gql/all-cars.gql";
import { useHistory } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { useHasWindow } from "hooks/use-has-window";

interface IProps {
    proposals: ReportEveryDay_reportEveryDay_report_proposals[];
}
const ExpandableSubTable = React.memo((props: IProps) => {
    const history = useHistory();

    const hasWindow = useHasWindow();

    const proposals = useMemo(() => props.proposals || [], [props.proposals]);
    const allUsersQuery = useQuery<AllUsers>(ALL_USERS);

    const allClientsQuery = useQuery<AllClients>(ALL_CLIENTS);

    const allModelsQuery = useQuery<AllModels>(ALL_MODELS);

    const allBrandsQuery = useQuery<AllBrand>(All_BRAND);

    const allCarsQuery = useQuery<AllCars>(ALL_CARS);

    const technicalUsers = useMemo(
        () =>
            allUsersQuery.data?.users.allUsers?.filter(
                elem => elem?.position === Specialization.TECHNICAL,
            ),
        [allUsersQuery.data?.users.allUsers],
    );

    const allClients = useMemo(() => allClientsQuery.data?.clients.allClients, [
        allClientsQuery.data?.clients.allClients,
    ]);

    const allModels = useMemo(() => allModelsQuery.data?.models.allModels, [
        allModelsQuery.data?.models.allModels,
    ]);
    const allBrand = useMemo(() => allBrandsQuery.data?.brand.allBrands, [
        allBrandsQuery.data?.brand.allBrands,
    ]);

    const allCars = useMemo(() => allCarsQuery.data?.cars.allCars, [
        allCarsQuery.data?.cars.allCars,
    ]);

    const columns = [
        {
            dataIndex: "createTime",
            title: "Дата создания",
            render: (createTime: any) => (
                <TableDateTime date={1000 * createTime} />
            ),
        },
        {
            dataIndex: "changeTime",
            title: "Дата последнего изменения",
            render: (changeTime: any) => (
                <TableDateTime date={1000 * changeTime} />
            ),
        },
        {
            dataIndex: "status",
            title: "Статус",
            render: (status: any) => <StatusColorTag status={status} />,
        },
        {
            dataIndex: "clientId",
            title: "Клиент",
            render: (clientId: any) => {
                const client = allClients?.find(elem => elem.id === clientId);
                return (
                    <TableClientInfo
                        nameAndLastName={`${client?.firstName} ${client?.lastName}`}
                        phoneNumber={client?.phone as string}
                    />
                );
            },
        },
        {
            dataIndex: "carId",
            title: "Авто",
            render: (carId: any) => {
                const car = allCars?.find(elem => elem.id === carId);
                const brand = allBrand?.find(elem => elem.id === car?.brandId)
                    ?.title;
                const model = allModels?.find(elem => elem.id === car?.modelId)
                    ?.title;
                return (
                    <span>
                        {brand} {model}
                    </span>
                );
            },
        },
        {
            dataIndex: "userId",
            title: "Технический специалист",
            render: (userId: any) => {
                const user = technicalUsers?.find(elem => elem?.id === userId);

                return (
                    <span>
                        {user?.firstname} {user?.lastname}
                    </span>
                );
            },
        },
        {
            dataIndex: "edit",
            title: "",
            render: (_edit: any, record: any) => (
                <EditOutlined
                    onClick={() => {
                        history.push(`/proposal/form?id=${record.id}`);
                    }}
                />
            ),
        },
    ];

    const loading = useMemo(() => {
        if (hasWindow) {
            return (
                allUsersQuery.loading ||
                allClientsQuery.loading ||
                allModelsQuery.loading ||
                allBrandsQuery.loading ||
                allCarsQuery.loading ||
                allClientsQuery.loading
            );
        }
        return false;
    }, [
        allBrandsQuery.loading,
        allCarsQuery.loading,
        allClientsQuery.loading,
        allModelsQuery.loading,
        allUsersQuery.loading,
        hasWindow,
    ]);
    return (
        <Table
            columns={columns}
            dataSource={proposals}
            size="small"
            scroll={{
                x: true,
            }}
            pagination={false}
            loading={loading}
        />
    );
});

export const ReportEveryDayComponent = React.memo(() => {
    const hasWindow = useHasWindow();

    const expandedRowRender = useCallback(record => {
        return <ExpandableSubTable proposals={record.proposals} />;
    }, []);

    const expandable = useMemo(() => ({ expandedRowRender }), [
        expandedRowRender,
    ]);

    return (
        <Filter<ReportEveryDay>
            filterItems={[]}
            query={EVERY_DAY}
            skip={false}
            withoutButton={true}
            fetchPolicy={"cache-and-network"}
        >
            {({ data, loading }, { pagination }) => {
                const result = data?.reportEveryDay.report || [];

                const columns = [
                    {
                        dataIndex: "date",
                        title: "Дата",
                    },
                    {
                        dataIndex: "count",
                        title: "Количество",
                    },
                ];

                const loadState = hasWindow && loading;

                return (
                    <>
                        <Spin spinning={loadState}>
                            <Table
                                dataSource={result as any}
                                columns={columns}
                                size="small"
                                expandable={expandable}
                                pagination={pagination}
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
                                        name={"Количество заявок"}
                                        stroke="#f45b5b"
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
