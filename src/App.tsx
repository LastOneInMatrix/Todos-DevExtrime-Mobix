import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import style from './App.module.css'
import {Todos} from "./Todos/Todos";
import {Users} from "./Users/Users";
import {HashRouter, Route, Switch} from "react-router-dom";


type AppPropsType = {}
type AppStateType = {}

class App extends React.Component<AppPropsType, AppStateType> {
    render() {
        return (
            <HashRouter>
                <div className={style.main}>
                    <div className={style.sidebar}></div>
                    <div className={style.content}>
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