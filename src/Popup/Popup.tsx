import React, {FormEvent, useCallback, useContext, useState} from 'react';
import {Popup} from 'devextreme-react/popup';
import {observer} from "mobx-react-lite";
import todoStore from "../Store/Todo";
import Button from "devextreme-react/button";

import {TextBox} from "devextreme-react";
import {
    Form,
    SimpleItem,
    GroupItem,
    ButtonItem,
    NumericRule,
    EmailRule
} from 'devextreme-react/form';





const RenderContent = observer((props: any) =>  {
    const [text, setText] = useState<string>(todoStore.activeTodoId.title ?? '');
    const sendData = (event: FormEvent<HTMLFormElement>) => {
        todoStore
            .changeTitleForTask(text)
            .catch(e=>console.log(e))
        event.preventDefault();
        console.log(props.togglePopup())
    }
    const submitButtonOptions = {
        text: "Submit the Form",
        useSubmitBehavior: true
    };
    return (
        <form action="your-action" onSubmit={sendData}>
            <Form>
                <SimpleItem dataField="email">
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
    console.log(props.newRef)
    return (
        <div className="App">
            <Popup
                visible={props.isPopupVisible}
                closeOnOutsideClick={true}
                onHiding={props.togglePopup}
                width={500}
                height={250}
                resizeEnabled={true}
                contentRender={() => <RenderContent togglePopup={props.togglePopup} id={todoStore.activeTodoId}/>}
            />
        </div>
    );
})

