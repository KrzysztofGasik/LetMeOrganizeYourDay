import React, { Component } from "react";

export const Header = () => {
  return (
    <header>
      <span>Let me help organize your day</span>
      <form
        action="https://www.google.com/search"
        class="searchform"
        method="get"
        name="searchform"
        target="_blank"
      >
        <input name="sitesearch" type="hidden" value="" />
        <input
          autocomplete="on"
          class="form-control search"
          name="q"
          placeholder="Search for ..."
          required="required"
          type="text"
        />
        <button class="button" type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
