import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

export const selectUser = (state: RootState) => state.user;

export const selectUserId = createDraftSafeSelector(selectUser, (state) => state.id);
export const selectUserEmail = createDraftSafeSelector(selectUser, (state) => state.email);