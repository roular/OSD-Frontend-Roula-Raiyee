import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { UserState } from './user.state';
import { getUser, setUser } from './userSlice';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action: PayloadAction<{ email: string, password: string }>): Generator<UserState> {
    try {
        // const user: any = yield call(getUserData);
        // console.log(user.data);

        //@ts-ignore
        yield put({ type: setUser.type, payload: user.data });
    } catch (e) {
        //   yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* userFetch() {
    // yield takeLatest(getUser, fetchUser);
}

export default userFetch;