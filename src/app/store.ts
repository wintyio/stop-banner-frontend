import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/counter/loginSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import reportBannerSlice from '../features/counter/reportBannerSlice';
import feedSlice from '../features/counter/feedSlice';

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  feed: feedSlice,
  reportBanner: reportBannerSlice,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer({
  ...persistConfig,
  blacklist: ["feed", "reportBanner", "reportPost"],
  transforms: [encryptTransform({ secretKey: "winty" })]
}, reducers);

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
