import React, {FormEvent, useState} from 'react';
import {Popup} from 'devextreme-react/popup';
import {observer} from "mobx-react-lite";
import todoStore from "../Store/Todo";
import Button from "devextreme-react/button";
import {TextBox} from "devextreme-react";
import {ButtonItem, Form, SimpleItem,} from 'devextreme-react/form';


const RenderContent = observer((props: any) =>  {
    const [text, setText] = useState<string>(todoStore.activeTodoId.title ?? '');
    const sendData = (event: FormEvent<HTMLFormElement>) => {
        const type = props.actionType === 'Add' ? 'addTodo' : 'changeTitleForTask';
        todoStore
        [type](text)
            .catch(e=>console.log(e))
        props.togglePopup();
        event.preventDefault();
    }
    const submitButtonOptions = {
        text: "Submit the Form",
        useSubmitBehavior: true
    };
    return (
        <form action="your-action" onSubmit={sendData}>
            <Form>
                <SimpleItem dataField="Title">
                    <TextBox
                        defaultValue={text}
                        onOptionChanged={e => {
                            setText(e.value)
                        }}
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
})
export const PopupForChanging = observer((props: any) =>  {
    return (
        <div className="App">
            <Popup
                title={`${props.actionType} task`}
                visible={props.isPopupVisible}
                closeOnOutsideClick={true}
                onHiding={props.togglePopup}
                width={500}
                height={250}
                resizeEnabled={true}
                contentRender={() => <RenderContent actionType={props.actionType} togglePopup={props.togglePopup} id={todoStore.activeTodoId}/>}
            />
        </div>
    );
})

