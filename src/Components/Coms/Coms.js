import React from "react";
import "./Coms.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context.js";
import ComBox from "../ComBox/ComBox.js";

export default class Coms extends React.Component {
  static contextType = AppContext;


  render() {
      let arr = this.context.messages;
      let messageHits = [];


      if(arr <= 0){
          messageHits.push(
              <div className="noMessageContainer">
                <p> No Messages</p>
              </div>
          )
      }else{
          for (let i = 0; i < arr.length; i++) {
              messageHits.push(
                  <div className="hitItemContainer" key={i}>
                      <Link to={`/communications/details/${arr[i].messageId}`}>
                      <ComBox messageInfo={arr[i]}/>
                      </Link>
                  </div>
              )
          }
      }



    return (
      <main className="comPage">
        <h1>Communications</h1>
          <div className="comPageNav">
            <p id="newCommLink">
              <Link to="/Communications/New">New</Link>
            </p>
            <p id="historyCommLink">
              <Link to="/Communications/History">History</Link>
            </p>
          </div>
          {messageHits}
      </main>
    );
  }
}