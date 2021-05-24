import { AccessEnum } from "../service/enums/access";

export function useAccess() {
    return [
        {
            title: "Справочники",
            key: AccessEnum.DICTIONARY,
            children: [
                {
                    title: "Пользователи",
                    key: AccessEnum.DICTIONARY_USERS,
                },
                {
                    title: "Марки автомобилей",
                    key: AccessEnum.DICTIONARY_BRAND,
                },
                {
                    title: "Модели автомобилей",
                    key: AccessEnum.DICTIONARY_MODELS,
                },
                {
                    title: "Услуги",
                    key: AccessEnum.DICTIONARY_SERVICE,
                },
            ],
        },
        {
            title: "Заявки",
            key: AccessEnum.PROPOSAL,
            children: [
                {
                    title: "Все заявки",
                    key: AccessEnum.PROPOSAL_ALL,
                },
                {
                    title: "Все заявки",
                    key: AccessEnum.PROPOSAL_ADD,
                },
                {
                    title: "Клиенты",
                    key: AccessEnum.PROPOSAL_CLIENTS,
                },
                {
                    title: "Обслуживаемые автомобили",
                    key: AccessEnum.PROPOSAL_CARS,
                },
            ],
        },
        {
            title: "Отчеты",
            key: AccessEnum.REPORT,
            children: [
                {
                    title: "Отчет о постипивших заявках по дням",
                    key: AccessEnum.REPORT_EVERYDAY,
                },
                {
                    title: "Обороты",
                    key: AccessEnum.REPORT_TURNOVER,
                },
            ],
        },
    ];
}
