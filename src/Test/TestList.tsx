import List, {ItemDragging} from 'devextreme-react/list';

import Button from 'devextreme-react/button';
import React, {useState} from 'react';
import {toJS} from 'mobx';
import todoStore, {TodoType} from "../Store/Todo";
import {CheckBox} from 'devextreme-react/check-box';
import {PopupForChanging} from "../Popup/Popup";
import Toolbar, {Item} from 'devextreme-react/toolbar';
import notify from "devextreme/ui/notify";
import {useHistory} from "react-router";
import userStore from "../Store/Users"

type MyStateType = {};
export type ConnectedPropsType = any

const ListItemTmpl: React.FC<ConnectedPropsType> = (props) => {
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
    }
    return (
        <div style={style}>
            <CheckBox defaultValue={false} />
            <div>
                {props.data.data.title}
                <Button width={45} style={{margin: '10px'}} icon='rename' onClick={() => {
                    props.togglePopup(props.data.data.id)
                    todoStore.getActiveTodoId(props.data.data.id)
                }}/>
            </div>

            {/* eslint-disable-next-line react/jsx-no-undef */}

            <Button
                width={100}
                icon="trash"
                type="danger"
                onClick={() => todoStore.deleteTodo(toJS(props.data.data.id))}
            />

        </div>
    );

}

type ListPropsType = { todos: TodoType[] };

function renderLabel() {

    return <div className="toolbar-label"><b>Todo&apos;s for</b> {userStore.activeUser?.name}</div>;
}
export const TestListComponent = (props: ListPropsType) => {
    const history = useHistory()
    const backButtonOptions = {
        type: 'back',

        onClick: () => {
            history.push('/')
            todoStore.todos = [] //TODO узнать насчет прямого изменения без экшена
            notify('Здесь будет возврат на юзеров');
        }
    };
    const [isPopupVisible, setPopupVisibility] = useState(false);

    const togglePopup = (id: number) => {
        setPopupVisibility(!isPopupVisible);
    };

    return (
        <React.Fragment>
            <Toolbar>
                <Item location="before"
                      widget="dxButton"
                      options={backButtonOptions} />
                <Item location="before"
                      widget="dxButton"
                      options={refreshButtonOptions} />
                <Item location="after"
                      locateInMenu="auto"
                      widget="dxButton"
                      options={addButtonOptions} />
                <Item location="center"
                      locateInMenu="never"
                      render={renderLabel} />
            </Toolbar>
            <List
                height={'100vh'}
                searchMode={'contains'}
                searchExpr={['title']}
                searchEnabled={true}
                itemComponent={(data) => <ListItemTmpl data={data} togglePopup={togglePopup}/>}
                dataSource={props.todos}
                selectionMode="multiple"
                pageLoadMode="nextButton">
                <ItemDragging
                    allowReordering={true}
                />
            </List>
            <PopupForChanging isPopupVisible={isPopupVisible} togglePopup={togglePopup}/>

        </React.Fragment>
    );

}



const refreshButtonOptions = {
    icon: 'refresh',
    onClick: () => {
        notify('Здесь будет обновление!');
    }
};

const addButtonOptions = {
    icon: 'plus',
    onClick: () => {
        notify('Здесь будет всплывать модалка добавления!');
    }
};

const saveButtonOptions = {
    text:'Save',
    onClick: () => {
        notify('Save option has been clicked!');
    }
};

