import axios from 'axios';

export type UserResponseType = {
    name: string,
    id: number
};
export type TaskResponseType = {
    id: number,
    title: string,
    body: '',
    userId: number
};

export type TodoResponseType = { userId: number | undefined, id: number, title: string, completed: boolean};

type ErrorType = {}; // в данном REST API - не приходит респонс при ошибках

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true
});

export const usersAPI = {
    getUsers() {
        return instance.get<UserResponseType[]>('users').then(res => res.data)
    }
}

export const todosAPI = {
    getTodos() {
        return instance.get<TodoResponseType[] & ErrorType>('todos').then(res => res.data)
    },
    updateTodos(id: string | number, payload: {[key: string]: string | boolean}) {
        return  instance.patch<TodoResponseType[] & ErrorType>(`/todos/${id}`, payload).then(res => {
            return res.data;
        })
    },
    deleteTodos(id: number | string) {
        return instance.delete<{}>(`/todos/${id}`).then(res => res.data)
    },
    addTask(id: number, title: string) {
        return instance.post<TaskResponseType>(`/todos/`, {title: title, userId: id}).then(res => res.data)
    }
}