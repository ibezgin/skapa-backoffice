import { useMemo, FunctionComponent } from "react";
import { FileOutlined } from "@ant-design/icons";
import { AccessEnum } from "../service/enums/access";
// import { GapPage } from "components/gap-page";
import { DictionaryUsers } from "view/backoffice/dictionary/users";
import { DictionaryUsersHeader } from "view/backoffice/dictionary/users/header";

export interface IRoute {
    name: string;
    path: string;
    component: FunctionComponent;
    exact?: boolean;
    icon: FunctionComponent;
    header?: FunctionComponent;
    access: AccessEnum;
}

// interface ICategory {
//     name: string;
//     path: string;
//     exact?: boolean;
//     icon: FunctionComponent;
//     access: AccessEnum;
//     children: IRoute[];
// }

export function useRoutes() {
    return useMemo(
        () =>
            [
                {
                    name: "Пользователи",
                    path: "/users",
                    component: DictionaryUsers,
                    exact: true,
                    icon: FileOutlined,
                    access: AccessEnum.DICTIONARY_USERS,
                    header: DictionaryUsersHeader,
                },
            ] as IRoute[],
        [],
    );
}
