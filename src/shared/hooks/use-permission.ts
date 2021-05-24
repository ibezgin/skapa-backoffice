import _ from "lodash";
import { AccessEnum } from "../service/enums/access";
import { useUser } from "./use-user";

export function usePermission() {
    const user = useUser();

    const hasPermission = (permission: AccessEnum, isCategory?: boolean) => {
        if (isCategory) {
            const permissions = _.get(user, ["permission"]);
            if (permissions && permissions.length) {
                for (const userPermission of permissions) {
                    if (userPermission.split("_")[0] === permission) {
                        return true;
                    }
                }
            }
        }
        const isAviable =
            _.get(user, ["permission"])?.indexOf(permission) !== -1;

        return !!isAviable;
    };

    return { hasPermission };
}
