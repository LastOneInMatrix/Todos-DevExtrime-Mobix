import React from 'react';
import {rootStore, RootStoreType} from "../Store/RootStore";

export const StoreContext = React.createContext<{rootStore: RootStoreType}>({rootStore});

export const useStores = () => React.useContext(StoreContext);


