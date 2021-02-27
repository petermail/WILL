import React, { Component } from 'react';

class TokenClass extends React.Component {
    constructor(props){
      super(props); 
      this.state = { 
        diff: 0, 
        value: props.value, 
        step: 0.1,//Math.round(props.max / 10) / 100.0,
        index: props.index
      }; 
    }

    componentDidMount(){

    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });
        this.setDiff(nextProps.value);
      }
    }

    handleChange(e) {
      return;
      if (this.state.stopUpdate) return;
      var val = e.target.value;
      this.setState({ diff: Math.round(10000 * (val - this.props.value)) / 10000, value: val });
      console.log("Handled: ", val);
    }
    clickAmount() {
      var val = this.props.initValue;
      this.props.surplus = val;
      this.setState({ diff: Math.round(10000 * (val - this.props.initValue)) / 10000, value: val });
    }
    setDiff(val){
      this.setState({ diff: Math.round(10000 * (val - this.props.initValue)) / 10000 });
    }

    render() {
      return (
        <div className="token">
          <img className="token-img" src={this.props.img} width="24" height="24" />
          <div className="token-name">{this.props.name}</div>
          <div className="token-value">amount: 
            <div onClick={() => this.clickAmount()}>{this.props.initValue}</div>
          </div>
            <div class="token-amount-text">
              new:
            </div>
            <div class="slidecontainer">
              <input type="range" min="0" max={this.props.max} class="slider" id="myRange" 
                onChange={e => { this.handleChange(e); this.props.changeValue(e, this.state.index); }} value={this.state.value} step={this.state.step} />
            </div>
          <form className="token-form">
            <input className="token-input" type="text" onChange={e => { this.handleChange(e); this.props.changeValue(e, this.state.index); }} value={this.state.value} />
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
  //e => this.handleChange(e)

  
export default TokenClass;