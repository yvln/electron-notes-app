import React, { Component } from 'react';

import axios from 'axios';

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: ""
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post(`${this.props.dataurl}`, {
      title: this.state.title,
      description: this.state.description,
			date_created: new Date()
		}).then(response => {
      this.props.newItemSend(response.data.notes.id);
    })
  }

  render() {
    return (
      <div className="New">
          <form className="formNew" onSubmit={this.onSubmit}>

            <div className="item1">
              <label htmlFor="title" className="nameInputNew">Title</label>
              <input className="item1input" type="text" name="title" value={this.state.title} onChange={this.onChange} />
            </div>

            <div className="item2">
              <label htmlFor="description" className="nameInputNew">Description</label>
              <textarea name="description" value={this.state.description} onChange={this.onChange} />
            </div>

            <div className="item3">
              <input className="item3input" type="submit" value="SAVE" />
            </div>

          </form>
      </div>
    );
  }
}

export default New;
