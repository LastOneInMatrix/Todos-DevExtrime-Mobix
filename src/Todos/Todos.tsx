import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {TestListComponent} from "../TestList/TestList";
import {useParams} from "react-router";
import {useStores} from "../Context/StoreContext";
import {toJS} from "mobx";

export const Todos = observer(() => {
        const params = useParams<{ userId: string }>();
        const {rootStore} = useStores();
        useEffect(() => {
            rootStore.todoStore.fetchTodo().catch((e: any) => console.log(e))
        }, []);

        console.log(rootStore.todoStore.activeUserTodo.map((t: any) => toJS(t)))
        return <>
                <TestListComponent todos={rootStore.todoStore.activeUserTodo} users={rootStore.userStore.users}/>
            </>
    }
)