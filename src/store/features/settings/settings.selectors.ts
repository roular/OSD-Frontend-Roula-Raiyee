import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

export const selectSettings = (state: RootState) => state.settings;

export const selectThemeMode = createDraftSafeSelector(selectSettings, (state) => state.themeMode);