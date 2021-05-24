/* eslint-disable import/prefer-default-export */
import { createSelector } from "reselect";
import { AppState, Locale } from "./types";

export const appState = (state: { app: AppState }): AppState => state.app;

export const getLocale = createSelector(
    [appState],
    (app): Locale => app.locale,
);
