import React, {useEffect, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import 'devextreme/dist/css/dx.light.css';
import List, {MenuItem} from 'devextreme-react/list';
import notify from 'devextreme/ui/notify';
import {ItemClickEvent} from "devextreme/ui/list";
import {Redirect} from "react-router";
import styles from './users.module.css';
import {useStores} from "../Context/StoreContext";


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
    const {rootStore} = useStores();
    console.log(rootStore)
    const [activeId, setActiveId] = useState<string>('');
    const selectItem = ({itemData, ...rest}: ItemClickEvent) => {
        rootStore.userStore.setActiveUser(itemData)
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
        rootStore.userStore.getUsers()
            .catch((e: any) => {
                rootStore.userStore.setStatus(e)
            })
    }, [])
    const userMemo = useMemo(() => {
        return rootStore.userStore.users.map((u: any) => {
            return {id: u.id, name: u.name}
        })
    }, [rootStore.userStore.users])

    if (activeId !== '') {
        return <Redirect to={`/todos/${activeId}`}/>
    }
    if (rootStore.userStore.userResponseStatus) {
        notify({
            message: rootStore.userStore.userResponseStatus,
            width: 200,
            height: 50,
            shading: true
        })
    }

    return <div className={styles.main}>
        <h3 className={styles.title}> Выберите юзера </h3>
        <div className={styles.container}>
            <List
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