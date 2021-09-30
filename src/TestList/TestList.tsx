import Button from 'devextreme-react/button';
import React, {useState} from 'react';
import List, {ItemDragging} from 'devextreme-react/list';
import {toJS} from 'mobx';
import {TodoType} from "../Store/Todo";
import {CheckBox} from 'devextreme-react/check-box';
import {PopupForChanging} from "../Popup/Popup";
import Toolbar, {Item} from 'devextreme-react/toolbar';
import notify from "devextreme/ui/notify";
import {useHistory} from "react-router";
import {observer} from "mobx-react-lite";
import {TodoResponseType, UserResponseType} from "../API/appAPI";
import styles from './testList.module.css';
import {useStores} from "../Context/StoreContext";
import {rootStore} from "../Store/RootStore";


type ListItemTmplPropsType = {
    data: {
        data: TodoResponseType;
        index: number;
    };
    togglePopup: () => void;
};
type ListPropsType = {
    todos: TodoType[];
    users: UserResponseType[]
};



const ListItemTmpl: React.FC<ListItemTmplPropsType> = observer((props) => {
    const {rootStore} = useStores();
    return (
        <div className={styles.container}>
            <div className={styles.taskText}>
                <CheckBox value={props.data.data.completed} onValueChange={() => {
                    rootStore.todoStore.setActiveTodoId(props.data.data.id);
                    rootStore.todoStore
                        .completeTodo(rootStore.todoStore.activeTodoId.id, !props.data.data.completed)
                        .catch((e: any) => console.log(e));
                }}/>
                   <p>{props.data.data.title}</p>

            </div>
            <div>
                <Button width={45} style={{margin: '10px'}} icon='rename' onClick={() => {
                    rootStore.todoStore.setActionType('Change')
                    props.togglePopup()
                    rootStore.todoStore.setActiveTodoId(props.data.data.id, props.data.data.title);
                }}/>
                <Button
                    width={45}
                    icon="trash"
                    type="danger"
                    onClick={() => rootStore.todoStore.deleteTodo(toJS(props.data.data.id))}
                />
            </div>
        </div>
    );
})



function RenderLabel({user} : {user: UserResponseType | null}) {
    return <div className="toolbar-label"><b>Todo&apos;s for</b> {user?.name ?? 'unknown'}</div>;
}

export const TestListComponent: React.FC<ListPropsType> = (props ) => {
    const history = useHistory();
    const {rootStore} = useStores();
    const backButtonOptions = {
        type: 'back',
        onClick: () => {
            history.push('/')
            rootStore.todoStore.todos = [] //TODO узнать насчет прямого изменения без экшена
            notify('Здесь будет возврат на юзеров');
        }
    };
    const [isPopupVisible, setPopupVisibility] = useState<boolean>(false);
    const togglePopup = () => {
        setPopupVisibility(!isPopupVisible);
    };
    const addButtonOptions = {
        icon: 'plus',
        onClick: () => {
            rootStore.todoStore.setActionType('Add');
            setPopupVisibility(!isPopupVisible);
        }
    };

    return (
        <>
            <Toolbar>
                <Item location="before"
                      widget="dxButton"
                      options={backButtonOptions}/>
                <Item location="before"
                      widget="dxButton"
                      options={refreshButtonOptions}/>
                <Item location="after"
                      locateInMenu="auto"
                      widget="dxButton"
                      options={addButtonOptions}/>
                {/*<Item location="center"*/}
                {/*      locateInMenu="never"*/}
                {/*      render={RenderLabel}/>*/}
                <Item location="center"
                      locateInMenu="never"
                      render={() => <RenderLabel user={rootStore.userStore.activeUser}/>}/>

            </Toolbar>
            <List
                height={'100vh'}
                searchMode={'contains'}
                searchExpr={['title']}
                searchEnabled={true}
                itemComponent={(data) => (
                    <ListItemTmpl data={data} togglePopup={togglePopup}/>
                )}
                dataSource={props.todos}
                selectionMode="multiple"
                pageLoadMode="nextButton"
                scrollByContent={true}
                showScrollbar="never"
                style={{padding: '22px', margin: '10px'}}
            >
                <ItemDragging
                    allowReordering={true}
                />
            </List>
            <PopupForChanging actionType={rootStore.todoStore.actionType} isPopupVisible={isPopupVisible} togglePopup={togglePopup}/>
        </>
    );

}

const refreshButtonOptions = {
    icon: 'refresh',
    onClick: () => {
        notify('Здесь будет обновление!');
    }
};



