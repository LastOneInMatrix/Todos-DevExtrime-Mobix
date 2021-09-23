import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import style from './App.module.css'
import {Todos} from "./Todos/Todos";




class App extends React.Component {

    render() {
        return (
            <div className={style.main}>
                <div className={style.sidebar}>1</div>

                {/* eslint-disable-next-line react/jsx-no-undef */}
               <div className={style.buttonsBlock}>
                  <Todos/>

               </div>
            </div>
        );
    }
}

export default App;