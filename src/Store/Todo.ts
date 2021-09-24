import {makeAutoObservable} from "mobx";
import {v1} from "uuid";
import userStore from '../Store/Users'

export type TodoType = {
    userId: number | undefined;
    id: number;
    title: string;
    completed: boolean;
}

class Todo {
    todos: TodoType[] = [
        {
            userId: parseInt(v1().split('-').join(''), 16),
            id: 129019203,
            title: 'new',
            completed: false,
        }
    ]
    activeTodoId: number = 0
    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }
    addTodo(title: string) {
        this.todos.push({
            userId: userStore.activeUser?.id,
            id: parseInt(v1().split('-').join(''), 16),
            title: title,
            completed: false
        })
    }
    deleteTodo(id: string | number) {
        this.todos = this.todos.filter(t => t.id !== id)
    }
    completeTodo(id: string | number) {
        this.todos = this.todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)
    }
    changeTodoTitle(title: string, id: string | number) {
        this.todos = this.todos.map(t => t.id === id ? {...t, title} : t)
    }
    getActiveTodoId(id: number) {
        this.activeTodoId = id
    }
    fetchTodo(){
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => {
                this.todos = [...this.todos, ...json]
            })
    }
}

export default new Todo()