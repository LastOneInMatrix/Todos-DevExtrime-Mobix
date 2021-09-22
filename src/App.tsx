import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import style from './App.module.css'
import {Counter} from "./Counter/Counter";
import {Todos} from "./Todos/Todos";





class App extends React.Component {

    render() {
        return (
            <div className={style.main}>
                <div className={style.sidebar}>1</div>

                {/* eslint-disable-next-line react/jsx-no-undef */}
               <div className={style.buttonsBlock}>
                   <Counter/>
                   <Todos/>
               </div>
            </div>
        );
    }
}

export default App;