import React, { Component } from 'react';
import './App.css';
import MenuClass from './MenuClass.js';
import AddressClass from './AddressClass.js';
import imgUsdt from './img/USDT.png';
import imgBtc from './img/BTC.png';

class App extends React.Component {
  constructor(props){
    super(props);
    var addr = ["Address name1", "Address name2"];
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
    };
  }

  render(){
  return (
    <div className="App">
      <div>
        <MenuClass tokens={this.state.wallet} />

        <AddressClass addressName={this.state.address[0]} tokens={this.state.data[0]} />
        <AddressClass addressName={this.state.address[1]} tokens={this.state.data[1]} />

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
