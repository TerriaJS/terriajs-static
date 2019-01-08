import {Component} from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class Header extends Component {
  
    render() {
      console.log(this.props.content)
        return (
            <div className="header">
              {this.props.content.map(item => <Link key={item.path} to={item.path}> {item.title}</Link>)}
            </div>
        );
    }
}

export default Header;
