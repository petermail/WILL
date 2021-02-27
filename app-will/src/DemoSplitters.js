import React, { Component } from 'react';
import {useState} from 'react';

class DemoSplitters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value1: 100,
            value2: 0
        }
    }

    changeValueMain1(e){
        console.log("main value: ", e.target.value);
        this.setState({ value1: e.target.value });
        this.setState({ value2: 100 - e.target.value });
    }
    changeValueMain2(e){
        console.log("main value2: ", e.target.value);
        this.setState({ value2: e.target.value });
        this.setState({ value1: 100 - e.target.value });
    }

    render(){
        return (
            <div>
                <InputClass changeValueMethod={e => this.changeValueMain1(e)} data={this.state.value1} />
                <InputClass changeValueMethod={e => this.changeValueMain2(e)} data={this.state.value2} />
            </div>
        )
    }
}


class InputClass extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            value: props.data
        }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.data });
      }
    }

    render(){
        return (
            <div>
                <input type="range" min="0" max="100" onChange={(e) => { this.props.changeValueMethod(e); }} value={this.state.value} />
                {this.state.value}
            </div>
        )
    }
}

export default DemoSplitters;