import { useMemo, FunctionComponent } from "react";
import { FileOutlined } from "@ant-design/icons";
import { AccessEnum } from "../service/enums/access";
// import { GapPage } from "components/gap-page";
import { Users } from "view/backoffice/users";
import { UsersHeader } from "view/backoffice/users/header";

export interface IRoute {
    name: string;
    path: string;
    component: FunctionComponent;
    exact?: boolean;
    icon: FunctionComponent;
    header?: FunctionComponent;
    access: AccessEnum;
}

export function useRoutes() {
    return useMemo(
        () =>
            [
                {
                    name: "Пользователи",
                    path: "/users",
                    component: Users,
                    exact: true,
                    icon: FileOutlined,
                    access: AccessEnum.DICTIONARY_USERS,
                    header: UsersHeader,
                },
            ] as IRoute[],
        [],
    );
}
