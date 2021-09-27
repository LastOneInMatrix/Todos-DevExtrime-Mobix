import React, {useEffect, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import userStore from "../Store/Users"
import 'devextreme/dist/css/dx.light.css';
import List, {MenuItem} from 'devextreme-react/list';
import notify from 'devextreme/ui/notify';
import {ItemClickEvent} from "devextreme/ui/list";
import {Redirect} from "react-router";
import styles from './users.module.css';
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
    };

    useEffect(() => {
        userStore.getUsers()
            .catch(e => {
                userStore.setStatus(e)
            })
    }, [])
    const userMemo = useMemo(() => {
        return userStore.users.map((u) => {
            return {id: u.id, name: u.name}
        })
    }, [userStore.users])

    if (activeId !== '') {
        return <Redirect to={`/todos/${activeId}`}/>
    }
    if (userStore.userResponseStatus) {
        notify({
            message: userStore.userResponseStatus,
            width: 200,
            height: 50,
            shading: true
        })
    }

    return <div className={styles.main}>
        <h3 className={styles.title}> Выберите юзера </h3>
        <div className={styles.container}>
            <List
                // height={'90vh'}
                dataSource={userMemo}
                itemComponent={ListItem}
                onItemClick={selectItem}
            >
                <MenuItem
                    text="Show Details"
                    action={showItem}
                />
            </List>
        </div>
    </div>
})