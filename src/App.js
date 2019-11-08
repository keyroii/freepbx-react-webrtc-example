import React from 'react';
import './App.css';

import WebRTCClient from "freepbx-react-webrtc";

import EventEmitter from "events";
import Button from 'react-bootstrap/Button';

function App() {
  constructor(props) {
    super(props)

    this.state = {
        eventHandler: new EventEmitter(),
        currentCallState: null,
        currentConnectionState: null
    };
  }

  componentDidMount() {
    // Connected and Idle
    this.state.eventHandler.on("Idle", function() {
      // Do something...
    });

    // Outgoing call happening
    this.state.eventHandler.on("Calling", function() {
      // Do something...
    });

    // Incoming Call
    this.state.eventHandler.on("Alerting", function() {
      // Do something...
    });

    // Call started
    this.state.eventHandler.on("InCall", function() {
      // Do something...
    });
  };

  eventHandlerEmit = (emit) => {
    this.state.eventHandler.emit(emit);
  }

  updateCallState = (callState) => {
    this.setState({
      ...this.state,
      currentCallState: callState
    })
  }

  updateConnectionState = (connectionState) => {
    this.setState({
      ...this.state,
      currentConnectionState: connectionState
    })
  }

  return (
    <div className="App">
      <header>

      </header>
      <body>
        <video width="25%" height="25%" id="localVideo" autoPlay playsInline  muted="muted"></video>
        <video width="50%" height="50%" id="remoteVideo" autoPlay playsInline ></video>

        <Button onClick={() => this.eventHandlerEmit("answerCall")}>Accept Incoming Call</Button>
        <Button onClick={() => this.eventHandlerEmit("hangupCall")}>Hangup Call</Button>
        <Button onClick={() => this.eventHandlerEmit("placeCall")}>Start Call</Button>

        <WebRTCClient
            enableVideo={true}
            enableSound={true}
            webSocketPort={"8089"} //default port for websocket is 8089 on sip server
            autoRegister = {true}
            sipDomain={"sip.domain.de"} // Sip Domain
            sipServer={"123.123.2.12"} // Optional: Sip Server Adress, if not set domain is used instead
            sipUser={"1234"} // Username of caller
            sipPassword={"SIP_CALLER_PASS"} // Password of caller
            destination={"1234@destination.url"} // Destination, user@destination.domain
            metaData={{}} // Metadata
            alertVideoUrl={"alertUrl"}
            ringbackVideoUrl={"ringbackUrl"}
            localVideoTagId={"localVideo"} // ID of video tag for own video
            remoteVideoTagId={"remoteVideo"} // ID of video tag for incoming remote video
            skipStunServer={true} // True if Server is only reachable in local network and is not public
            eventHandler={this.state.eventHandler}
            eventHandlerEmit={this.eventHandlerEmit}
            updateCallState={this.updateCallState}
            updateConnectionState={this.updateConnectionState}
            traceSip={true}
        />
      </body>
    </div>
  );
}

export default App;
