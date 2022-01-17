import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  
  return (
    <div>
      <h1> Welcome, You are now authorised to access</h1>
      <nav>
        <ul>
          <li>
            <Link to="/activities">Git Activities</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
