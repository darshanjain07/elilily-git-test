import axios from "axios";
import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import moment from "moment";

function Activity() {
  const [activities, setActivies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  let url = "https://api.github.com/events";

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(function (response) {
        if (response.status == 200) {
          setActivies(response.data);
        }
        setLoading(false)
      })
      .catch(function (error) {});
  }, []);

  return (
    <div>
      <h1> Activities </h1>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      {isLoading ? (
        <div style={{textAlign: 'center'}}>
          <img src="./spinner.gif" width={75} height={75} />
        </div>
      ) : (
        <div>
          {activities.map((ac, i) => (
            <div key={i} style={{ border: "1px solid", padding: 10 }}>
              <p>
                <strong>User Name: </strong>
                {ac.actor.display_login}
              </p>
              <p>
                <strong>Activity Type: </strong>
                {ac.type}
              </p>
              <p>
                <strong>Created At: </strong>
                {moment(ac.created_at).format("MMM Do YYYY, h:mm:ss")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activity;
