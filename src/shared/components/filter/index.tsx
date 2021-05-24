import React, { useCallback, useEffect, useMemo, useState } from "react";
import { filterItems } from "./items";
import { DocumentNode } from "graphql";
import { Formik } from "formik";
import * as FormikAntd from "formik-antd";
import { Button, Form } from "antd";
import { useHasWindow } from "../../hooks/use-has-window";
import _ from "lodash";
import {
    OperationVariables,
    QueryFunctionOptions,
    QueryResult,
    useQuery,
} from "@apollo/client";
import { SC } from "./styled";
import { useChangeFormik } from "../../hooks/use-change-formik";
import { TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import { useLocation } from "react-router-dom";

export interface ITypeFilterItems {
    periods?: Array<moment.Moment | string>;
    // userId: string;
    clientId?: string;
    // carId: string;
    // brandId: string;
    // modelId: string;
    assignedToMe?: boolean;
}

interface IQueryComponentOptions<TData, TVariables = OperationVariables>
    extends QueryFunctionOptions<TData, TVariables> {
    children: (
        result: QueryResult<TData, TVariables>,
        optional: {
            pagination?: false | TablePaginationConfig;
            setSorter?: (
                order: string | undefined,
                field: string | undefined,
            ) => void;
        },
    ) => JSX.Element | null;
    query: DocumentNode;
}

interface IProps<P> extends IQueryComponentOptions<P> {
    filterItems: Array<keyof ITypeFilterItems>;
    variables?: {
        [key: string]: any;
    };
    skip?: boolean;
    ssr?: boolean;
    paginationItemRender?: any;
    withoutButton?: boolean;
}
const items = [
    {
        name: "periods",
        component: filterItems.FilterPeriods,
    },
    {
        name: "assignedToMe",
        component: filterItems.FilterAssignedToMe,
    },
    {
        name: "clientId",
        component: filterItems.FilterClientId,
    },
];
function useInitialValues(): ITypeFilterItems {
    const momentTimezoneStartDate = useCallback(
        (
            date?: moment.Moment,
            isTimestamp?: boolean,
        ): moment.Moment | string => {
            if (isTimestamp) {
                return date && moment(date).isValid()
                    ? date.format("X")
                    : moment().startOf("day").format("X");
            } else {
                return date && moment(date).isValid()
                    ? date
                    : moment().startOf("day");
            }
        },
        [],
    );
    const momentTimezoneEndDate = useCallback(
        (
            date?: moment.Moment,
            isTimestamp?: boolean,
        ): moment.Moment | string => {
            if (isTimestamp) {
                return date && moment(date).isValid()
                    ? date.format("X")
                    : moment().endOf("day").format("X");
            } else {
                return date && moment(date).isValid()
                    ? date
                    : moment().endOf("day");
            }
        },
        [],
    );
    return {
        periods: [momentTimezoneStartDate(), momentTimezoneEndDate()],
        assignedToMe: false,
        clientId: undefined,
    };
}

const getInitialValues = (
    currentFilterItems: Array<keyof ITypeFilterItems>,
    initialValues: ITypeFilterItems,
) => {
    const obj: { [key in keyof ITypeFilterItems]: ITypeFilterItems[key] } = {};
    currentFilterItems.forEach(elem => {
        (obj as any)[elem] = initialValues[elem];
    });
    return obj;
};

const pageSize = 30;

export function Filter<T>(props: IProps<T>) {
    const initialValues = useInitialValues();

    const location = useLocation();

    const [skip, setSkip] = useState(
        typeof props.skip === "boolean" ? props.skip : true,
    );
    const currentInitialValues = getInitialValues(
        [...props.filterItems],
        initialValues,
    );
    const [isRefetch, setRefetchState] = useState(false);
    const [variables, setVariables] = useState({
        ...currentInitialValues,
        ...(props.variables || {}),
    });

    // const [sorter, setSorter] = useState<{
    //     order?: string;
    //     field?: string;
    // }>({
    //     order: undefined,
    //     field: undefined,
    // });

    useEffect(() => {
        setVariables({
            ...variables,
            ...props.variables,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.variables]);

    useEffect(() => {
        setSkip(Boolean(props.skip));
    }, [props.skip]);

    useEffect(() => {
        setVariables({
            ...currentInitialValues,
            ...(props.variables || {}),
        });
        if (props.skip) {
            setSkip(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const converDate = useCallback((periods?: Array<moment.Moment | string>):
        | string[]
        | undefined => {
        if (
            typeof periods?.[0] === "string" ||
            typeof periods?.[1] === "string"
        ) {
            return periods as string[];
        }
        if (periods) {
            return [periods[0].format("X"), periods[1].format("X")];
        }
        return undefined;
    }, []);

    const queryVariables = useMemo(
        () => ({
            ...variables,
            periods: variables.periods
                ? converDate(variables.periods)
                : undefined,
        }),
        [converDate, variables],
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const changeForm = useCallback(() => {
        setRefetchState(false);
    }, []);
    const buttonHandler = useCallback(
        (loading: boolean) => () => {
            if (loading) {
                setSkip(true);
            }
        },
        [],
    );

    const hasWindow = useHasWindow();

    const query = useQuery<T>(props.query, {
        skip: props.withoutButton ? false : skip,
        notifyOnNetworkStatusChange: true,
        variables: queryVariables,
        fetchPolicy: props.fetchPolicy,
    });
    const loading = Boolean(
        hasWindow && (query.loading || query.networkStatus === 4),
    );
    return (
        <SC.Wrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    if (isRefetch) {
                        query.refetch();
                    } else {
                        setVariables({
                            ...values,
                        });
                        setRefetchState(true);
                    }
                    setSkip(false);
                }}
            >
                {({ values }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useChangeFormik(values, changeForm);
                    return (
                        <>
                            <FormikAntd.Form layout="inline">
                                {props.filterItems.map(name => {
                                    const found = _.find(items, {
                                        name,
                                    });
                                    return found ? (
                                        <Form.Item>
                                            <found.component />
                                        </Form.Item>
                                    ) : null;
                                })}
                                {!props.withoutButton && (
                                    <Form.Item>
                                        <div onClick={buttonHandler(loading)}>
                                            <Button
                                                htmlType="submit"
                                                type="primary"
                                                loading={loading}
                                            >
                                                {loading && "Отменить"}
                                                {!loading && "Применить"}
                                            </Button>
                                        </div>
                                    </Form.Item>
                                )}
                            </FormikAntd.Form>
                            {props.children(query, {
                                pagination: {
                                    pageSize,
                                    defaultPageSize: pageSize,
                                    position: ["topRight"],
                                    simple: true,
                                    size: "small",
                                    itemRender: props.paginationItemRender,
                                },
                            })}
                        </>
                    );
                }}
            </Formik>
        </SC.Wrapper>
    );
}
