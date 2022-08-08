import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import settingsReducer from './features/settings/settingsSlice';
import userReducer from './features/user/userSlice';
import cardsReducer from './features/cards/cardsSlice';

import userFetch from './features/user/user.effects';

// ==============================|| REDUX - MAIN STORE ||============================== //



// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// eslint-disable-next-line no-underscore-dangle
const store = configureStore({
    reducer: {
        settings: settingsReducer,
        user: userReducer,
        cards: cardsReducer,
    },
    middleware: [sagaMiddleware]
},
);
sagaMiddleware.run(userFetch)

export { store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch