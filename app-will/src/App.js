import React, { Component } from 'react';
import './App.css';
import MenuClass from './MenuClass.js';
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
    var wallet = [100, 20, 1.1];
    var surplus = [0, 0, 0];
    var amounts = [[100, 200, 0.8], [200, 300, 0.4]];
    for (var j = 0; j < addr.length; ++j){
      for (var i = 0; i < coins.length; ++i){
        maxs[i] += amounts[j][i];
      }
    }

    var data = [];
    for (j = 0; j < addr.length; ++j){
      var list = [];
      for (i = 0; i < coins.length; ++i){
        list.push([coins[i], imgs[i], amounts[j][i], maxs[i], surplus[i]]);
      }
      data.push(list);
    }
    var list2 = [];
    for (i = 0; i < coins.length; ++i){
      list2.push([coins[i], imgs[i], wallet[i], wallet[i], surplus[i]]);
    }
    
    this.state = {
      data: data,
      address: addr,
      wallet: list2,
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
  resize(){
    console.log("Resize: ");
  }

  render(){
  return (
    <div className="App">
      <div>
        <AddressClass addressName={this.state.address[0]} tokens={this.state.data[0]} />
        <AddressClass addressName={this.state.address[1]} tokens={this.state.data[1]} />

        <div className="mainSplitter">
          <div>Split of will:</div>
          { this.renderInnerSplitter(3) }
          <div>
            { this.renderInputs(3) }
          </div>
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

export default App;
