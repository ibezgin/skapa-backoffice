import { useMemo, FunctionComponent } from "react";
import { UserOutlined, GiftOutlined } from "@ant-design/icons";
import { AccessEnum } from "../service/enums/access";
// import { GapPage } from "components/gap-page";
import { Users } from "view/backoffice/users";
import { UsersHeader } from "view/backoffice/users/header";
import { PromoCodes } from "view/backoffice/promo-codes";

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
                    icon: UserOutlined,
                    access: AccessEnum.DICTIONARY_USERS,
                    header: UsersHeader,
                },
                {
                    name: "Промо-коды",
                    path: "/promo-codes",
                    component: PromoCodes,
                    exact: true,
                    icon: GiftOutlined,
                    access: AccessEnum.DICTIONARY_USERS,
                    header: UsersHeader,
                },
            ] as IRoute[],
        [],
    );
}
