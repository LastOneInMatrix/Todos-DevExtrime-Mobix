import todoStore from '../Store/Todo';
import {observer} from "mobx-react-lite";
import {useEffect, useMemo} from "react";
import {TestListComponent} from "../Test/TestList";
import {useParams} from "react-router";

export const Todos = observer(() => {
        const params = useParams<{ userId: string }>()

        useEffect(() => {
            todoStore.fetchTodo()
        }, [])

        const userTodos = useMemo(() => {
            return todoStore.todos.filter((t) => t.userId === +params.userId)
        }, [todoStore.todos])

        return <>
            <TestListComponent todos={userTodos}/>
        </>
    }
)