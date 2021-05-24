import { useQuery } from "@apollo/client";
import { CurrentUser } from "gql/types/operation-result-types";
import CURRENT_USER from "../gql/authentication/current-user.gql";

export function useUser() {
    const currentUserQuery = useQuery<CurrentUser>(CURRENT_USER);

    const currentUser = currentUserQuery.data?.authentication.currentUser;

    // currentUserQuery.networkStatus NetworkStatus.ready;

    return {
        ...currentUser,
        networkStatus: currentUserQuery.networkStatus,
        loading: currentUserQuery.loading,
    };
}
