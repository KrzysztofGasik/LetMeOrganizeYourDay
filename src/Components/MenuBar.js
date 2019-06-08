import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const MenuElements = [
  {
    path: "/",
    name: "Home",
    icon: "fas fa-home"
  },
  {
    path: "/new",
    name: "New notes",
    icon: "far fa-plus-square"
  },
  {
    path: "/pending",
    name: "Pending notes",
    icon: "fas fa-sticky-note"
  },
  {
    path: "/complete",
    name: "Complete notes",
    icon: "fas fa-check"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "fas fa-cog"
  }
];

export const MenuBar = () => {
  return (
    <nav>
      <ul>
        {MenuElements.map(item => (
          <li key={item.path}>
            <NavLink exact to={item.path}>
              <i className={item.icon} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
