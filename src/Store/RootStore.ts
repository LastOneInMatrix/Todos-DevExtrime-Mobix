import {ITodo, Todo} from "./Todo";
import {IUsers, Users} from "./Users";

export interface RootStoreType {
    userStore: IUsers,
    todoStore: ITodo
}

export class RootStore implements RootStoreType {
    userStore: IUsers;
    todoStore: ITodo;
    constructor() {
        this.userStore = new Users(this);
        this.todoStore = new Todo(this);
    }
}
export const rootStore = new RootStore();
