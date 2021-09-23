import todoStore from '../Store/Todo';
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {TestListComponent} from "../Test/TestList";

export const Todos = observer(() => {
    useEffect(() => {
        todoStore.fetchTodo()
    }, [])

        return <>
            <TestListComponent todos={todoStore.todos}/>
        </>
    }
)