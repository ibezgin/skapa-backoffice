import { useMutation } from "@apollo/client";
import { notification } from "antd";
import {
    AddService,
    AddServiceVariables,
    DeleteService,
    DeleteServiceVariables,
    UpdateService,
    UpdateServiceVariables,
} from "gql/types/operation-result-types";
import ADD_SERVICE from "./gql/add-service.gql";
import DELETE_SERVICE from "./gql/delete-service.gql";
import UPDATE_SERVICE from "./gql/update-service.gql";

export function useServiceHelper() {
    const options = {
        onCompleted: () => {
            notification.success({ message: "Успех" });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    };

    const refetchQueries = ["AllServices"];

    const [addService, addServiceHelper] = useMutation<
        AddService,
        AddServiceVariables
    >(ADD_SERVICE, options);

    const [deleteService, deleteServiceHelper] = useMutation<
        DeleteService,
        DeleteServiceVariables
    >(DELETE_SERVICE, options);

    const [updateService, updateServiceHelper] = useMutation<
        UpdateService,
        UpdateServiceVariables
    >(UPDATE_SERVICE, options);

    const sendAddService = (title: string, price: number) => {
        addService({
            variables: {
                title,
                price,
            },
            refetchQueries,
        });
    };
    const sendDeleteService = (id: string) => {
        deleteService({
            variables: {
                id,
            },
            refetchQueries,
        });
    };

    const sendUpdateService = (id: string, title: string, price: number) => {
        updateService({
            variables: {
                id,
                title,
                price,
            },
            refetchQueries,
        });
    };

    return {
        loadingMutation:
            addServiceHelper.loading ||
            deleteServiceHelper.loading ||
            updateServiceHelper.loading,
        sendAddService,
        sendDeleteService,
        sendUpdateService,
    };
}
