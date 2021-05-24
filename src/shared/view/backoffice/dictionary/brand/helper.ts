import { useMutation } from "@apollo/client";
import { notification } from "antd";
import {
    AddBrand,
    AddBrandVariables,
    DeleteBrand,
    DeleteBrandVariables,
    UpdateBrand,
    UpdateBrandVariables,
} from "gql/types/operation-result-types";

import ADD_BRAND from "./gql/add-brand.gql";
import DELETE_BRAND from "./gql/delete-brand.gql";
import UPDATE_BRAND from "./gql/update-brand.gql";
import { useTranslation } from "react-i18next";

export function useDictionaryBrandHelper() {
    const { t } = useTranslation();
    const options = {
        onCompleted: () => {
            notification.success({ message: t("Успех") });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    };
    const [addBrand, addBrandProps] = useMutation<AddBrand, AddBrandVariables>(
        ADD_BRAND,
        options,
    );

    const [deleteBrand, deleteBrandProps] = useMutation<
        DeleteBrand,
        DeleteBrandVariables
    >(DELETE_BRAND, options);
    const [updateBrand, updateBrandProps] = useMutation<
        UpdateBrand,
        UpdateBrandVariables
    >(UPDATE_BRAND, options);

    const sendAddBrand = (
        title: string,
        setVisible: (value: boolean) => void,
    ) => {
        addBrand({
            variables: {
                title,
            },
            refetchQueries: ["AllBrand"],
        }).then(() => {
            setVisible(false);
        });
    };

    const sendDeleteBrand = (id: string) => {
        deleteBrand({
            variables: {
                id,
            },
            refetchQueries: ["AllBrand"],
        });
    };
    const sendUpdateBrand = (
        id: string,
        title: string,
        setVisible: (value: boolean) => void,
    ) => {
        updateBrand({
            variables: {
                id,
                title,
            },
            refetchQueries: ["AllBrand"],
        }).then(() => {
            setVisible(false);
        });
    };
    return {
        sendAddBrand,
        sendDeleteBrand,
        sendUpdateBrand,
        loadingMutation:
            addBrandProps.loading ||
            deleteBrandProps.loading ||
            updateBrandProps.loading,
    };
}
