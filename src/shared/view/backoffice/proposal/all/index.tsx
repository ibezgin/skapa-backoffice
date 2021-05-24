import { useQuery } from "@apollo/client";
import { Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import ALL_PROPOSALS from "./gql/all-proposals.gql";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { TableDateTime } from "../../../../components/table-date-time";
import { StatusColorTag } from "../../../../components/status-color-tag";
import ALL_USERS from "../../dictionary/users/gql/all-users.gql";
import ALL_CLIENTS from "../clients/gql/all-clients.gql";
import ALL_MODELS from "../../dictionary/models/gql/all-models.gql";
import All_BRAND from "../../dictionary/brand/gql/all-brands.gql";
import { Specialization } from "../../../../service/enums/specialization";
import { TableClientInfo } from "../../../../components/table-client-info";
import ALL_CARS from "../cars/gql/all-cars.gql";
import { useFormat } from "../../../../hooks/use-format";
import {
    AllBrand,
    AllCars,
    AllClients,
    AllModels,
    AllProposals,
    AllUsers,
} from "gql/types/operation-result-types";

export const ProposalAll = React.memo(() => {
    const history = useHistory();

    const [loading, setLoading] = useState<boolean>(false);

    const { addZeroToId } = useFormat();

    const allProposalsQuery = useQuery<AllProposals>(ALL_PROPOSALS, {
        fetchPolicy: "network-only",
    });

    const allUsersQuery = useQuery<AllUsers>(ALL_USERS);

    const allClientsQuery = useQuery<AllClients>(ALL_CLIENTS);

    const allModelsQuery = useQuery<AllModels>(ALL_MODELS);

    const allBrandsQuery = useQuery<AllBrand>(All_BRAND);

    const allCarsQuery = useQuery<AllCars>(ALL_CARS);

    useEffect(() => {
        const isLoading =
            allUsersQuery.loading ||
            allCarsQuery.loading ||
            allModelsQuery.loading ||
            allBrandsQuery.loading ||
            allCarsQuery.loading;
        setLoading(isLoading);
    }, [
        allBrandsQuery.loading,
        allCarsQuery.loading,
        allModelsQuery.loading,
        allUsersQuery.loading,
    ]);

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

    useEffect(() => {
        allProposalsQuery.startPolling(5000);
    }, [allProposalsQuery]);
    const columns = [
        {
            dataIndex: "proposal_id",
            title: "Номер заявки",
            render: (proposalId: any) => addZeroToId(String(proposalId) || ""),
        },
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

    const allProposals = useMemo(
        () => allProposalsQuery.data?.proposal.allProposals || [],
        [allProposalsQuery.data?.proposal.allProposals],
    );
    return (
        <Table columns={columns} dataSource={allProposals} loading={loading} />
    );
});
