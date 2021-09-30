import React from 'react';
import userStore, {IUsers} from "../Store/Users";
import todoStore, {ITodo} from '../Store/Todo';
export const StoreContext = React.createContext<{userStore: IUsers, todoStore: ITodo}>({
    userStore,
    todoStore
});

export const useStores = () => React.useContext(StoreContext);
