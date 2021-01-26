import React, { Component } from 'react';

class TokenClass extends React.Component {
    constructor(props){
      super(props); 
      this.state = { 
        diff: 0, 
        value: props.value, 
        step: Math.round(props.max / 10) / 100
      }; 
    }

    componentDidMount(){

    }

    handleChange(e) {
      var val = e.target.value;
      this.setState({ diff: Math.round(10000 * (val - this.props.value)) / 10000, value: val });
    }
    clickAmount() {
      var val = this.props.value;
      this.props.surplus = val;
      this.setState({ diff: Math.round(10000 * (val - this.props.value)) / 10000, value: val });
    }

    render() {
      return (
        <div className="token">
          <img className="token-img" src={this.props.img} width="24" height="24" />
          <div className="token-name">{this.props.name}</div>
          <div className="token-value">amount: 
            <div onClick={() => this.clickAmount()}>{this.props.value}</div>
          </div>
            <div class="token-amount-text">
              new: 
            </div>
            <div class="slidecontainer">
              <input type="range" min="0" max={this.props.max} class="slider" id="myRange" onChange={e => this.handleChange(e)} value={this.state.value} step={this.state.step} />
            </div>
          <form className="token-form">
            <input className="token-input" type="text" onChange={e => this.handleChange(e)} value={this.state.value} />
          </form>
          { (this.state.diff > 0) &&
            <div className="token-diff-pos">
              +{this.state.diff}
            </div>
          }
          { (this.state.diff < 0) &&
            <div className="token-diff-neg">
              {this.state.diff}
            </div>
          }
        </div>
        )
      ;
    }
  }

  
export default TokenClass;