import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const MenuData = [
  {
    titel: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    titel: "Fehlersuche",
    path: "/fehler",
    icon: <AiIcons.AiOutlineSearch />,
    cName: "nav-text",
  },
  {
    titel: "Fehlererstellen",
    path: "/fehler/erstellen",
    icon: <AiIcons.AiOutlinePlusSquare />,
    cName: "nav-text",
  },
  {
    titel: "Analyse",
    path: "/analyse",
    icon: <IoIcons.IoMdAnalytics />,
    cName: "nav-text",
  },
  {
    titel: "Einstellungen",
    path: "/einstellungen",
    icon: <IoIcons.IoMdAnalytics />,
    cName: "nav-text",
  },
];
