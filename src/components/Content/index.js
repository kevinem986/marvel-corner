import React from "react";
import { Switch, Route } from "react-router-dom";
import Characters from "../Characters";
import Comics from "../Comics";
import Stories from "../Stories";
import Favorites from "../Favorites";

const Content = () => {
  return (
    <div>
        <Switch>
          <Route path="/characters" component={() => <Characters />} />        
          <Route path="/comics" component={() => <Comics />} />
          <Route path="/stories" component={() => <Stories />} />
          <Route path="/favorites" component={() => <Favorites />} />
        </Switch>
    </div>
  );
};

export default Content;
