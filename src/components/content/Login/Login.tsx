import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { IGlobalState } from "../../../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import logo from "../../../img/Logo.png";
import "./Util.css";
 import "./NewLogin.css";

interface IPropsGlobal {
  getToken: (token: string) => void;
}

const NewLogin: React.FC<IPropsGlobal & RouteComponentProps> = props => {
  const [userValue, userSetValue] = React.useState("");
  const [passValue, passSetValue] = React.useState("");
  const [errorValue, setErrorMessage] = React.useState("");

  const updateUser = (event: React.ChangeEvent<HTMLInputElement>) =>
    userSetValue(event.target.value);

  const updatePass = (event: React.ChangeEvent<HTMLInputElement>) =>
    passSetValue(event.target.value);

  const confirmValues = () => {
    fetch("http://localhost:8080/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ u: userValue, p: passValue })
    }).then(response => {
      if (response.ok) {
        response.text().then(token => {
          props.getToken(token);
          sessionStorage.setItem("token", token);
          props.history.push("/");
        });
      } else {
        response.text().then(errorMessage => {
          setErrorMessage(errorMessage);
        });
      }
    });
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form validate-form">
            <span className="login100-form-logo">
              <img src={logo} className="logo" alt="" />
            </span>
            <span className="login100-form-title p-b-34 p-t-27">Log in</span>
            <div
              className="wrap-input100 validate-input"
              data-validate="Enter username"
            >
              <input
                className="input100 borderNone"
                type="text"
                name="username"
                placeholder="Username"
                value={userValue}
                onChange={updateUser}
              />
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <input
                className="input100 borderNone"
                type="password"
                name="pass"
                placeholder="Password"
                value={passValue}
                onChange={updatePass}
              />
            </div>

            <div className="container-login100-form-btn">
              <button onClick={confirmValues} className="login100-form-btn">
                Login
              </button>
            </div>
            <span className="spanErrorLogin">{errorValue}</span>
            <div className="text-center p-t-90">
              <Link to="/register" className="txt1">
                Not Registered? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="dropDownSelect1" />
    </div>
  );
};

const mapsStateToProps = (state: IGlobalState) => ({
  token: state.token
});

const mapDispatchToProps = {
  getToken: actions.getToken
};

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(NewLogin);
