import {makeAutoObservable} from "mobx";


export type TodoType = {
    id: number | string;
    title: string;
    completed: boolean;
}

class Todo {
    todos: TodoType[] = [
        {
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
            // id:  v1(),
            id: Date.now(),
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
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                this.todos = [...this.todos, ...json]
            })
    }
}

export default new Todo()