import { useMutation } from "@apollo/client";
import { notification } from "antd";
import {
    AddProposal,
    AddProposalVariables,
    ProposalInput,
    UpdateProposal,
    UpdateProposalVariables,
} from "gql/types/operation-result-types";
import { useMutationOptions } from "./../../../../hooks/use-mutation-options";
import ADD_PROPOSAL from "./gql/add-proposal.gql";
import UPDATE_PROPOSAL from "./gql/update-proposal.gql";

export function useEditProposalHelper() {
    const options = useMutationOptions();

    const refetchQueries = ["AllProposals", "ProposalById"];

    const [addProposal, addProposalHelper] = useMutation<
        AddProposal,
        AddProposalVariables
    >(ADD_PROPOSAL, options);

    const [updateProposal, updateProposalHelper] = useMutation<
        UpdateProposal,
        UpdateProposalVariables
    >(UPDATE_PROPOSAL, options);

    const sendAddProposal = (data: ProposalInput) => {
        addProposal({
            variables: {
                data,
            },
            refetchQueries,
        });
    };

    const sendUpdateProposal = (id: string, data: ProposalInput) => {
        updateProposal({
            variables: {
                id,
                data,
            },
            refetchQueries,
        });
    };

    const validateForm = (values: any) => {
        if (!values.clientId) {
            notification.error({
                message: "Ошибка!",
                description: "Выберите клиента",
            });
            return false;
        }
        if (!values.carId) {
            notification.error({
                message: "Ошибка!",
                description: "Выберите автомобиль",
            });
            return false;
        }
        if (!values.userId) {
            notification.error({
                message: "Ошибка!",
                description: "Выберите технического специалиста",
            });
            return false;
        }
        return true;
    };
    return {
        mutationLoading:
            addProposalHelper.loading || updateProposalHelper.loading,
        sendAddProposal,
        sendUpdateProposal,
        validateForm,
    };
}
