import React from "react";
import "./DropDownProfile.css";

const DropDownProfile = () => {
  return (
    <div className="flex flex-col  DropDownProfile">
      <ul className="flex flex-col gap4">
        <li>
          <a href="/home/Profile" style={{ textDecoration: "none", color: "black" }}>
            <i className="material-icons">person</i>profil
          </a>{}
        </li>
        <li>
        <a href="" style={{ textDecoration: "none", color: "black" }}>
          <i className="material-icons">book</i>your Saved List
          </a>
        </li>
        <hr />
        <li>
        <a href="" style={{ textDecoration: "none", color: "black" }}>
          <i className="material-icons">contact_support</i>Help centre
          </a>
        </li>
        <li>
        <a href="" style={{ textDecoration: "none", color: "black" }}>
          <i className="material-icons">manage_accounts</i>Settings
          </a>
        </li>
        <hr />
        <li>
        <a href="" style={{ textDecoration: "none", color: "black" }}>
          <i className="material-icons">logout</i>Log Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropDownProfile;
