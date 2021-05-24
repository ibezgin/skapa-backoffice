import { useMemo, FunctionComponent } from "react";
import { FileOutlined } from "@ant-design/icons";
import { AccessEnum } from "../service/enums/access";
// import { GapPage } from "components/gap-page";
import { ProposalForm } from "view/backoffice/proposal/all/form";
import { DictionaryUsers } from "view/backoffice/dictionary/users";
import { DictionaryUsersHeader } from "view/backoffice/dictionary/users/header";
import { DictionaryBrand } from "view/backoffice/dictionary/brand";
import { DictionaryBrandHeader } from "view/backoffice/dictionary/brand/header";
import { DictionaryCarPart } from "view/backoffice/dictionary/car-part";
import { DictionaryCarPartHeader } from "view/backoffice/dictionary/car-part/header";
import { DictionaryModels } from "view/backoffice/dictionary/models";
import { DictionaryModelsHeader } from "view/backoffice/dictionary/models/header";
import { DictionaryService } from "view/backoffice/dictionary/service";
import { DictionaryServiceHeader } from "view/backoffice/dictionary/service/header";
import { ProposalAll } from "view/backoffice/proposal/all";
import { ProposalCars } from "view/backoffice/proposal/cars";
import { ProposalCarsHeader } from "view/backoffice/proposal/cars/header";
import { ProposalClients } from "view/backoffice/proposal/clients";
import { ProposalClientsHeader } from "view/backoffice/proposal/clients/header";
import { ReportEveryDayComponent } from "view/backoffice/report/every-day";
import { ReportTurnoverComponent } from "view/backoffice/report/turnover";

export interface IRoute {
    name: string;
    path: string;
    component: FunctionComponent;
    exact?: boolean;
    icon: FunctionComponent;
    header?: FunctionComponent;
    access: AccessEnum;
}

interface ICategory {
    name: string;
    path: string;
    exact?: boolean;
    icon: FunctionComponent;
    access: AccessEnum;
    children: IRoute[];
}

export function useRoutes() {
    return useMemo(
        () =>
            [
                {
                    name: "Справочники",
                    path: "/dictionary/:path?",
                    exact: true,
                    icon: FileOutlined,
                    access: AccessEnum.DICTIONARY,
                    children: [
                        {
                            name: "Пользователи",
                            path: "/dictionary/users",
                            component: DictionaryUsers,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_USERS,
                            header: DictionaryUsersHeader,
                        },
                        {
                            name: "Услуги",
                            path: "/dictionary/service",
                            component: DictionaryService,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_SERVICE,
                            header: DictionaryServiceHeader,
                        },
                        {
                            name: "Автозапчасти/расходники",
                            path: "/dictionary/car-part",
                            component: DictionaryCarPart,
                            exact: true,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_CARPART,
                            header: DictionaryCarPartHeader,
                        },
                        {
                            name: "Марки автомобилей",
                            path: "/dictionary/brands",
                            component: DictionaryBrand,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_BRAND,
                            header: DictionaryBrandHeader,
                        },
                        {
                            name: "Модели автомобилей",
                            path: "/dictionary/models",
                            component: DictionaryModels,
                            icon: FileOutlined,
                            access: AccessEnum.DICTIONARY_MODELS,
                            header: DictionaryModelsHeader,
                        },
                    ],
                },
                {
                    name: "Заявки",
                    path: "/proposal/:path?",
                    icon: FileOutlined,
                    access: AccessEnum.PROPOSAL,
                    exact: true,
                    children: [
                        {
                            name: "Все заявки",
                            path: "/proposal",
                            component: ProposalAll,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_ALL,
                            exact: true,
                        },
                        {
                            name: "Добавить заявку",
                            path: "/proposal/form",
                            component: ProposalForm,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_ADD,
                        },
                        {
                            name: "Клиенты",
                            path: "/proposal/clients",
                            component: ProposalClients,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_CLIENTS,
                            header: ProposalClientsHeader,
                        },
                        {
                            name: "Обслуживаемые автомобили",
                            path: "/proposal/cars",
                            component: ProposalCars,
                            icon: FileOutlined,
                            access: AccessEnum.PROPOSAL_CARS,
                            header: ProposalCarsHeader,
                        },
                    ],
                },
                {
                    name: "Отчеты",
                    path: "/report/:path?",
                    icon: FileOutlined,
                    access: AccessEnum.REPORT,
                    exact: true,
                    children: [
                        {
                            name: "Отчет о постипивших заявках по дням",
                            path: "/report/every-day-proposal",
                            component: ReportEveryDayComponent,
                            icon: FileOutlined,
                            access: AccessEnum.REPORT_EVERYDAY,
                            exact: true,
                        },
                        {
                            name: "Отчет по оборотам",
                            path: "/report/turnover",
                            component: ReportTurnoverComponent,
                            icon: FileOutlined,
                            access: AccessEnum.REPORT_TURNOVER,
                        },
                    ],
                },
            ] as ICategory[],
        [],
    );
}
