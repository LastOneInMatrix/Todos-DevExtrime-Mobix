import {makeAutoObservable} from "mobx";
import {UserResponseType, usersAPI} from "../API/appAPI";
import {RootStore} from "./RootStore";

export interface IUsers {
    users: UserResponseType[];
    userResponseStatus: string;
    activeUser: UserResponseType | null;
    setActiveUser: (activeUser: UserResponseType) => void;
    getUsers: () => Promise<any>;
    setStatus: (err: string) => void;
}

export class Users implements IUsers {
    root: RootStore;
    users: UserResponseType[] = [];
    userResponseStatus: string = '';
    activeUser: UserResponseType | null = null
    constructor(root: RootStore){
        makeAutoObservable(this);
        this.root = root;
    }
    setActiveUser(activeUser: UserResponseType) {
        this.activeUser = activeUser
    }
    async getUsers() {
        try {
            this.setStatus('Загрузка...')
            this.users = await usersAPI.getUsers()
        }
        catch(e: any) {
            throw e.response ?  new Error (`Статус ${e.response.status}`) : new Error ( e.message + ', more details in the console')
        }
        finally {
            this.setStatus('')
        }
    }
    setStatus(err: string) {
        this.userResponseStatus = err
    }
}
