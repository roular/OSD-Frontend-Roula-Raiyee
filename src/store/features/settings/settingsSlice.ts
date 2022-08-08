import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { UserSettingsState } from './settings.state'

export const settingsSlice = createSlice<UserSettingsState, SliceCaseReducers<UserSettingsState>>({
  name: 'settings',
  initialState: {
    themeMode: 'dark',
  },
  reducers: {
    toggleTheme: (state) => { 
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark'
    },
  }
})

export const { toggleTheme } = settingsSlice.actions

export default settingsSlice.reducer