import React, { Component } from 'react';
import './App.css';

import List from './components/list';
import View from './components/view';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "newnote",
      itemclickedid: 0,
      url: 'http://electron-libre.herokuapp.com/',
      itemafterdeleted: 0,
      hasBeenCreated: false,
      hasBeenDeleted: false
    }

    this.renderOneView = this.renderOneView.bind(this)
    this.newItemSend = this.newItemSend.bind(this)
    this.onClickItem = this.onClickItem.bind(this)

    this.changeModeNew = this.changeModeNew.bind(this)
    this.newItemSendDone = this.newItemSendDone.bind(this)

    this.itemDeleted = this.itemDeleted.bind(this)
    this.itemDeletedDone = this.itemDeletedDone.bind(this)
  }

  renderOneView(id) {
    this.setState({
      mode: "viewone"
    })
  }

  newItemSend(id) {
    this.onClickItem(id);
    this.setState({
      hasBeenCreated: true
    })
  }

  newItemSendDone() {
    this.setState({
      hasBeenCreated: false
    })
  }

  itemDeleted() {
    this.changeModeNew();
    this.setState({
      hasBeenDeleted: true
    })
  }

  itemDeletedDone() {
    this.setState({
      hasBeenDeleted: false
    })
  }

  onClickItem(id) {
    this.setState({
      itemclickedid: id,
      mode: 'viewone'
    })
  }

  changeModeNew() {
    this.setState({
      mode: "newnote"
    })
  }

  render() {
    return (
      <div className="App">
        <List
          dataurl={this.state.url}
          onClickItem={this.onClickItem}
          hasBeenCreated={this.state.hasBeenCreated}
          newItemSendDone={this.newItemSendDone}
          hasBeenDeleted={this.state.hasBeenDeleted}
          itemDeletedDone={this.itemDeletedDone} />

        <div className="divLogo">
          <img className="logo" src="/images/noted.png"  alt="logonoted"/>
        </div>

        <div className="divButtonPlusNew">
          <button className="buttonPlusNew"onClick={this.changeModeNew}>+</button>
        </div>

        <View
          dataurl={this.state.url}
          mode={this.state.mode}
          onClickItem={this.onClickItem}
          itemclickedid={this.state.itemclickedid}
          changeMode={this.changeModeNew}
          newItemSend={this.newItemSend}
          itemDeleted={this.itemDeleted} />
      </div>
    )
  }
}

export default App;
