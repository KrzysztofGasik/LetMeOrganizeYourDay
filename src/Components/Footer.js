import React, { Component } from "react";

const socialMediaElements = [
  {
    name: "fb",
    icon: "fab fa-facebook-f",
    href: "https://en-us.facebook.com/"
  },
  {
    name: "linkedin",
    icon: "fab fa-linkedin-in",
    href: "https://pl.linkedin.com/"
  },
  {
    name: "youtube",
    icon: "fab fa-youtube",
    href: "https://www.youtube.com/"
  },
  {
    name: "twitter",
    icon: "fab fa-twitter",
    href: "https://twitter.com/"
  }
];

export const Footer = () => {
  return (
    <footer>
      <span>Krzysztof Gasik &copy; 2019 find me on <a href='https://github.com/KrzGas' target="_blank"><i className="fab fa-github"></i></a></span>
      <ul>
        {socialMediaElements.map(item => (
          <li key={item.name}>
            <a href={item.href} target="_blank">
              <i className={item.icon} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
