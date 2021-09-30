import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {TestListComponent} from "../TestList/TestList";
import {useParams} from "react-router";
import {useStores} from "../Context/StoreContext";
import {toJS} from "mobx";

export const Todos = observer(() => {
        const params = useParams<{ userId: string }>();
        const {todoStore, userStore} = useStores();
        useEffect(() => {
            todoStore.fetchTodo().catch(e => console.log(e))
        }, []);

        console.log(todoStore.activeUserTodo.map(t => toJS(t)))
        return <>
                <TestListComponent todos={todoStore.activeUserTodo} users={userStore.users}/>
            </>
    }
)