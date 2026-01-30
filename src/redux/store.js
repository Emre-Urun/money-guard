import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Slice Importları (Takımın yazdığı tüm parçalar)
import { authReducer } from "./auth/authSlice";
import { globalReducer } from "./global/globalSlice";
import { currencyReducer } from "./currency/currencySlice";
import { financeReducer } from "./finance/financeSlice"; // Main'den gelen yeni parça

// Auth için Persist Ayarı (Token'ı hafızada tutmak için)
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    global: globalReducer,
    currency: currencyReducer,
    finance: financeReducer, // Finance (Transactions) buraya eklendi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
