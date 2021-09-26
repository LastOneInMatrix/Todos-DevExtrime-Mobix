import {makeAutoObservable} from "mobx";
import {v1} from "uuid";
import userStore from '../Store/Users'
import {TodoResponseType, todosAPI} from "../API/appAPI";

export type TodoType = TodoResponseType;
class Todo {
    todos: TodoResponseType[] = [
        {
            userId: parseInt(v1().split('-').join(''), 16),
            id: 129019203,
            title: 'new',
            completed: false,
        }
    ]
    activeTodoId: { id: number, title?: string } = {id: 0, title: ''}
    actionType: string = ''
    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }
    async fetchTodo() {
        try {
            this.todos = await todosAPI.getTodos()
        }
        catch(e: any) {
            throw e.response ?  new Error (`Статус ${e.response.status}`) : new Error ( e.message + ', more details in the console')
        }
        finally {
            console.log('Загрузка окончена')
        }
    }
    async addTodo(title: string) {
        try {
           console.log(userStore.activeUser?.id)
            const newTask = await todosAPI.addTask(userStore.activeUser?.id ?? parseInt(v1().split('-').join(''), 16), title);
            this.todos.unshift({
                ...newTask,
                completed: false
            })
        }
        catch (e: any){
            throw e.response ?  new Error (`Статус ${e.response.status}`) : new Error ( e.message + ', more details in the console')
        }
        finally {

        }
    }
    async deleteTodo(id: string | number) {
        try{
            await todosAPI.deleteTodos(id)
            this.todos = this.todos.filter(t => t.id !== id)
        }
        catch(e: any){
            throw e.response ?  new Error (`Статус ${e.response.status}`) : new Error ( e.message + ', more details in the console')
        }
        finally {

        }
    }
    async completeTodo(id: string | number, completed: boolean) {
        try {
            await todosAPI.updateTodos(id, {
                completed
            })
            this.todos = this.todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)
        }
        catch(e: any) {
            throw e.response ?  new Error (`Статус ${e.response.status}`) : new Error ( e.message + ', more details in the console')
        }
        finally {}
    }
    async changeTitleForTask(title: string)  {
        await todosAPI.updateTodos(this.activeTodoId.id, {title})
        this.todos = this.todos.map(t => t.id === this.activeTodoId.id ? {...t, title} : t)
    }
    setActiveTodoId(id: number, title?: string) {
        this.activeTodoId.id = id
        this.activeTodoId.title = title ?? ''
    }
    setActionType(action: string) {
        this.actionType =action
    }
}

export default new Todo()