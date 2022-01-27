import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthReducer from './AuthReducer/AuthReducer'

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  auth: AuthReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

const PersistStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export { store, PersistStore };
