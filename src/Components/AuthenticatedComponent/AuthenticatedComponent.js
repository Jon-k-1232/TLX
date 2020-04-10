import React, { Component } from "react";
import { getJwt } from "../Helpers/jwt.js";
import { withRouter } from "react-router-dom";
import config from "../../config.js";
import "./AuthenticatedComponent.css";

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const jwt = getJwt();

    if (!jwt) {
      this.props.history.push("/SignIn");
    } else {
      fetch(`${config.API_ENDPOINT}/getUser/`, {
        //--- 2 needs updated to ${this.props.match.params.id} once login done
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(resp.status);
          }
          return resp.json();
        })
        .then((data) => {
          this.setState({ user: data });
        })
        .catch((err) => {
          localStorage.removeItem("jwt-auth");
          this.props.history.push("/");
        });
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <div className="authPage">
          <h1>Loading...</h1>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedComponent);
