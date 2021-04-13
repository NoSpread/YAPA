import React, { Component } from 'react';
// import '../../style/conversation.css';

class Conversation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="conversation" className="card card-bordered" style={{marginBottom:"0"}}>
        <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{overflowY: "scroll !important", height:"400px !important"}}>    
        </div>
      </div>
    );
  }
};

export default Conversation;
