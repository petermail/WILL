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
                    <TokenClass key={t[0]} name={t[0]} img={t[1]} initValue={t[2]} value={t[3]} max={t[4]} surplus={t[5]} diff={diff} 
                      changeValue={this.props.changeValue} index={t[6]} />
                ))
            }
        </div>
        )
      ;
    }
  }

  
export default AddressClass;