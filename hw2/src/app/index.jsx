import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Screen from './component/Screen';
import CalcBtns from './component/CalcBtns';
import BaseBtns from './component/BaseBtns';

import '../css/index.scss';

const isOperator = /[/*\-+%]/i;
const isDigit = /[0-9A-F]/i;
class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            number: "0",
            level: 3,
            baseNum: 0
        }
    }


    handleCalc(btn){
        console.log(btn);
        if(btn.chunk == 'Mod'){
            btn.chunk = '%';
        }
        
        let number = this.state.number;
        let lastChunk = number[number.length - 1]==' '?number[number.length-2]:number[number.length-1];
        console.log(number);
        console.log(lastChunk);
        if(number === "0" && !btn.op){
            this.setState({number: btn.chunk});
        } else if(!btn.op){
            if(lastChunk == '0' && number[number.length - 2] == ' ')
                this.setState({number: `${number.slice(0, -1)}${btn.chunk}`});
            else
                this.setState({number: `${number}${btn.chunk}`});
        } else if(btn.op && btn.chunk == 'C'){
            this.setState({number: "0"}); 
        } else if(btn.chunk == 'CE'){
            if(isDigit.test(lastChunk)){
                let lastNum = number.split(' ').pop();
                if(number.split(' ').length == 1){
                    this.setState({number: "0"});
                } else {
                    this.setState({number: number.slice(0, -lastNum.length)});
                }
            }
        } else if(btn.chunk == '←'){
            if(number[number.length-1]==' ')
                this.setState({number: number.slice(0, -3)});
            else if(number[number.length-2] == '-' && isDigit.test(lastChunk))
                if(number.length == 2)
                    this.setState({number: "0"});
                else
                    this.setState({number: number.slice(0, -2)});
            else
                if(number.length == 1)
                    this.setState({number: "0"});
                else
                    this.setState({number: number.slice(0, -1)});
        } else if(btn.chunk == '±'){
            if(isDigit.test(lastChunk)){
                let lastNum = number.split(' ').pop();
                let newStr = "";
                if(this.state.level == 3){
                    if(lastNum[0] == '-'){
                        newStr = `${number.slice(0, -lastNum.length)}${lastNum.slice(1)}`;
                    } else {
                        newStr = `${number.slice(0, -lastNum.length)}-${lastNum}`;
                    }
                    this.setState({number: newStr});
                } else {
                    let changeBase = 3;
                    switch(this.state.level){
                        case 1:
                            changeBase = 2;
                            break;
                        case 2:
                            changeBase = 8;
                            break;
                        case 4:
                            changeBase = 16;
                            break;
                        
                    }
                    newStr = `${number.slice(0, -lastNum.length)}${(parseInt(lastNum, changeBase)&0xffff >>> 0).toString(changeBase)}`;
                    this.setState({number: newStr});
                }
            }
        } else if(btn.chunk == '='){
            let ans = 0;
            if(!isDigit.test(lastChunk)){
                ans = this.baseCalc(number.slice(0, -3));
            } else {
                ans = this.baseCalc(number);
            }
            
            this.setState({baseNum: ans});
            let nans = (ans & 0xffff) >>> 0;
            
            switch(this.state.level){
                case 1:
                    this.setState({number: nans.toString(2)});
                    break;
                case 2:
                    this.setState({number: nans.toString(8)});
                    break;
                case 3:
                    this.setState({number: ans.toString(10)});
                    break;
                case 4:
                    this.setState({number: nans.toString(16)});
                    break;
            }
            
        } else {
            if(isOperator.test(lastChunk) && isOperator.test(btn.chunk)){
                this.setState({number: `${number.slice(0, -2)}${btn.chunk} `});    
            } else if(isDigit.test(lastChunk) && isOperator.test(btn.chunk)){
                this.setState({number: `${number} ${btn.chunk} `});
            }
        }
    }
    
    baseCalc(numberStr){
        let numStr = numberStr.split(' ');
        let evalStr = "";
        console.log(numStr);
        for(let i in numStr){
            if(!isOperator.test(numStr[i][0])){
                switch(this.state.level){
                    case 1:
                        numStr[i] = `0b${numStr[i]}`;
                        break;
                    case 2:
                        numStr[i] = parseInt(numStr[i], 8).toString(10);
                        break;
                    case 3:
                        break;
                    case 4:
                        numStr[i] = `0x${numStr[i]}`;
                }
                evalStr = `${evalStr}${numStr[i]}`;
            } else {
                evalStr = `${evalStr} ${numStr[i]} `;
            }
        }
        console.log(evalStr);
        console.log(eval(evalStr));
        return eval(evalStr);
    }

    int16(base, input){
        let decnum = parseInt(input, base).toString(16);
        console.log(`decnum: ${decnum}`);
        if(((parseInt(decnum, 16) & 0x8000) >>> 0) > 0){
            console.log("neg");
            return parseInt(parseInt(input, base).toString(10)) - 65536;
        } else
            return parseInt(input, base);
    }

    handleBase(base){
        let number = this.state.number;
        let lastChunk = number[number.length - 1]==' '?number[number.length-2]:number[number.length-1];
        
        let ans = 0;
        if(!isDigit.test(lastChunk)){
            ans = this.baseCalc(number.slice(0, -3));
        } else {
            ans = this.baseCalc(number);
        }

        this.setState({baseNum: ans});
        
        ans = (ans&0xffff) >>> 0;

        switch(base){
            case 'BIN':
                this.setState({number: ans.toString(2)});
                break;
            case 'OCT':
                this.setState({number: ans.toString(8)});
                break;
            case 'DEC':
                this.setState({number: ans.toString(10)});
                break;
            case 'HEX':
                this.setState({number: ans.toString(16)});
                break;
        }
        
        switch(base){
            case 'HEX':
                this.setState({level: 4});
                break;
            case 'DEC':
                this.setState({level: 3});
                break;
            case 'OCT':
                this.setState({level: 2});
                break;
            case 'BIN':
                this.setState({level: 1});
                break;
            default:
                this.setState({level: 3});
                break;
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Screen number={this.state.number}/>
                    <BaseBtns onClick={this.handleBase.bind(this)} baseNum={this.state.baseNum}/>
                    <CalcBtns onClick={this.handleCalc.bind(this)} level={this.state.level}/>
                </div>
            </MuiThemeProvider>
        );
    }


};

render(<App />, document.getElementById('container'));
