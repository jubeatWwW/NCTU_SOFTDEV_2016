import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CalcBtns from './component/CalcBtns';
import BaseBtns from './component/BaseBtns';

injectTapEventPlugin();

import '../css/index.scss';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <BaseBtns />
                    <CalcBtns />
                </div>
            </MuiThemeProvider>
        );
    }


};

render(<App />, document.getElementById('container'));
