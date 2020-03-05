import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import CeramicsShow from "./routes/CeramicsShow";
import Workshop from "./routes/Workshop";
import Technology from "./routes/Technology";
import Origin from "./routes/Origin";
import SystemManagement from "./routes/SystemManagement";
import login from  "./routes/login";
import register from "./routes/register";
import details from "./routes/CeramicsShow/details"
import Community from "./routes/Community";
import ComSC from "./routes/Community/ComSC";
import ComAdd from "./routes/Community/ComAdd";

export default class RouterConfig extends React.Component{
  render(){
    return(
      <HashRouter>
        <Switch>
            <Route path='/' exact component={App}/>
            <Route path='/CeramicsShow' exact component={CeramicsShow}/>
            <Route path='/Workshop' exact component={Workshop}/>
            <Route path='/Technology' exact component={Technology}/>
            <Route path='/Origin' exact component={Origin}/>
            <Route path='/SystemManagement' exact component={SystemManagement}/>
            <Route path='/login' exact component={login}/>
            <Route path='/register' exact component={register}/>
          <Route path='/CeramicsShow/details' exact component={details}/>
            <Route path='/SystemManagement' exact component={SystemManagement}/>
            <Route path='/Community' exact component={Community}/>
            <Route path='/Community/ComSC' exact component={ComSC}/>
            <Route path='/Community/ComAdd' exact component={ComAdd}/>
        </Switch>
      </HashRouter>
    )
  }
}