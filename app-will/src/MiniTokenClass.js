import React, { Component } from 'react';
import imgArrow from './img/arrow.png';

class MiniTokenClass extends React.Component {
    constructor(props){
      super(props); 
      this.state = { }; 
    }

    componentDidMount(){

    }

    render() {
      return (
        <div className="minitoken">
          <img className="token-img" src={imgArrow} width="24" height="24" />
          <img className="token-img" src={this.props.img} width="24" height="24" />
          <div className="token-name">{this.props.name}</div>
          <div className="token-value">max: 
            <div>{this.props.value}</div>
          </div>
          <div className="token-surplus" >
            surplus: <div>{this.props.surplus}</div>
          </div>
        </div>
        )
      ;
    }
  }

  
export default MiniTokenClass;