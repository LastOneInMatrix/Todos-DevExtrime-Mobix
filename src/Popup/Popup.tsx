import React from 'react';
import {Popup} from 'devextreme-react/popup';

import {observer} from "mobx-react-lite";
import todoStore from "../Store/Todo";


const RenderContent = (props: any) =>  {
    return (
        <>
            <p>
                Todos id: {props.id}
            </p>
        </>
    )
}
export const PopupForChanging = observer((props: any) =>  {
    return (
        <div className="App">
            <Popup
                visible={props.isPopupVisible}
                closeOnOutsideClick={true}
                onHiding={props.togglePopup}
                width={500}
                height={500}
                resizeEnabled={true}
                contentRender={() => <RenderContent id={todoStore.activeTodoId}/>}
            />
        </div>
    );
})

