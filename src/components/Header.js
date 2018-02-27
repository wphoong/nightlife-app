import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogOut, startLogin } from '../actions/auth.js';

export const Header = ({
  startLogOut, startLogin, auth, lastSearch,
}) => (
  <header className="header" >
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Night Life</h1>
        </Link>
        {
          auth.uid != undefined ?
            <button className="button button--link" onClick={startLogOut} >Log Out</button> :
            <button className="button button--link" onClick={startLogin} >Log In</button>
        }

      </div>
    </div>
  </header>
);

const mapStateToProps = (state, props) => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  startLogOut: () => dispatch(startLogOut()),
  startLogin: () => dispatch(startLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
