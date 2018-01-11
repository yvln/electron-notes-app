import React, { Component } from 'react';

import axios from 'axios';
import New from './new';

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentItem: {},
      mode:"view"
    }

    this.renderOneView = this.renderOneView.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.getInfoOne = this.getInfoOne.bind(this);
  }

  componentDidUpdate(prevProps){
    if (prevProps.itemclickedid !== this.props.itemclickedid) {
      this.getInfoOne();
    }
  }

  getInfoOne() {
    axios.get(`${this.props.dataurl}${this.props.itemclickedid}`)
    .then( res => {
      this.setState({
        contentItem: res.data.notes
      })
    })
  }

  deleteOne() {
    axios.delete(`${this.props.dataurl}${this.props.itemclickedid}`)
    .then(res => {
      this.props.itemDeleted()
    })
  }

  renderOneView() {
    return(
      <div className="OneNote">
       {this.state.contentItem !== null &&
         <div className="OneNote">
           <div className="item4">{this.state.contentItem.title}</div>
           <div className="item5">{this.state.contentItem.description}</div>
           <div className="item6">Created on {this.state.contentItem.date_created}</div>
           {this.state.contentItem.date_saved !== null &&
             <div className="item7">Last change on {this.state.contentItem.date_saved}</div>
           }
           <div className="item8"><button className="item8input" onClick={this.deleteOne}>Delete</button></div>
         </div>
       }
       </div>
    )
  }

  render() {
    return (
      <div className="View">

        {this.props.mode === "newnote" &&
          <div className="NewNote">
            <New
              dataurl={this.props.dataurl}
              changeMode={this.props.changeMode}
              newItemSend={this.props.newItemSend}/>
          </div>
        }

        {this.props.mode === "viewone" &&
          <div className="OneNoteContainer">
            {this.renderOneView()}
          </div>
        }

      </div>
    );
  }
}

export default View;
