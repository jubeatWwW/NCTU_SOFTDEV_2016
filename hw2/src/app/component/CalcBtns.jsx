import React from 'react';
import ShortId from 'shortid';
import RaisedButton from 'material-ui/RaisedButton';


const btnstyle = {
    height: "80px",
    width: "80px"
}

export default class CalcBtns extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            level: 3
        }
    }

    handleClick(n){
        if(n.chunk!==' ')
            this.props.onClick(n);
    }

    render(){
        const chunks = [' ', 'Mod', 'CE', 'C', '←', '/', '\n',
                    'A', 'B', '7', '8', '9', '*', '\n',
                    'C', 'D', '4', '5', '6', '-', '\n',
                    'E', 'F', '1', '2', '3', '+', '\n',
                    ' ', ' ', '±', '0', ' ', '='];
        let btns = [];
        let Cflag = false;
        let id = 0;
        for(let chunk of chunks){
            let level = 0;
            let op = false;
            if(chunk == '0' || chunk == '1')
                level = 1;
            else if(chunk >= '2' && chunk <= '7')
                level = 2;
            else if(chunk >= '8' && chunk <= '9')
                level = 3;
            else if(chunk >= 'A' && chunk <= 'F'){
                if(chunk == 'C' && !Cflag){
                    level = 0;
                    Cflag = true;
                    op = true;
                } else if(chunk == 'CE'){
                    level = 0;
                    op = true;
                } else {
                    level = 4;
                }
            } else if(chunk == ' ') {
                level = 0;
            } else {
                level = 0;
                op = true;
            }

            btns.push({level, chunk, op, id});
            id++;
        }
        
        return (
            <div>
                {
                    btns.map((n)=> {
                        return n.chunk=='\n'?
                            <div style={{clear: "right"}} key={ShortId.generate()}></div> : 
                            <RaisedButton label={n.chunk}  style={btnstyle} 
                                className="calc-btn" onClick={this.handleClick.bind(this, n)}
                                disabled={n.level > this.props.level}
                                key={n.id}/>;
                    })
                }
            </div>
        );
    }
}
