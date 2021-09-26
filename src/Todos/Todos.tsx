import todoStore from '../Store/Todo';
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {TestListComponent} from "../Test/TestList";
import {useParams} from "react-router";

export const Todos = observer(() => {
        const params = useParams<{ userId: string }>()
        useEffect(() => {
            todoStore.fetchTodo().catch(e => console.log(e))
        }, [])

    const userTodos = todoStore.todos.filter((t) => t.userId === +params.userId)
    console.log(userTodos)
        // console.log((userTodos1.map(t => toJS(t)))) //TODO не могу понять, как это влияет
        return <>
                <TestListComponent todos={userTodos}/>
            </>
    }
)