import React, { Component } from 'react';
import {useState} from 'react';
import './App.css';
import MenuClass from './MenuClass.js';
import WillClass from './WillClass.js';
import SplitterLayout from 'react-splitter-layout';
//import 'react-splitter-layout/lib/index.css';
import AddressClass from './AddressClass.js';
import imgUsdt from './img/USDT.png';
import imgBtc from './img/BTC.png';

class App extends React.Component {
  constructor(props){
    super(props);
    var addr = ["Will", "Your wallet"];
    var splits = [];
    var widths = [];
    var willAddr = ["Adam", "Bob", "Cindy"];
    for (var k = 0; k < willAddr.length; ++k){
      splits.push(1);
      widths.push(0);
    }
    var coins = ["USDT", "USDC", "RenBTC"];
    var imgs = [imgUsdt, imgUsdt, imgBtc];
    var maxs = [0, 0, 0];
    //var wallet = [100, 20, 1.1];
    var surplus = [0, 0, 0];
    var amounts = [[100, 200, 0.8], [200, 300, 0.4]];
    for (var j = 0; j < addr.length; ++j){
      for (var i = 0; i < coins.length; ++i){
        maxs[i] += amounts[j][i];
      }
    }

    var data = []; // List of addresses with coins
    for (j = 0; j < addr.length; ++j){
      var list = [];
      for (i = 0; i < coins.length; ++i){
        list.push([coins[i], imgs[i], amounts[j][i], amounts[j][i], maxs[i], surplus[i], i]);
      }
      data.push(list);
    }
    /*var list2 = [];
    for (i = 0; i < coins.length; ++i){
      list2.push([coins[i], imgs[i], wallet[i], wallet[i], wallet[i], surplus[i]]);
    }*/
    
    this.state = {
      data: data,
      address: addr,
      //wallet: list2,
      splits: splits,
      widths: widths
    };
  }

  componentDidMount() {
    for (var i = 0; i < this.state.widths; ++i){
      var resize1 = document.getElementById("resize" + i);
      resize1.addEventListener('resize', this.resize);
    }
  }

  renderSplitter(count){
    var result = null;
    result.push(<div className="mainSplitter">
      Split of will:
      { this.renderInnerSplitter(count) }
    </div>);
    return result;
  }
  renderInnerSplitter(count){
    var result = [];
    if (count == 1){
      result.push(<div><hr /></div>);
    } else {
      result.push(<div>
        <SplitterLayout>
          <div name={"resize"+(count - 1)}><hr /></div>
          { this.renderInnerSplitter(count - 1) }
        </SplitterLayout>
      </div>);
    }
    return result;
  }
  renderInputs(count){
    var result = [];
    if (count != 0){
      result.push(
          <input type="text" value={this.state.splits[count-1]} />
      );
      result.push(this.renderInputs(count - 1));
    }
    return result;
  }
  log(){
    console.log("Logged: ");
  }
  addToken(){

  }
  changeValueHandler = (e, index, indexAdd) => {
    // e.target.value
    var addr = ["Will", "Your wallet"];
    var splits = [];
    var widths = [];
    var willAddr = ["Adam", "Bob", "Cindy"];
    for (var k = 0; k < willAddr.length; ++k){
      splits.push(1);
      widths.push(0);
    }
    var coins = ["USDT", "USDC", "RenBTC"];
    var imgs = [imgUsdt, imgUsdt, imgBtc];
    var maxs = [0, 0, 0];
    var wallet = [100, 20, 1.1];
    var surplus = [0, 0, 0];
    var amounts = [[100, 200, 0.8], [200, 300, 0.4]];
    for (var j = 0; j < addr.length; ++j){
      for (var i = 0; i < coins.length; ++i){
        maxs[i] += amounts[j][i];
      }
    }
    // end of start

    amounts[index][indexAdd] = Math.round((maxs[indexAdd] - e.target.value)*10000)/10000;
    amounts[(index + 1) % 2][indexAdd] = e.target.value;
    var data = [];
    console.log("indexAdd: ", indexAdd);
    console.log("index: ", index);
    console.log("data: ", this.state.data);
    for (var j = 0; j < addr.length; ++j){
      var list = [];
      if (false){
        for (var i = 0; i < coins.length; ++i){
          list.push([this.state.data[j][i][0], this.state.data[j][i][1], 
            this.state.data[j][i][2], amounts[j][i], this.state.data[j][i][4], this.state.data[j][i][5], i]);
        }
      } else {
        for (var i = 0; i < coins.length; ++i){
          if (i != indexAdd){
            list.push([this.state.data[j][i][0], this.state.data[j][i][1], 
              this.state.data[j][i][2], this.state.data[j][i][3], this.state.data[j][i][4], this.state.data[j][i][5], i]);
          } else if (index != j){
            list.push([this.state.data[j][i][0], this.state.data[j][i][1], 
              this.state.data[j][i][2], amounts[j][i], this.state.data[j][i][4], this.state.data[j][i][5], i]);
          } else {
            list.push([coins[i], imgs[i], this.state.data[j][i][2], amounts[j][i], maxs[i], surplus[i], i]);
          }
        }
      }
      data.push(list);
    }
    console.log("end: ", data);

    this.setState({
      data: data
    })
    console.log("Set state: ", e.target.value);
  }

  render(){
  return (
    <div className="App">
      <div>
        <AddressClass addressName={this.state.address[0]} tokens={this.state.data[0]} 
          changeValue={(e, i) => this.changeValueHandler(e, 1, i)} addToken={this.addToken} />
        <AddressClass addressName={this.state.address[1]} tokens={this.state.data[1]} 
          changeValue={(e, i) => this.changeValueHandler(e, 0, i)} addToken={this.addToken} />

        <div className="mainSplitter">
          <WillClass data={this.state.data} addresses={this.state.address} />
        </div>
      </div>
      <div className="bottom">
        <hr />
        No action is taken until you commit it.
      </div>
    </div>
  );
}
}
/* to use inside class "mainSplitter"
          <div>Split of will:</div>
          { this.renderInnerSplitter(3) }
          <div>
            { this.renderInputs(3) }
          </div>
*/

export default App;
