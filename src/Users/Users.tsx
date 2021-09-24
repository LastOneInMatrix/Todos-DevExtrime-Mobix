import React, {useEffect, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import userStore from "../Store/Users"
import 'devextreme/dist/css/dx.light.css';
import List, {MenuItem} from 'devextreme-react/list';
import notify from 'devextreme/ui/notify';
import {ItemClickEvent} from "devextreme/ui/list";
import {Redirect} from "react-router";

type ListItemPropsType = {
    data: { id: number, name: string }
}
type UsersPropsType = {}

const style = {
    display: 'flex',
    justifyContent: 'space-between',
}
const ListItem = (props: ListItemPropsType) => {

    return (
        <pre style={style}>
                    <b>{props.data.name}</b>
                    <b>Users id: {props.data.id}</b>
            </pre>

    );
};

export const Users: React.FC<UsersPropsType> = observer((props) => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        userStore.getUsers()
    }, [])
    console.log(activeId)
    const userMemo = useMemo(() => {
        return userStore.users.map((u) => {
            return {id: u.id, name: u.name}
        })
    }, [userStore.users])
    const selectItem = ({itemData, ...rest}: ItemClickEvent) => {
        userStore.setActiveUser(itemData)
        setActiveId(itemData.id)
    };
    const showItem = ({itemData}: any) => {
        notify({
            message: `Name: ${itemData.name} ID: ${itemData.id}`,
            width: 250,
            height: 250,
            shading: true
        }, "info", 2000);
    }
    if (activeId !== '') {
       return <Redirect to={`/todos/${activeId}`} />
    }
    console.log(userStore.activeUser)
    return <div>
        <b> Выберите юзера </b>
        <List
            height={'100vh'}
            dataSource={userMemo}
            itemComponent={ListItem}
            onItemClick={selectItem}
        >
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <MenuItem
                text="Show Details"
                action={showItem}
            />

        </List>

        There will be User
    </div>
})