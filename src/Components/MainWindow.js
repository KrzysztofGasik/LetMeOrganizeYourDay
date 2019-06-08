import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { NewNote } from "./NewNote";
import { PendingNote } from "./PendingNote";
import { CompleteNote } from "./CompleteNote";
import { Settings } from "./Settings";

export const MainWindow = () => {
  return (
    <main className="main__window">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/new" component={NewNote} />
        <Route path="/pending" component={PendingNote} />
        <Route path="/complete" component={CompleteNote} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </main>
  );
};
