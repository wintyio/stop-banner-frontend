import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/counter/loginSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import reportBannerSlice from '../features/counter/reportBannerSlice';

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  reportBanner: reportBannerSlice
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer({ ...persistConfig, blacklist: ["reportBanner"] }, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
