import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../../containers/Home";
import Characters from "../Characters";
import Comics from "../Comics";
import Stories from "../Stories";
import Favorites from "../Favorites";

const Content = () => {
    
  return (
    <div>
        <Switch>
          <Route exact path="/" component={() => <Home />} />   
          <Route path="/characters" component={() => <Characters />} />        
          <Route path="/comics" component={() => <Comics />} />
          <Route path="/stories" component={() => <Stories />} />
          <Route path="/favorites" component={() => <Favorites />} />
        </Switch>
    </div>
  );
};

export default Content;
