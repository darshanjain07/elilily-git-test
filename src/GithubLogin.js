import React, { Fragment, useEffect, useState } from "react";
import "./GithubLogin.css";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import Routes from "./routes/RouteConstant";
import axios from "axios";

function GithubLogin() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();
  const currentLocation = useLocation();
  const { pathname, search } = currentLocation;

  const pathRoot = matchPath(pathname, {
    path: Routes.ROOT,
  });

  const queryParams = new URLSearchParams(search);
  const code = queryParams.get("code");

  useEffect(() => {
    if (code) {
      // if code is there then get the access_token
      setLoading(true);
      let url = `http://localhost:9000/github/generate/access_token?code=${code}`;
      axios
        .get(url)
        .then(function (response) {
          if (response.status) {
            if (response.data.success) {
              // fetch access_token and store it to localStorage for future use,
              let access_token =  response.data && response.data.data.access_token
              if(access_token) {
                localStorage.setItem('elililly-user-token', access_token)
                history.push(Routes.DASHBOARD)
              }
            } else {
              setError(response.data.data);
            }
            // handle success
            setLoading(false);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false);
        });
    }
  }, [code]);

  return (
    <div className="GithubLogin">
      <h1>Welcome to Eli Lilly</h1>
      {isLoading ? (
        <Fragment>
          <p>Please be patient we are letting you in</p>
          <img src="./spinner.gif" width={75} height={75} />
        </Fragment>
      ) : (
        <Fragment>
          <p>Click Signup to continue</p>
          <a href="https://github.com/login/oauth/authorize?client_id=0d04e545553dc9b7d0e0">
            Signup with Github
          </a>
          {!!error && (
            <Fragment>
              <p style={{ color: "red" }}>Error: {error}</p>
              <p>Try again</p>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default GithubLogin;
