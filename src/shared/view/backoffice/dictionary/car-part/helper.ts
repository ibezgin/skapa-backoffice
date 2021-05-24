import { useMutation } from "@apollo/client";
import {
    AddCarPart,
    AddCarPartVariables,
    DeleteCarPart,
    DeleteCarPartVariables,
    UpdateCarPart,
    UpdateCarPartVariables,
} from "gql/types/operation-result-types";
import { useMutationOptions } from "../../../../hooks/use-mutation-options";

import ADD_CAR_PART from "./gql/add-car-part.gql";
import DELETE_CAR_PART from "./gql/delete-car-part.gql";
import UPDATE_CAR_PART from "./gql/update-car-part.gql";

export function useCarPartHelper() {
    const options = useMutationOptions();

    const refetchQueries = ["AllCarParts"];

    const [addCarPart, addCarPartHelper] = useMutation<
        AddCarPart,
        AddCarPartVariables
    >(ADD_CAR_PART, options);

    const [updateCarPart, updateCarPartHelper] = useMutation<
        UpdateCarPart,
        UpdateCarPartVariables
    >(UPDATE_CAR_PART, options);

    const [deleteCarPart, deleteCarPartHelper] = useMutation<
        DeleteCarPart,
        DeleteCarPartVariables
    >(DELETE_CAR_PART, options);

    const sendAddCarPart = (title: string, price: number) => {
        addCarPart({
            variables: {
                title,
                price,
            },
            refetchQueries,
        });
    };

    const sendUpdateCarPart = (id: string, title: string, price: number) => {
        updateCarPart({
            variables: {
                id,
                title,
                price,
            },
            refetchQueries,
        });
    };
    const sendDeleteCarPart = (id: string) => {
        deleteCarPart({
            variables: {
                id,
            },
            refetchQueries,
        });
    };

    return {
        mutationLoading:
            addCarPartHelper.loading ||
            updateCarPartHelper.loading ||
            deleteCarPartHelper.loading,
        sendUpdateCarPart,
        sendAddCarPart,
        sendDeleteCarPart,
    };
}
