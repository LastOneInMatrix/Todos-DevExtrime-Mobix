import { toJS } from 'mobx';
import todoStore from '../Store/Todo';
import {observer} from "mobx-react-lite";
import style from './todos.module.css'
import {useEffect} from "react";

export const Todos = observer(() => {
    useEffect(() => {
        todoStore.fetchTodo()
    }, [])
    console.log(toJS(todoStore.todos))
        return <div>
            {/*<button onClick={() => todoStore.fetchTodo()}>get todos</button>*/}
            {todoStore.todos.map((t) => {
                return <div className={style.todo} key={t.id}>
                    <p>Tittle: {t.title}</p>
                    <input type={'checkbox'} checked={t.completed} onChange={() => todoStore.completeTodo(t.id)}/>
                    <button onClick={() => todoStore.deleteTodo(t.id)}>x</button>
                </div>
            })}
        </div>
    }
)