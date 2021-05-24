import { useQuery } from "@apollo/client";
import { List, Spin, Typography } from "antd";
import { Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    CardCell,
    CardInner,
    CardRow,
    CardSave,
    CardTitle,
    CardWrapper,
} from "../../../../../components/ui/card/styled";
import ALL_CLIENTS from "../../clients/gql/all-clients.gql";
import * as FormikAntd from "formik-antd";
import ALL_CARS from "../../cars/gql/all-cars.gql";
import ALL_MODELS from "../../../dictionary/models/gql/all-models.gql";
import All_BRAND from "../../../dictionary/brand/gql/all-brands.gql";
import ALL_SERVICES from "../../../dictionary/service/gql/all-services.gql";
import ALL_USERS from "../../../dictionary/users/gql/all-users.gql";
import { useEditProposalHelper } from "../helper";
import moment from "moment";
import { useQueryParams } from "../../../../../hooks/use-query-params";
import PROPOSAL_BY_ID from "../gql/proposal-by-id.gql";
import { StatusColorTag } from "../../../../../components/status-color-tag";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import {
    AllBrand,
    AllCars,
    AllClients,
    AllModels,
    AllServices,
    AllUsers,
    ProposalById,
    ProposalByIdVariables,
} from "gql/types/operation-result-types";
import { Specialization } from "service/enums/specialization";
import { ProposalStatus } from "service/enums/proposal-status";
import { useFormat } from "hooks/use-format";

const { Title } = Typography;

export const ProposalForm = React.memo(() => {
    const history = useHistory();
    const { id } = useQueryParams();

    const { addZeroToId } = useFormat();

    const [client, setClient] = useState("");

    const [car, setCar] = useState("");

    const [user, setUser] = useState("");

    const [service, setService] = useState<any>([]);

    const [completedWork, setCompletedWork] = useState<any>({});

    const allClientsQuery = useQuery<AllClients>(ALL_CLIENTS);

    const allCarsQuery = useQuery<AllCars>(ALL_CARS);

    const allModelsQuery = useQuery<AllModels>(ALL_MODELS);

    const allBrandsQuery = useQuery<AllBrand>(All_BRAND);

    const allServiceQuery = useQuery<AllServices>(ALL_SERVICES);

    const allUsersQuery = useQuery<AllUsers>(ALL_USERS);

    const allProposalsQuery = useQuery<ProposalById, ProposalByIdVariables>(
        PROPOSAL_BY_ID,
        {
            fetchPolicy: "network-only",
            variables: {
                id,
            },
            skip: !id,
        },
    );
    const proposalById = useMemo(
        () => allProposalsQuery.data?.proposal.proposalById,
        [allProposalsQuery.data?.proposal.proposalById],
    );

    const allClients = useMemo(() => allClientsQuery.data?.clients.allClients, [
        allClientsQuery.data?.clients.allClients,
    ]);

    const allCars = useMemo(
        () =>
            allCarsQuery.data?.cars.allCars?.filter(
                elem => elem.clientId === client,
            ),
        [allCarsQuery.data?.cars.allCars, client],
    );

    const clientInfo = useMemo(
        () => allClients?.find(elem => elem.id === client),
        [allClients, client],
    );

    const allModels = useMemo(() => allModelsQuery.data?.models.allModels, [
        allModelsQuery.data?.models.allModels,
    ]);
    const allBrand = useMemo(() => allBrandsQuery.data?.brand.allBrands, [
        allBrandsQuery.data?.brand.allBrands,
    ]);

    const carInfo = useMemo(() => allCars?.find(elem => elem.id === car), [
        allCars,
        car,
    ]);

    const allServices = useMemo(
        () => allServiceQuery.data?.service.allServices,
        [allServiceQuery.data?.service.allServices],
    );

    const recomendedWorkDatasourse = useMemo(
        () =>
            service && service?.length
                ? _.map(service, elem => ({
                      id: elem,
                      title: allServices?.find(serv => serv.id === elem)?.title,
                  })) || []
                : [],
        [allServices, service],
    );

    const technicalUsers = useMemo(
        () =>
            allUsersQuery.data?.users.allUsers?.filter(
                elem => elem?.position === Specialization.TECHNICAL,
            ),
        [allUsersQuery.data?.users.allUsers],
    );

    const specialistInfo = useMemo(
        () => technicalUsers?.find(elem => elem?.id === user),
        [technicalUsers, user],
    );
    const completedPriceChecker = useCallback(() => {
        let price = 0;

        const complitedKeys: any = [];
        for (const serviceId in completedWork) {
            if (completedWork[serviceId]) {
                complitedKeys.push(serviceId);
            }
        }

        for (const key of complitedKeys) {
            price += Number(allServices?.find(elem => elem.id === key)?.price);
        }

        return price || 0;
    }, [allServices, completedWork]);

    const recomendedPriceChecker = useCallback(() => {
        let totalPrice = 0;

        const prices = _.map(
            service,
            serviceId =>
                allServices?.find(elem => elem.id === serviceId)?.price,
        );

        for (const price of prices) {
            totalPrice += Number(price);
        }

        return totalPrice || 0;
    }, [allServices, service]);

    const proposalStatuses = useMemo(
        () => [
            {
                value: ProposalStatus.ACCEPTED,
                label: "Принята",
                disabled:
                    proposalById?.status ===
                        ProposalStatus.TECHNICAL_INSPECTION ||
                    proposalById?.status === ProposalStatus.TECHNICAL_WORKS ||
                    proposalById?.status === ProposalStatus.COMPLETED ||
                    proposalById?.status === ProposalStatus.PAY_AND_COMPLITED,
            },
            {
                value: ProposalStatus.TECHNICAL_INSPECTION,
                label: "Технический осмотр",
                disabled:
                    proposalById?.status === ProposalStatus.TECHNICAL_WORKS ||
                    proposalById?.status === ProposalStatus.COMPLETED ||
                    proposalById?.status === ProposalStatus.PAY_AND_COMPLITED,
            },
            {
                value: ProposalStatus.TECHNICAL_WORKS,
                label: "Технические работы",
                disabled:
                    proposalById?.status === ProposalStatus.ACCEPTED ||
                    proposalById?.status === ProposalStatus.COMPLETED ||
                    proposalById?.status === ProposalStatus.PAY_AND_COMPLITED,
            },
            {
                value: ProposalStatus.COMPLETED,
                label: "Завершена",
                disabled:
                    proposalById?.status ===
                        ProposalStatus.TECHNICAL_INSPECTION ||
                    proposalById?.status === ProposalStatus.PAY_AND_COMPLITED ||
                    proposalById?.status === ProposalStatus.ACCEPTED,
            },
            {
                value: ProposalStatus.PAY_AND_COMPLITED,
                label: "Оплачена и завершена",
                disabled:
                    proposalById?.status ===
                        ProposalStatus.TECHNICAL_INSPECTION ||
                    proposalById?.status === ProposalStatus.ACCEPTED,
            },
        ],
        [proposalById?.status],
    );

    const {
        sendAddProposal,
        sendUpdateProposal,
        validateForm,
        mutationLoading,
    } = useEditProposalHelper();

    const initialValues = useMemo(
        () =>
            id
                ? {
                      ...proposalById,
                      completedWork:
                          JSON.parse(proposalById?.completedWork || "{}") || {},
                  }
                : {
                      createTime: "",
                      clientId: "",
                      carId: "",
                      status: ProposalStatus.ACCEPTED,
                      userId: "",
                      proposalReason: "",
                      technicalInspectionResult: "",
                      recomendedWork: [],
                      completedWork: {},
                  },
        [id, proposalById],
    );

    const onSubmit = useCallback(
        (
            values: typeof initialValues,
            // formikHelpers: FormikHelpers<typeof initialValues>,
        ) => {
            const isValid = validateForm(values);
            if (!id && isValid) {
                sendAddProposal({
                    createTime: moment().format("X"),
                    changeTime: moment().format("X"),
                    status: Number(values.status),
                    clientId: String(values.clientId),
                    carId: String(values.carId),
                    userId: String(values.userId),
                    proposalReason: values.proposalReason,
                    technicalInspectionResult: "",
                    recomendedWork: values.recomendedWork,
                    completedWork: JSON.stringify(values.completedWork),
                });
                history.push("/proposal");
            }
            if (id) {
                sendUpdateProposal(id, {
                    createTime: String(values?.createTime),
                    changeTime: moment().format("X"),
                    status: Number(values.status),
                    clientId: String(values.clientId),
                    carId: String(values.carId),
                    userId: String(values.userId),
                    proposalReason: values.proposalReason,
                    technicalInspectionResult: values.technicalInspectionResult,
                    recomendedWork: values.recomendedWork,
                    completedWork: JSON.stringify(values.completedWork),
                });
            }
        },
        [history, id, sendAddProposal, sendUpdateProposal, validateForm],
    );

    const loading =
        allClientsQuery.loading ||
        allClientsQuery.loading ||
        allModelsQuery.loading ||
        allBrandsQuery.loading ||
        allServiceQuery.loading ||
        allUsersQuery.loading ||
        allProposalsQuery.loading ||
        mutationLoading;

    return (
        <Spin spinning={loading}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        setClient(String(values?.clientId));
                    }, [values?.clientId]);

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        setCar(String(values?.carId));
                    }, [values?.carId]);

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        setService(values.recomendedWork);
                    }, [values?.recomendedWork]);

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        setCompletedWork(values?.completedWork);
                    }, [values?.completedWork, values?.recomendedWork]);

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        setUser(String(values?.userId));
                    }, [values?.userId]);

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        for (const key in values?.completedWork) {
                            if (
                                values?.recomendedWork?.indexOf(
                                    key as never,
                                ) === -1
                            ) {
                                setFieldValue(
                                    `completedWork[${key}]`,
                                    undefined,
                                );
                            }
                        }
                    }, [
                        setFieldValue,
                        values?.completedWork,
                        values?.recomendedWork,
                    ]);

                    return (
                        <FormikAntd.Form>
                            <CardWrapper>
                                {proposalById?.proposal_id && (
                                    <Title level={3}>
                                        Заявка №{" "}
                                        {addZeroToId(
                                            String(proposalById?.proposal_id),
                                        )}
                                    </Title>
                                )}
                                <CardInner>
                                    {/* {proposalById?.proposal_id && (
                                        <CardRow>
                                            <CardCell>
                                                <CardTitle>
                                                    Заявки №{" "}
                                                    {addZeroToId(
                                                        String(
                                                            proposalById?.proposal_id,
                                                        ),
                                                    )}
                                                </CardTitle>
                                            </CardCell>
                                        </CardRow>
                                    )} */}
                                    <CardRow>
                                        <CardCell>
                                            <CardTitle>
                                                Информация о клиенте
                                            </CardTitle>
                                        </CardCell>
                                    </CardRow>
                                    {!proposalById && (
                                        <CardRow>
                                            <CardCell>
                                                <FormikAntd.Select
                                                    name="clientId"
                                                    placeholder="Выберите клиента"
                                                    dropdownMatchSelectWidth={
                                                        false
                                                    }
                                                    allowClear={false}
                                                >
                                                    {(allClients || []).map(
                                                        elem => (
                                                            <FormikAntd.Select.Option
                                                                key={`modal-form-option-${String(
                                                                    elem?.id,
                                                                )}`}
                                                                value={String(
                                                                    elem?.id,
                                                                )}
                                                            >
                                                                {
                                                                    elem?.firstName
                                                                }{" "}
                                                                {elem.lastName}{" "}
                                                                {elem.phone}
                                                            </FormikAntd.Select.Option>
                                                        ),
                                                    )}
                                                </FormikAntd.Select>
                                            </CardCell>
                                        </CardRow>
                                    )}
                                    {values?.clientId && (
                                        <>
                                            <CardRow>
                                                <CardCell>Имя</CardCell>
                                                <CardCell>
                                                    {clientInfo?.firstName}
                                                </CardCell>
                                            </CardRow>
                                            <CardRow>
                                                <CardCell>Фамилия</CardCell>
                                                <CardCell>
                                                    {clientInfo?.lastName}
                                                </CardCell>
                                            </CardRow>
                                            <CardRow>
                                                <CardCell>
                                                    Номер телефона
                                                </CardCell>
                                                <CardCell>
                                                    {clientInfo?.phone}
                                                </CardCell>
                                            </CardRow>
                                        </>
                                    )}
                                    <CardRow>
                                        <CardCell>
                                            <CardTitle>
                                                Информация о авто
                                            </CardTitle>
                                        </CardCell>
                                    </CardRow>
                                    {!proposalById && (
                                        <CardRow>
                                            <CardCell>
                                                <FormikAntd.Select
                                                    name="carId"
                                                    placeholder="Выберите авто"
                                                    dropdownMatchSelectWidth={
                                                        false
                                                    }
                                                    allowClear={false}
                                                    disabled={!values?.clientId}
                                                >
                                                    {(allCars || [])?.map(
                                                        elem => (
                                                            <FormikAntd.Select.Option
                                                                key={`modal-form-option-${String(
                                                                    elem?.id,
                                                                )}`}
                                                                value={String(
                                                                    elem?.id,
                                                                )}
                                                            >
                                                                {
                                                                    allBrand?.find(
                                                                        brand =>
                                                                            brand.id ===
                                                                            elem?.brandId,
                                                                    )?.title
                                                                }{" "}
                                                                {
                                                                    allModels?.find(
                                                                        model =>
                                                                            model.id ===
                                                                            elem?.modelId,
                                                                    )?.title
                                                                }{" "}
                                                                {
                                                                    elem?.gosNumber
                                                                }{" "}
                                                            </FormikAntd.Select.Option>
                                                        ),
                                                    )}
                                                </FormikAntd.Select>
                                            </CardCell>
                                        </CardRow>
                                    )}
                                    {values?.carId && (
                                        <>
                                            <CardRow>
                                                <CardCell>Марка</CardCell>
                                                <CardCell>
                                                    {
                                                        allBrand?.find(
                                                            elem =>
                                                                elem?.id ===
                                                                carInfo?.brandId,
                                                        )?.title
                                                    }
                                                </CardCell>
                                            </CardRow>
                                            <CardRow>
                                                <CardCell>Модель</CardCell>
                                                <CardCell>
                                                    {
                                                        allModels?.find(
                                                            elem =>
                                                                elem?.id ===
                                                                carInfo?.modelId,
                                                        )?.title
                                                    }
                                                </CardCell>
                                            </CardRow>

                                            <CardRow>
                                                <CardCell>Гос номер</CardCell>
                                                <CardCell>
                                                    {carInfo?.gosNumber}{" "}
                                                </CardCell>
                                            </CardRow>
                                            <CardRow>
                                                <CardCell>Цвет</CardCell>
                                                <CardCell>
                                                    {carInfo?.color}
                                                </CardCell>
                                            </CardRow>
                                        </>
                                    )}
                                    <CardRow>
                                        <CardCell>
                                            <CardTitle>Статус заявки</CardTitle>
                                        </CardCell>
                                        <CardCell>
                                            <StatusColorTag
                                                status={
                                                    proposalById?.status ||
                                                    ProposalStatus.ACCEPTED
                                                }
                                            />
                                        </CardCell>
                                    </CardRow>{" "}
                                    {proposalById?.status !==
                                        ProposalStatus.PAY_AND_COMPLITED && (
                                        <CardRow>
                                            <CardCell>Изменить статус</CardCell>
                                            <CardCell>
                                                <FormikAntd.Select
                                                    name="status"
                                                    placeholder="Статус заявкии"
                                                    dropdownMatchSelectWidth={
                                                        false
                                                    }
                                                    allowClear={false}
                                                    disabled={_.isUndefined(
                                                        proposalById?.status,
                                                    )}
                                                >
                                                    {(
                                                        proposalStatuses || []
                                                    ).map(elem => (
                                                        <FormikAntd.Select.Option
                                                            key={`status-form-option-${String(
                                                                elem?.value,
                                                            )}`}
                                                            // value={elem?.value}
                                                            value={elem.value}
                                                            disabled={
                                                                elem.disabled
                                                            }
                                                        >
                                                            {elem?.label}{" "}
                                                        </FormikAntd.Select.Option>
                                                    ))}
                                                </FormikAntd.Select>
                                            </CardCell>{" "}
                                        </CardRow>
                                    )}{" "}
                                    <CardRow>
                                        <CardCell>
                                            <CardTitle>Специалист</CardTitle>
                                        </CardCell>
                                        <CardCell>
                                            {specialistInfo?.firstname}{" "}
                                            {specialistInfo?.lastname}
                                        </CardCell>
                                    </CardRow>
                                    {(proposalById?.status ===
                                        ProposalStatus.ACCEPTED ||
                                        !proposalById) && (
                                        <CardRow>
                                            <CardCell>
                                                Изменить специалиста
                                            </CardCell>
                                            <CardCell>
                                                <FormikAntd.Select
                                                    name="userId"
                                                    placeholder="Специалист"
                                                    dropdownMatchSelectWidth={
                                                        false
                                                    }
                                                    allowClear={false}
                                                >
                                                    {(technicalUsers || []).map(
                                                        elem => (
                                                            <FormikAntd.Select.Option
                                                                key={`specialist-form-option-${String(
                                                                    elem?.id,
                                                                )}`}
                                                                value={String(
                                                                    elem?.id,
                                                                )}
                                                            >
                                                                {
                                                                    elem?.firstname
                                                                }{" "}
                                                                {elem?.lastname}
                                                            </FormikAntd.Select.Option>
                                                        ),
                                                    )}
                                                </FormikAntd.Select>
                                            </CardCell>
                                        </CardRow>
                                    )}
                                    <CardRow>
                                        <CardCell>
                                            <CardTitle>
                                                Причина обращения
                                            </CardTitle>
                                        </CardCell>
                                    </CardRow>
                                    {!proposalById && (
                                        <CardRow>
                                            <FormikAntd.Input.TextArea
                                                name="proposalReason"
                                                rows={4}
                                                required
                                            />
                                        </CardRow>
                                    )}
                                    <CardRow>
                                        <CardCell>
                                            {values?.proposalReason}
                                        </CardCell>
                                    </CardRow>
                                    {proposalById &&
                                        proposalById?.status !==
                                            ProposalStatus.ACCEPTED && (
                                            <>
                                                {" "}
                                                <CardRow>
                                                    <CardCell>
                                                        <CardTitle>
                                                            Результат
                                                            технического осмотра
                                                        </CardTitle>
                                                    </CardCell>
                                                </CardRow>
                                                {proposalById?.status ===
                                                    ProposalStatus.TECHNICAL_INSPECTION && (
                                                    <CardRow>
                                                        <FormikAntd.Input.TextArea
                                                            name="technicalInspectionResult"
                                                            rows={4}
                                                        />
                                                    </CardRow>
                                                )}
                                                <CardRow>
                                                    <CardCell>
                                                        {
                                                            values?.technicalInspectionResult
                                                        }
                                                    </CardCell>
                                                </CardRow>
                                                <CardRow>
                                                    <CardCell>
                                                        <CardTitle>
                                                            Предварительный план
                                                            работ
                                                        </CardTitle>
                                                    </CardCell>
                                                </CardRow>
                                                {proposalById?.status ===
                                                    ProposalStatus.TECHNICAL_INSPECTION && (
                                                    <CardRow>
                                                        <CardCell>
                                                            <FormikAntd.Select
                                                                name="recomendedWork"
                                                                placeholder="Предварительный план работ"
                                                                dropdownMatchSelectWidth={
                                                                    false
                                                                }
                                                                allowClear={
                                                                    false
                                                                }
                                                                mode="multiple"
                                                            >
                                                                {(
                                                                    allServices ||
                                                                    []
                                                                ).map(elem => (
                                                                    <FormikAntd.Select.Option
                                                                        key={`modal-form-option-${String(
                                                                            elem?.id,
                                                                        )}`}
                                                                        value={String(
                                                                            elem?.id,
                                                                        )}
                                                                    >
                                                                        {
                                                                            elem?.title
                                                                        }{" "}
                                                                    </FormikAntd.Select.Option>
                                                                ))}
                                                            </FormikAntd.Select>
                                                        </CardCell>
                                                    </CardRow>
                                                )}
                                                <List
                                                    size="large"
                                                    dataSource={
                                                        recomendedWorkDatasourse
                                                    }
                                                    renderItem={(item: any) => (
                                                        <List.Item>
                                                            {item.title}
                                                        </List.Item>
                                                    )}
                                                />
                                                {(proposalById?.status ===
                                                    ProposalStatus.TECHNICAL_WORKS ||
                                                    proposalById?.status ===
                                                        ProposalStatus.COMPLETED ||
                                                    proposalById?.status ===
                                                        ProposalStatus.PAY_AND_COMPLITED) && (
                                                    <>
                                                        <CardRow>
                                                            <CardCell>
                                                                <CardTitle>
                                                                    Выполненные
                                                                    работы
                                                                </CardTitle>
                                                            </CardCell>
                                                        </CardRow>
                                                        <List
                                                            size="large"
                                                            dataSource={
                                                                recomendedWorkDatasourse
                                                            }
                                                            renderItem={(
                                                                item: any,
                                                            ) => (
                                                                <List.Item>
                                                                    <FormikAntd.Checkbox
                                                                        name={`completedWork[${item.id}]`}
                                                                        disabled={
                                                                            proposalById?.status ===
                                                                                ProposalStatus.COMPLETED ||
                                                                            proposalById?.status ===
                                                                                ProposalStatus.PAY_AND_COMPLITED
                                                                        }
                                                                    >
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </FormikAntd.Checkbox>
                                                                </List.Item>
                                                            )}
                                                        />
                                                    </>
                                                )}
                                                <CardRow>
                                                    <CardCell>
                                                        <CardTitle>
                                                            Итого
                                                            предварительная
                                                            стоимость работ:{" "}
                                                        </CardTitle>
                                                    </CardCell>
                                                    <CardCell>
                                                        {recomendedPriceChecker()}{" "}
                                                        руб.
                                                    </CardCell>
                                                </CardRow>
                                                <CardRow>
                                                    <CardCell>
                                                        <CardTitle>
                                                            Итого стоимость
                                                            выполненных работ:{" "}
                                                        </CardTitle>{" "}
                                                    </CardCell>
                                                    <CardCell>
                                                        {completedPriceChecker()}{" "}
                                                        руб.
                                                    </CardCell>
                                                </CardRow>
                                            </>
                                        )}
                                </CardInner>
                                {proposalById?.status !==
                                    ProposalStatus.PAY_AND_COMPLITED && (
                                    <CardSave>
                                        <FormikAntd.SubmitButton
                                            loading={false}
                                        >
                                            Сохранить
                                        </FormikAntd.SubmitButton>
                                    </CardSave>
                                )}
                            </CardWrapper>
                        </FormikAntd.Form>
                    );
                }}
            </Formik>
        </Spin>
    );
});
