import React, { useMemo } from "react";
import * as FormikAntd from "formik-antd";
import { useQuery } from "@apollo/client";
import ALL_CLIENTS from "../../../view/backoffice/proposal/clients/gql/all-clients.gql";
import { AllClients } from "gql/types/operation-result-types";

export const FilterClientId = React.memo(() => {
    const allClientsQuery = useQuery<AllClients>(ALL_CLIENTS);
    const allClients = useMemo(() => allClientsQuery.data?.clients.allClients, [
        allClientsQuery.data?.clients.allClients,
    ]);
    return (
        <FormikAntd.Select
            name="clientId"
            placeholder="Клиенты"
            allowClear={true}
            dropdownMatchSelectWidth={false}
        >
            {allClients?.map(elem => (
                <FormikAntd.Select.Option key={elem.id} value={elem.id}>
                    {elem.firstName} {elem.lastName}
                </FormikAntd.Select.Option>
            ))}
        </FormikAntd.Select>
    );
});
