export type Locale = "en_US" | "ru_RU";

export type AppState = Readonly<{
    locale: Locale;
}>;

export interface IAction {
    type: string;
    payload: any;
}
