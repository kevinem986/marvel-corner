import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../../containers/Home";
import Characters from "../Characters";
import Comics from "../Comics";
import Stories from "../Stories";
import Favorites from "../Favorites";
import Character from "../Characters/character";
import Comic from "../Comics/comic";
import Story from "../Stories/story";

const Content = () => {
    
  return (
    <div>
        <Switch>
          <Route exact path="/" component={() => <Home />} />   
          <Route path="/characters" component={() => <Characters />} />    
          <Route path="/character/:id" component={() => <Character />} />      
          <Route path="/comics" component={() => <Comics />} /> 
          <Route path="/comic/:id" component={() => <Comic />} />  
          <Route path="/stories" component={() => <Stories />} />
          <Route path="/story/:id" component={() => <Story />} />
          <Route path="/favorites" component={() => <Favorites />} />
        </Switch>
    </div>
  );
};

export default Content;
