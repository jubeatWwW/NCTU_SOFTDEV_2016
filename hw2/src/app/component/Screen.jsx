import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const style = {
    width:"530px",
    height: "60px",
    textAlign: "right"
}

export default class Screen extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <FlatButton label={this.props.number} backgroundColor="#E1BEE7" style={style}/>
            </div>      
        );
    }
}
