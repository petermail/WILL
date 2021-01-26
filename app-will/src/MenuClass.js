import React, { Component } from 'react';
import MiniTokenClass from './MiniTokenClass.js';

class MenuClass extends React.Component {
    constructor(props){
      super(props); 
      this.state = {  }; 
    }

    componentDidMount(){

    }

    render() {
      const diff = 0;

      return (
        <div className="menu">
            <h1>Your wallet:</h1>
            <hr />
            {
                this.props.tokens.map(t => (
                    <MiniTokenClass key={t[0]} name={t[0]} img={t[1]} value={t[2]} surplus={t[3]} diff={diff} />
                ))
            }
        </div>
        )
      ;
    }
  }

  
export default MenuClass;