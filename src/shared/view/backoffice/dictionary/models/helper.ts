import { useMutation, useQuery } from "@apollo/client";
import { notification } from "antd";
import ADD_MODEL from "./gql/add-model.gql";
import DELETE_MODEL from "./gql/delete-model.gql";
import UPDATE_MODEL from "./gql/update-model.gql";
import All_BRAND from "../brand/gql/all-brands.gql";
import { useMemo } from "react";
import { IFormField } from "../../../../components/modal-form";
import {
    AddModel,
    AddModelVariables,
    AllBrand,
    DeleteModel,
    DeleteModelVariables,
    UpdateModel,
    UpdateModelVariables,
} from "gql/types/operation-result-types";

export function useModelsHelper() {
    const options = {
        onCompleted: () => {
            notification.success({ message: "Успех" });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    };

    const allBrandsQuery = useQuery<AllBrand>(All_BRAND);

    const allBrand = useMemo(() => allBrandsQuery.data?.brand.allBrands, [
        allBrandsQuery.data?.brand.allBrands,
    ]);

    const refetchQueries = ["AllModels"];

    const [addModel, addModelHelper] = useMutation<AddModel, AddModelVariables>(
        ADD_MODEL,
        options,
    );

    const [deletesModel, deleteModelHelper] = useMutation<
        DeleteModel,
        DeleteModelVariables
    >(DELETE_MODEL, options);

    const [updateModel, updateModelHelper] = useMutation<
        UpdateModel,
        UpdateModelVariables
    >(UPDATE_MODEL, options);

    const sendAddModel = (title: string, brandId: string) => {
        addModel({
            variables: {
                title,
                brandId,
            },
            refetchQueries,
        });
    };

    const sendDeleteModel = (id: string) => {
        deletesModel({
            variables: {
                id,
            },
            refetchQueries,
        });
    };

    const sendUpdateModel = (variables: {
        id: string;
        title: string;
        brandId: string;
    }) => {
        updateModel({
            variables,
            refetchQueries,
        });
    };

    const validateForm = (values: any) => {
        if (!values.brandId) {
            notification.error({
                message: "Ошибка",
                description: "Выберите марку автомобиля",
            });
            return;
        }
        return true;
    };

    const formFields: IFormField[] = useMemo(
        () => [
            {
                title: "Модель",
                name: "title",
                type: "textField",
            },
            {
                title: "Марка",
                name: "brandId",
                type: "selectField",
                options: allBrand?.map(elem => ({
                    value: elem.id,
                    label: elem.title,
                })),
            },
        ],
        [allBrand],
    );

    return {
        helperLoading:
            addModelHelper.loading ||
            deleteModelHelper.loading ||
            updateModelHelper.loading ||
            allBrandsQuery.loading,
        formFields,
        allBrand,
        sendAddModel,
        sendDeleteModel,
        sendUpdateModel,
        validateForm,
    };
}
