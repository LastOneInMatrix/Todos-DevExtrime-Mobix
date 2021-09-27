import React, {FormEvent, useEffect, useState} from 'react';
import {Popup} from 'devextreme-react/popup';
import {observer} from "mobx-react-lite";
import todoStore from "../Store/Todo";
import Button from "devextreme-react/button";
import {TextBox} from "devextreme-react";
import {ButtonItem, Form, SimpleItem,} from 'devextreme-react/form';
import st from './popup.module.css'
// import DevExpress from "devextreme";
// import NativeEventInfo = DevExpress.events.NativeEventInfo;
// import dxTextBox from "devextreme/ui/text_box";
// import {ValueChangedInfo} from "devextreme/ui/editor/editor";


type PopupForChangingPropsType = {
    actionType: string;
    isPopupVisible: boolean;
    togglePopup: () => void;
}
type RenderContentPropsType = {
    actionType: string;
    togglePopup: () => void;
}
const RenderContent: React.FC<RenderContentPropsType> = observer((props ) =>  {
    const [text, setText] = useState<string>('');
    useEffect(() => {
        setText(todoStore.activeTodoId.title ?? '');
        return () => {
            setText('');
        }
    }, [todoStore.activeTodoId.title]); //Todo уточнить насчет мутируемых депов

    const sendData = (event: FormEvent<HTMLFormElement>) => {
        const type = props.actionType === 'Add' ? 'addTodo' : 'changeTitleForTask';
        todoStore
        [type](text)
            .catch(e=>console.log(e))
        props.togglePopup();
        event.preventDefault();
        todoStore.activeTodoId.title = ''
    }
    const submitButtonOptions = {
        text: "Submit the Form",
        useSubmitBehavior: true
    };

    const valueChangedHandler = (e: any) => {
        const newValue = e.value;
        setText(newValue);
    };
    return (
        <form action="action" onSubmit={sendData}>
            <Form>
                <SimpleItem dataField="Title">
                    <TextBox
                        // defaultValue={text}
                        // onOptionChanged={e => {
                        //     setText(e.value)
                        // }} //Todo разобраться с работой при изменении в TextBox и как правильно типизировать events
                        value={text}
                        onValueChanged={valueChangedHandler}
                        placeholder={'Please type title for task'}
                    />
                </SimpleItem>
                <Button
                    id="button"
                    text="Change Task Status"
                    type="success"
                    className="dx-field-item"
                    useSubmitBehavior={true}
                />
                <ButtonItem buttonOptions={submitButtonOptions} />
            </Form>
        </form>
    )
});

export const PopupForChanging: React.FC<PopupForChangingPropsType> = observer((props) =>  {
    return (
        <div className={st.container}>
            <Popup
                title={`${props.actionType} task`}
                visible={props.isPopupVisible}
                closeOnOutsideClick={true}
                onHiding={props.togglePopup}
                resizeEnabled={true}
                contentRender={() => <RenderContent actionType={props.actionType} togglePopup={props.togglePopup}/>}
            />
        </div>
    );
});


