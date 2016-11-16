import React from 'react';

import RadioButton from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: "10px 0 10px 0",
    height: "20px",
    width: "120px",
    display: "inline-flex"
};

export default class BaseBtn extends React.Component {


    constructor(props){
        super(props);
        this.base = ['HEX', 'DEC', 'OCT', 'BIN'];
        this.state = {
            base: 'DEC',
            number: '0'
        }
    }

    handleClick(base){
        this.setState({base});
        this.props.onClick(base);
    }

    changeBase(base){
        switch(base){
            case 'HEX':
                return this.props.baseNum.toString(16);
                break;
            case 'DEC':
                return this.props.baseNum.toString(10);
                break;
            case 'OCT':
                return this.props.baseNum.toString(8);
                break;
            case 'BIN':
                return this.props.baseNum.toString(2);
                break;
        }
    }

    render(){
        return(
            <nav style={{margin: "0 20px 1px 20px"}}>
                {
                    this.base.map((base)=>{
                        return (
                            <div style={{width: "480px", height: "40px", display: "inline-flex"}} key={base}>
                                <RadioButton label={base} 
                                    checked={this.state.base === base}
                                    onClick={this.handleClick.bind(this, base)}
                                    style={style}/>
                                <Paper zDepth={1} style={{position: "relative", height: "40px", width: "380px"}}>
                                    <RaisedButton label={this.changeBase(base)} fullWidth={true}
                                        onClick={this.handleClick.bind(this, base)}/>
                                </Paper>
                            </div>
                        );
                    })
                }
            </nav>
        );
    }
}
