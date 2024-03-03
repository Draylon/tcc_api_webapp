import React, { Component } from "react";

class DesktopNotification extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }

  showNotification() {
    var options = {
      body: 'Notification Body',
      icon: 'https://cdn-icons-png.flaticon.com/512/3020/3020000.png',
      dir: 'ltr',
    };
    if(Notification.permission != "denied"){
        if(Notification.permission!="granted"){
            Notification.requestPermission();
        }else{
            notification = new Notification('Hello World', options);
        }
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.showNotification}>Show notification</button></div>
    );
  }
}

export default DesktopNotification;