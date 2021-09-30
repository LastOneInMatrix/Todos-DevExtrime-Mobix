import {makeAutoObservable} from "mobx";
import {UserResponseType, usersAPI} from "../API/appAPI";

export interface IUsers {
    users: UserResponseType[];
    userResponseStatus: string;
    activeUser: UserResponseType | null;
    setActiveUser: (activeUser: UserResponseType) => void;
    getUsers: () => Promise<any>;
    setStatus: (err: string) => void;
}

class Users implements IUsers {
    users: UserResponseType[] = [];
    userResponseStatus: string = '';
    activeUser: UserResponseType | null = null
    constructor(){
        makeAutoObservable(this)
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
export default new Users()