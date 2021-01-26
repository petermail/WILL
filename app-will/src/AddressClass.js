import React, { Component } from 'react';
import TokenClass from './TokenClass.js';

class AddressClass extends React.Component {

    constructor(props){
      super(props); 
      //this.state = {text: "Welcome!"}; 
    }

    componentDidMount(){

    }

    render() {
        const diff = 0;

      return (
        <div className="address">
            <h1>{this.props.addressName}</h1>
            <hr />
            {
                this.props.tokens.map(t => (
                    <TokenClass key={t[0]} name={t[0]} img={t[1]} value={t[2]} max={t[3]} surplus={t[4]} diff={diff} />
                ))
            }
        </div>
        )
      ;
    }
  }

  
export default AddressClass;