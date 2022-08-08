import { Satellite } from '@mui/icons-material'
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { CardResponseItem, CardResponseModel, CardState, ItemType, LISTTYPE } from './card.state'

const Response2CardStateMap: {[key in keyof CardResponseItem]?: keyof ItemType} = {
  cardID: 'id',
  cardCategory : 'category',
  cardDuedate : 'dueDate',
  cardEstimate : 'estimate',
  cardImportance : 'importance',
  cardTitle : 'description'
}

export const userSlice = createSlice<CardState, SliceCaseReducers<CardState>>({
  name: 'cards',
  initialState: {
    ToDo: {
      id: '1',
      name: 'To Do',
      items: [],
    },
    Doing: {
      id: '2',
      name: 'Doing',
      items: [],
    },
    Done: {
      id: '3',
      name: 'Done',
      items: [],
    }

  },
  reducers: {
    setCards: (state, action: PayloadAction<CardResponseModel>) => {
      let cards: Record<LISTTYPE, ItemType[] > = {
        ToDo: [],
        Doing: [],
        Done: [],
      }
      for (const card of action.payload) {
        cards[card.cardType].push(Object.fromEntries(Object.entries(card).map(([key, value]) => ([Response2CardStateMap[key as keyof CardResponseItem], value]))))
      }
      const newState: CardState = {
        ToDo: {
          ...state.ToDo, 
          items: cards.ToDo
        },
        Doing: {
          ...state.Doing,
          items : cards.Doing
        },
        Done: {
          ...state.Done,
          items : cards.Done
        }
      }
      return newState
    }
  }
})

export const { setCards } = userSlice.actions

export default userSlice.reducer