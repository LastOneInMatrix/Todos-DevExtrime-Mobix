import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import style from './App.module.css'
import {Todos} from "./Todos/Todos";
import {Users} from "./Users/Users";
import {HashRouter, Route, Switch} from "react-router-dom";




class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <div className={style.main}>
                    <div className={style.sidebar}>1</div>

                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <div className={style.buttonsBlock}>
                        <Switch>
                            <Route exact path={'/'} render={() => <Users/>}/>
                            <Route exact path={'/todos/:userId?'} render={() => <Todos/>}/>
                        </Switch>
                    </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;