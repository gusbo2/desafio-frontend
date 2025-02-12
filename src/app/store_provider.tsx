"use client"

import { AppStore, store } from "@/database/store"
import { useRef } from "react"
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const storeRef = useRef<AppStore>(store());

  if (!storeRef.current) {
    storeRef.current = store();
  }

  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default StoreProvider;