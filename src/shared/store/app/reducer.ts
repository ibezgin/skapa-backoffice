import { produce } from "immer";
import { ActionTypes } from "./actions";
import { IAction, AppState } from "./types";

export const initialState = Object.freeze<AppState>({
    locale: "ru_RU",
});

// eslint-disable-next-line import/no-default-export
export default (state: AppState = initialState, action: IAction): AppState =>
    produce(state, draft => {
        switch (action.type) {
            case ActionTypes.SETLOCALE: {
                draft.locale = action.payload;
                return;
            }
        }
    });
