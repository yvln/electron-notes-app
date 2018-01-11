import React, { Component } from 'react';

import axios from 'axios';

import Item from './item';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: []
    }

    this.renderItem = this.renderItem.bind(this)
    this.getDataAll = this.getDataAll.bind(this)
  }

  componentDidMount() {
    this.getDataAll();
  }

  getDataAll() {
    axios.get(`${this.props.dataurl}`)
    .then(res => {
      this.setState({
        allItems: res.data.notes,
      })
    })
  }

  componentDidUpdate(prevProps, prevStates) {
    if (!prevProps.hasBeenCreated && this.props.hasBeenCreated) {
      this.getDataAll();
      this.props.newItemSendDone();
    } else if (!prevProps.hasBeenDeleted && this.props.hasBeenDeleted) {
      this.getDataAll();
      this.props.itemDeletedDone();
    }
  }

  renderItem() {
    const allItemsRender = [];
    this.state.allItems.map(e => {
      return allItemsRender.push(
        <Item
          key={e.id}
          onClickItem={this.props.onClickItem}
          idItem={e.id}
          title={e.title}
          desc={e.description}
          datecreated={e.date_created}
          datesaved={e.date_saved} />
      )
    })
    return allItemsRender;
  }

  render() {
    return(
      <div className="List">
        {this.renderItem()}
      </div>
    )
  }
}

export default List;
