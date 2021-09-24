import {makeAutoObservable} from "mobx";

type UserType = {
    id: number;
    name: string;
}

class User {
    users: UserType[] = [];
    activeUser: UserType  | null = null
    constructor(){
        makeAutoObservable(this)
    }
    setActiveUser(activeUser: UserType) {
        this.activeUser = activeUser
    }
    getUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => this.users = json)
    }
}
export default new User()