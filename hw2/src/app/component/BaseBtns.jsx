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
        console.log(base);
        this.setState({base});
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
                                    <RaisedButton label={this.state.number} fullWidth={true}
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
