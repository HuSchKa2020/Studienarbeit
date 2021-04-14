import React, { useState } from "react";
import styles from "./Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { URL_GET_LOGOUT } from "../constants";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { MenuData } from "./MenuData";
import { IconContext } from "react-icons";
import "./Menu.css";

const Toolbar = () => {
  const [sidebar, SetSidebar] = useState(true);
  const showSidebar = () => SetSidebar(!sidebar);

  const history = useHistory();

  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: URL_GET_LOGOUT,
    }).then((res) => {
      console.log(res.data);
      history.push("/login");
    });
  };

  const goTo = (url) => {
    history.push(url);
  };

  return (
    <div className="toolbar">
      <div className="toolbar-menu">
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="Menu">
            <Link to="#" className="Menu-Leiste">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>

              {MenuData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.titel}</span>
                    </Link>
                  </li>
                );
              })}
              <p className="toolbar-item" onClick={logout}>
                Logout
              </p>
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Toolbar;
