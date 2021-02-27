import React, { Component } from 'react';

class WillClass extends React.Component {
    constructor(props){
      super(props); 
      var add = [];
      var ratios = [];
      var amounts = [];
      var data = [];
      for (var i = 0; i < props.addresses.length; ++i){
          add.push([props.addresses[i], 0]);
          ratios.push(1);
      }
      for (i = 0; i < props.addresses.length; ++i){
          var amount = [];
          var ratio = this.getRatio(ratios, i);
          add[i][1] = ratio;
          console.log("ratio of ", i, " is ", ratio);
          for (var j = 0; j < props.data[i].length; ++j){
            amount.push([props.data[i][j][0], Math.floor(props.data[0][j][3] * ratio * 10)/10]); // Take price only of the first wallet
          }
          amounts.push(amount);
          data.push([add[i], amount, i]);
      }
      console.log("data: ", data);
      this.state = {
          addresses: add,
          ratios: ratios,
          amounts: amounts,
          data: data,
          pData: props.data,
          activeIndex: -1
      };
    }
    calculateData(propsData, add, ratios){
      var data = [];
      for (var i = 0; i < add.length; ++i){
          var amount = [];
          var ratio = this.getRatio(ratios, i);
          add[i][1] = ratio;
          console.log("ratio of ", i, " is ", ratio);
          for (var j = 0; j < propsData[i].length; ++j){
            amount.push([propsData[i][j][0], propsData[0][j][3] * ratio]); // Take price only of the first wallet
          }
          data.push([add[i], amount, i]);
      }
      return data;
    }
    getRatio(ratios, index){
        var sum = 0;
        for (var i = 0; i < ratios.length; ++i){
            sum += ratios[i];
        }
        return ratios[index] / sum;
    }

    handleRatioChange = (e) => {
        var i = this.state.activeIndex;
        console.log("index: ", i);
        this.state.ratios[i] = Number(e.target.value);
        console.log(this.state.ratios);
        //var ratio = this.getRatio(this.state.ratios[i], i);
        var data = this.calculateData(this.state.pData, this.state.addresses, this.state.ratios);
        console.log("coins: ");
        for (var j = 0; j < data.length; ++j){
            if (data[j] != undefined){
                console.log(data[j][1]);
            }
        }
        console.log("end coins");
        this.setState({ data: data });
    }
    setIndex = i => {
        this.setState({ activeIndex: i });
    }
    
    render() {
        return (
            <div>
            <div className="splits">
              <div className="item">50:50</div>
              <div className="item">2 vs 1</div>
            </div>
                {
                this.state.data.map(d => (
                    <WillAddressClass key={d[0][0]} name={d[0][0]} ratio={d[0][1]} coins={d[1]} index={d[2]}
                        changeValueMethod={e => this.handleRatioChange(e)} setIndexMethod={e => this.setIndex(e)} />
                ))
                }
            </div>
        )
    }
}

class WillAddressClass extends React.Component {
    constructor(props){
        super(props);
        this.state = { name: props.name, coins: props.coins, ratio: props.ratio, index: props.index };
        console.log("coins: ", props.coins);
    }

    handleChange(e){
        this.setState({ ratio: e.target.value });
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
          this.setState({ ratio: nextProps.ratio });
        }
      }

    render(){
        return (
            <div>
                <div>
                    {this.state.name}
                    <input type="text" value={this.state.ratio} onChange={(e) => { this.handleChange(e); var i = this.props.index; this.props.setIndexMethod(i); this.props.changeValueMethod(e, i); }} />
                </div>
                <div>
                    {
                    this.state.coins.map(a => (
                        <div>
                            <div>{a[0]}</div>
                            <div>{a[1]}</div>
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }
}

export default WillClass;