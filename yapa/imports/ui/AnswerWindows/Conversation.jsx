import React, { Component } from 'react';
// import '../../style/conversation.css';

class Conversation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-6">
              <div className="card card-bordered">
                <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{overflowY: "scroll !important", height:"400px !important"}}>
                  <div className="media media-chat">
                    <div className="media-body">
                      <p>Hi</p>
                      <p>How are you ...???</p>
                      <p className="meta"><time dateTime="2018">23:58</time></p>
                    </div>
                  </div>
                  <div className="media media-chat media-chat-reverse">
                    <div className="media-body">
                      <p>Hiii, I'm good.</p>
                      <p className="meta"><time dateTime="2018">00:06</time></p>
                    </div>
                  </div>
                  <div className="media media-chat">
                    <div className="media-body">
                      <p>Okay</p>
                      <p>We will go on sunday? </p>
                      <p className="meta"><time dateTime="2018">00:07</time></p>
                    </div>
                  </div>
                  <div className="ps-scrollbar-x-rail" style={{left: "0px", bottom: "0px"}}>
                    <div className="ps-scrollbar-x" tabIndex="0" style={{left: "0px", width: "0px"}}></div>
                  </div>
                  <div className="ps-scrollbar-y-rail" style={{top: "0px", height: "0px", right: "2px"}}>
                    <div className="ps-scrollbar-y" tabIndex="0" style={{top: "0px", height: "2px"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Conversation;
