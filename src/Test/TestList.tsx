import List from 'devextreme-react/list';

import Button from 'devextreme-react/button';
import React, {useState} from 'react';
import {toJS} from 'mobx';
import todoStore, {TodoType} from "../Store/Todo";
import {CheckBox} from 'devextreme-react/check-box';
import {PopupForChanging} from "../Popup/Popup";
import Toolbar, {Item} from 'devextreme-react/toolbar';
import notify from "devextreme/ui/notify";


type MyStateType = {};
export type ConnectedPropsType = any

const ListItemTmpl: React.FC<ConnectedPropsType> = (props) => {

    return (
        <div>
            <CheckBox defaultValue={false}/>
            {props.data.data.title}
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Button width={30} style={{margin: '10px'}} icon='rename' onClick={() => {
                props.togglePopup(props.data.data.id)
                todoStore.getActiveTodoId(props.data.data.id)
            }}/>
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
    return <div className="toolbar-label"><b>Tom&apos;s Club</b> Products</div>;
}
export const TestListComponent = (props: ListPropsType) => {
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
                height={400}
                searchMode={'contains'}
                searchExpr={['title']}
                searchEnabled={true}
                itemComponent={(data) => <ListItemTmpl data={data} togglePopup={togglePopup}/>}
                dataSource={props.todos}
                selectionMode="multiple"
                pageLoadMode="nextButton"/>
            <PopupForChanging isPopupVisible={isPopupVisible} togglePopup={togglePopup}/>

        </React.Fragment>
    );

}

const backButtonOptions = {
    type: 'back',
    onClick: () => {
        notify('Здесь будет возврат на юзеров');
    }
};

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

