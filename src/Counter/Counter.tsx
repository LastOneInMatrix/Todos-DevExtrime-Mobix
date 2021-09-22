import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import counter from '../Store/Counter';
import Button from 'devextreme-react/button';
import {observer} from "mobx-react-lite";
type CounterPropsTypes = {};

export const Counter = observer((props: CounterPropsTypes) => {

    return <div>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        {'Count:' + counter.count}
        <Button
            text="+"
            onClick={() => counter.increment()}
        />
        <Button
            text="-"
            onClick={() => counter.decrement()}
        />
    </div>
})
