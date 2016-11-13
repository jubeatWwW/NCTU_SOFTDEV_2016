import React from 'react';
import ShortId from 'shortid';
import RaisedButton from 'material-ui/RaisedButton';


const btnstyle = {
    height: "80px",
    width: "80px"
}

export default class CalcBtns extends React.Component {
    
    handleClick(n){
        console.log(n);
    }

    render(){
        let btns = [' ', 'Mod', 'CE', 'C', '<-', '%', '\n',
                    'A', 'B', '7', '8', '9', '*', '\n',
                    'C', 'D', '4', '5', '6', '-', '\n',
                    'E', 'F', '1', '2', '3', '+', '\n',
                    ' ', ' ', '+-', '0', ' ', '='];
        return (
            <div>
                {
                    btns.map((n)=> {
                        return n=='\n'?
                            <div style={{clear: "right"}} key={ShortId.generate()}></div> : 
                            <RaisedButton label={n}  style={btnstyle} 
                                className="calc-btn" onClick={this.handleClick.bind(this, n)}
                                key={ShortId.generate()}/>;
                    })
                }
            </div>
        );
    }
}
