import { useMutation, useQuery } from "@apollo/client";
import {
    AddCar,
    AddCarVariables,
    AllBrand,
    AllClients,
    AllModels,
    CarInput,
    DeleteCar,
    DeleteCarVariables,
    UpdateCar,
    UpdateCarVariables,
} from "gql/types/operation-result-types";
import { useMemo, useState } from "react";
import { IFormField } from "../../../../components/modal-form";
import { useMutationOptions } from "../../../../hooks/use-mutation-options";
import All_BRAND from "../../dictionary/brand/gql/all-brands.gql";
import ALL_MODELS from "../../dictionary/models/gql/all-models.gql";
import ALL_CLIENTS from "../clients/gql/all-clients.gql";
import ADD_CAR from "./gql/add-car.gql";
import DELETE_CAR from "./gql/delete-car.gql";
import UPDATE_CAR from "./gql/update-car.gql";

const refetchQueries = ["AllCars"];

export function useCarsHelper() {
    const options = useMutationOptions();

    const [brandState, setBrandState] = useState();

    const allClientsQuery = useQuery<AllClients>(ALL_CLIENTS);

    const allBrandQuery = useQuery<AllBrand>(All_BRAND);

    const allModelsQuery = useQuery<AllModels>(ALL_MODELS);

    const allClients = useMemo(
        () => allClientsQuery.data?.clients.allClients || [],
        [allClientsQuery.data?.clients.allClients],
    );

    const allBrand = useMemo(() => allBrandQuery.data?.brand.allBrands || [], [
        allBrandQuery.data?.brand.allBrands,
    ]);

    const allModels = useMemo(
        () => allModelsQuery.data?.models.allModels || [],
        [allModelsQuery.data?.models.allModels],
    );

    const formFields = [
        {
            title: "Клиент",
            name: "clientId",
            type: "selectField",
            options: allClients.map(elem => ({
                label: `${elem.firstName}  ${elem.lastName}`,
                value: elem.id,
            })),
        },
        {
            title: "Марка авто",
            name: "brandId",
            type: "selectField",
            options: allBrand.map(elem => ({
                label: elem.title,
                value: elem.id,
            })),
        },
        {
            title: "Модель авто",
            name: "modelId",
            type: "selectField",
            options: allModels
                .filter(elem => elem.brandId === brandState)
                .map(elem => ({
                    label: elem.title,
                    value: elem.id,
                })),
        },
        {
            title: "Гос номер авто",
            name: "gosNumber",
            type: "gosNumberField",
        },
        {
            title: "Цвет",
            name: "color",
            type: "textField",
        },
    ] as IFormField[];

    const [addCar, addCarHelper] = useMutation<AddCar, AddCarVariables>(
        ADD_CAR,
        options,
    );

    const [deleteCar, deleteCarHelper] = useMutation<
        DeleteCar,
        DeleteCarVariables
    >(DELETE_CAR, options);

    const [updateCar, updateCarHelper] = useMutation<
        UpdateCar,
        UpdateCarVariables
    >(UPDATE_CAR, options);

    const sendAddCar = (data: CarInput) => {
        addCar({
            variables: {
                data,
            },
            refetchQueries,
        });
    };
    const sendDeleteCar = (id: string) => {
        deleteCar({
            variables: {
                id,
            },
            refetchQueries,
        });
    };
    const sendUpdateCar = (id: string, data: CarInput) => {
        updateCar({
            variables: {
                id,
                data,
            },
            refetchQueries,
        });
    };

    return {
        mutationLoading:
            addCarHelper.loading ||
            deleteCarHelper.loading ||
            updateCarHelper.loading,
        formFields,
        sendAddCar,
        sendDeleteCar,
        sendUpdateCar,
        setBrandState,
    };
}
