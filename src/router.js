import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import CeramicsShow from "./routes/CeramicsShow";
import Workshop from "./routes/Workshop";

export default class RouterConfig extends React.Component{
  render(){
    return(
      <HashRouter>
        <Switch>
            <Route path='/' exact component={App}/>
            <Route path='/CeramicsShow' exact component={CeramicsShow}/>
            <Route path='/Workshop' exact component={Workshop}/>
        </Switch>
      </HashRouter>
    )
  }
}