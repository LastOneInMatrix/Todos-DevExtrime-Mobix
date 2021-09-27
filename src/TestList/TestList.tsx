import Button from 'devextreme-react/button';
import React, {useState} from 'react';
import List, {ItemDragging} from 'devextreme-react/list';
import {toJS} from 'mobx';
import todoStore, {TodoType} from "../Store/Todo";
import {CheckBox} from 'devextreme-react/check-box';
import {PopupForChanging} from "../Popup/Popup";
import Toolbar, {Item} from 'devextreme-react/toolbar';
import notify from "devextreme/ui/notify";
import {useHistory} from "react-router";
import userStore from "../Store/Users"
import {observer} from "mobx-react-lite";
import {TodoResponseType} from "../API/appAPI";


type ListItemTmplPropsType = {
    data: {
        data: TodoResponseType;
        index: number;
    };
    togglePopup: () => void;
};
type ListPropsType = { todos: TodoType[]};

const style = {
    display: 'flex',
    justifyContent: 'space-between',
};

const ListItemTmpl: React.FC<ListItemTmplPropsType> = observer((props) => {
    return (
        <div style={style}>
            <div>
                <CheckBox value={props.data.data.completed} onValueChange={() => {
                    todoStore.setActiveTodoId(props.data.data.id);
                    todoStore
                        .completeTodo(todoStore.activeTodoId.id, !props.data.data.completed)
                        .catch(e => console.log(e));
                }}/>
                {props.data.data.title}
            </div>
            <div>
                <Button width={45} style={{margin: '10px'}} icon='rename' onClick={() => {
                    todoStore.setActionType('Change')
                    props.togglePopup()
                    todoStore.setActiveTodoId(props.data.data.id, props.data.data.title);
                }}/>
                <Button
                    width={45}
                    icon="trash"
                    type="danger"
                    onClick={() => todoStore.deleteTodo(toJS(props.data.data.id))}
                />
            </div>
        </div>
    );
})



function renderLabel() {
    return <div className="toolbar-label"><b>Todo&apos;s for</b> {userStore.activeUser?.name}</div>;
}

export const TestListComponent: React.FC<ListPropsType> = (props ) => {
    const history = useHistory();
    const backButtonOptions = {
        type: 'back',
        onClick: () => {
            history.push('/')
            todoStore.todos = [] //TODO узнать насчет прямого изменения без экшена
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
            todoStore.setActionType('Add');
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
                <Item location="center"
                      locateInMenu="never"
                      render={renderLabel}/>
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
            <PopupForChanging actionType={todoStore.actionType} isPopupVisible={isPopupVisible} togglePopup={togglePopup}/>
        </>
    );

}

const refreshButtonOptions = {
    icon: 'refresh',
    onClick: () => {
        notify('Здесь будет обновление!');
    }
};



