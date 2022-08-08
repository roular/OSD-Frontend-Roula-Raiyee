import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { UserState } from './user.state'

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: 'user',
  initialState: {
    id: null,
    email: null
  },
  reducers: {
    getUser: (state) => state,
    setUser: (state, action: PayloadAction<UserState>) => { 
      return action.payload
    },
    resetUser: (state, action: PayloadAction<UserState>) => { 
      return {id: null, email: null}
    },
  }
})

export const { getUser, setUser, resetUser } = userSlice.actions

export default userSlice.reducer