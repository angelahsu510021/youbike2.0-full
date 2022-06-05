import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <main>
      <div>
        <ul>
          <li>
            <Link to="/stations">我要查詢</Link>
          </li>
          <li>
            <Link to="/rental">我要借還車</Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default HomeComponent;
