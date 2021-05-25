import { ApolloError, useMutation } from "@apollo/client";
import {
    AddUser,
    AddUserVariables,
    DeleteUser,
    DeleteUserVariables,
    UpdateUser,
    UpdateUserVariables,
    UserInput,
} from "gql/types/operation-result-types";
import { Specialization } from "service/enums/specialization";
import { IFormField } from "./../../../components/modal-form";
import { useAccess } from "./../../../hooks/use-access";
import { useMutationOptions } from "./../../../hooks/use-mutation-options";
import { errorHandler } from "./../../../service/utils/error-handler";
import ADD_USER from "./gql/add-user.gql";
import DELETE_USER from "./gql/delete-user.gql";
import UPDATE_USER from "./gql/update-user.gql";

export function useUsersHelper() {
    const access = useAccess();

    const positions = [
        {
            value: Specialization.ADMIN,
            label: "Руководство",
        },
        {
            value: Specialization.MANAGER,
            label: "Менеджер",
        },
        {
            value: Specialization.TECHNICAL,
            label: "Технический специалист",
        },
    ];
    const formFields = [
        {
            title: "Имя",
            name: "firstname",
            type: "textField",
        },
        {
            title: "Фамилия",
            name: "lastname",
            type: "textField",
        },
        {
            title: "Специализация",
            name: "position",
            type: "selectField",
            options: positions,
        },
        {
            title: "Имя пользователя",
            name: "username",
            type: "textField",
        },
        {
            title: "Пароль",
            name: "password",
            type: "passwordField",
        },
        {
            title: "Тест доступы",
            name: "permission",
            type: "treeField",
            treeData: access,
        },
    ] as IFormField[];

    const options = useMutationOptions();

    const refetchQueries = ["AllUsers", "CurrentUser"];

    const [addUser, addUserHelper] = useMutation<AddUser, AddUserVariables>(
        ADD_USER,
        {
            ...options,
            onError: (error: ApolloError) => {
                errorHandler(error);
            },
        },
    );

    const [deleteUser, deleteUserHelper] = useMutation<
        DeleteUser,
        DeleteUserVariables
    >(DELETE_USER, options);

    const [updateUser, updateUserHelper] = useMutation<
        UpdateUser,
        UpdateUserVariables
    >(UPDATE_USER, options);

    const sendAddUser = (data: UserInput) => {
        addUser({
            variables: {
                data,
            },
            refetchQueries,
        });
    };
    const sendDeleteUser = (id: string) => {
        deleteUser({
            variables: {
                id,
            },
            refetchQueries,
        });
    };

    const sendUpdateUser = (id: string, data: UserInput) => {
        updateUser({
            variables: {
                id,
                data,
            },
            refetchQueries,
        });
    };

    return {
        loadingMutation:
            addUserHelper.loading ||
            deleteUserHelper.loading ||
            updateUserHelper.loading,
        formFields,
        positions,
        sendAddUser,
        sendDeleteUser,
        sendUpdateUser,
    };
}
