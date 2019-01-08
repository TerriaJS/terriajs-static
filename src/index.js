import { staticPageRegister } from "./register";
import ReactDOM from 'react-dom';
import React from 'react';
import Header from './Header.js';
import {Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

const renderBody = () => {
  <Switch>
    {staticPageRegister.map(item => (
                <Route
                    path={item.path}
                    key={item.path}
                    component={item.component}
                />
            ))}
  </Switch>
}


const Pages = props => {
  return (
    <div>
      <Header content = {staticPageRegister}/>
          <div className="container app-container" id="content">
              {renderBody()}
          </div>
    </div>
  )
}


ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Pages}/>
  </BrowserRouter>,
  document.getElementById('main')
);


